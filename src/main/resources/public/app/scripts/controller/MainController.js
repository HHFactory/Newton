//MainController
(function(){
	'use strict';
	
	function MainCtrl($scope,$state,$localStorage,sharedService,connectApiService,constURI){

		/**
		 * ログインユーザ情報監視
		 * @param  
		 * @param  
		 * @return 
		 */
		$scope.$watch(function(){
			return $localStorage.userinfo;
		},function(){
			if($localStorage.userinfo){
				$scope.authorized = true;
			}
		});

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
	angular.module(indexModule).controller('MainController',['$scope','$state','$localStorage','sharedService','connectApiService','constURI',MainCtrl]);
})();




