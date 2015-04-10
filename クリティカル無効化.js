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

//必殺率と命中率の無効を併用するため、プラグインの使用をフラグ化しておく
var critical_capacity_disabled = true;

//クリティカル率の計算
//条件を全て無視して0％に固定する
var CriticalCalculator = {
	calculateCritical: function(active, passive, weapon) {
		return 0;
	}
};

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
			if ((typeof critical_capacity_disabled !== "undefined") && buf[i] == 'critical_capacity'){
				continue;
			}
			//命中無効化時は命中表示をスキップ
			if ((typeof hit_capacity_disabled !== "undefined") && buf[i] == 'hit_capacity'){
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