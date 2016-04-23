
//お知らせ対象スキル選択モーダル用コントローラ
(function(){
'use strict';

	function SetTargetSkillModalCtrl($scope,$modalInstance,targetSkill,connectApiService,constURI,APP_CONF,URL_CONF){
		$scope.selection = [];
		if(targetSkill.length > 0){
			$scope.selection.push(targetSkill.skill);
		};

		/**
		 * スキルリストの取得
		 * @param  {[type]} resultAPI){			$scope.targetSkills [description]
		 * @return {[type]}                                    [description]
		 */
		connectApiService.get(URL_CONF.urlBase + constURI.roles).then(function(resultAPI){
			$scope.targetSkills = resultAPI.data;
		});

		/**
		 * チェックしたスキルをselctionに格納する
		 * @param  {[type]} targetSkill [description]
		 * @return {[type]}             [description]
		 */
		$scope.toggleSelection = function toggleSelection(targetSkill) {
		    var idx = $scope.selection.indexOf(targetSkill.skill);
		    if (idx > -1) {
		        $scope.selection.splice(idx, 1);
		    }
		    else {
		        $scope.selection.push(targetSkill.skill);
		    }
		};

		/**
		 * 決定ボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.decision = function(){
			$modalInstance.close($scope.selection);
		};

		/**
		 * キャンセルボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.cancel = function(){
			$modalInstance.dismiss('cancel');
		};		
	}

	//moduleへ登録する
	angular.module(indexModule).controller('SetTargetSkillModalController',['$scope','$modalInstance','connectApiService','constURI','APP_CONF','URL_CONF',SetTargetSkillModalCtrl]);
})();

