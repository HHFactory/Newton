
/**
 * FAQ新規登録画面Controller
 * 
 */
(function(){
'use strict';

	function CreateFaqCtrl($scope,$state,$uibModal,connectApiService,constURI){

		/**
		 * トークスクリプト登録モーダルを開く
		 * @return {[type]} [description]
		 */
		$scope.openTalkScriptModal = function() {
			$uibModal.open({
				animation: false,
				backdrop: true,
				templateUrl: "../../../../app/views/template/createModal.html",
				controller: "GeneralModalController"
			});
		}

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

	}

	//モジュールへの登録
	angular.module('indexModule').controller('CreateFaqController',['$scope','$state','$uibModal','connectApiService','constURI',CreateFaqCtrl]);
})();
