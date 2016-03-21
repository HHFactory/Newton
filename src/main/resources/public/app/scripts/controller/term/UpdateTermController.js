/**
 * 用語集アップデートコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function UpdateTermCtrl($scope,$state,$stateParams,connectApiService,constURI,APP_CONF,URL_CONF){
		/** ラベル設定 */
		$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdate;
		$scope.buttonLabelCancel = APP_CONF.buttonLabelCancel;

		/**
		 * 更新パラメータ取得
		 * @param  {[type]} $stateParams.editTarget [description]
		 * @return {[type]}                         [description]
		 */
		if($stateParams.editTarget){
			$scope.term = {
				title: $stateParams.editTarget["title"],
				content: $stateParams.editTarget["content"],
				id: $stateParams.editTarget["id"],
				status : $stateParams.editTarget["status"]
			}
		}

		/**
		 * 更新ボタン押下処理
		 * @param  {[type]} term [description]
		 * @return {[type]}      [description]
		 */
		$scope.submit = function(term){
			$scope.loading= true;
			$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdating;
			connectApiService.put(URL_CONF.urlBase + constURI.terms+term.id,term).then(function(){
				$state.go('listTerm');
			}).finally(function(){
				$scope.loading = false;
				$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdate;
			});
		}

		/**
		 * キャンセルボタン押下
		 * @return {[type]} [description]
		 */
		$scope.closeCreateArea = function(){
			$scope.isShowCreateArea = false;
			$state.go('listTerm');
		}

	}

	angular.module(termApp).controller('UpdateTermController',['$scope','$state','$stateParams','connectApiService','constURI','APP_CONF','URL_CONF',UpdateTermCtrl]);
})();