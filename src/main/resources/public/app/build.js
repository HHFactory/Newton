var appName = 'indexModule';
(function(){
	'use strict';
	angular.module(appName,['connectApiService','connectURI','APP_CONF','URL_CONF','httpConfig','ui.bootstrap','ui.router','ngSanitize','ui.grid','ui.grid.resizeColumns','ngTagsInput','ngFileUpload','eb.caret','angular-loading-bar','infinite-scroll']);
})();


(function(){
'use strict';

	angular.module(appName)
	.config(["$stateProvider",function($stateProvider){
		$stateProvider
		.state('main',{
			url:"/",
			templateUrl:"app/views/mainView.html",
			controller:"MainController"
		})
		.state('createFaq',{
			url:"/create",
			templateUrl: "app/views/faq/createFaq.html",
			controller: "CreateFaqController"
		})
		.state('updateFaq',{
			url: "/update",
			templateUrl: "app/views/faq/createFaq.html",
			controller: "UpdateFaqController",
			params: {
				'editTarget': null
			}
		});
	}]);
	
})();


var termApp = 'termModule';
(function(){
"use strict";
	angular.module(termApp, ['connectApiService','connectURI','APP_CONF','URL_CONF','httpConfig','ui.router','ui.bootstrap']);
})();

(function(){
'use strict';

	angular.module(termApp)
	.config(["$stateProvider",function($stateProvider){
		$stateProvider
		.state('listTerm',{
			url: "/",
			templateUrl: "app/views/term/listTerm.html",
			controller: "TermController"
		})
		.state('createTerm',{
			templateUrl: "app/views/term/createTerm.html",
			controller: "TermController"
		})
		.state('updateTerm',{
			templateUrl: "app/views/term/createTerm.html",
			controller: "UpdateTermController",
			params: {
				'editTarget': null
			}
		});
	}]);
})();

/**
 * Azure接続時用コンフィグファイル
 * @type {String}
 */
(function(){
'use strict';
	angular.module('APP_CONF',[]).constant('APP_CONF', {
		columnTitleFaq: "FAQ",
		columnTitleImportFaq: "FAQ一括登録",
		columnTitleNotification: "お知らせ",
		columnTitleManual: "マニュアル",
		labelImportance: "重要度",
		buttonLabelCreateNotification: "新しいお知らせを登録する",
		buttonLabelClear: "クリア",
		buttonLabelSubmit: "登録",
		buttonLabelSubmitting: "登録中",
		buttonLabelUpdate: "更新",
		buttonLabelUpdating: "更新中",
		buttonLabelSend: "送信",
		buttonLabelSending: "送信中",
		buttonLabelUseful: "役に立った",
		buttonLabelModifyReq: "修正依頼",
		buttonLabelEdit: "編集",
		buttonLabelDelete: "削除",
		buttonLabelClose: "閉じる",
		buttonLabelCancel: "キャンセル",
		buttonLabelIsRead: "既読にする",
		columnLabelPreview: "プレビュー",
		iconLabelCreateNotification: "新規お知らせ",
		iconLabelTag: "タグ追加",
		iconLabelAddFaq: "FAQ追加",
		iconLabelImportFaq: "一括登録",
		iconLabelTerm: "用語集",
		headerLabelCreateNotification: "新規お知らせ"
	});
})();

/**
 * http通信時のリクエストエラー、レスポンスエラーを検知して前処理を行う
 * @return {[type]} [description]
 */
(function(){
'use strict';
  angular.module('httpConfig',[]).config(["$httpProvider",function($httpProvider) {
    $httpProvider.interceptors.push(["$q", function ($q) {
        return {
          requestError: function(rejection){
            console.log(rejection);
            swal("サーバーへのリクエストが正しくありません");
          },
          responseError: function(rejection) {
            console.log(rejection);
            // if (500 == rejection.status) {
            //   swal("処理中にエラーが発生しました");
            // }
            return $q.reject(rejection);
          }
        }
    }])
  }]);
})();


/**
 * ローディングバー設定
 */
(function(){
	'use strict';
	angular.module(appName).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
		// 読み込み時のサークルを非表示
		cfpLoadingBarProvider.includeSpinner = false;
		cfpLoadingBarProvider.latencyThreshold = 0;
	}]);
})();

/**
 * tooltip設定
 * @return {[type]} [description]
 */
(function(){
	'use strict';
	angular.module(appName).config(['$uibTooltipProvider',function($uibTooltipProvider){
		$uibTooltipProvider.setTriggers({
			'show':'hide'
		});
	}]);
})();

/**
 * ng-clickの2重連打防止
 * @return {[type]} [description]
 */
(function(){
'use strict';
  angular.module(appName)
  .config(['$provide',function($provide) {
    // directiveを置き換える場合はdirective名の末尾に"Directive"を付ける
    $provide.decorator('ngClickDirective', ["$delegate", "$parse", "$q", function($delegate, $parse, $q) {
      // $delegate[0]がdirective本体
      $delegate[0].compile = function($element, attr) {
        var fn = $parse(attr.ngClick, null, true);

        return function(scope, element) {
          element.on('click', function(event) {
            var result, promise, d;
            // el.disabled==trueのときにはクリック無効(disabledが使えない要素用の保険)
            if (element[0].disabled) {
              return;
            }
            result = fn(scope, {$event: event});
            // promiseの場合は解決を待つ
            if (result != null && typeof result.then === 'function') {
              promise = result;
            } else {
              d = $q.defer();
              d.resolve();
              promise = d.promise;
            }
            // promise解決までクリックを無効化して、解決したら有効化する
            element[0].disabled = true;
            function enable() {
              element[0].disabled = false;
            }
            promise.then(enable, enable);
          });
        };
      };
      return $delegate;
    }]);
  }]);
})();


//MainController
(function(){
	'use strict';
	
	function MainCtrl($scope,sharedService,connectApiService,constURI){

		/**
		 * お知らせ開閉フラグ監視
		 * @param  {[type]} 
		 * @param  {[type]} 
		 * @return {[type]}  
		 */
		$scope.$watch(function(){
			return sharedService.isShowNotification;
		},function(){
			$scope.isShowNotification = sharedService.isShowNotification;
		});
		
		/**
		 * FAQ一括登録開閉フラグ監視
		 * @param  {[type]}
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.$watch(function(){
			return sharedService.isShowFaqImport;
		},function(){
			$scope.isShowFaqImport = sharedService.isShowFaqImport;
		});

		/**
		 * マニュアル開閉フラグ監視
		 * @param  {[type]} 
		 * @param  {[type]} 
		 * @return {[type]}  
		 */
		$scope.$watch(function(){
			return sharedService.isShowManual;
		},function(){
			$scope.isShowManual = sharedService.isShowManual;
		});


	}	

	//moduleへ登録
	angular.module(appName).controller('MainController',['$scope','sharedService','connectApiService','constURI',MainCtrl]);
})();





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
/**
 * FAQ一括登録ファイル選択directive
 * @return {[type]} [description]
 */
(function(){
'use strict';

    function FileSelect() {
        return {
            link: function($scope,element) {
                element.bind("change", function(e){
                    var reader = new FileReader();
                    var file = e.target.files[0];

                    reader.onload = function(e) {
                        var loadFile = e.target.result;
                        var workbook = XLSX.read(loadFile, {type: 'binary'});
                        //呼び出し元コントローラでエクセル読み込み処理を行う
                        $scope.getDataFromExcel(workbook);
                    };

                    reader.readAsBinaryString(file);
                });
            }
        }
    };

    angular.module(appName).directive("ngFileSelect",[FileSelect]);
})();
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

	angular.module(appName).directive('hhfFocus',['$timeout',hhfFocus]);
})();
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

	angular.module(appName).directive('hhfMarkdownToHtml',['$sanitize','$sce',HHFMarkdownToHtml]);
})();
/**
 * タグ選択パネル
 * @return 
 */
