
//NavController
(function(){
	'use strict';
	
	function NavCtrl($scope,$state){
		$scope.showList = true;
		$scope.showHome = false;
		/**
		 * 検索結果画面に遷移する 
		 */
		 $scope.search = function(query){
		 	$scope.showList = false;
		 	$scope.showHome = true;
		 	$state.go('searchResult',{searchWord:query});		 	
		 }

		 //メイン画面に戻る
		 $scope.home = function(){
		 	$scope.showList = true;
		 	$scope.showHome = false;
		 	$state.go('main');
		 };

	}

	//moduleへの登録
	angular.module('indexModule').controller('NavController',NavCtrl);
})();
