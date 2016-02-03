(function(){
'use strict';

	function CreateNotificationCtrl($scope,$state,connectApiService,constURI,sharedService){

		/**
		 * スキルリストの取得
		 * @param  {[type]} resultAPI){			$scope.targetSkills [description]
		 * @return {[type]}                                    [description]
		 */
		$scope.loadSkills = function(){
			connectApiService.get(constURI.getSkillList).then(function(resultAPI){
				return resultAPI.data;
			});
		}

		/**
		 * チェックしたスキルを配列に格納する
		 * @type {Array}
		 */
		// $scope.selection = [];
		// $scope.toggleSelection = function toggleSelection(targetSkill) {
		//     var idx = $scope.selection.indexOf(targetSkill.skill);
		//     console.log('index:'+idx);
		//     if (idx > -1) {
		//         $scope.selection.splice(idx, 1);
		//     }
		//     else {
		//         $scope.selection.push(targetSkill.skill);
		//         console.log($scope.selection);
		//     }
		// };

		/**		  	
		 * 登録ボタン押下処理
		 * @param  {[type]} notification [description]
		 * @return {[type]}              [description]
		 */
		$scope.submit = function(notificationDAO){
			notificationDAO.targetUserList = setTargetSkills($scope.selectSkillList);
			notificationDAO.filePath = "";
			console.dir(notificationDAO);
			connectApiService.post(constURI.postNotification,notificationDAO).then(function(resultAPI){
				sharedService.isShowCreateNotificationPanel = false;
				$state.go('main');
			});
		};

		/**
		 * 
		 * @param {[type]} selectSkillList [description]
		 */
		var setTargetSkills = function(selectSkillList) {
			var targetSkills = [];
			for(var i =0; i<selectSkillList.length; i=(i+1)){
				targetSkills.push(selectSkillList[i]["text"]);
			}
			return targetSkills;
		}

		/**
		 * パネルを閉じる
		 * @return {[type]} [description]
		 */
		$scope.closePanel = function() {
			sharedService.isShowCreateNotificationPanel = false;
		}			
	}

	//moduleへ登録
	angular.module('indexModule').controller('CreateNotificationController',['$scope','$state','connectApiService','constURI','sharedService',CreateNotificationCtrl]);
})();
