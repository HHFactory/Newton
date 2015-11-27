
//ユーザ関連の処理をまとめたservice
(function(){
'use strict';
	
	function UserService(){
		var userService = {

			/**
			 * 既読者・未読者リストを作成する
			 * @param  {[type]}
			 * @return {[type]}
			 */
			createReadUserList:function(argData){
				var readMemberList = [];
				var unreadMemberList =[];
				for(var i=0; i<argData.length; ++i){
					var notification = argData[i]
					if(!notification.notificationTargetRoles.length > 0)
						return false;
					var targetUserList = notification.notificationTargetRoles;
					for(var j=0; j<targetUserList.length; ++j){
						if(targetUserList[j].read_flag = true)
							readMemberList.push(targetUserList[j].target_user);
						else if(targetUserList[j].read_flag = false)
							unreadMemberList.push(targetUserList[j].target_user);
					}
				}				
			}
		};
		return userService;
	}

	//moduleへの登録
	angular.module('indexModule').factory('UserService',UserService);
})();