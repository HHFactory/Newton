/**
 * EnterKey押下を検知するdirective
 * 
 * @return {[type]} [description]
 */
(function(){
'use strict';

	var EnterKeyDetect = function(){
	    return function (scope, element, attrs) {
	        element.bind("keyup", function (event) {
	            if(event.which === 13) {
	                scope.$emit('clickedEnter',true);
	                // scope.$apply(function() {
	                //     scope.$eval(attrs.enterDetect);
	                    
	                // });
	                // event.preventDefault();
	            }
	        });
	    };
	}

    angular.module(appName).directive('enterDetect',[EnterKeyDetect]);
})();