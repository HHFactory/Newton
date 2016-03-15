(function(){
'use strict';
	
	var IncludeReplace = function(){
		return {
			require: 'ngInclude',
			restrice: 'A',
			link: function(scope,element,attrs){
				element.replaceWith(element.children());
			}
		}
	}

	angular.module(appName).directive('includeReplace',[IncludeReplace]);
})();