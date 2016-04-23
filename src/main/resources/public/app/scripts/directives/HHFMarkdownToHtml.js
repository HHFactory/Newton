(function(){
'use strict';

	function HHFMarkdownToHtml($sanitize,$sce){
		return{
			restrict: 'A',
			scope:{
				model: '=hhfMarkdownToHtml'
			},
			template: '<div ng-bind-html="trustedHtml"></div>',
			link: getLinkFn($sanitize,$sce)
		}
	}

	function getLinkFn($sanitize, $sce) {
		return function (scope, element, attrs) {
			scope.$watch('model', function (newValue) {
				var markedHTML;
				if (typeof newValue === 'string') {
					markedHTML = marked(newValue);
					var renderer = new marked.Renderer();
					renderer.html = customRenderer(markedHTML);
		        	scope.trustedHtml = renderer.html;
		        	
			    } else {
			    	scope.trustedHtml = "";
			    }
			});
		};
	}

	function customRenderer(markedHTML) {
		var afterRenderer;
		if(markedHTML.indexOf("<code>") == -1){
			return markedHTML;
		}
		afterRenderer = markedHTML.replace("<code>","<code class='code-area'>");
		return afterRenderer;
	}

	angular.module(indexModule).directive('hhfMarkdownToHtml',['$sanitize','$sce',HHFMarkdownToHtml]);
})();