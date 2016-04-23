/**
 * FAQ登録Controller
 * 
 */
(function(){
'use strict';

	function CreateFaqCtrl($scope,$state,$controller,connectApiService,constURI,APP_CONF,URL_CONF){
		/** ベースコントローラインスタンスの生成 */
		angular.extend(this, $controller('BaseFaqController', {$scope: $scope}));
		/** ラベル設定 */
		$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;

		/**
		 * 登録ボタン押下処理 
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.submit = function(faq){
			faq.categories = $scope.selectedList;
			$scope.loading = true;

			// ボタンラベルを変更
			$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmitting;
			connectApiService.post(URL_CONF.urlBase + constURI.faq,faq)
				.success(function(apiResult){
					$state.go('main');
				})
				.finally(function(){
					$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;
					$scope.loading = false;
				});
			console.log('faq created');
		};
	}

	//モジュールへの登録
	angular.module(indexModule).controller('CreateFaqController',['$scope','$state','$controller','connectApiService','constURI','APP_CONF','URL_CONF',CreateFaqCtrl]);
})();
