/**
 * tooltip設定
 * @return {[type]} [description]
 */
(function(){
	'use strict';
	angular.module(indexModule).config(['$uibTooltipProvider',function($uibTooltipProvider){
		$uibTooltipProvider.setTriggers({
			'show':'hide'
		});
	}]);
})();
