'use strict';

angular.module('indexModule')
	.config(function($stateProvider){
		$stateProvider
			.state('main',{
				url:"/main",
				templateUrl:"app/views/mainView.html",
				controller:"MainController"
			})
			.state('create',{
				url:"/create",
				templateUrl:"app/views/faq/createFAQ.html",
				controller:"CreateArticleController"
			})
			.state('createNotification',{
				url:"/createNotification",
				templateUrl:"app/views/notification/createNotification.html",
				controller:"CreateNotificationController"
			})
			.state('searchResult',{
				url:"/searchResult/:searchWord",
				params:{
					searchWord:null
				},
				templateUrl:"app/views/searchresult/searchResultView.html",
				controller:"SearchResultController"
			});
	});