/**
 * お知らせ新規登録パネルコントローラ
 * 
 */
(function(){
'use strict';

	function CreateNotificationCtrl($scope,$state,connectApiService,constURI,sharedService){

		/**
		 * 宛先リスト取得処理
		 * @param  {obj} query 
		 * @return {list} targetSkill      
		 */
		$scope.loadSkills = function(query) {
			return connectApiService.get(constURI.getSkillList).then(function(apiResult){
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
		 * @param  {obj} notificationDAO 
		 * @return {}                 
		 */
		$scope.submit = function(notificationDAO) {
			notificationDAO.targetUserList = getSkillNameList($scope.selectSkillList);
			notificationDAO.filePath = "";
			console.dir(notificationDAO);
			connectApiService.post(constURI.postNotification,notificationDAO).then(function(resultAPI){
				sharedService.isShowCreateNotificationPanel = false;
				$state.go('main');
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
	angular.module('indexModule').controller('CreateNotificationController',['$scope','$state','connectApiService','constURI','sharedService',CreateNotificationCtrl]);
})();
