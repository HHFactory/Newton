'use strict';

angular.module(appName).config(['$uibTooltipProvider',function($uibTooltipProvider){
	$uibTooltipProvider.setTriggers({
		'show':'hide'
	});
}]);