(function(){
'use strict';
	
	var TreeViewDirective = function($compile){
		return {
			restrict: 'AE',
			templateUrl: "../../../app/views/template/treeTemplate.html",
			scope: {
				nwtTreeView: '=',
				ngClick: '&',
				deleteFile: '&',
				addFile: '&'
			},
			transclude:true,
			compile: function(){
				var childTemplate = '<li ng-repeat="node in nwtTreeView.children" ><ol nwt-tree-view="node"></ol></li>';
				// var manualTemplate = '<li ng-repeat="manual in nwtTreeView.manuals">'+
				// 						'<i class="fa fa-file-text-o"/><a ng-href="{{manual.filePath}}" target="_blank">{{manual.fileName}}</a>'+
				// 						'<a delete-file="deleteFile(manual)"><i class="fa fa-trash-o"/></a>'+
				// 						'</li>';
				var childLinkFn;//キャッシュ用
				var manualLinkFn;//キャッシュ用
				return function postLink(scope,element) {
					//
					childLinkFn =  childLinkFn || $compile(childTemplate);
					childLinkFn(scope, function(clonedElm){
						element.find('ol').append(clonedElm);
					});
					//
					// manualLinkFn = manualLinkFn || $compile(manualTemplate);
					// manualLinkFn(scope,function(clonedElm){
					// 	element.find('ul').append(clonedElm);
					// });
				};

			}
		}
	}

	angular.module('indexModule').directive('nwtTreeView',['$compile',TreeViewDirective]);
})();