(function(){
'use strict';

	var hhfTagSelect = function($timeout){
		return {
			restrict: 'EA',
			templateUrl: 'app/views/template/tagSelectPanel.html',
			link: function(scope,element,attrs,ctrl){

				/**
				 * 新規カテゴリの追加
				 * @param {[type]} tmpCategory 
				 */
				 scope.addCategory = function(categoryName){
				 	var tmpCategory = {};
				 	tmpCategory["name"] = categoryName;
				 	tmpCategory["id"] = "";
				 	if(!isDuplicate(scope.selectedList,categoryName)){
				 		scope.selectedList.push(tmpCategory);
				 	}
				 }

				/**
				 * カテゴリ選択
				 * @param  {[type]} category 
				 * @return {[type]}          
				 */
				 scope.selectCategory = function(category){
				 	scope.confirmCategory = true;
				 	if(!isDuplicate(scope.selectedList,category.name)){
				 		scope.selectedList.push(category);
				 	}
				 }

				/**
				 * 選択済みカテゴリ削除
				 * @param  {[type]} category [description]
				 * @return {[type]}          [description]
				 */
				 scope.removeItem = function(category){
				 	scope.selectedList.some(function(item,idx){
				 		if(item.name === category.name) {
				 			scope.selectedList.splice(idx,1);
				 		}
				 	});
				 }

				/**
				 * 重複チェック
				 * @param  {[type]} array [description]
				 * @param  {[type]} id    [description]
				 * @return {[type]}       [description]
				 */
				 var isDuplicate = function(array, name) {
				 	for(var i =0; i<array.length; i=(i+1)){
				 		if(array[i].name === name){
				 			return true;
				 		}
				 	}
				 	return false;
				 }

				/**
				 * OKボタン押下
				 * @return {[type]} [description]
				 */
				 scope.confirm = function(){
				 	scope.isOpenCategory = false;
				 }
			}

		}
	}

	angular.module(appName).directive('hhfTagSelect',['$timeout',hhfTagSelect]);
})();
/**
 * 必須チェック&文字数チェック機能を持ったtextフィールド
 * @return {[type]} [description]
 */
(function(){
'use strict';

	var HHFTextForm = function(){
		return{
			restrict: 'E',
			require: '^form',
			replace: true,
			scope: {
				name: '@',
				placeholder: '@',
				ngModel: '=',
				required: '=',
				ngMaxlength: '='
			},
			templateUrl: 'app/views/template/hhfTextForm.html',
			link: function(scope,element,attrs,ctrl) {
				var target  = ctrl[attrs.name];
				console.log(attrs.ngMaxlength);
				scope.length = attrs.ngMaxlength;

				//エラー表示タイミング(フォーカスしたが値が変更されなかったとき)
				scope.isError = function() {
					return target.$touched && target.$pristine;
				};

				//必須チェック
				scope.isRequiredError = function() {
					return target.$error.required;
				};

				//文字数チェック
				scope.isLengthError = function() {
					console.log(target.$error);
					return target.$error.maxlength;
				};
			}
		}
	}


	angular.module(appName).directive('hhfTextForm',[HHFTextForm]);
})();
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

	angular.module(appName).directive('hhfTree',['$parse',HHFTree]).directive('hhfTreeNode',['$parse',HHFTreeNode]);
})();
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
(function(){
'use strict';
  angular.module('eb.caret',[]).directive('ebCaret', function() {

    function getPos(element) {
      if ('selectionStart' in element) {
        return element.selectionStart;
      } else if (document.selection) {
        element.focus();
        var sel = document.selection.createRange();
        var selLen = document.selection.createRange().text.length;
        sel.moveStart('character', -element.value.length);
        return sel.text.length - selLen;
      }
    }

    function setPos(element, caretPos) {
      if (element.createTextRange) {
        var range = element.createTextRange();
        range.move('character', caretPos);
        range.select();
      } else {
        element.focus();
        if (element.selectionStart !== undefined) {
          element.setSelectionRange(caretPos, caretPos);
        }
      }
    }

    return {
      restrict: 'A',
      scope: {
        ebCaret: '=',
      },
      link: function(scope, element, attrs) {
        if (!scope.ebCaret) {
          scope.ebCaret = {};
        }

        element.on('keydown keyup click', function(event) {
          scope.$apply(function() {
            scope.ebCaret.get = getPos(element[0]);
          });
        });

        scope.$watch('ebCaret.set', function(newVal) {
          if (typeof newVal === 'undefined') {
            return;
          }
          setPos(element[0], newVal);
        });
      }
    };
  });

})();

/**
 * FAQカテゴリフィルタ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	var CategoryFilter = function(){
		return function(faqList,selectedCategories){
			if(selectedCategories.length > 0){
				var filteredList = [];
				for(var i=0; i<faqList.length; i++){
					// 表示されているFAQ一覧が持つカテゴリ名リストを作成
					var hasCategories = getHasCategoryNameList(faqList[i]);

					//選択されたカテゴリリストとの比較
					for(var k=0; k<hasCategories.length; k++){
						for(var l=0; l<selectedCategories.length; l++){
							if(hasCategories[k] == selectedCategories[l]["name"]){
								filteredList.push(faqList[i]);
							}
						}
					}
				}
				/** リスト内重複削除 */
				var distinctList = filteredList.filter(distinct);
				return distinctList;
			}else{
				return faqList;
			}
		}
	}

	/**
	 * FAQ一覧データが持っているカテゴリ名リスト作成
	 * @param  {[type]} faqList 
	 * @return {[type]}         
	 */
	 var getHasCategoryNameList = function(faq){
	 	var hasCategories = [];
	 	for(var j=0; j<faq["categories"].length; j++){
	 		hasCategories.push(faq["categories"][j]["name"]);
	 	}
	 	return hasCategories;
	 }

	 /**
	  * リスト内で重複していないindexを返す
	  * @param  value [target list]
	  * @param  index [index of list]
	  * @param  self  [item of list]
	  * @return distinct index      [index]
	  */
	 var distinct = function(value,index,self){
	 	return self.indexOf(value) === index;
	 }

	angular.module(appName).filter('categoryFilter',CategoryFilter);
})();

//指定文字数を越えると...で表示させる
(function(){
'use strict';
  angular.module(appName)
  .filter('abbreviate',function () {
    return function (text, len, end) {
      if(!angular.isString(text)){
        return text;
      }
      if (len === undefined) {
          // デフォルトは10文字
          len = 10;
        }
        if (end === undefined) {
          end = "…";
        }
        if(text !== undefined) {
          if(text.length > len) {
            return text.substring(0, len - 1) + end;
          }
          else {
            return text;
          }
        }
      };
    });
})();

/*! 
 * angular-loading-bar v0.8.0
 * https://chieffancypants.github.io/angular-loading-bar
 * Copyright (c) 2015 Wes Cruver
 * License: MIT
 */
