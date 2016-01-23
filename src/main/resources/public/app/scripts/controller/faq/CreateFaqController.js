
/**
 * FAQ新規登録画面Controller
 * 
 */
(function(){
'use strict';

	function CreateFaqCtrl($scope,$state,connectApiService,constURI){

		/**
		 * 登録ボタン押下処理 
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.submit = function(faq){
			connectApiService.post(constURI.postFaq,faq).then(function(apiResult){
				$state.go('main');
			});			
		};

		/**
		 * 入力内容プレビュー処理 
		 * @return {[type]}
		 */
		$scope.parseMarkDown = function(){
			$scope.parsedMarkdown = marked($scope.faq.content);
		};

		/**
		 * キャンセルボタン押下処理 
		 * @return {[type]}
		 */
		$scope.cancel = function(){
			$state.go('main');
		};

	}

	//モジュールへの登録
	angular.module('indexModule').controller('CreateFaqController',['$scope','$state','connectApiService','constURI',CreateFaqCtrl]);
})();
