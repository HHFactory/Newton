/**
 * マニュアルカテゴリ階層directive
 * @return {[type]} 
 */
(function(){
'uset strict';
	
	//親カテゴリ部分directive
	var HHFTree = function($parse){
		return {
			restrict: 'A',
			transclude: true,
			template: '<div ng-transclude></div>',
			controller: ['$scope','$attrs','$transclude',function($scope,$attrs,$transclude){
				var data;
				this.linkFn = $transclude;
				//hhf-tree属性名を取得
				this.treeName = $attrs.hhfTree;

				// if($attrs.hhfTree && $attrs.hhfTreeData){
				// 	this.treeName = $attrs.hhfTreeData;
				// 	data = $parse($attrs.hhfTree)($scope);
				// 	var test = $parse($attrs.hhfTree);
				// 	console.log(data);
				// 	console.log(test);
				// 	//$scope[$attrs.hhfTreeData] = $scope[$attrs.hhfTreeData] || data;
				// }
				
				$scope.onToggle = function(){
					console.log($scope.$depth + 'clicked');
					$scope.$broadcast('isCollapsed', $scope.$depth+1);
				}

			}],
			link: {
				pre: function(scope,element,attrs){
					scope.$depth = 0;

				}
			}
		};
	}

	//子カテゴリ部分directive
	var HHFTreeNode = function($parse){
		return {
			restrict: 'A',
			require: '^hhfTree',
			link: {
				post: function(scope,element,attrs,ctrl){
					if(ctrl && attrs["hhfTreeNode"]){
						var childName = ctrl.treeName;
						var childScope;
						var child = $parse(attrs["hhfTreeNode"])(scope);

						//hhf-tree-node属性が存在する場合
						if(child){
							//子スコープは親スコープをそのまま継承する
							childScope = scope.$new(false);
							//階層レベルを設定
							childScope.$depth = scope.$depth + 1;
							$parse(childName).assign(childScope,child);

							ctrl.linkFn(childScope,function(clonedElem){
								element.append(clonedElem);
							});
						}
					}

					scope.$on('isCollapsed', function(event,data){
						console.log(event.currentScope.$depth);
						if(data === childScope.$depth){
							if(element.hasClass('ng-hide')){
								element.removeClass('ng-hide');
							}else{
								element.addClass('ng-hide');
							}
						}
					});

				}
			}
		};
	}

	angular.module('indexModule').directive('hhfTree',['$parse',HHFTree]).directive('hhfTreeNode',['$parse',HHFTreeNode]);
})()