!function(){"use strict";angular.module("angular-loading-bar",["cfp.loadingBarInterceptor"]),angular.module("chieffancypants.loadingBar",["cfp.loadingBarInterceptor"]),angular.module("cfp.loadingBarInterceptor",["cfp.loadingBar"]).config(["$httpProvider",function(a){var b=["$q","$cacheFactory","$timeout","$rootScope","$log","cfpLoadingBar",function(b,c,d,e,f,g){function h(){d.cancel(j),g.complete(),l=0,k=0}function i(b){var d,e=c.get("$http"),f=a.defaults;!b.cache&&!f.cache||b.cache===!1||"GET"!==b.method&&"JSONP"!==b.method||(d=angular.isObject(b.cache)?b.cache:angular.isObject(f.cache)?f.cache:e);var g=void 0!==d?void 0!==d.get(b.url):!1;return void 0!==b.cached&&g!==b.cached?b.cached:(b.cached=g,g)}var j,k=0,l=0,m=g.latencyThreshold;return{request:function(a){return a.ignoreLoadingBar||i(a)||(e.$broadcast("cfpLoadingBar:loading",{url:a.url}),0===k&&(j=d(function(){g.start()},m)),k++,g.set(l/k)),a},response:function(a){return a&&a.config?(a.config.ignoreLoadingBar||i(a.config)||(l++,e.$broadcast("cfpLoadingBar:loaded",{url:a.config.url,result:a}),l>=k?h():g.set(l/k)),a):(f.error("Broken interceptor detected: Config object not supplied in response:\n https://github.com/chieffancypants/angular-loading-bar/pull/50"),a)},responseError:function(a){return a&&a.config?(a.config.ignoreLoadingBar||i(a.config)||(l++,e.$broadcast("cfpLoadingBar:loaded",{url:a.config.url,result:a}),l>=k?h():g.set(l/k)),b.reject(a)):(f.error("Broken interceptor detected: Config object not supplied in rejection:\n https://github.com/chieffancypants/angular-loading-bar/pull/50"),b.reject(a))}}}];a.interceptors.push(b)}]),angular.module("cfp.loadingBar",[]).provider("cfpLoadingBar",function(){this.autoIncrement=!0,this.includeSpinner=!0,this.includeBar=!0,this.latencyThreshold=100,this.startSize=.02,this.parentSelector="body",this.spinnerTemplate='<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>',this.loadingBarTemplate='<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>',this.$get=["$injector","$document","$timeout","$rootScope",function(a,b,c,d){function e(){k||(k=a.get("$animate"));var e=b.find(n).eq(0);c.cancel(m),r||(d.$broadcast("cfpLoadingBar:started"),r=!0,v&&k.enter(o,e,angular.element(e[0].lastChild)),u&&k.enter(q,e,angular.element(e[0].lastChild)),f(w))}function f(a){if(r){var b=100*a+"%";p.css("width",b),s=a,t&&(c.cancel(l),l=c(function(){g()},250))}}function g(){if(!(h()>=1)){var a=0,b=h();a=b>=0&&.25>b?(3*Math.random()+3)/100:b>=.25&&.65>b?3*Math.random()/100:b>=.65&&.9>b?2*Math.random()/100:b>=.9&&.99>b?.005:0;var c=h()+a;f(c)}}function h(){return s}function i(){s=0,r=!1}function j(){k||(k=a.get("$animate")),d.$broadcast("cfpLoadingBar:completed"),f(1),c.cancel(m),m=c(function(){var a=k.leave(o,i);a&&a.then&&a.then(i),k.leave(q)},500)}var k,l,m,n=this.parentSelector,o=angular.element(this.loadingBarTemplate),p=o.find("div").eq(0),q=angular.element(this.spinnerTemplate),r=!1,s=0,t=this.autoIncrement,u=this.includeSpinner,v=this.includeBar,w=this.startSize;return{start:e,set:f,status:h,inc:g,complete:j,autoIncrement:this.autoIncrement,includeSpinner:this.includeSpinner,latencyThreshold:this.latencyThreshold,parentSelector:this.parentSelector,startSize:this.startSize}}]})}();

/***
* パラメータとして渡されたAPIとの接続処理をするService
* @Param apiURI
* @Return apiResult
*/
(function(){
'use strict';
	
	function ConnectApiService($http,$timeout){

		var ConnectAPI = {
			/**
			 * http.get
			 * @param  {[type]}
			 * @return {[type]}
			 */
			get: function(apiURI,param){
				var getData = $http.get(apiURI,{params:param}).success(function(data,status,headers,config){
					// return data;
				}).error(function(data,status,headers,config){
					swal("データ取得に失敗しました");
				});
				return getData;
			},

			/**
			 * http.put
			 * @param  {[type]}
			 * @param  {[type]}
			 * @return {[type]}
			 */
			put:function(apiURI,argdata){
				var putData =$http.put(apiURI,argdata).success(function(data,status,headers,config){

				}).error(function(data,status,headers,config) {
					swal("更新に失敗しました");
				});
				return putData;
			},

			/**
			 * http.post
			 * @return {[type]}
			 */
			post:function(apiURI,argdata){
				var postData = $http.post(apiURI,argdata).success(function(data,status,headers,config){
					$timeout(function(){
						swal({
							title: "登録完了",
							type: "success",
							timer: 1000,
							showConfirmButton: false
						},function(){
							swal.close();
						});
					});
				}).error(function(data,status,headers,config){
					swal("登録に失敗しました");
				});
				return postData;
			},

			/**
			 * http.delete
			 * @param  {[type]} apiURI     
			 * @param  {[type]} targetData 
			 * @return {[type]}            
			 */
			delete:function(apiURI,param){
				var deleteData = $http.delete(apiURI, {params:param}).success(function(data,status,headers,config){
					$timeout(function(){
						swal({
							title: "正常に削除されました",
							type: "success",
							timer: 1000,
							showConfirmButton: false
						},function(){
							swal.close();
						});
					});
				}).error(function(data,status,headers,config){
					swal("削除に失敗しました");
				});
				return deleteData;
			}
		};
		return ConnectAPI;
	}

	//moduleにfactoryを登録
	angular.module('connectApiService',[]).service('connectApiService',['$http','$timeout',ConnectApiService]);
})();

/**
* 各種apiのURIを定義する定数Service
* @Param
* @Return
*/
(function(){
'use strict';
	angular.module('connectURI',[]).value(
		'constURI',{
			//faq
			'faq': "api/v1/faq/",
			'faqs': "api/v1/faqs/",
			'modifyFaqs': "api/v1/modifyfaqs/",
			'faqCategory': "api/v1/category/faq/",
			//notification
			'notification': "api/v1/notification/",
			'notifications': "api/v1/notifications/",
			//manual
			'manual': "api/v1/manual",
			'manuals': "api/v1/manuals",
			'manualCategory': "api/v1/manualcategory",
			//role&user
			'roles': "api/v1/roles",
			'users': "api/v1/users",
			//term
			'term': "api/v1/term/",
			'terms': "api/v1/terms/",
			//elasticsearch
			'searchAPI': "api/v1/elastic/querysearch/",
			// 'searchALL': "api/v1/elastic/matchall/",
			//upload&delete
			'deleteFile': "delete/file"
		}
	);

})();
(function(){
'use strict';

	function sharedService(){
		return {
			faqList: {faqList:[],faqCategoryList:[]},
			manualList: null,
			notificationList: null,
			isShowManual: false,
			isShowNotification: false,
			isShowCreateNotificationPanel: false,
			isShowFaqImport: false,
			searchQuery: null
		};
	}
	angular.module(appName).factory('sharedService',sharedService);
})();

/**
 * ユーザ操作関連サービス
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function UserService(){
		var readMemberList = [];
		var unreadMemberList =[];

		/**
		 * 既読者・未読者リストを作成する
		 * @param  {[type]}
		 * @return {[type]}
		 */
		var userService = {
			createReadUserList:function(argData){
				if( !argData )
					return false;
				for(var i=0; i<argData.length; ++i){
					var notification = argData[i]
					if( !notification.notificationTargetRoles )
						return false;
					var targetUserList = notification.notificationTargetRoles;
					for(var j=0; j<targetUserList.length; ++j){
						if(targetUserList[j].read_flag = true)
							readMemberList.push(targetUserList[j].target_user);
						else if(targetUserList[j].read_flag = false)
							unreadMemberList.push(targetUserList[j].target_user);
					}
				}
			}
		};
		return userService;
	}

	//moduleへの登録
	angular.module(appName).factory('UserService',UserService);
})();
/**
 * ファイル読み込み
 * @return {[type]} [description]
 */
