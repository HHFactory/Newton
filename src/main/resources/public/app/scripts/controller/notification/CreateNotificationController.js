(function(){
'use strict';

	function CreateNotificationCtrl($scope,$state,connectApiService,constURI){
		//スキルリストの取得
		connectApiService.get(constURI.getSkill).then(function(resultAPI){
			$scope.targetSkills = resultAPI.data;
		});

		//チェックしたスキルを配列に格納する
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

		//入力内容を登録する
		$scope.submit = function(notification){
			notification.targetUserList = $scope.selection;
			connectApiService.post(constURI.putNotification,notification).then(function(resultAPI){
				console.log(resultAPI.status);
				$state.go('main');
			});
		};

		//キャンセルボタン押下処理
		$scope.cancel = function(){
			$state.go('main');
		};				
	}

	//moduleへ登録
	angular.module('indexModule').controller('CreateNotificationController',CreateNotificationCtrl);
})();


// 'use strict';

// //お知らせ登録用コントローラ
// angular.module('indexModule')
// 	.controller('CreateNotificationController',function($scope,$http,$state,$uibModal){
// 		var target_role = [];
// 		var importance;
// 		//markdownをparseしてpreviewに表示する
// 		$scope.parseMarkDown = function(){
// 			$scope.parsedMarkdown = marked($scope.notification.content);	
// 		};

// 		// //対象スキルリストを取得する
// 		// var $roleUri = "http://localhost:8080/api/v1/roles"
// 		// $http.get($roleUri)
// 		// 	.success(function(data,status,headers,config){
// 		// 		$scope.targetSkills = data;
// 		// 	}).error(function(data,status,headers,config){
// 		// 		console.log(status);
// 		// 		console.log(headers);
// 		// 	});

// 		//対象スキルセットモーダルを開く
// 		$scope.openSkillSetModal = function(){
// 			var modalInstance = $uibModal.open({
// 				templateUrl:"/app/views/setTargetSkillModal.html",
// 				controller:"SetTargetSkillModalController",
// 				resolve:{
// 					targetSkill:function(){
// 						return target_role;						
// 					}
// 				}
// 			});
// 			modalInstance.result.then(function(selection){
// 				console.log('モーダルで選択したスキル:'+selection);
// 				target_role = selection;
// //				console.log('target_role'+target_role);
// 			});
// 		};

// 		//入力内容を登録する
// 		$scope.submit = function(notification){
// 			notification.targetUserList = target_role;
// 			console.log(notification);
// 			var $postUri = "http://localhost:8080/api/v1/notification"
// 			$http({
// 				method:'POST',
// 				url:$postUri,
// 				data:notification
// 			}).success(function(data,status,headers,config){
// 				console.log('post success');
// 				$state.go('main');
// 			}).error(function(data,status,headers,config){
// 				console.log(status);
// 				console.log(data);
// 				$state.go('main');
// 			});	
// 		};

// 		//キャンセルボタン押下処理
// 		$scope.cancel = function(){
// 			$state.go('main');
// 		};

// 	});