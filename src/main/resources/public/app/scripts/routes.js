(function(){
'use strict';

	angular.module(appName)
	.config(["$stateProvider",function($stateProvider){
		$stateProvider
		.state('main',{
			url:"/",
			templateUrl:"app/views/mainView.html",
			controller:"MainController"
		})
		.state('createFaq',{
			url:"/create",
			templateUrl: "app/views/faq/createFaq.html",
			controller: "CreateFaqController"
		})
		.state('updateFaq',{
			url: "/update",
			templateUrl: "app/views/faq/createFaq.html",
			controller: "UpdateFaqController",
			params: {
				'editTarget': null
			}
		});
	}]);
	
})();