(function(){
'use strict';

    var fileReader = function ($q, $log) {
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
 
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
 
        var onProgress = function(reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress",
                    {
                        total: event.total,
                        loaded: event.loaded
                    });
            };
        };
 
        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };
 
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
             
            var reader = getReader(deferred, scope);         
            reader.readAsDataURL(file);
             
            return deferred.promise;
        };
 
        return {
            readAsDataUrl: readAsDataURL  
        };
    };

	
	angular.module(appName).factory("fileReader",['$q','$log',fileReader]);
})();
angular.module('URL_CONF', [])
.constant('URL_CONF', {"urlBase":"http://localhost:8080/newton/","imageFolderPath":"http://localhost:8080/newton/app/images/","importFaqTemplateFilePath":"http://localhost:8080/newton/app/files/template.xlsx","termHtmlPath":"http://localhost:8080/newton/term#/"});

/**
 * FAQ登録/更新ベースコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function BaseFaqCtrl($scope,$state,connectApiService,constURI,Upload,APP_CONF,URL_CONF){
		/** ラベル設定 */
		$scope.columnLabelPreview = APP_CONF.columnLabelPreview;
		$scope.iconLabelTag = APP_CONF.iconLabelTag;
		/** 選択済みタグリスト */
		$scope.selectedList = [];

		/**
		タグ選択状態を監視
		 * @param  {[type]} )
		 * @return {[type]}  
		 */
		$scope.$watch('selectedList.length',function(){
			// タグを選択した場合
			if($scope.selectedList.length > 0){
				$scope.isSelected = true;
			}
			// 未選択の場合
			else{
				$scope.isSelected = false;
			}
		});

		/**
		 * FAQカテゴリの取得
		 * @param  {[type]} apiResult
		 * @return {[type]}           
		 */
		connectApiService.get(URL_CONF.urlBase + constURI.faqCategory).then(function(apiResult){
			$scope.categoryList = apiResult.data;
		});

		/**
		 * 画像アップロード処理
		 */
		$scope.upload = function(file) {
			var fileName = file.name;
			var basePath = URL_CONF.imageFolderPath;
			Upload.upload({
				url: URL_CONF.urlBase + '/upload/image',
				data: {image:file}
			})
			.success(function(resp){
				var nameTag = "![" + fileName + "]";
				var pathTag = "(" + basePath + resp + ")";
				var imageTag = nameTag + pathTag;
				setMarkdownTag(imageTag);
			})
			.error(function(resp){
				console.log(resp);
				swal("ファイルサイズが大きすぎます");
			});
		}

		/**
		 * markdown用のタグを現在カーソル位置に挿入
		 * @param {[type]} tag [description]
		 */
		var setMarkdownTag = function(tag){
			var caret = $scope.cursorPosition['get'];
			var text = $scope.faq.content;
			if(caret > 0) {
				var former = text.slice(0,caret);
				var latter = text.slice(caret);
				$scope.faq.content = former + tag + latter;
			} else {
				$scope.faq.content = tag;
			}
		}

		/**
		 * add <h3>
		 */
		$scope.addHeaderTag = function() {
			setMarkdownTag("### 見出し");
		}

		/**
		 * add <strong>
		 */
		$scope.addStrongTag = function() {
			setMarkdownTag("**" + "強調" + "** ");
		}

		/**
		 * add <ol>
		 */
		$scope.addOlTag = function(){
			setMarkdownTag("1. リスト");
		}

		/**
		 * add <hr>
		 */
		$scope.addHrTag = function() {
			setMarkdownTag("***  ");
		}

		/**
		 * add <blockquote>
		 */
		$scope.addQuoteTag = function() {
			setMarkdownTag("> 引用");
		}

		/**
		 * add <table>
		 */
		$scope.addTableTag = function() {
			setMarkdownTag("|aa|bb|cc|");
			setMarkdownTag("|:-|:-|:-|");
			setMarkdownTag("|aa|bb|cc|");
		}

	}

	angular.module(appName).controller('BaseFaqController',['$scope','$state','connectApiService','constURI','Upload','APP_CONF','URL_CONF',BaseFaqCtrl]);
})();
/**
 * FAQ登録Controller
 * 
 */
(function(){
'use strict';

	function CreateFaqCtrl($scope,$state,$controller,connectApiService,constURI,APP_CONF,URL_CONF){
		/** ベースコントローラインスタンスの生成 */
		angular.extend(this, $controller('BaseFaqController', {$scope: $scope}));
		/** ラベル設定 */
		$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;

		/**
		 * 登録ボタン押下処理 
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.submit = function(faq){
			faq.categories = $scope.selectedList;
			$scope.loading = true;

			// ボタンラベルを変更
			$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmitting;
			connectApiService.post(URL_CONF.urlBase + constURI.faq,faq)
			.success(function(apiResult){
				$state.go('main');
			})
			.finally(function(){
				$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;
				$scope.loading = false;
			});
			console.log('faq created');
		};
	}

	//モジュールへの登録
	angular.module(appName).controller('CreateFaqController',['$scope','$state','$controller','connectApiService','constURI','APP_CONF','URL_CONF',CreateFaqCtrl]);
})();

/**
 * FAQ詳細Controller
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function DetailFaqCtrl($scope,$state,connectApiService,constURI,$timeout,APP_CONF,URL_CONF){
		/** ラベル */
		$scope.buttonLabelEdit = APP_CONF.buttonLabelEdit;
		$scope.buttonLabelDelete = APP_CONF.buttonLabelDelete;
		$scope.buttonLabelModifyReq = APP_CONF.buttonLabelModifyReq;
		$scope.buttonLabelUseful = APP_CONF.buttonLabelUseful;

		/**
		 * 編集リンク押下処理
		 * @param  {[type]} faq 
		 * @return {[type]}     
		 */
		$scope.edit = function(faq) {
			$state.go('updateFaq',{editTarget:faq});
		}

		/**
		 * 削除リンク押下処理
		 * @param  {[type]} faq 
		 * @return {[type]}     
		 * 
		 */
		$scope.delete = function(faq) {
			sweetAlert({
				title: "このFAQを削除しますか?",
				text: "削除した場合、データの復元はできません",
				type: "warning",
				showCancelButton: true,
				confirmButtonText: "OK",
				closeOnConfirm: false,
				showLoaderOnConfirm: true
			},
			function(){
				var targetId = faq.id;
				connectApiService.delete(URL_CONF.urlBase + constURI.faq + targetId).then(function(resultAPI){
					$timeout(function(){
						swal("正常に削除されました");
						$state.reload();
					},1000);
				});
			});
		}

		/**
		 * 役に立ったボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.useful = function(faq){
			connectApiService.put(URL_CONF.urlBase + constURI.faqs+faq.id).then(function(apiResult){
				$scope.usefulCount = apiResult.data;
			});
		};

	}

	angular.module(appName).controller('DetailFaqController',['$scope','$state','connectApiService','constURI','$timeout','APP_CONF','URL_CONF',DetailFaqCtrl]);
})();
/**
 * FAQ一括登録用コントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function ImportFaqCtrl($scope,$state,connectApiService,constURI,$timeout,sharedService,APP_CONF,URL_CONF){
		/** カラムタイトル */
		$scope.columnTitle = APP_CONF.columnTitleImportFaq;
		/** ラベル */
		$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;
		$scope.buttonLabelClear = APP_CONF.buttonLabelClear;
		$scope.fileUrl = URL_CONF.importFaqTemplateFilePath;

		/**  */
		var columnDefs = [];
		/**  */
		var validFlag = true;
		
		/**
		 * 選択したエクセルからデータを取得
		 * @param  {[type]} workbook 
		 * @return {[type]}          
		 */
		$scope.getDataFromExcel = function(workbook) {
			//ヘッダ取得
			var headerNames = XLSX.utils.sheet_to_json(
								workbook.Sheets[workbook.SheetNames[0]],
                                { header: 1 })[0];
			headerNames.forEach(function(headerName) {
				columnDefs.push({field: headerName});
			});

			//データ取得
			var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
			//scopeをリロード
			$timeout(function(){
				$scope.faqData = data;
			});
		}

		/**
		 * エクセルから取得したjsonをPOST用フォーマットに整形
		 * @param  {[type]} faqData 
		 * @return {[type]}   
		 *      
		 */
		var formatPostParam = function(faqData) {
			var postParm = [];
			for(var i = 0; i < faqData.length; i = (i+1)){
				var faq = {};
				faq["title"] = faqData[i]["FAQタイトル"];
				faq["content"] = faqData[i]["回答内容"];
				faq["categories"] = createCategoryList(faqData[i]["タグ"]);
				faq["createUser"] = "user1";
				faq["updateUser"] = "user1";
				faq["usefulCount"] = "0";
				faq["status"] = "valid";
				postParm.push(faq);
				/** タイトルと回答内容に空項目があるかチェック */
				if(faq["title"] === void 0 || faq["content"] === void 0) {
					alert((i+1) + "行目に未入力箇所があります");
					validFlag = false;
				}
			}
			return postParm;
		}

		/**
		 * FAQカテゴリを作成
		 * @return {[type]} 
		 */
		var createCategoryList = function(categoryStr){
			if(categoryStr){
				var categoryList = [];
				var categoryName = categoryStr.split(",");
				for(var i =0; i<categoryName.length; i++){
					var category = {};
					category["id"] = "";
					category["name"] = categoryName[i];
					category["status"] = "valid";
					categoryList.push(category);
				}
			}
			return categoryList;
		}


		/**
		 * 登録ボタン押下処理
		 * @param  {[type]} faqData 
		 * @return {[type]}         
		 */
		$scope.submit = function(faqData) {
			var postParm = formatPostParam(faqData);
			if(validFlag === true){
				$scope.loading = true;
				$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmitting;
				connectApiService.post(URL_CONF.urlBase + constURI.faqs,postParm).then(function(apiResult){
					if(apiResult.status == 201){
						swal({
							title: "登録完了",
							type: "success",
							timer: 1000,
							showConfirmButton: false
						},function(){
							swal.close();
							$state.reload();
							sharedService.isShowFaqImport = false;
						});
					}else{
						swal({
							title: "登録失敗",
							type: "error",
							timer: 2000,
							showConfirmButton: false
						});
					}
				}).finally(function(){
					$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;
					$scope.loading = false;
				});
			}
		}

		/**
		 * 閉じるアイコン押下処理
		 * @return {Boolean} [description]
		 */
		$scope.isClose = function(){
			sharedService.isShowFaqImport = false;
		}

	}

	angular.module(appName).controller('ImportFaqController',['$scope','$state','connectApiService','constURI','$timeout','sharedService','APP_CONF','URL_CONF',ImportFaqCtrl]);
})();
/**
 * listFaq.html Controller
 * @return {[type]}
 */
