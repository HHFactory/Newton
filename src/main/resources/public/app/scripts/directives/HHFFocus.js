(function(){
'use strict';
	
	var hhfFocus = function($timeout){
		return {
			ristrict: 'A',
			link: function(scope,element,attrs,ctrl){
				$timeout(function(){
					element.focus();
					element.select();
				});
			}
		}
	}

	angular.module(indexModule).directive('hhfFocus',['$timeout',hhfFocus]);
})();