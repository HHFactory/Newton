
//お知らせ対象スキル選択モーダル用コントローラ
(function(){
'use strict';

	function SetTargetSkillModalCtrl($scope,$modalInstance,$http,targetSkill,connectApiService,constURI){
		$scope.selection = [];
		if(targetSkill.length > 0){
			$scope.selection.push(targetSkill.skill);
		};	

		//スキルリストの取得
		connectApiService.get(constURI.getSkill).then(function(resultAPI){
			$scope.targetSkills = resultAPI.data;
		});

		//チェックしたスキルをselctionに格納する
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

		//決定ボタン押下処理
		$scope.decision = function(){
			$modalInstance.close($scope.selection);
		};

		//キャンセルボタン押下処理
		$scope.cancel = function(){
			$modalInstance.dismiss('cancel');
		};		
	}

	//moduleへ登録する
	angular.module('indexModule').controller('SetTargetSkillModalController',SetTargetSkillModalCtrl);
})();

