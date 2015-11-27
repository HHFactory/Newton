
//NotificationController
(function(){
'use strict';

	function NotificationCtrl($scope,$http,$state,connectApiService,constURI,modalService,UserService){
		var userID = {userName:"user1"};
		/**
		 * お知らせを取得する
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(constURI.getNotification,userID).then(function(resultAPI){
			$scope.notifications = resultAPI.data;
			UserService.createReadUserList($scope.notifications);
		});

		/**
		 * 参照用モーダルを開く
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.open = function(notification){
			modalService.openModal(notification);

		};

		/**
		 * 新規登録用モーダルを開く 
		 * @return {[type]}
		 */
	    $scope.create = function(){
	    	$state.go('createNotification');
	    };
	}

	//moduleへの登録
	angular.module('indexModule').controller('NotificationController',NotificationCtrl);
})();

