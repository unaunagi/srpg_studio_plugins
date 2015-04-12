/*--------------------------------------------------------------------------
  
  戦闘シーンのアニメをなくして、全てマップモードで処理する
    
  使用方法:
  pluginフォルダに入れるだけ
  
  対応バージョン
  1.0.0
    
  ・オプション画面から戦闘タイプの切り替えを非表示にする
  ・オプションの設定に関わらず戦闘タイプを簡略化にする
  
  ユニット素材はあるけどアニメ素材が足りない場合を想定したプラグイン
  イベントでの設定などは全て無視します
  
  プラグインの使用をやめた場合、戦闘時の表示は元の状態に戻ります
  公式のオートカーソルのようにオプションを追加するタイプとの併用も可  
  
  作成者:
  うなうなぎ
  https://twitter.com/unaunagi1
  
--------------------------------------------------------------------------*/

(function() {	
	//戦闘モード切り替えのオプション表示を消す
	//（表示を消すだけで値はいじらない）
	var alias1 = ConfigWindow._configureConfigItem;
	ConfigWindow._configureConfigItem = function(groupArray) {
		//通常のオプション設定を呼び出す
		alias1.call(this, groupArray);
		
		//登録されたオプションの中から、ConfigItem.RealBattleと見出しが同じ物を探しだして消す
		//（見出しが同じなら他のも消してしまうけど、意図してそうする事はないと思う）
		for (var i = groupArray.length-1; i >= 0; i --) {
		  if (groupArray[i].getConfigItemDescription()==ConfigItem.RealBattle.getConfigItemDescription()) groupArray.splice(i,1);
		}
	};

	//強制簡略化
	//プラグインで置き換える前の処理をalias1として別名保存	
	var alias2 = CoreAttack._setBattleTypeAndObject;
	CoreAttack._setBattleTypeAndObject = function(attackInfo, attackOrder) {
		//本来の設定をバックアップ
		var origin_attack_info = attackInfo.battleType;
		//一時的にBattleTypeを変更した上で元の処理を呼び出す
		attackInfo.battleType = BattleType.FORCEEASY;
		alias2.call(this, attackInfo, attackOrder);
		//プラグインを外した時は元の挙動のままにしたいので、バックアップした値に戻す
		attackInfo.battleType = origin_attack_info;
	};	
})();
	
	
	