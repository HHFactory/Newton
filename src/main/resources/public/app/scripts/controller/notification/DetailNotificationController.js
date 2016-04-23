/**
 * お知らせ詳細モーダル
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	//参照用モーダルコントローラ	
	function DetailNotificadtionCtrl($scope,$state,detailNotification,connectApiService,constURI,$uibModalInstance,$localStorage,APP_CONF,URL_CONF,$timeout){
		/** ラベル */
		$scope.buttonLabelEdit = APP_CONF.buttonLabelEdit;
		$scope.buttonLabelDelete = APP_CONF.buttonLabelDelete;
		/** 表示内容 */
		$scope.title= detailNotification.title;
		$scope.content = marked(detailNotification.content);
		$scope.count = detailNotification.usefulCount;
		$scope.targetId = detailNotification.id;

		/**
		 * 閉じるボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.cancel = function(){
			$uibModalInstance.dismiss();
		};

		/**
		 * 既読にするボタン押下処理
		 * @return {Boolean} [description]
		 */
		$scope.isReaded = function(){
			var userName = $localStorage.userinfo.userName;
			connectApiService.put(URL_CONF.urlBase + constURI.notification+detailNotification.id,userName).then(function(apiResult){
				if(apiResult.status == 200){
					$uibModalInstance.close();
					$state.reload();
				}else{
					$timeout(function(){
						swal("既読処理に失敗しました。");
					},1000);
				}
			});
		}

		/**
		 * 削除リンク押下処理
		 * @param  {[type]} faq [description]
		 * @return {[type]}     [description]
		 */
		$scope.delete = function(targetId) {
			sweetAlert({
				title: "このお知らせを削除しますか?",
				text: "削除した場合、データの復元はできません",
				type: "warning",
				showCancelButton: true,
				confirmButtonText: "OK",
				closeOnConfirm: false,
				showLoaderOnConfirm: true
			},
			function(){
				connectApiService.delete(URL_CONF.urlBase + constURI.notifications + targetId).then(function(resultAPI){
					if(resultAPI.status == 204){
						/** お知らせ一覧を再取得 */
						$timeout(function(){
							swal("正常に削除されました");
							$uibModalInstance.close();
							$state.reload();
						},1000);
					}else{
						$timeout(function(){
							swal("削除に失敗しました");
						},1000);
					}
				});
			});
		}
	}

	//moduleへ登録
	angular.module(indexModule).controller('DetailNotificationController',['$scope','$state','detailNotification','connectApiService','constURI','$uibModalInstance','$localStorage','APP_CONF','URL_CONF','$timeout',DetailNotificadtionCtrl]);
})();
