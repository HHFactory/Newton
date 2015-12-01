
(function(){
'use strict';
	
	function CreateFAQCtrl($scope,$state,connectApiService,constURI){

		/**
		 * 登録ボタン押下処理 
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.submit = function(faq){
			connectApiService.post(constURI.postFAQ,faq).then(function(apiResult){
				$state.go('main');
			});			
		};

		/**
		 * 入力内容プレビュー処理 
		 * @return {[type]}
		 */
		$scope.parseMarkdown = function(){
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
	angular.module('indexModule').controller('CreateFAQController',CreateFAQCtrl);
})();

		// //makedjsのオプション設定
		// marked.setOptions({
		//   renderer: new marked.Renderer(),
		//   gfm: true,
		//   tables: true,
		//   breaks: false,
		//   pedantic: false,
		//   sanitize: true,
		//   smartLists: true,
		//   smartypants: false
		// });

// //FAQ登録コントローラ
// angular.module('indexModule')
// 	.controller('CreateArticleController',function($scope,$http,$sce,$state){
		
// 		//markdownをparseしてpreviewに表示する
// 		$scope.parseMarkDown = function(){
// 			$scope.parsedMarkdown = marked($scope.faq.content);	
// 		};

// 		//入力内容を登録する
// 		$scope.submit = function(faq){
// 			console.log(faq);
// 			console.log($scope.parsedMarkdown);
// 			var $postUri = "http://localhost:8080/api/v1/faq"
// 			$http({
// 				method:'POST',
// 				url:$postUri,
// 				data:faq
// 			}).success(function(data,status,headers,config){
// 				console.log('post success');
// 				$state.go('main');
// 			}).error(function(data,status,headers,config){
// 				console.log(status);
// 				$state.go('main');
// 			});	
// 		};

// 		//キャンセルボタン押下処理
// 		$scope.cancel = function(){
// 			$state.go('main');
// 		};


// 	});



