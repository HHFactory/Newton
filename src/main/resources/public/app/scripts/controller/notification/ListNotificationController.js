
/**
 * [description]
 * @return {[type]}
 */
(function(){
'use strict';

	function ListNotificationCtrl($scope,connectApiService,constURI,UserService,sharedService,$uibModal,APP_CONF){
		/** カラムタイトル */
		$scope.columnTitle = APP_CONF.columnTitleNotification;
		/** ラベル */
		$scope.labelImportant = APP_CONF.labelImportance;
		$scope.buttonLabel = APP_CONF.buttonLabelCreateNotification;
		/** ユーザ情報 */
		var userID = {userName:"user1"};
		/** 開閉フラグ */
		$scope.isShowCreatePanel = sharedService.isShowCreateNotificationPanel;
		$scope.notifications = {};

		/**
		 * 閉じるアイコン押下処理
		 * @return {Boolean} [description]
		 */
		$scope.isClose = function(){
			sharedService.isShowNotification = false;
		}
		
		/**
		 * お知らせを取得する
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(constURI.notifications,userID).then(function(resultAPI){
			$scope.notifications = resultAPI.data;
			UserService.createReadUserList($scope.notifications);
		});

		/**
		 * 重要度に応じてタグの色を切り替える
		 * @param {[type]} notification 
		 */
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
				templateUrl: "app/views/notification/detailNotificationModal.html",
				controller: "DetailNotificationController",
				animation: false,
				resolve:{
					detailNotification:function(){
						return notification;
					}
				}
			});
		}

	    /**
		 * 新規登録パネルを開く
		 * @return {[type]} 
		 */
		$scope.openPanel = function() {
			sharedService.isShowCreateNotificationPanel = true;
		}

		/**
		 * お知らせパネル開閉フラグ監視
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
	angular.module('indexModule').controller('ListNotificationController',['$scope','connectApiService','constURI','UserService','sharedService','$uibModal','APP_CONF',ListNotificationCtrl]);
})();

