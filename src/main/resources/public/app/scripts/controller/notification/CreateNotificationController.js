(function(){
'use strict';

	function CreateNotificationCtrl($scope,$state,connectApiService,constURI,sharedService){

		/**
		 * スキルリストの取得
		 * @param  {[type]} resultAPI){			$scope.targetSkills [description]
		 * @return {[type]}                                    [description]
		 */
		connectApiService.get(constURI.getSkillList).then(function(resultAPI){
			$scope.targetSkills = resultAPI.data;
		});

		/**
		 * チェックしたスキルを配列に格納する
		 * @type {Array}
		 */
		$scope.selection = [];
		$scope.toggleSelection = function toggleSelection(targetSkill) {
		    var idx = $scope.selection.indexOf(targetSkill.skill);
		    console.log('index:'+idx);
		    if (idx > -1) {
		        $scope.selection.splice(idx, 1);
		    }
		    else {
		        $scope.selection.push(targetSkill.skill);
		        console.log($scope.selection);
		    }
		};

		/**		  	
		 * 登録ボタン押下処理
		 * @param  {[type]} notification [description]
		 * @return {[type]}              [description]
		 */
		$scope.submit = function(notification){
			notification.targetUserList = $scope.selection;
			connectApiService.post(constURI.putNotification,notification).then(function(resultAPI){
				$state.go('main');
			});
		};

		/**
		 * キャンセルボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.cancel = function(){
			$state.go('main');
		};	

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
