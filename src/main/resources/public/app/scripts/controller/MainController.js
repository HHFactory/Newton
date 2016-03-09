//MainController
(function(){
	'use strict';
	
	function MainCtrl($scope,sharedService,connectApiService,constURI){

		/**
		 * お知らせ開閉フラグ監視
		 * @param  {[type]} 
		 * @param  {[type]} 
		 * @return {[type]}  
		 */
		$scope.$watch(function(){
			return sharedService.isShowNotification;
		},function(){
			$scope.isShowNotification = sharedService.isShowNotification;
		});
		
		/**
		 * FAQ一括登録開閉フラグ監視
		 * @param  {[type]}
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.$watch(function(){
			return sharedService.isShowFaqImport;
		},function(){
			$scope.isShowFaqImport = sharedService.isShowFaqImport;
		});

		/**
		 * マニュアル開閉フラグ監視
		 * @param  {[type]} 
		 * @param  {[type]} 
		 * @return {[type]}  
		 */
		$scope.$watch(function(){
			return sharedService.isShowManual;
		},function(){
			$scope.isShowManual = sharedService.isShowManual;
		});


	}	

	//moduleへ登録
	angular.module(appName).controller('MainController',['$scope','sharedService','connectApiService','constURI',MainCtrl]);
})();




