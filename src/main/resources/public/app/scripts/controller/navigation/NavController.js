/**
 * navbar.html用Controller
 * @return {[type]} 
 */
(function(){
	'use strict';

	function NavCtrl($scope,$state,sharedService){
		/**
		 * 検索処理
		 */
		$scope.search = function(query){
			sharedService.searchQuery = query;
			$state.go('main');
		}
		 
		/**
		 * ホームアイコンボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.home = function(){
			$state.go('main');
			// 検索ワードを空にする
			$scope.query = null;
			sharedService.searchQuery = null;
		};
	}

	//moduleへの登録
	angular.module(appName).controller('NavController',['$scope','$state','sharedService', NavCtrl]);
})();
