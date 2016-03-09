/**
 * お知らせ新規登録パネルコントローラ
 * 
 */
(function(){
'use strict';

	function CreateNotificationCtrl($scope,$state,connectApiService,constURI,sharedService,$timeout,APP_CONF){

		/**
		 * 宛先リスト取得処理
		 * @param  {obj} query 
		 * @return {list} targetSkill      
		 */
		$scope.loadSkills = function(query) {
			return connectApiService.get(APP_CONF.urlBase + constURI.roles).then(function(apiResult){
				var targetSkill = [];
				var loadSkillList = apiResult.data;
				for(var i = 0; i < loadSkillList.length; i = (i+1)) {
					var skill = {};
					skill["text"] = loadSkillList[i]["skillName"];
					targetSkill.push(skill);
				}
				return targetSkill;
			});
		};

		/**
		 * 登録ボタン押下処理
		 * @param  {obj} notification
		 * @return {}                 
		 * TODO:websocket
		 */
		$scope.submit = function(notification) {
			notification.targetUserList = getSkillNameList($scope.selectSkillList);
			notification.filePath = "";
			connectApiService.post(APP_CONF.urlBase + constURI.notification,notification).then(function(resultAPI){
				if(resultAPI.status == 201){
					$timeout(function(){
						$state.reload();
						sharedService.isShowCreateNotificationPanel = false;
					});
				}else{
					$timeout(function(){
						swal("お知らせに失敗しました");
					},1000);
				}
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
	angular.module(appName).controller('CreateNotificationController',['$scope','$state','connectApiService','constURI','sharedService','$timeout','APP_CONF',CreateNotificationCtrl]);
})();
