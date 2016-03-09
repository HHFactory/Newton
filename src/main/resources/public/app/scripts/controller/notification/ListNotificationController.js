
/**
 * [description]
 * @return {[type]}
 */
(function(){
'use strict';

	function ListNotificationCtrl($scope,connectApiService,constURI,sharedService,$uibModal,APP_CONF){
		/** カラムタイトル */
		$scope.columnTitle = APP_CONF.columnTitleNotification;
		/** ラベル */
		$scope.labelImportant = APP_CONF.labelImportance;
		$scope.buttonLabel = APP_CONF.buttonLabelCreateNotification;
		/** ユーザ情報 */
		var userID = {userName:"user1"};

		/**
		 * 閉じるアイコン押下処理
		 * @return {Boolean} [description]
		 */
		$scope.isClose = function(){
			sharedService.isShowNotification = false;
		}

		/**
		お知らせパネル開閉フラグ監視
		 * @param  {[type]} 
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		$scope.$watch(function(){
			return sharedService.isShowCreateNotificationPanel;
		},function(){
			$scope.isShowCreatePanel = sharedService.isShowCreateNotificationPanel;
		})
		
		/**
		 * お知らせを取得する
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(APP_CONF.urlBase + constURI.notifications,userID).then(function(apiResult){
			sharedService.notificationList = apiResult.data;
			setScope();
		});

		/**
		 * scope反映処理
		 */
		var setScope = function(){
			$scope.notifications = sharedService.notificationList;
			$scope.unreadCount = filterNotification("unreadMemberList").length;
		}

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
			}else{
				return "importance--none";
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
		 * 既読フィルタ
		 * @return {[type]} [description]
		 */
		$scope.readFilter = function(){
			return $scope.notifications = filterNotification("readMemberList");
		}

		/**
		 * 未読フィルタ
		 * @return {[type]} [description]
		 */
		$scope.unreadFilter = function(){
			return $scope.notifications = filterNotification("unreadMemberList")
		}

		/**
		 * 共通フィルタリング処理
		 * @param  {[type]} targetList [description]
		 * @return {[type]}            [description]
		 */
		var filterNotification = function(targetList){
			var filteredList = [];
			for(var i=0; i<sharedService.notificationList.length; i++){
				var readMemberList = sharedService.notificationList[i][targetList];
				for(var j=0; j<readMemberList.length; j++){
					if(readMemberList[j] == userID["userName"]){
						filteredList.push(sharedService.notificationList[i]);
					}
				}
			}
			return filteredList; 
		}

	}

	//moduleへの登録
	angular.module(appName).controller('ListNotificationController',['$scope','connectApiService','constURI','sharedService','$uibModal','APP_CONF',ListNotificationCtrl]);
})();

