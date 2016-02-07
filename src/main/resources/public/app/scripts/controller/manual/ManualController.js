
/**
 * manualbar.controller
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function ManualCtrl($scope,$uibModal,connectApiService,constURI){

		/**
		 * マニュアルリストを取得
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(constURI.getManualList).then(function(resultAPI){
			//var highestCategories = resultAPI.data;
			console.dir(resultAPI.data);
			$scope.categories = resultAPI.data;
		});

		/**
		 * 
		 * @return {[type]} [description]
		 */
		$scope.openFileUploadModal = function() {
			$uibModal.open({
				templateUrl: "../../../../app/views/template/fileUploadModal.html",
				controller: "FileUploadModalController",
				animation: false
			});
		}


	}

	//moduleへの登録
	angular.module('indexModule').controller('ManualController',['$scope','$uibModal','connectApiService','constURI',ManualCtrl]);
})();
