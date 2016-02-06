
/**
 * FAQ新規登録画面Controller
 * 
 */
(function(){
'use strict';

	function CreateFaqCtrl($scope,$state,$uibModal,connectApiService,constURI){
		/**
		 * marked setting
		 * @type {[type]}
		 */
		//var marked = require('marked');
		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: true,
			pedantic: true,
			sanitize: true,
			smartLists: true,
			smartypants: true
		});

		/**
		 * トークスクリプト登録モーダルを開く
		 * @return {[type]} [description]
		 */
		$scope.openTalkScriptModal = function() {
			$uibModal.open({
				animation: false,
				backdrop: true,
				templateUrl: "../../../../app/views/template/createModal.html",
				controller: "FileLoadModalController"
			});
		}

		/**
		 * 登録ボタン押下処理 
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.submit = function(faq){
			connectApiService.post(constURI.postFaq,faq).then(function(apiResult){
				console.dir(faq);
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

	}

	//モジュールへの登録
	angular.module('indexModule').controller('CreateFaqController',['$scope','$state','$uibModal','connectApiService','constURI',CreateFaqCtrl]);
})();
