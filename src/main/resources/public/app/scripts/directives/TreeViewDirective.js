(function(){
'use strict';
	
	var TreeViewDirective = function($compile){
		return {
			restrict: 'A',
			templateUrl: "../../../app/views/template/treeTemplate.html",
			scope: {
				nwtTreeView: '='
			},
			compile: function(){
				var childTemplate = '<li ng-repeat="child in nwtTreeView.children"><ol nwt-tree-view="child"></ol></li>';
				var manualTemplate = '<li ng-repeat="manual in nwtTreeView.manuals"><i class="fa fa-file-text-o"/><a ng-href="{{manual.filePath}}" target="_blank">{{manual.fileName}}</a></li>';
				var childLinkFn;//キャッシュ用
				var manualLinkFn;//キャッシュ用
				return function postLink(scope,element) {
					//
					childLinkFn =  childLinkFn || $compile(childTemplate);
					childLinkFn(scope, function(clonedElm){
						element.find('ol').append(clonedElm);
					});
					//
					manualLinkFn = manualLinkFn || $compile(manualTemplate);
					manualLinkFn(scope,function(clonedElm){
						element.find('ul').append(clonedElm);
					});
				};

			}
		}
	}

	angular.module('indexModule').directive('nwtTreeView',['$compile',TreeViewDirective]);
})();