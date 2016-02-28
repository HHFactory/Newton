'use strict';

angular.module('indexModule')
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
				controller: "CreateFaqController",
				params: {
					'editTarget': null
				}
			});
	}]);
