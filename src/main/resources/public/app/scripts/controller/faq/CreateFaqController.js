/**
 * FAQ登録Controller
 * 
 */
(function(){
'use strict';

	function CreateFaqCtrl($scope,$state,$controller,connectApiService,constURI,APP_CONF){
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
			connectApiService.post(APP_CONF.urlBase + constURI.faq,faq).then(function(apiResult){
				if(apiResult.status == 201){
					swal({
						title: "登録完了",
						type: "success",
						timer: 1000,
						showConfirmButton: false
					},function(){
						swal.close();
						$state.go('main');
					});
				}else{
					swal({
						title: "登録失敗",
						type: "error",
						timer: 2000,
						showConfirmButton: false
					});
				}
			}).finally(function(){
				$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;
				$scope.loading = false;
			});
			console.log('faq created');
		};
	}

	//モジュールへの登録
	angular.module(appName).controller('CreateFaqController',['$scope','$state','$controller','connectApiService','constURI','Upload','$stateParams','APP_CONF',CreateFaqCtrl]);
})();
