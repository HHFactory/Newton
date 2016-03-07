//NavController
(function(){
	'use strict';

	function NavCtrl($scope,$state,connectApiService,constURI,sharedService,$uibModal){

		//テスト用変数
		var targetUser = {userName:"user1"};
		var status = {status:"valid"};
		
		/**
		 * 検索処理
		 */
		 $scope.search = function(query){
		 	sharedService.searchQuery = query;
		 }
		 
		 /**
		  * ホームアイコンボタン押下処理
		  * @return {[type]} [description]
		  */
		 $scope.home = function(){
		 	$state.go('main');
		 	$state.reload();
		 	$scope.query = null;
		 	sharedService.searchQuery = null;
		 };

	}

	//moduleへの登録
	angular.module('indexModule').controller('NavController',['$scope','$state','connectApiService','constURI','sharedService','$uibModal',NavCtrl]);
})();
