/**
 * ui.router設定ファイル
 * @return
 */
(function(){
'use strict';

	angular.module(indexModule)
	.config(["$stateProvider","$urlRouterProvider","$httpProvider","$locationProvider",function($stateProvider,$urlRouterProvider,$httpProvider,$locationProvider){
		$stateProvider
			/** ログイン画面 */
			.state('login',{
				url: "/",
				templateUrl: "app/views/loginform.html",
				controller: "LoginController",
				controllerAs: "LoginCtrl"
			})
			/** ログイン後メイン画面 */
			.state('main',{
				url:"/index",
				templateUrl: "app/views/mainView.html",
				controller:"MainController"
			})
			/** FAQ登録画面 */
			.state('createFaq',{
				url:"/create",
				templateUrl: "app/views/faq/createFaq.html",
				controller: "CreateFaqController"
			})
			/** FAQ更新画面 */
			.state('updateFaq',{
				url: "/update",
				templateUrl: "app/views/faq/createFaq.html",
				controller: "UpdateFaqController",
				params: {
					'editTarget': null
				}
			});

		$urlRouterProvider.otherwise('/');
		$httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
		$locationProvider.html5Mode(true).hashPrefix();
	}]);

})();

