/**
 * FAQ登録/更新ベースコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function BaseFaqCtrl($scope,$state,connectApiService,constURI,Upload,APP_CONF){
		/** ラベル設定 */
		$scope.columnLabelPreview = APP_CONF.columnLabelPreview;
		$scope.iconLabelTag = APP_CONF.iconLabelTag;
		/** 選択済みタグリスト */
		$scope.selectedList = [];

		/**
		タグ選択状態を監視
		 * @param  {[type]} )
		 * @return {[type]}  
		 */
		$scope.$watch('selectedList.length',function(){
			// タグを選択した場合
			if($scope.selectedList.length > 0){
				$scope.isSelected = true;
			}
			// 未選択の場合
			else{
				$scope.isSelected = false;
			}
		});

		/**
		 * FAQカテゴリの取得
		 * @param  {[type]} apiResult
		 * @return {[type]}           
		 */
		connectApiService.get(APP_CONF.urlBase + constURI.faqCategory).then(function(apiResult){
			$scope.categoryList = apiResult.data;
		});

		/**
		 * 画像アップロード処理
		 */
		$scope.upload = function(file) {
			var fileName = file.name;
			var basePath = APP_CONF.imageFolderPath;
			Upload.upload({
				url: APP_CONF.urlBase + '/upload/image',
				data: {image:file}
			}).then(function(resp) {
				var fullFileName = resp['data'];
				var nameTag = "![" + fileName + "]";
				var pathTag = "(" + basePath + fullFileName + ")";
				var imageTag = nameTag + pathTag;
				setMarkdownTag(imageTag);
			},function(resp) {
				console.log("image upload failed");
			});
		}

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
		 * add <h3>
		 */
		$scope.addHeaderTag = function() {
			setMarkdownTag("### 見出し");
		}

		/**
		 * add <strong>
		 */
		$scope.addStrongTag = function() {
			setMarkdownTag("**" + "強調" + "** ");
		}

		/**
		 * add <ol>
		 */
		$scope.addOlTag = function(){
			setMarkdownTag("1. リスト");
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
			setMarkdownTag("> 引用");
		}

		/**
		 * add <table>
		 */
		$scope.addTableTag = function() {
			setMarkdownTag("|aa|bb|cc|");
			setMarkdownTag("|:-|:-|:-|");
			setMarkdownTag("|aa|bb|cc|");
		}

	}

	angular.module(appName).controller('BaseFaqController',['$scope','$state','connectApiService','constURI','Upload','APP_CONF',BaseFaqCtrl]);
})();