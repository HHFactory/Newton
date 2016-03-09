
/**
 * FAQ一覧Controller
 */
(function(){
	'use strict';

	function ListFaqCtrl($scope,connectApiService,constURI,sharedService,APP_CONF){
		/** カラムタイトル */
		$scope.columnTitle = APP_CONF.columnTitleFaq;

		/** 選択済みカテゴリリスト　*/
		$scope.selectedList = [];
		$scope.categoryList = [];

		/**
		 * 接続先API判定
		 * @param  {[type]} 
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		$scope.$watch(function(){
			return sharedService.searchQuery;
		},function(){
			/** 全件取得時 */
			if(!sharedService.searchQuery){
			 	getData(APP_CONF.urlBase + constURI.searchALL);
			}
			/** 検索時 */
			else{
				var searchWord = {searchWord:sharedService.searchQuery};
				var prefix = sharedService.searchQuery.substring(0,1);
				// ID検索
				if(prefix == '#'){
					var targetID = sharedService.searchQuery.substr(1);
					getData(APP_CONF.urlBase + constURI.faqs+targetID);
				}
				// タグ検索
				else if(prefix == '@'){

				}
				// キーワード検索
				else {
					getData(APP_CONF.urlBase + constURI.searchAPI,searchWord);
				}
			}
		});

		/**
		 * データ取得処理
		 * @param  {[type]} targetURI [description]
		 * @return {[type]}           [description]
		 */
		var getData = function(targetURI,param){
			connectApiService.get(targetURI,param).then(function(apiResult){
				sharedService.faqList = apiResult.data;
				setScope();
			});
		}

		/**
		 * scopeへデータ反映
		 */
		var setScope = function(){
			$scope.faqList = sharedService.faqList["faqList"];
			$scope.categoryList = sharedService.faqList["faqCategoryList"];
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
			// $scope.content = marked(faq.content);
		}

	}

	//moduleへの登録
	angular.module(appName).controller('ListFaqController',['$scope','connectApiService','constURI','sharedService','APP_CONF',ListFaqCtrl]);
})();

