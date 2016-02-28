'use strict';

angular.module('indexModule').config(['$uibTooltipProvider',function($uibTooltipProvider){
	$uibTooltipProvider.setTriggers({
		'show':'hide'
	});
}]);