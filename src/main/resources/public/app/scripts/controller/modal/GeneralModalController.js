/**
 * FAQ修正依頼送信モーダルController
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function GeneralModalCtrl($scope,connectApiService,constURI){
		var columnDefs = [];

		/**
		 * 選択したエクセルからデータを取得
		 * @param  {[type]} workbook [description]
		 * @return {[type]}          [description]
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

	}

	//moduleに登録
	angular.module('indexModule').controller('GeneralModalController',['$scope','connectApiService','constURI',GeneralModalCtrl]);
})();