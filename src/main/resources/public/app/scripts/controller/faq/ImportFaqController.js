/**
 * FAQ一括登録用コントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function ImportFaqCtrl($scope,$state,connectApiService,constURI,$timeout,sharedService,APP_CONF,URL_CONF){
		/** カラムタイトル */
		$scope.columnTitle = APP_CONF.columnTitleImportFaq;
		/** ラベル */
		$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;
		$scope.buttonLabelClear = APP_CONF.buttonLabelClear;
		$scope.fileUrl = URL_CONF.importFaqTemplateFilePath;

		/**  */
		var columnDefs = [];
		/**  */
		var validFlag = true;
		
		/**
		 * 選択したエクセルからデータを取得
		 * @param  {[type]} workbook 
		 * @return {[type]}          
		 */
		$scope.getDataFromExcel = function(workbook) {
			//ヘッダ取得
			var headerNames = XLSX.utils.sheet_to_json(
								workbook.Sheets[workbook.SheetNames[0]],
                                { header: 1 })[0];
			headerNames.forEach(function(headerName) {
				columnDefs.push({field: headerName});
			});

			//データ取得
			var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
			//scopeをリロード
			$timeout(function(){
				$scope.faqData = data;
			});
		}

		/**
		 * エクセルから取得したjsonをPOST用フォーマットに整形
		 * @param  {[type]} faqData 
		 * @return {[type]}   
		 *      
		 */
		var formatPostParam = function(faqData) {
			var postParm = [];
			for(var i = 0; i < faqData.length; i = (i+1)){
				var faq = {};
				faq["title"] = faqData[i]["FAQタイトル"];
				faq["content"] = faqData[i]["回答内容"];
				faq["categories"] = createCategoryList(faqData[i]["タグ"]);
				faq["createUser"] = "user1";
				faq["updateUser"] = "user1";
				faq["usefulCount"] = "0";
				faq["status"] = "valid";
				postParm.push(faq);
				/** タイトルと回答内容に空項目があるかチェック */
				if(faq["title"] === void 0 || faq["content"] === void 0) {
					alert((i+1) + "行目に未入力箇所があります");
					validFlag = false;
				}
			}
			return postParm;
		}

		/**
		 * FAQカテゴリを作成
		 * @return {[type]} 
		 */
		var createCategoryList = function(categoryStr){
			if(categoryStr){
				var categoryList = [];
				var categoryName = categoryStr.split(",");
				for(var i =0; i<categoryName.length; i++){
					var category = {};
					category["id"] = "";
					category["name"] = categoryName[i];
					category["status"] = "valid";
					categoryList.push(category);
				}
			}
			return categoryList;
		}


		/**
		 * 登録ボタン押下処理
		 * @param  {[type]} faqData 
		 * @return {[type]}         
		 */
		$scope.submit = function(faqData) {
			var postParm = formatPostParam(faqData);
			if(validFlag === true){
				$scope.loading = true;
				$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmitting;
				connectApiService.post(URL_CONF.urlBase + constURI.faqs,postParm).then(function(apiResult){
					if(apiResult.status == 201){
						swal({
							title: "登録完了",
							type: "success",
							timer: 1000,
							showConfirmButton: false
						},function(){
							swal.close();
							$state.reload();
							sharedService.isShowFaqImport = false;
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
			}
		}

		/**
		 * 閉じるアイコン押下処理
		 * @return {Boolean} [description]
		 */
		$scope.isClose = function(){
			sharedService.isShowFaqImport = false;
		}

	}

	angular.module(appName).controller('ImportFaqController',['$scope','$state','connectApiService','constURI','$timeout','sharedService','APP_CONF','URL_CONF',ImportFaqCtrl]);
})();