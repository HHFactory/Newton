
//Manual Controller
(function(){
'use strict';
	
	function ManualCtrl($scope,$http,connectApiService,constURI){
		$scope.categoryCollapsed=false;
		$scope.listCollapsed = false;
		
		/**
		 * マニュアルを取得するapiを叩く
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(constURI.getManual).then(function(resultAPI){
			$scope.categories = resultAPI.data;
		});	
	}

	//moduleへの登録
	angular.module('indexModule').controller('ManualController',ManualCtrl);
})();
