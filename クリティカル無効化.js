/*--------------------------------------------------------------------------
  
  クリティカル（必殺）の仕様を全て無効化して、表示欄からも消します
    
  使用方法:
  pluginフォルダに入れるだけ
  
  対応バージョン
  1.0.0
    
  ステータス表示や、戦闘の計算式を変えるようなプラグインとの併用は上手くいかない可能性あり    
  
  作成者:
  うなうなぎ
  https://twitter.com/unaunagi1
  
--------------------------------------------------------------------------*/

//クリティカル率の計算
//条件を全て無視して0％に固定する
var CriticalCalculator = {
	calculateCritical: function(active, passive, weapon) {
		return 0;
	}
};

// ステータスの描画
// 必殺は右端にあるので、単純に非表示で対処
var StatusRenderer = {
	drawAttackStatus: function(x, y, arr, color, font, space) {
		var i, text;
		var length = this._getTextLength();
		var numberSpace = DefineControl.getNumberSpace();
		//var buf = ['attack_capacity', 'hit_capacity', 'critical_capacity'];
		var buf = ['attack_capacity', 'hit_capacity'];

		
		for (i = 0; i < 2; i++) {
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
ItemSentence.CriticalAndRange = defineObject(BaseItemSentence,
{
	drawItemSentence: function(x, y, item) {
		var text;
		
		if(false){
			text = root.queryCommand('critical_capacity');
			ItemInfoRenderer.drawKeyword(x, y, text);
			x += ItemInfoRenderer.getSpaceX();
			NumberRenderer.drawRightNumber(x, y, item.getCritical());
			
			x += 42;
		}
		
		text = root.queryCommand('range_capacity');
		ItemInfoRenderer.drawKeyword(x, y, text);
		x += ItemInfoRenderer.getSpaceX();
		this._drawRange(x, y, item);
	},
	
	getItemSentenceCount: function(item) {
		return 1;
	},
	
	_drawRange: function(x, y, item) {
		var startRange = item.getStartRange();
		var endRange = item.getEndRange();
		var textui = root.queryTextUI('default_window');
		var color = textui.getColor();
		var font = textui.getFont();
		
		if (startRange === endRange) {
			NumberRenderer.drawRightNumber(x, y, startRange);
		}
		else {
			NumberRenderer.drawRightNumber(x, y, startRange);
			TextRenderer.drawKeywordText(x + 17, y, StringTable.SignWord_WaveDash, -1, color, font);
			NumberRenderer.drawRightNumber(x + 40, y, endRange);
		}
	}
}
);