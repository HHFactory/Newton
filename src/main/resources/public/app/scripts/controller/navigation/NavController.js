//NavController
(function(){
	'use strict';

	function NavCtrl($scope,$state,sharedService){

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
		 	$scope.query = null;
		 	sharedService.searchQuery = null;
		 	// $state.reload();
		 };

	}

	//moduleへの登録
	angular.module(appName).controller('NavController',['$scope','$state','sharedService', NavCtrl]);
})();
