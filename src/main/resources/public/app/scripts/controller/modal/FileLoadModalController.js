/**
 * FAQ修正依頼送信モーダルController
 * @return {[type]} 
 */
(function(){
'use strict';

	function FileLoadModalCtrl($scope,$state,$uibModalInstance,connectApiService,constURI){
		var columnDefs = [];
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
			$scope.faqData = data;
		}

		/**
		 * エクセルから取得したjsonをPOST用フォーマットに整形
		 * @param  {[type]} faqData 
		 * @return {[type]}         
		 */
		var formatPostParam = function(faqData) {
			var postParm = [];
			for(var i = 0; i < faqData.length; i = (i+1)){
				var faq = {};
				faq["title"] = faqData[i]["FAQタイトル"];
				faq["content"] = faqData[i]["回答内容"];
				faq["createUser"] = "user1";
				faq["updateUser"] = "user1";
				faq["usefulCount"] = "0";
				faq["status"] = "valid";
				postParm.push(faq);
				if(faq["title"] === void 0 || faq["content"] === void 0) {
					alert((i+1) + "行目に未入力箇所があります");
					validFlag = false;
				}
			}
			console.dir(postParm);
			return postParm;
		}

		/**
		 * 登録ボタン押下処理
		 * @param  {[type]} faqData 
		 * @return {[type]}         
		 */
		$scope.submit = function(faqData) {
			var postParm = formatPostParam(faqData);
			if(validFlag === true){
				connectApiService.post(constURI.faqs,postParm).then(function(apiResult){
					$uibModalInstance.close(postParm);
				});
			}
		}

	}

	//moduleに登録
	angular.module('indexModule').controller('FileLoadModalController',['$scope','$state','$uibModalInstance','connectApiService','constURI',FileLoadModalCtrl]);
})();