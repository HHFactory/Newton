/**
 * listFaq.html Controller
 * @return {[type]}
 */
(function(){
	'use strict';

	function ListFaqCtrl($scope,connectApiService,constURI,sharedService,APP_CONF){
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
			 	getData(APP_CONF.urlBase + constURI.faqs,searchParam);
			}
			// 検索ワードが入力されている場合
			else{
				searchParam = {searchWord:sharedService.searchQuery, page:0};
				var prefix = sharedService.searchQuery.substring(0,1);
				// ID検索
				if(prefix == '#'){
					var targetID = sharedService.searchQuery.substr(1);
					getData(APP_CONF.urlBase + constURI.faqs+targetID);
				}
				// キーワード検索
				else {
					getData(APP_CONF.urlBase + constURI.searchAPI,searchParam);
				}
			}
		});

		/**
		 * 次ページデータ取得処理
		 * @return {[type]} [description]
		 */
		$scope.loadMore = function(){
			console.log('faq load more');
			if($scope.listCount){
				var page = $scope.listCount/sizeLimit;
				searchParam = {searchWord: sharedService.searchQuery, page: page+1};
				// 検索ワード入力時
				if(sharedService.searchQuery){
					getData(APP_CONF.urlBase + constURI.searchAPI,searchParam);
				}
				// 検索ワードが空の場合
				else{
					getData(APP_CONF.urlBase + constURI.faqs,searchParam);
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
	angular.module(appName).controller('ListFaqController',['$scope','connectApiService','constURI','sharedService','APP_CONF',ListFaqCtrl]);
})();

