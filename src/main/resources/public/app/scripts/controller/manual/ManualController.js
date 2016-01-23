
//Manual Controller
(function(){
'use strict';
	
	function ManualCtrl($scope,connectApiService,constURI){
		$scope.categoryCollapsed=false;
		$scope.listCollapsed = false;
		
		/**
		 * マニュアルを取得する
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(constURI.getManual).then(function(resultAPI){
			$scope.categories = resultAPI.data;
		});	
	}

	//moduleへの登録
	angular.module('indexModule').controller('ManualController',['$scope','connectApiService','constURI',ManualCtrl]);
})();
