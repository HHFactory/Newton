/**
 * listNotification.html controller
 * @return {[type]}
 */
(function(){
'use strict';

	function ListNotificationCtrl($scope,connectApiService,constURI,sharedService,$uibModal,APP_CONF,URL_CONF){
		/** カラムタイトル */
		$scope.columnTitle = APP_CONF.columnTitleNotification;
		/** ラベル */
		$scope.labelImportant = APP_CONF.labelImportance;
		$scope.buttonLabel = APP_CONF.buttonLabelCreateNotification;
		/** ユーザ情報 */
		var apiParams = {userName:"user1",page:0};
		var sizeLimit = 10;

		/**
		 * 閉じるアイコン押下処理
		 * @return {Boolean} [description]
		 */
		$scope.isClose = function(){
			sharedService.isShowNotification = false;
		}

		/**
		 * お知らせ登録パネル開閉フラグ監視
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
		connectApiService.get(URL_CONF.urlBase + constURI.notifications,apiParams).then(function(apiResult){
			sharedService.notificationList = apiResult.data;
			setScope();
		});

		/**
		 * 次ページ読み込み処理
		 * @return {[type]} [description]
		 */
		$scope.loadMore = function(){
			if($scope.notifications && $scope.notifications.length % sizeLimit == 0){
				console.log('notification load more');
				var page = apiParams["page"];
				apiParams = {userName:"user1",page:page + 1};
				connectApiService.get(URL_CONF.urlBase + constURI.notifications,apiParams)
					.then(function(apiResult){
						sharedService.notificationList = sharedService.notificationList.concat(apiResult.data);
					}).finally(function(){
						setScope();
					});

			}
		}

		/**
		 * scope反映処理
		 */
		var setScope = function(){
			$scope.notifications = sharedService.notificationList;
			$scope.unreadCount = filterNotification("unreadMemberList").length;
			$scope.notificationsCount = $scope.notifications.length;
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
		 * フィルタリング処理
		 * @param  {[type]} targetList [description]
		 * @return {[type]}            [description]
		 */
		var filterNotification = function(targetList){
			var filteredList = [];
			for(var i=0; i<sharedService.notificationList.length; i++){
				var readMemberList = sharedService.notificationList[i][targetList];
				for(var j=0; j<readMemberList.length; j++){
					if(readMemberList[j] == apiParams["userName"]){
						filteredList.push(sharedService.notificationList[i]);
					}
				}
			}
			return filteredList; 
		}

	}

	//moduleへの登録
	angular.module(appName).controller('ListNotificationController',['$scope','connectApiService','constURI','sharedService','$uibModal','APP_CONF','URL_CONF',ListNotificationCtrl]);
})();