(function(){
	'use strict';

	function ListFaqCtrl($scope,connectApiService,constURI,sharedService,APP_CONF,URL_CONF){
		/** カラムタイトル */
		$scope.columnTitle = APP_CONF.columnTitleFaq;
		/** 選択済みカテゴリリスト　*/
		$scope.selectedList = [];
		$scope.categoryList = [];
		/** データ取得時パラメータ */
		var searchParam = {searchWord:null, page:0};
		/** 1ページあたりのデータ数 */
		var sizeLimit = 100;

		/**
		 * 接続先API判定
		 * @param  {[type]} 
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		$scope.$watch(function(){
			return sharedService.searchQuery;
		},function(){
			// 検索ワードが変わるたびにsharedserviceの値とscopeを空にする
			sharedService.faqList["faqList"] = [];
			sharedService.faqList["faqCategoryList"] = [];
			setScope();
			// 詳細エリアを非表示
			$scope.isShowDetail = false;

			// 検索ワードが空の場合
			if(!sharedService.searchQuery){
			 	getData(URL_CONF.urlBase + constURI.faqs,searchParam);
			}
			// 検索ワードが入力されている場合
			else{
				searchParam = {searchWord:sharedService.searchQuery, page:0};
				var prefix = sharedService.searchQuery.substring(0,1);
				// ID検索
				if(prefix == '#'){
					var targetID = sharedService.searchQuery.substr(1);
					getData(URL_CONF.urlBase + constURI.faqs+targetID);
				}
				// キーワード検索
				else {
					getData(URL_CONF.urlBase + constURI.searchAPI,searchParam);
				}
			}
		});

		/**
		 * 次ページデータ取得処理
		 * @return {[type]} [description]
		 */
		$scope.loadMore = function(){
			if($scope.listCount && $scope.listCount % sizeLimit == 0){
				console.log('load faq more');
				var page = searchParam["page"];
				searchParam = {searchWord: sharedService.searchQuery, page: page+1};
				// 検索ワード入力時
				if(sharedService.searchQuery){
					getData(URL_CONF.urlBase + constURI.searchAPI,searchParam);
				}
				// 検索ワードが空の場合
				else{
					getData(URL_CONF.urlBase + constURI.faqs,searchParam);
				}
			}
		}

		/**
		 * データ取得処理
		 * @param  {[type]} targetURI [description]
		 * @return {[type]}           [description]
		 */
		var getData = function(targetURI,param){
			// 取得したデータはshareServiceに格納
			connectApiService.get(targetURI,param).then(function(apiResult){
				sharedService.faqList["faqList"].push.apply(sharedService.faqList["faqList"],apiResult.data["faqList"]);
				sharedService.faqList["faqCategoryList"].push.apply(sharedService.faqList["faqCategoryList"],apiResult.data["faqCategoryList"]);
			})
			// sharedServiceからscopeに反映
			.finally(function(){
				setScope();
			});
		}

		/**
		 * scopeへデータ反映
		 */
		var setScope = function(){
			$scope.faqList = sharedService.faqList["faqList"];
			$scope.categoryList = sharedService.faqList["faqCategoryList"];
			$scope.listCount = $scope.faqList.length;
		}

		/**
		 * FAQタイトルリンク押下処理
		 * @param  {[type]} faq
		 * @return {[type]}    
		 */
		$scope.showDetail = function(faq){
			$scope.isShowDetail = true;
			sharedService.isShowManual = false;
			sharedService.isShowNotification = false;
			$scope.targetFaq = faq;
			$scope.usefulCount = faq.usefulCount;
		}

	}

	//moduleへの登録
	angular.module(appName).controller('ListFaqController',['$scope','connectApiService','constURI','sharedService','APP_CONF','URL_CONF',ListFaqCtrl]);
})();


