(function(){
'use strict';
	
	var TreeViewDirective = function($compile){
		return {
			restrict: 'AE',
			templateUrl: "app/views/template/treeTemplate.html",
			scope: {
				nwtTreeView: '=',
				addFile: '&',
//				deleteFile: '&'
			},
			transclude:true,
			controller: function($scope) {
				$scope.tmpfn = function(node){
					console.log('add clicked');
					$scope.addFile({node:node});
				}
				$scope.tmpfn2 = function(manualID){
					console.log('delete clicked');
					$scope.deleteFile({manualID:manualID});
				}
			},
			compile: function(){
				//子カテゴリテンプレート
				var childTemplate = '<li ng-repeat="node in nwtTreeView.children" ><ol nwt-tree-view="node"></ol></li>';
				//マニュアルテンプレート
				// var manualTemplate = '<li ng-repeat="manual in nwtTreeView.manuals">'+
				// 						'<i class="fa fa-file-text-o"/><a ng-href="{{manual.filePath}}" target="_blank">{{manual.fileName}}</a>'+
				// 						'<a ng-click="tmpfn2(manual.id)"><i class="fa fa-trash-o"/></a>'+
				// 						'</li>';
				var childLinkFn;
				var manualLinkFn;
				return function postLink(scope,element) {
					//chilTemlateを一度compileしキャッシ
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