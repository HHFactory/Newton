//NavController
(function(){
	'use strict';

	function NavCtrl($scope,$state,connectApiService,constURI,sharedService,$uibModal){
		$scope.showList = true;

		//テスト用変数
		var targetUser = {userName:"user1"};
		var status = {status:"valid"};
		
		/**
		 * 未完了ToDo一覧取得処理
		 * @param  {[type]} apiResult){			$scope.ToDoList [description]
		 * @return {[type]}                                [description]
		 */
		connectApiService.get(constURI.getToDoList,status).then(function(apiResult){
			$scope.ToDoList = apiResult.data;
		});

		/**
		 * 検索処理
		 */
		 $scope.search = function(query){
		 	$scope.showList = false;
		 	$scope.showHome = true;
		 	$state.go('searchResult',{searchWord:query});		 	
		 }

		/**
		 * リスト開閉ボタン押下処理
		 */
		$scope.showManualArea = function(){
			if(sharedService.isShowManual == false){
				sharedService.isShowManual = true;
			}else {
				sharedService.isShowManual = false;
			}
		};
		 
		 /**
		  * ホームアイコンボタン押下処理
		  * @return {[type]} [description]
		  */
		 $scope.home = function(){
		 	$scope.showList = true;
		 	$scope.showHome = false;
		 	$state.go('main');
		 };

		 /**
		  * 辞書アイコン押下処理
		  * @return {[type]} [description]
		  */
		$scope.openDictionary = function() {
			$uibModal.open({
				templateUrl: "../../../../app/views/template/dictionaryModal.html",
				controller: "DictionaryModalController",
				animation: false,
			});
		}

	}

	//moduleへの登録
	angular.module('indexModule').controller('NavController',['$scope','$state','connectApiService','constURI','sharedService','$uibModal',NavCtrl]);
})();
