(function(){
'use strict';

	angular.module(termApp)
	.config(["$stateProvider",function($stateProvider){
		$stateProvider
		.state('listTerm',{
			url: "/",
			templateUrl: "app/views/term/listTerm.html",
			controller: "TermController"
		})
		.state('createTerm',{
			templateUrl: "app/views/term/createTerm.html",
			controller: "TermController"
		})
		.state('updateTerm',{
			templateUrl: "app/views/term/createTerm.html",
			controller: "UpdateTermController",
			params: {
				'editTarget': null
			}
		});
	}]);
})();
