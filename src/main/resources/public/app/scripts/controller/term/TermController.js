/**
 * 用語集コントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function TermCtrl($scope,$state,$stateParams,$timeout,connectApiService,constURI,APP_CONF,URL_CONF){
		/** ラベル設定 */
		$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;
		$scope.buttonLabelCancel = APP_CONF.buttonLabelCancel;
		$scope.buttonLabelEdit = APP_CONF.buttonLabelEdit;
		$scope.buttonLabelDelete = APP_CONF.buttonLabelDelete;

		/**
		 * 全用語取得
		 * @param  {[type]} apiResult)
		 * @return {[type]}           
		 */
		connectApiService.get(URL_CONF.urlBase + constURI.terms).then(function(apiResult){
			$scope.termList = apiResult.data;
		});

		/**
		 * 用語の意味を表示
		 * @param  {[type]} term [description]
		 * @return {[type]}      [description]
		 */
		$scope.openContent = function(term) {
			$scope.isShowContent = true;
			$scope.targetTerm = term;
			$scope.title = term.title;
			$scope.content = term.content;
			$scope.targetTerm = term;
		}

		/**
		 * 新規登録アイコン押下
		 * @return {[type]} [description]
		 */
		$scope.openCreateArea = function(){
			$scope.isShowCreateArea = true;
			$state.go('createTerm');
		}

		/**
		 * キャンセルボタン押下
		 * @return {[type]} [description]
		 */
		$scope.closeCreateArea = function(){
			$scope.isShowCreateArea = false;
			$state.go('listTerm');
		}

		/**
		 * 登録ボタン押下処理
		 * @param  {[type]} term 
		 * @return {[type]}      
		 */
		$scope.submit = function(term) {
			$scope.loading = true;
			$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmitting;
			connectApiService.post(URL_CONF.urlBase + constURI.term,term)
							 .then(function(apiResult){
								$scope.isShowCreateArea = false;
								$state.go('listTerm');
							 }).finally(function(){
								$scope.loading = false;
								$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;
							 });
		}

		/**
		 * 編集ボタン押下処理
		 * @param  {[type]} targetTerm [description]
		 * @return {[type]}            [description]
		 */
		$scope.edit = function(targetTerm){
			$state.go('updateTerm',{'editTarget':targetTerm});
		}

		/**
		 * 削除ボタン押下処理
		 * @param  {[type]} targetTerm [description]
		 * @return {[type]}            [description]
		 */
		$scope.delete = function(targetTerm){
			sweetAlert({
				title: "この用語を削除しますか?",
				text: "削除した場合、データの復元はできません",
				type: "warning",
				showCancelButton: true,
				confirmButtonText: "OK",
				closeOnConfirm: false,
				showLoaderOnConfirm: true
			},
			function(){
				connectApiService.delete(URL_CONF.urlBase + constURI.terms + targetTerm.id).then(function(resultAPI){
					$timeout(function(){
						swal("正常に削除されました");
						$state.reload();
					},1000);
				});
			});
		}

	}

	angular.module(termApp).controller('TermController',['$scope','$state','$stateParams','$timeout','connectApiService','constURI','APP_CONF','URL_CONF',TermCtrl]);
})();