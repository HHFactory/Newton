//MainController
(function(){
	'use strict';
	
	function MainCtrl($scope,sharedService){	

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
		 * FAQ一覧、修正対象リスト画面の切り替え	
		 * @type {[type]}
		 */
		$scope.checkModifyFaqList = sharedService.checkModifyTask;
		$scope.$watch(function() {
		    return sharedService.checkModifyTask;
		}, function() {
		    $scope.checkModifyFaqList = sharedService.checkModifyTask;
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
	angular.module('indexModule').controller('MainController',['$scope','sharedService',MainCtrl]);
})();