/**
 * FAQ更新用コントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function UpdateFaqCtrl($scope,$state,$stateParams,$controller,connectApiService,constURI,APP_CONF,URL_CONF){
		/** ベースコントローラインスタンスを生成 */
		angular.extend(this, $controller('BaseFaqController', {$scope: $scope}));
		/** ラベル設定 */
		$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdate;

		//更新用パラメータ取得
		if($stateParams.editTarget){
			$scope.faq = $stateParams.editTarget;
			$scope.selectedList.push.apply($scope.selectedList,$scope.faq.categories);
			$scope.categoryList = $scope.selectedList;
			$scope.parsedMarkdown = marked($scope.faq.content);
		}

		/**
		 * 更新ボタン押下処理 
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.submit = function(faq){
			faq.categories = $scope.selectedList;
			$scope.loading = true;

			// ボタンラベルを変更
			$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdating;
			var targetId = $scope.faq.id;
			connectApiService.put(URL_CONF.urlBase + constURI.faq+targetId,faq).then(function(apiResult){
				$state.go('main');
			}).finally(function(){
				$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdate;
				$scope.loading = false;
			});
			console.log('faq updated');
		};

	}


	angular.module(appName).controller('UpdateFaqController', ['$scope','$state','$stateParams','$controller','connectApiService','constURI','APP_CONF','URL_CONF',UpdateFaqCtrl]);
})();
/**
 * manual.controller
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function ManualCtrl($scope,$state,$uibModal,connectApiService,constURI,sharedService,APP_CONF,URL_CONF){
		/** カラムタイトル */
		$scope.columnTitle = APP_CONF.columnTitleManual;
		
		/**
		 * 閉じるボタン押下
		 * @return {Boolean} [description]
		 */
		$scope.isClose = function(){
			sharedService.isShowManual = false;
		}

		/**
		 * マニュアルリストを取得
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(URL_CONF.urlBase + constURI.manuals).then(function(apiResult){
			sharedService.manualList = apiResult.data;
			$scope.data = sharedService.manualList;
		});

		/**
		 * ファイル登録モーダルを開く
		 * @return {[type]} [description]
		 */
		$scope.openFileUploadModal = function() {
			$uibModal.open({
				templateUrl: "app/views/template/fileUploadModal.html",
				controller: "FileUploadModalController",
				animation: false
			});
		}

		/**
		 * ファイルを追加するカテゴリ情報を受け取る
		 * @param  {[type]} event
		 * @param  {[type]} data
		 * @return {[type]}
		 */
		$scope.$on('addFile',function(event,data){
			event.stopPropagation();
			addFile(data);
		});

		/**
		 * 削除対象ファイル情報を受け取る
		 * @param  
		 * @param  
		 * @return 
		 */
		$scope.$on('deleteFile',function(event,data){
			event.stopPropagation();
			deleteFile(data);
		})

		/**
		 * ファイルアップロードモーダルを開く
		 * @param {[type]} node 
		 */
		var addFile = function(node){
			$uibModal.open({
				templateUrl: "app/views/template/fileUploadModal.html",
				controller: "FileUploadModalController",
				animation: true,
				resolve: {
					params: function(){
						return {
							node:node
						};
					}
				}
			});
		}

		/**
		 * ファイル削除処理
		 * @param  {[type]} manual 
		 * @return {[type]}        
		 */
		var deleteFile = function(manual){
			var param = {id:manual["id"], name:manual["fullFileName"]};
			connectApiService.delete(URL_CONF.urlBase + constURI.deleteFile,param).then(function(resultAPI){
				$state.reload();
			});
		}
	}

	//moduleへの登録
	angular.module(appName).controller('ManualController',['$scope','$state','$uibModal','connectApiService','constURI','sharedService','APP_CONF','URL_CONF',ManualCtrl]);
})();


/**
 * メニューバー用コントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function MenuCtrl($scope,$state,$uibModal,$window,sharedService,APP_CONF,URL_CONF){
		/** ラベル */
		$scope.labelCreateNotification = APP_CONF.iconLabelCreateNotification;
		$scope.labelNotification = APP_CONF.columnTitleNotification;
		$scope.labelAddFaq = APP_CONF.iconLabelAddFaq;
		$scope.labelImportFaq = APP_CONF.iconLabelImportFaq;
		$scope.labelManual = APP_CONF.columnTitleManual;
		$scope.labelTerm = APP_CONF.iconLabelTerm;

		/** 別ウィンドウ */
		$scope.$window = $window;

		/**
		 * マニュアルアイコン押下処理
		 * @return {[type]} [description]
		 */
		$scope.showManual = function(){
			sharedService.isShowNotification = false;
			sharedService.isShowFaqImport = false;
			sharedService.isShowCreateNotificationPanel = false;
			sharedService.isShowManual = !sharedService.isShowManual;
		};

		/**
		 * お知らせアイコン押下処理
		 * @return {[type]} [description]
		 */
		$scope.showNotification = function(){
			sharedService.isShowManual = false;
			sharedService.isShowFaqImport = false;
			sharedService.isShowCreateNotificationPanel = false;
			sharedService.isShowNotification = !sharedService.isShowNotification;

		}

		/**
		 * 新規お知らせアイコン押下処理
		 * @return {[type]} [description]
		 */
		$scope.showCreateNotificationPanel = function(){
			sharedService.isShowFaqImport = false;
			sharedService.isShowManual = false;
			sharedService.isShowNotification = true;
			sharedService.isShowCreateNotificationPanel = !sharedService.isShowCreateNotificationPanel;
		}

		/**
		 * FAQ追加アイコン押下処理
		 * @return {[type]} [description]
		 */
		$scope.createFaq = function(){
			$state.go('createFaq');
		}

		/**
		 * FAQ一括登録アイコン押下処理
		 * @return {[type]} 
		 */
		$scope.importExcel = function(){
			sharedService.isShowManual = false;
			sharedService.isShowNotification = false;
			sharedService.isShowCreateNotificationPanel = false;
			sharedService.isShowFaqImport = !sharedService.isShowFaqImport;
		}

		/**
		 * 辞書アイコン押下処理（別ウィンドウを立ち上げ）
		 * @return {[type]} [description]
		 */
		$scope.openDictionary = function(){
			$window.open(URL_CONF.termHtmlPath,'Term','width=600,height=400,location=no,resizable=yes,scrollbars=no,menubar=no,toolbar=no');
		}

	}

	angular.module(appName).controller('MenuController', ['$scope','$state','$uibModal','$window','sharedService','APP_CONF','URL_CONF',MenuCtrl]);
})();

/**
 * 辞書モーダルコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function DictionaryCtrl($scope,$state,connectApiService,constURI,$timeout,APP_CONF,URL_CONF) {
		$scope.isShowCreatePanel = false;
		
		/**
		 * 全用語取得
		 * @param  {[type]} apiResult)
		 * @return {[type]}           
		 */
		connectApiService.get(URL_CONF.urlBase + constURI.terms).then(function(apiResult){
			$scope.termList = apiResult.data;
		});

		/**
		 * 用語の意味を表示
		 * @param  {[type]} term [description]
		 * @return {[type]}      [description]
		 */
		$scope.openContent = function(term) {
			$scope.title = term.title;
			$scope.content = term.content;
		}

		/**
		 * 登録パネルとの切り替え処理
		 * @return {[type]} [description]
		 */
		$scope.toggleCreatePanel = function() {
			$scope.isShowCreatePanel = !$scope.isShowCreatePanel;
		}

		/**
		 * 新規用語登録処理
		 * @param  {[type]} term [description]
		 * @return {[type]}      [description]
		 */
		$scope.submit = function(term) {
			term.status = "valid";
			connectApiService.post(URL_CONF.urlBase + constURI.term,term).then(function(apiResult){
				if(apiResult.status == 201){
					$scope.isShowCreatePanel = false;
					// connectApiService.get(constURI.terms).then(function(apiResult){
					// 	$scope.termList = apiResult.data;
					// });
					$state.reload();
				}else{
					$timeout(function(){
						swal("登録に失敗しました");
					},1000);
				}

			});
		}

	}

	//moduleへの登録
	angular.module(appName).controller('DictionaryModalController',['$scope','$state','connectApiService','constURI','$timeout','APP_CONF','URL_CONF',DictionaryCtrl]);
})();
/**
 * マニュアルファイルアップロードモーダルコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function FileUploadCtrl($scope,$state,Upload,$uibModalInstance,connectApiService,constURI,params,$timeout,APP_CONF,URL_CONF) {
		
		//登録先カテゴリ名を引数から取得
		$scope.categoryName = params.node["name"];

		/**
		 * 登録ボタン押下処理
		 * @return {[type]} 
		 */
		$scope.submit = function() {
			var categoryID = params.node["id"];
			upload($scope.file, categoryID);
		}

		/**
		 * アップロード処理
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		var upload = function(file,categoryID){
			Upload.upload({
				url: URL_CONF.urlBase + '/upload/file',
				data: {
					file:file,
					categoryID:categoryID
				}
			})
			.success(function(resp){
				$uibModalInstance.close(resp);
				swal({
					title: "アップロード完了",
					type: "success",
					timer: 1000,
					showConfirmButton: false
				},function(){
					swal.close();
					$state.reload();
				});
			})
			.error(function(resp){
				$timeout(function(){
					swal("登録に失敗しました");
				});
			});
		}
	} 

	angular.module(appName).controller('FileUploadModalController',['$scope','$state','Upload','$uibModalInstance','connectApiService','constURI','params','$timeout','APP_CONF','URL_CONF',FileUploadCtrl]);
})();
/**
 * navbar.html用Controller
 * @return {[type]} 
 */
