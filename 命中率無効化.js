/*--------------------------------------------------------------------------
  
  命中と回避の仕様を無効化して、表示欄からも消します
    
  使用方法:
  pluginフォルダに入れるだけ
  
  対応バージョン
  1.0.0
    
  ステータス表示や、戦闘の計算式を変えるようなプラグインとの併用は上手くいかない可能性あり  
  
  作成者:
  うなうなぎ
  https://twitter.com/unaunagi1
  
--------------------------------------------------------------------------*/

//必殺率と命中率の無効を併用するため、プラグインの使用をフラグ化しておく
var hit_capacity_disabled = true;

var HitCalculator = {
	calculateHit: function(active, passive, weapon) {		
		return 100;
	}
}

// ステータスの描画
// 命中無効と必殺無効と両対応
var StatusRenderer = {
	drawAttackStatus: function(x, y, arr, color, font, space) {
		var i, text;
		var length = this._getTextLength();
		var numberSpace = DefineControl.getNumberSpace();
		var buf = ['attack_capacity', 'hit_capacity', 'critical_capacity'];
		
		for (i = 0; i < 3; i++) {
			//必殺無効化時は必殺表示をスキップ
			if (critical_capacity_disabled && buf[i] == 'critical_capacity'){
				continue;
			}
			//命中無効化時は命中表示をスキップ
			if (hit_capacity_disabled && buf[i] == 'hit_capacity'){
				continue;
			}			
			
			text = root.queryCommand(buf[i]);
			TextRenderer.drawKeywordText(x, y, text, length, color, font);
			x += 28 + numberSpace;
			
			if (arr[i] >= 0) {
				NumberRenderer.drawNumber(x, y, arr[i]);
			}
			else {
				TextRenderer.drawSignText(x - 5, y, StringTable.SignWord_Limitless);
			}
			
			x += space;
		}	
	},
	
	_getTextLength: function() {
		return 35;
	}
};

//武器詳細の必殺と射程
//射程だけ残して必殺を消す
ItemSentence.AttackAndHit = defineObject(BaseItemSentence,
{
	drawItemSentence: function(x, y, item) {
		var text;
		
		text = root.queryCommand('attack_capacity');
		ItemInfoRenderer.drawKeyword(x, y, text);
		x += ItemInfoRenderer.getSpaceX();
		NumberRenderer.drawRightNumber(x, y, item.getPow());
		
		x += 42;
	
		if(false){
			text = root.queryCommand('hit_capacity');
			ItemInfoRenderer.drawKeyword(x, y, text);
			x += ItemInfoRenderer.getSpaceX();
			NumberRenderer.drawRightNumber(x, y, item.getHit());
		}
	},
	
	getItemSentenceCount: function(item) {
		return 1;
	}
});

//地形情報ウィンドウ
//通常は回避0でも表示されてしまうので隠しておく
MapParts.Terrain._drawContent = function(x, y, terrain) {
		var text;
		var textui = this._getWindowTextUI();
		var font = textui.getFont();
		var color = textui.getColor();
		var length = this._getTextLength();
		
		x += 2;
		TextRenderer.drawKeywordText(x, y, terrain.getName(), length, color, font);
		
		//回避率の非表示
		if(!hit_capacity_disabled){
			y += ItemInfoRenderer.getSpaceY();
			this._drawKeyword(x, y, root.queryCommand('avoid_capacity'), terrain.getAvoid());
		}
		
		if (terrain.getDef() !== 0) {
			text = ParamGroup.getParameterName(ParamType.DEF);
			y += ItemInfoRenderer.getSpaceY();
			this._drawKeyword(x, y, text, terrain.getDef());
		}
		
		if (terrain.getMdf() !== 0) {
			text = ParamGroup.getParameterName(ParamType.MDF);
			y += ItemInfoRenderer.getSpaceY();
			this._drawKeyword(x, y, text, terrain.getMdf());
		}	
};

//地形表示ウィンドウを、回避率を削る分だけコンパクトにする
MapParts.Terrain._getWindowHeight = function() {
		var xCursor = this.getMapPartsX();
		var yCursor = this.getMapPartsY();
		var terrain = PosChecker.getTerrainFromPos(xCursor, yCursor);
		
		//_getPartsCountの値より１行分減らす
		return (this._getPartsCount(terrain) - 1 ) * ItemInfoRenderer.getSpaceY();
};