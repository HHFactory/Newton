/**
 * FAQ修正依頼送信モーダルController
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function GeneralModalCtrl($scope,connectApiService,constURI){
		var columnDefs = [];

		$scope.getDataFromExcel = function(workbook) {
			var headerNames = XLSX.utils.sheet_to_json(
								workbook.Sheets[workbook.SheetNames[0]],
                                { header: 1 }
                              )[0];
			headerNames.forEach(function(headerName) {
				columnDefs.push({field: headerName});
			});

			var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
			$scope.faqData = data;
		}

		$scope.gridOptions = {
			enableColumnResizing: true,
			columnDefs: columnDefs
		}
	}

	//moduleに登録
	angular.module('indexModule').controller('GeneralModalController',['$scope','connectApiService','constURI',GeneralModalCtrl]);
})();