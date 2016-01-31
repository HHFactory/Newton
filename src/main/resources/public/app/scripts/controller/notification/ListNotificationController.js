
//NotificationController
(function(){
'use strict';

	function ListNotificationCtrl($scope,$state,connectApiService,constURI,modalService,UserService,sharedService,$uibModal){
		var userID = {userName:"user1"};
		/**
		 * お知らせを取得する
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(constURI.getNotificationList,userID).then(function(resultAPI){
			$scope.notifications = resultAPI.data;
			UserService.createReadUserList($scope.notifications);
		});

		/**
		 * 重要度に応じたヘッダー背景色の切り替え
		 * @param {[type]} notification [description]
		 */
		$scope.setHeadColor = function(notification) {
			if(notification.importance == 1) {
				return "table--colored-gray";
			}else if(notification.importance == 2) {
				return "table--colored-blue";
			}else if(notification.importance == 3) {
				return "table--colored-red";
			}
		}

		/**
		 * 参照用モーダルを開く
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.open = function(notification){
			//modalService.openModal(notification);
			$uibModal.open({
				templateUrl: "../../../../app/views/template/modal.html",
				controller:"ModalController",
				animation: false,
				backdrop: true,
				resolve:{
					data:function(){
						return notification;
					}
				}			
			});
		}

	    /**
		 * 新規登録パネルを開く
		 * @return {[type]} [description]
		 */
		$scope.isShowCreatePanel = sharedService.isShowCreateNotificationPanel;

		$scope.openPanel = function() {
			sharedService.isShowCreateNotificationPanel = true;
		}

		/**
		 * sharedService監視
		 * @param  {[type]} )          {			return                   sharedService.isShowCreateNotificationPanel;		} [description]
		 * @param  {[type]} function() {			$scope.isShowCreatePanel [description]
		 * @return {[type]}            [description]
		 */
		$scope.$watch(function() {
			return sharedService.isShowCreateNotificationPanel;
		}, function() {
			$scope.isShowCreatePanel = sharedService.isShowCreateNotificationPanel;
			console.log($scope.isShowCreatePanel);
		});	

	}

	//moduleへの登録
	angular.module('indexModule').controller('ListNotificationController',['$scope','$state','connectApiService','constURI','modalService','UserService','sharedService','$uibModal',ListNotificationCtrl]);
})();

