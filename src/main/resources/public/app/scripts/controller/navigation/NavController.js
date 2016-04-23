/**
 * navbar.html用Controller
 * @return {[type]} 
 */
(function(){
	'use strict';

	function NavCtrl($scope,$state,sharedService,$localStorage,connectApiService,constURI,URL_CONF){

		/**
		 * ユーザ情報の取得
		 * @param  {[type]} 
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		$scope.$watch(function(){
			return $localStorage.userinfo;
		},function(newVal,oldVal){
			if($localStorage.userinfo){
				$scope.username = $localStorage.userinfo.userName;
			}
		});

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
	angular.module(indexModule).controller('NavController',['$scope','$state','sharedService','$localStorage','connectApiService','constURI','URL_CONF',NavCtrl]);
})();
