'use strict';

angular.module('indexModule')
	.config(function($stateProvider){
		$stateProvider
			.state('main',{
				url:"/main",
				templateUrl:"../../app/views/mainView.html",
				controller:"MainController"
			})
			.state('createFaq',{
				templateUrl: "../../app/views/faq/createFaq.html",
				controller: "CreateFaqController",
				params: {
					'editTarget': null
				}
			})
			.state('detailFaq',{
				templateUrl:"../../app/views/faq/detailFaq.html",
				controller:"DetailFaqController"
			})
			.state('searchResult',{
				url:"/searchResult/:searchWord",
				params:{
					searchWord:null
				},
				templateUrl:"../../app/views/searchresult/searchresult.html",
				controller:"SearchResultController"
			});
	});
