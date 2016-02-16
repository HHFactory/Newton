
/**
 * [description]
 * @return {[type]}
 */
(function(){
'use strict';

	function ListNotificationCtrl($scope,connectApiService,constURI,UserService,sharedService,$uibModal){
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
		 * @param {[type]} notification
		 */
		$scope.setHeadColor = function(notification) {
			if(notification.importance == 3) {
				return "table--colored-gray";
			}else if(notification.importance == 2) {
				return "table--colored-blue";
			}else if(notification.importance == 1) {
				return "table--colored-red";
			}
		}

		$scope.setTagColor = function(notification) {
			if(notification.importance == 1) {
				return "importance--low";
			}else if(notification.importance == 2) {
				return "importance--middle";
			}else if(notification.importance == 3) {
				return "importance--high";
			}
		}

		/**
		 * 参照用モーダルを開く
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.open = function(notification){
			$uibModal.open({
				templateUrl: "/app/views/template/modal.html",
				controller:"ModalController",
				animation: false,
				resolve:{
					data:function(){
						return notification;
					}
				}
			});
		}

	    /**
		 * 新規登録パネルを開く
		 * @return {[type]} 
		 */
		$scope.isShowCreatePanel = sharedService.isShowCreateNotificationPanel;
		$scope.openPanel = function() {
			sharedService.isShowCreateNotificationPanel = true;
		}

		/**
		 * sharedService監視
		 * @param  {[type]}  
		 * @param  {[type]} 
		 * @return {[type]}    
		 */
		$scope.$watch(function() {
			return sharedService.isShowCreateNotificationPanel;
		}, function() {
			$scope.isShowCreatePanel = sharedService.isShowCreateNotificationPanel;
		});

	}

	//moduleへの登録
	angular.module('indexModule').controller('ListNotificationController',['$scope','connectApiService','constURI','UserService','sharedService','$uibModal',ListNotificationCtrl]);
})();