(function(){
	'use strict';

	function NavCtrl($scope,$state,sharedService){
		/**
		 * 検索処理
		 */
		$scope.search = function(query){
			sharedService.searchQuery = query;
			$state.go('main');
		}
		 
		/**
		 * ホームアイコンボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.home = function(){
			$state.go('main');
			// 検索ワードを空にする
			$scope.query = null;
			sharedService.searchQuery = null;
		};
	}

	//moduleへの登録
	angular.module(appName).controller('NavController',['$scope','$state','sharedService', NavCtrl]);
})();

/**
 * お知らせ新規登録パネルコントローラ
 * 
 */
(function(){
'use strict';

	function CreateNotificationCtrl($scope,$state,connectApiService,constURI,sharedService,$timeout,APP_CONF,URL_CONF){
		/** ラベル */
		$scope.createPanelHeader = APP_CONF.headerLabelCreateNotification;
		$scope.sendButton = APP_CONF.buttonLabelSend;
		
		/**
		 * 宛先リスト取得処理
		 * @param  {obj} query 
		 * @return {list} targetSkill      
		 */
		$scope.loadSkills = function(query) {
			return connectApiService.get(URL_CONF.urlBase + constURI.roles).then(function(apiResult){
				var targetSkill = [];
				var loadSkillList = apiResult.data;
				for(var i = 0; i < loadSkillList.length; i = (i+1)) {
					var skill = {};
					skill["text"] = loadSkillList[i]["skillName"];
					targetSkill.push(skill);
				}
				return targetSkill;
			});
		};

		/**
		 * 登録ボタン押下処理
		 * @param  {obj} notification
		 * @return {}                 
		 * TODO:websocket
		 */
		$scope.submit = function(notification) {
			$scope.loading = true;
			$scope.sendButton = APP_CONF.buttonLabelSending;
			notification.targetUserList = getSkillNameList($scope.selectSkillList);
			notification.filePath = "";
			connectApiService.post(URL_CONF.urlBase + constURI.notification,notification).then(function(resultAPI){
				$state.reload();
				sharedService.isShowCreateNotificationPanel = false;
			}).finally(function(){
				$scope.loading = false;
				$scope.sendButton = APP_CONF.buttonLabelSend;
			});
		};

		/**
		 * 選択したスキルリストの整形
		 * @param {list} selectSkillList
		 * @retun {list} skillNameList
		 */
		var getSkillNameList = function(selectSkillList) {
			var skillNameList = [];
			for(var i =0; i<selectSkillList.length; i=(i+1)){
				skillNameList.push(selectSkillList[i]["text"]);
			}
			return skillNameList;
		}

		/**
		 * 新規登録パネルを閉じる
		 * @return {} 
		 */
		$scope.closePanel = function() {
			sharedService.isShowCreateNotificationPanel = false;
		}
	}

	//moduleへ登録
	angular.module(appName).controller('CreateNotificationController',['$scope','$state','connectApiService','constURI','sharedService','$timeout','APP_CONF','URL_CONF',CreateNotificationCtrl]);
})();

/**
 * お知らせ詳細モーダル
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	//参照用モーダルコントローラ	
	function DetailNotificadtionCtrl($scope,$state,detailNotification,connectApiService,constURI,$uibModalInstance,APP_CONF,URL_CONF,$timeout){
		/** ラベル */
		$scope.buttonLabelEdit = APP_CONF.buttonLabelEdit;
		$scope.buttonLabelDelete = APP_CONF.buttonLabelDelete;
		/** 表示内容 */
		$scope.title= detailNotification.title;
		$scope.content = marked(detailNotification.content);
		$scope.count = detailNotification.usefulCount;
		$scope.targetId = detailNotification.id;

		/**
		 * 閉じるボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.cancel = function(){
			$uibModalInstance.dismiss();
		};

		/**
		 * 既読にするボタン押下処理
		 * @return {Boolean} [description]
		 */
		$scope.isReaded = function(){
			var userName = "user1";
			connectApiService.put(URL_CONF.urlBase + constURI.notification+detailNotification.id,userName).then(function(apiResult){
				if(apiResult.status == 200){
					$uibModalInstance.close();
					$state.reload();
				}else{
					$timeout(function(){
						swal("既読処理に失敗しました。");
					},1000);
				}
			});
		}

		/**
		 * 削除リンク押下処理
		 * @param  {[type]} faq [description]
		 * @return {[type]}     [description]
		 */
		$scope.delete = function(targetId) {
			sweetAlert({
				title: "このお知らせを削除しますか?",
				text: "削除した場合、データの復元はできません",
				type: "warning",
				showCancelButton: true,
				confirmButtonText: "OK",
				closeOnConfirm: false,
				showLoaderOnConfirm: true
			},
			function(){
				connectApiService.delete(URL_CONF.urlBase + constURI.notifications + targetId).then(function(resultAPI){
					if(resultAPI.status == 204){
						/** お知らせ一覧を再取得 */
						$timeout(function(){
							swal("正常に削除されました");
							$uibModalInstance.close();
							$state.reload();
						},1000);
					}else{
						$timeout(function(){
							swal("削除に失敗しました");
						},1000);
					}
				});
			});
		}
	}

	//moduleへ登録
	angular.module(appName).controller('DetailNotificationController',['$scope','$state','detailNotification','connectApiService','constURI','$uibModalInstance','APP_CONF','URL_CONF','$timeout',DetailNotificadtionCtrl]);
})();

/**
 * listNotification.html controller
 * @return {[type]}
 */
(function(){
'use strict';

	function ListNotificationCtrl($scope,connectApiService,constURI,sharedService,$uibModal,APP_CONF,URL_CONF){
		/** カラムタイトル */
		$scope.columnTitle = APP_CONF.columnTitleNotification;
		/** ラベル */
		$scope.labelImportant = APP_CONF.labelImportance;
		$scope.buttonLabel = APP_CONF.buttonLabelCreateNotification;
		/** ユーザ情報 */
		var apiParams = {userName:"user1",page:0};
		var sizeLimit = 10;

		/**
		 * 閉じるアイコン押下処理
		 * @return {Boolean} [description]
		 */
		$scope.isClose = function(){
			sharedService.isShowNotification = false;
		}

		/**
		 * お知らせ登録パネル開閉フラグ監視
		 * @param  {[type]} 
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		$scope.$watch(function(){
			return sharedService.isShowCreateNotificationPanel;
		},function(){
			$scope.isShowCreatePanel = sharedService.isShowCreateNotificationPanel;
		})

		/**
		 * お知らせを取得する
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(URL_CONF.urlBase + constURI.notifications,apiParams).then(function(apiResult){
			sharedService.notificationList = apiResult.data;
			setScope();
		});

		/**
		 * 次ページ読み込み処理
		 * @return {[type]} [description]
		 */
		$scope.loadMore = function(){
			if($scope.notifications && $scope.notifications.length % sizeLimit == 0){
				console.log('notification load more');
				var page = apiParams["page"];
				apiParams = {userName:"user1",page:page + 1};
				connectApiService.get(URL_CONF.urlBase + constURI.notifications,apiParams).then(function(apiResult){
					sharedService.notificationList.push.apply(sharedService.notificationList,apiResult.data);
				}).finally(function(){
					setScope();
				});
			}
		}

		/**
		 * scope反映処理
		 */
		var setScope = function(){
			$scope.notifications = sharedService.notificationList;
			$scope.unreadCount = filterNotification("unreadMemberList").length;
		}

		/**
		 * 重要度に応じてタグの色を切り替える
		 * @param {[type]} notification 
		 */
		$scope.setTagColor = function(notification) {
			if(notification.importance == 1) {
				return "importance--low";
			}else if(notification.importance == 2) {
				return "importance--middle";
			}else if(notification.importance == 3) {
				return "importance--high";
			}else{
				return "importance--none";
			}
		}

		/**
		 * 参照用モーダルを開く
		 * @param  {[type]}
		 * @return {[type]}
		 */
		$scope.open = function(notification){
			$uibModal.open({
				templateUrl: "app/views/notification/detailNotificationModal.html",
				controller: "DetailNotificationController",
				animation: false,
				resolve:{
					detailNotification:function(){
						return notification;
					}
				}
			});
		}

		/**
		 * 既読フィルタ
		 * @return {[type]} [description]
		 */
		$scope.readFilter = function(){
			return $scope.notifications = filterNotification("readMemberList");
		}

		/**
		 * 未読フィルタ
		 * @return {[type]} [description]
		 */
		$scope.unreadFilter = function(){
			return $scope.notifications = filterNotification("unreadMemberList")
		}

		/**
		 * フィルタリング処理
		 * @param  {[type]} targetList [description]
		 * @return {[type]}            [description]
		 */
		var filterNotification = function(targetList){
			var filteredList = [];
			for(var i=0; i<sharedService.notificationList.length; i++){
				var readMemberList = sharedService.notificationList[i][targetList];
				for(var j=0; j<readMemberList.length; j++){
					if(readMemberList[j] == apiParams["userName"]){
						filteredList.push(sharedService.notificationList[i]);
					}
				}
			}
			return filteredList; 
		}

	}

	//moduleへの登録
	angular.module(appName).controller('ListNotificationController',['$scope','connectApiService','constURI','sharedService','$uibModal','APP_CONF','URL_CONF',ListNotificationCtrl]);
})();



