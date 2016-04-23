
/**
 * ユーザ操作関連サービス
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function UserService(){
		var readMemberList = [];
		var unreadMemberList =[];

		/**
		 * 既読者・未読者リストを作成する
		 * @param  {[type]}
		 * @return {[type]}
		 */
		var userService = {
			createReadUserList:function(argData){
				if( !argData )
					return false;
				for(var i=0; i<argData.length; ++i){
					var notification = argData[i]
					if( !notification.notificationTargetRoles )
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
	angular.module(indexModule).factory('UserService',UserService);
})();