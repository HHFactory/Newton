/**
 * FAQ更新用コントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function UpdateFaqCtrl($scope,$state,$stateParams,$controller,connectApiService,constURI,APP_CONF){
		/** ベースコントローラインスタンスを生成 */
		angular.extend(this, $controller('BaseFaqController', {$scope: $scope}));
		/** ラベル設定 */
		$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdate;

		//更新用パラメータ取得
		if($stateParams.editTarget){
			$scope.faq = {
				title: $stateParams.editTarget["title"],
				content: $stateParams.editTarget["content"],
				id: $stateParams.editTarget["id"],
				categories: $stateParams.editTarget["categories"]
			}
			$scope.selectedList.push.apply($scope.selectedList,$scope.faq.categories);
			$scope.categoryList = $scope.selectedList;
			$scope.parsedMarkdown = marked($scope.faq.content);
		}

		/**
		 * 更新ボタン押下処理 
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.submit = function(faq){
			faq.categories = $scope.selectedList;
			$scope.loading = true;

			// ボタンラベルを変更
			$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdating;
			var targetId = $scope.faq.id;
			connectApiService.put(APP_CONF.urlBase + constURI.faq+targetId,faq).then(function(apiResult){
				$state.go('main');
			}).finally(function(){
				$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdate;
				$scope.loading = false;
			});
			console.log('faq updated');
		};

	}


	angular.module(appName).controller('UpdateFaqController', ['$scope','$state','$stateParams','$controller','connectApiService','constURI','APP_CONF',UpdateFaqCtrl]);
})();