//お知らせ対象スキル選択モーダル用コントローラ
(function(){
'use strict';

	function SetTargetSkillModalCtrl($scope,$modalInstance,targetSkill,connectApiService,constURI,APP_CONF,URL_CONF){
		$scope.selection = [];
		if(targetSkill.length > 0){
			$scope.selection.push(targetSkill.skill);
		};

		/**
		 * スキルリストの取得
		 * @param  {[type]} resultAPI){			$scope.targetSkills [description]
		 * @return {[type]}                                    [description]
		 */
		connectApiService.get(URL_CONF.urlBase + constURI.roles).then(function(resultAPI){
			$scope.targetSkills = resultAPI.data;
		});

		/**
		 * チェックしたスキルをselctionに格納する
		 * @param  {[type]} targetSkill [description]
		 * @return {[type]}             [description]
		 */
		$scope.toggleSelection = function toggleSelection(targetSkill) {
		    var idx = $scope.selection.indexOf(targetSkill.skill);
		    if (idx > -1) {
		        $scope.selection.splice(idx, 1);
		    }
		    else {
		        $scope.selection.push(targetSkill.skill);
		    }
		};

		/**
		 * 決定ボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.decision = function(){
			$modalInstance.close($scope.selection);
		};

		/**
		 * キャンセルボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.cancel = function(){
			$modalInstance.dismiss('cancel');
		};		
	}

	//moduleへ登録する
	angular.module(appName).controller('SetTargetSkillModalController',['$scope','$modalInstance','connectApiService','constURI','APP_CONF','URL_CONF',SetTargetSkillModalCtrl]);
})();


/**
 * 用語集コントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function TermCtrl($scope,$state,$stateParams,$timeout,connectApiService,constURI,APP_CONF,URL_CONF){
		/** ラベル設定 */
		$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;
		$scope.buttonLabelCancel = APP_CONF.buttonLabelCancel;
		$scope.buttonLabelEdit = APP_CONF.buttonLabelEdit;
		$scope.buttonLabelDelete = APP_CONF.buttonLabelDelete;

		/**
		 * 全用語取得
		 * @param  {[type]} apiResult)
		 * @return {[type]}           
		 */
		connectApiService.get(URL_CONF.urlBase + constURI.terms).then(function(apiResult){
			$scope.termList = apiResult.data;
		});

		/**
		 * 用語の意味を表示
		 * @param  {[type]} term [description]
		 * @return {[type]}      [description]
		 */
		$scope.openContent = function(term) {
			$scope.isShowContent = true;
			$scope.targetTerm = term;
			$scope.title = term.title;
			$scope.content = term.content;
			$scope.targetTerm = term;
		}

		/**
		 * 新規登録アイコン押下
		 * @return {[type]} [description]
		 */
		$scope.openCreateArea = function(){
			$scope.isShowCreateArea = true;
			$state.go('createTerm');
		}

		/**
		 * キャンセルボタン押下
		 * @return {[type]} [description]
		 */
		$scope.closeCreateArea = function(){
			$scope.isShowCreateArea = false;
			$state.go('listTerm');
		}

		/**
		 * 登録ボタン押下処理
		 * @param  {[type]} term 
		 * @return {[type]}      
		 */
		$scope.submit = function(term) {
			$scope.loading = true;
			$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmitting;
			connectApiService.post(URL_CONF.urlBase + constURI.term,term)
							 .then(function(apiResult){
								$scope.isShowCreateArea = false;
								$state.go('listTerm');
							 }).finally(function(){
								$scope.loading = false;
								$scope.buttonLabelSubmit = APP_CONF.buttonLabelSubmit;
							 });
		}

		/**
		 * 編集ボタン押下処理
		 * @param  {[type]} targetTerm [description]
		 * @return {[type]}            [description]
		 */
		$scope.edit = function(targetTerm){
			$state.go('updateTerm',{'editTarget':targetTerm});
		}

		/**
		 * 削除ボタン押下処理
		 * @param  {[type]} targetTerm [description]
		 * @return {[type]}            [description]
		 */
		$scope.delete = function(targetTerm){
			sweetAlert({
				title: "この用語を削除しますか?",
				text: "削除した場合、データの復元はできません",
				type: "warning",
				showCancelButton: true,
				confirmButtonText: "OK",
				closeOnConfirm: false,
				showLoaderOnConfirm: true
			},
			function(){
				connectApiService.delete(URL_CONF.urlBase + constURI.terms + targetTerm.id).then(function(resultAPI){
					$timeout(function(){
						swal("正常に削除されました");
						$state.reload();
					},1000);
				});
			});
		}

	}

	angular.module(termApp).controller('TermController',['$scope','$state','$stateParams','$timeout','connectApiService','constURI','APP_CONF','URL_CONF',TermCtrl]);
})();
/**
 * 用語集アップデートコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function UpdateTermCtrl($scope,$state,$stateParams,connectApiService,constURI,APP_CONF,URL_CONF){
		/** ラベル設定 */
		$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdate;
		$scope.buttonLabelCancel = APP_CONF.buttonLabelCancel;

		/**
		 * 更新パラメータ取得
		 * @param  {[type]} $stateParams.editTarget [description]
		 * @return {[type]}                         [description]
		 */
		if($stateParams.editTarget){
			$scope.term = {
				title: $stateParams.editTarget["title"],
				content: $stateParams.editTarget["content"],
				id: $stateParams.editTarget["id"],
				status : $stateParams.editTarget["status"]
			}
		}

		/**
		 * 更新ボタン押下処理
		 * @param  {[type]} term [description]
		 * @return {[type]}      [description]
		 */
		$scope.submit = function(term){
			$scope.loading= true;
			$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdating;
			connectApiService.put(URL_CONF.urlBase + constURI.terms+term.id,term).success(function(){
				$state.go('listTerm');
			}).finally(function(){
				$scope.loading = false;
				$scope.buttonLabelSubmit = APP_CONF.buttonLabelUpdate;
			});
		}

		/**
		 * キャンセルボタン押下
		 * @return {[type]} [description]
		 */
		$scope.closeCreateArea = function(){
			$scope.isShowCreateArea = false;
			$state.go('listTerm');
		}

	}

	angular.module(termApp).controller('UpdateTermController',['$scope','$state','$stateParams','connectApiService','constURI','APP_CONF','URL_CONF',UpdateTermCtrl]);
})();