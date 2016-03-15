(function(){
'use strict';
	
	var TreeViewDirective = function($compile,$timeout){
		return {
			restrict: 'AE',
			templateUrl: "app/views/template/treeTemplate.html",
			scope: {
				nwtTreeView: '=',
			},
			transclude:true,
			controller: function($scope) {
				$scope.add = function(node){
					$scope.$emit('addFile', node);
				}

				$scope.delete = function(manual){
					sweetAlert({
						title: "このファイルを削除しますか？",
						text: "削除した場合、ファイルの復元はできません",
						type: "warning",
						showCancelButton: true,
						confirmButtonText: "OK",
						closeOnConfirm: false,
						showLoaderOnConfirm: true
					},
					function(){
						$scope.$emit('deleteFile',manual);
						$timeout(function(){
							swal("正常に削除されました");
						},2000);
					});
				}
			},
			compile: function(){
				//子カテゴリテンプレート
				var childTemplate = '<li ng-repeat="node in nwtTreeView.children" class="tree__node__item"><ol nwt-tree-view="node"></ol></li>';
				var childLinkFn;

				return function postLink(scope,element) {
					//chilTemlateを一度compileしキャッシュ
					childLinkFn =  childLinkFn || $compile(childTemplate);
					childLinkFn(scope, function(clonedElm){
						element.find('ol').append(clonedElm);
					});
				};

			}
		}
	}

	angular.module(appName).directive('nwtTreeView',['$compile','$timeout',TreeViewDirective]);
})();