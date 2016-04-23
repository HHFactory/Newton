/**
 * お知らせ新規登録パネルコントローラ
 * 
 */
(function(){
'use strict';

	function CreateNotificationCtrl($scope,$state,connectApiService,constURI,sharedService,$timeout,$localStorage,APP_CONF,URL_CONF){
		/** ラベル */
		$scope.createPanelHeader = APP_CONF.headerLabelCreateNotification;
		$scope.sendButton = APP_CONF.buttonLabelSend;

		/**
		 * 宛先リスト取得処理
		 * @param  {[type]} query
		 * @return {[type]}      
		 */
		$scope.teamList = function(query) {
			return connectApiService.get(URL_CONF.urlBase + constURI.teams)
									.then(function(apiResult){
										/** TeamEntityList -> nameList */
										var teamNameList = [];
										var loadTeamList = apiResult.data;
										for(var i = 0; i < loadTeamList.length; i++){
											teamNameList.push(loadTeamList[i]["name"]);
										}
										return teamNameList;
									});
		};

		/**
		 * 登録ボタン押下処理
		 * @param  {obj} notification
		 * @return {}                 
		 * TODO:websocket
		 */
		$scope.submit = function(notification) {
			/** ボタン表示制御 */
			$scope.loading = true;
			$scope.sendButton = APP_CONF.buttonLabelSending;
			
			/** 選択したチーム */
			notification.targetTeamList = getSkillNameList($scope.selectTeamList);
			notification.filePath = "";

			/** 登録・更新者 */
			notification.createUser = $localStorage.userinfo.userName;
			notification.updateUser = $localStorage.userinfo.userName;

			/** 登録処理 */
			connectApiService
				.post(URL_CONF.urlBase + constURI.notification,notification)
				/** 画面をリロードし、お知らせ登録パネルを非表示 */
				.then(function(resultAPI){
					$state.reload();
					sharedService.isShowCreateNotificationPanel = false;
				})
				/** ボタン表示を元に戻す（不要かも） */
				.finally(function(){
					$scope.loading = false;
					$scope.sendButton = APP_CONF.buttonLabelSend;
				});
		};

		/**
		 * 選択したスキルリストの整形
		 * @param {list} selectSkillList
		 * @retun {list} skillNameList
		 */
		var getSkillNameList = function(selectSkillList) {
			var skillNameList = [];
			for(var i =0; i<selectSkillList.length; i=(i+1)){
				skillNameList.push(selectSkillList[i]["text"]);
			}
			return skillNameList;
		}

		/**
		 * 新規登録パネルを閉じる
		 * @return {} 
		 */
		$scope.closePanel = function() {
			sharedService.isShowCreateNotificationPanel = false;
		}
	}

	//moduleへ登録
	angular.module(indexModule).controller('CreateNotificationController',['$scope','$state','connectApiService','constURI','sharedService','$timeout','$localStorage','APP_CONF','URL_CONF',CreateNotificationCtrl]);
})();
