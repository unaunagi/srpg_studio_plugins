/*--------------------------------------------------------------------------
  
  コマンド名変更
    
  使用方法:
  pluginフォルダに入れた後、変更したいコマンドが書いてある欄を書き換える
  
  対応バージョン
  1.0.0
    
  コマンド以外の表記は変更されないので、constants-stringtable.js や、マップチップの地形効果も変更する必要あり
  本体側の仕様変更があれば要らなくなる可能性大
  
  作成者:
  うなうなぎ
  https://twitter.com/unaunagi1
  
--------------------------------------------------------------------------*/

UnitCommand.Talk.getCommandName = function(){return '会話';}
UnitCommand.Occupation.getCommandName = function(){return '占拠';}
UnitCommand.Treasure.getCommandName = function(){return '宝箱';}
UnitCommand.Village.getCommandName = function(){return '村';}
UnitCommand.Shop.getCommandName = function(){return '店';}
UnitCommand.Gate.getCommandName = function(){return '扉';}
UnitCommand.Attack.getCommandName = function(){return '攻撃';}
UnitCommand.Wand.getCommandName = function(){return '杖';}
UnitCommand.Information.getCommandName = function(){return '情報';}
UnitCommand.Item.getCommandName = function(){return 'アイテム';}
UnitCommand.Trade.getCommandName = function(){return '交換';}
UnitCommand.Stock.getCommandName = function(){return 'ストック';}
UnitCommand.Wait.getCommandName = function(){return '待機';}
