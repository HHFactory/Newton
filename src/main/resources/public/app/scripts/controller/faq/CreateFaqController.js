
/**
 * FAQ新規登録画面Controller
 * 
 */
(function(){
'use strict';

	function CreateFaqCtrl($scope,$state,$uibModal,connectApiService,constURI,Upload,$location,$http,$stateParams){
		//パラメータ取得
		if($stateParams.editTarget){
			$scope.faq = {
				title: $stateParams.editTarget["title"],
				content: $stateParams.editTarget["content"],
				id: $stateParams.editTarget["id"]
			}
			$scope.editMode = true;
		}

		/**
		 * トークスクリプト登録モーダルを開く
		 * @return {[type]} [description]
		 */
		$scope.openTalkScriptModal = function() {
			$uibModal.open({
				animation: false,
				backdrop: true,
				templateUrl: "/app/views/template/createModal.html",
				controller: "FileLoadModalController"
			});
		}

		/**
		 * 登録ボタン押下処理 
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.submit = function(faq){
			if(!faq.id){
				//登録
				connectApiService.post(constURI.postFaq,faq).then(function(apiResult){
					console.dir(faq);
					$state.go('main');
				});
			}else {
				//更新
				connectApiService.put(constURI.postFaq,faq).then(function(apiResult){
					console.dir(apiResult);
					$state.go('main');
				});
			}
		};

		/**
		 * 入力内容プレビュー処理 
		 * @return {[type]}
		 */
		$scope.parseMarkDown = function(){
			$scope.parsedMarkdown = marked($scope.faq.content);
		};

		/**
		 * markdown用のタグを現在カーソル位置に挿入
		 * @param {[type]} tag [description]
		 */
		var setMarkdownTag = function(tag){
			var caret = $scope.cursorPosition['get'];
			var text = $scope.faq.content;
			if(caret > 0) {
				var former = text.slice(0,caret);
				var latter = text.slice(caret);
				$scope.faq.content = former + tag + latter;
			} else {
				$scope.faq.content = tag;
			}
		}

		/**
		 * 画像アップロード処理
		 */
		 $scope.upload = function(file) {
		 	console.log(file);
		 	Upload.upload({
		 		url: '/upload/tmp',
		 		data: {file:file},
		 	}).then(function(resp) {
		 		//success
		 		console.log($location.path());
		 		console.log($http.get('/upload/tmp'));
		 		var fileName = resp['config']['data']['file']['name'];
		 		var filePath = resp['config']['url'];
		 		console.log(fileName);
		 		console.log(filePath);
		 		var nameTag = "![" + fileName + "]";
		 		var pathTag = "(" + filePath + "/" + fileName + ")";
		 		var imageTag = nameTag + pathTag;
		 		setMarkdownTag(imageTag);
		 	},function(resp) {
		 		//failed
		 		console.log(resp);
		 	},function(event) {
		 		//notice
		 	});
		 }

		/**
		 * add <h3>
		 */
		$scope.addHeaderTag = function() {
			setMarkdownTag("### 見出しをここに入力");
		}

		/**
		 * add <strong>
		 */
		$scope.addStrongTag = function() {
			setMarkdownTag("**" + "ここに入力" + "**");
		}

		/**
		 * add <ol>
		 */
		$scope.addOlTag = function(){
			setMarkdownTag("1. ここに入力");
		}

		/**
		 * add <hr>
		 */
		$scope.addHrTag = function() {
			setMarkdownTag("***  ");
		}

		/**
		 * add <blockquote>
		 */
		$scope.addQuoteTag = function() {
			setMarkdownTag("> ここから引用を入力");
		}

		/**
		 * EnterKey押下時に、末尾に半角スペース×2を挿入
		 */
		$scope.addNewLineTag = function(){
			setMarkdownTag("  ");
		}

	}

	//モジュールへの登録
	angular.module('indexModule').controller('CreateFaqController',['$scope','$state','$uibModal','connectApiService','constURI','Upload','$location','$http','$stateParams',CreateFaqCtrl]);
})();
