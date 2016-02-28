/**
 * お知らせ詳細モーダル
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	//参照用モーダルコントローラ	
	function DetailNotificadtionCtrl($scope,detailNotification,connectApiService,constURI,$showdown,$uibModalInstance){
		console.log(detailNotification);
		$scope.title= detailNotification.title;
		$scope.content = $showdown.makeHtml(detailNotification.content);
		$scope.count = detailNotification.usefulCount;

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
			var userName = {userName: "user1"};
			connectApiService.put(constURI.notification+detailNotification.id,userName).then(function(apiResult){
				if(apiResult.status == 200){
					$uibModalInstance.close();
				}else{
					$timeout(function(){
						swal("既読処理に失敗しました。");
					},1000);
				}
			});
		}
	}

	//moduleへ登録
	angular.module('indexModule').controller('DetailNotificationController',['$scope','detailNotification','connectApiService','constURI','$showdown','$uibModalInstance',DetailNotificadtionCtrl]);
})();
