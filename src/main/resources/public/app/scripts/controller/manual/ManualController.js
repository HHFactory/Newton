
/**
 * manualbar.controller
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function ManualCtrl($scope,connectApiService,constURI){

		/**
		 * マニュアルリストを取得し、
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(constURI.getManualList).then(function(resultAPI){
			var highestCategories = resultAPI.data;
			
		});


	}

	//moduleへの登録
	angular.module('indexModule').controller('ManualController',['$scope','connectApiService','constURI',ManualCtrl]);
})();
