
/**
 * FAQ登録/更新Controller
 * 
 */
(function(){
'use strict';

	function CreateFaqCtrl($scope,$state,connectApiService,constURI,Upload,$stateParams,APP_CONF){
		/** ラベル */
		$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;
		$scope.buttonLabelUpdate = APP_CONF.buttonLabelUpdate;
		$scope.columnLabelPreview = APP_CONF.columnLabelPreview;
		$scope.iconLabelTag = APP_CONF.iconLabelTag;

		/** 選択済みカテゴリリスト　*/
		$scope.selectedList = [];

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
			//更新ボタンを表示
			$scope.editMode = true;
		}

		/**
		 * FAQカテゴリの取得
		 * @param  {[type]} apiResult
		 * @return {[type]}           
		 */
		connectApiService.get(APP_CONF.urlBase + constURI.faqCategory).then(function(apiResult){
			$scope.categoryList = apiResult.data;
		});

		/**
		 * 登録ボタン押下処理 
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.submit = function(faq){
			faq.categories = $scope.selectedList;
			$scope.loading = true;
			// 登録処理
			if(!faq.id){
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
					$scope.loading = false;
				});
			}
			// 更新処理
			else {
				var targetId = $scope.faq.id;
				connectApiService.put(APP_CONF.urlBase + constURI.faq+targetId,faq).then(function(apiResult){
					$state.go('main');
				});
			}
		};

		/**
		 * 入力内容プレビュー(marked.js)
		 * @return {[type]} [description]
		 */
		$scope.onChange = function(){
			if($scope.faq.content != null){
				$scope.parsedMarkdown = marked($scope.faq.content);
			}else{
				$scope.parsedMarkdown = "";
			}
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
		 		//failed
		 	});
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

		$scope.addTableTag = function() {
			setMarkdownTag("|aa|bb|cc|");
			setMarkdownTag("|:-|:-|:-|");
			setMarkdownTag("|aa|bb|cc|");
		}

		/**
		 * EnterKey押下時に、末尾に半角スペース×2を挿入
		 */
		// $scope.$on('clickedEnter',function(event){
		// 	event.stopPropagation();
		// 	setMarkdownTag("  ");
		// });
	}

	//モジュールへの登録
	angular.module(appName).controller('CreateFaqController',['$scope','$state','connectApiService','constURI','Upload','$stateParams','APP_CONF',CreateFaqCtrl]);
})();
