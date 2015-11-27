'use strict';

//makedjsのオプション設定
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

//FAQ登録コントローラ
angular.module('indexModule')
	.controller('CreateArticleController',function($scope,$http,$sce,$state){
		
		//markdownをparseしてpreviewに表示する
		$scope.parseMarkDown = function(){
			$scope.parsedMarkdown = marked($scope.faq.content);	
		};

		//入力内容を登録する
		$scope.submit = function(faq){
			console.log(faq);
			console.log($scope.parsedMarkdown);
			var $postUri = "http://localhost:8080/api/v1/faq"
			$http({
				method:'POST',
				url:$postUri,
				data:faq
			}).success(function(data,status,headers,config){
				console.log('post success');
				$state.go('main');
			}).error(function(data,status,headers,config){
				console.log(status);
				$state.go('main');
			});	
		};

		//キャンセルボタン押下処理
		$scope.cancel = function(){
			$state.go('main');
		};


	});



