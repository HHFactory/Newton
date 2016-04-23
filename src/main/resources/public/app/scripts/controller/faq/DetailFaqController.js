/**
 * FAQ詳細Controller
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function DetailFaqCtrl($scope,$state,connectApiService,constURI,$timeout,APP_CONF,URL_CONF){
		/** ラベル */
		$scope.buttonLabelEdit = APP_CONF.buttonLabelEdit;
		$scope.buttonLabelDelete = APP_CONF.buttonLabelDelete;
		$scope.buttonLabelModifyReq = APP_CONF.buttonLabelModifyReq;
		$scope.buttonLabelUseful = APP_CONF.buttonLabelUseful;

		/**
		 * 編集リンク押下処理
		 * @param  {[type]} faq 
		 * @return {[type]}     
		 */
		$scope.edit = function(faq) {
			$state.go('updateFaq',{editTarget:faq});
		}

		/**
		 * 削除リンク押下処理
		 * @param  {[type]} faq 
		 * @return {[type]}     
		 * 
		 */
		$scope.delete = function(faq) {
			sweetAlert({
				title: "このFAQを削除しますか?",
				text: "削除した場合、データの復元はできません",
				type: "warning",
				showCancelButton: true,
				confirmButtonText: "OK",
				closeOnConfirm: false,
				showLoaderOnConfirm: true
			},
			function(){
				var targetId = faq.id;
				connectApiService.delete(URL_CONF.urlBase + constURI.faq + targetId).then(function(resultAPI){
					$timeout(function(){
						swal("正常に削除されました");
						$state.reload();
					},1000);
				});
			});
		}

		/**
		 * 役に立ったボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.useful = function(faq){
			connectApiService.put(URL_CONF.urlBase + constURI.faqs+faq.id).then(function(apiResult){
				$scope.usefulCount = apiResult.data;
			});
		};

	}

	angular.module(indexModule).controller('DetailFaqController',['$scope','$state','connectApiService','constURI','$timeout','APP_CONF','URL_CONF',DetailFaqCtrl]);
})();