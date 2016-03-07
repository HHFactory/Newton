
/**
 * faq一覧画面Controller
 */
(function(){
	'use strict';

	function ListFaqCtrl($scope,$state,connectApiService,constURI,sharedService,$timeout,APP_CONF){
		/** カラムタイトル */
		$scope.columnTitle = APP_CONF.columnTitleFaq;
		/** ラベル */
		$scope.buttonLabelEdit = APP_CONF.buttonLabelEdit;
		$scope.buttonLabelDelete = APP_CONF.buttonLabelDelete;
		$scope.buttonLabelModifyReq = APP_CONF.buttonLabelModifyReq;
		$scope.buttonLabelUseful = APP_CONF.buttonLabelUseful;

		/** 選択済みカテゴリリスト　*/
		$scope.selectedList = [];
		$scope.categoryList = [];

		/**
		 * FAQ一覧の取得（及び検索処理)
		 * @param  {[type]} 
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		$scope.$watch(function(){
			return sharedService.searchQuery;
		},function(){
			/** mysqlから取得 */
			if(!sharedService.searchQuery){
				// connectApiService.get(constURI.faqs).then(function(apiResult){
			 // 		$scope.faqList = apiResult.data;
			 // 	});
			 	connectApiService.get(constURI.searchALL).then(function(apiResult){
			 		$scope.faqList = apiResult.data["faqList"];
			 		$scope.categoryList = apiResult.data["faqCategoryList"];
			 	});
			}
			/** elasticsearchから検索 */
			else{
				var searchWord = {searchWord:sharedService.searchQuery};
				var prefix = sharedService.searchQuery.substring(0,1);
				// ID検索
				if(prefix == '#'){
					var targetID = sharedService.searchQuery.substr(1);
					connectApiService.get(constURI.faqs+targetID).then(function(apiResult){
						$scope.faqList = apiResult.data;
					});
				}
				// タグ検索
				else if(prefix == '@'){

				}
				// キーワード検索
				else {
					connectApiService.get(constURI.searchAPI,searchWord).then(function(apiResult){
						$scope.faqList = apiResult.data["faqList"];
						$scope.categoryList = apiResult.data["faqCategoryList"];
					});
				}
			}
		});

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
	    	// $scope.content = $showdown.makeHtml(faq.content);
	    	$scope.content = marked(faq.content);
	    }

		/**
		 * 編集リンク押下処理
		 * @param  {[type]} faq 
		 * @return {[type]}     
		 */
		$scope.edit = function(faq) {
			$state.go('createFaq',{editTarget:faq});
		}

		/**
		 * 削除リンク押下処理
		 * @param  {[type]} faq 
		 * @return {[type]}     
		 * TODO:処理をまとめる
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
				connectApiService.delete(constURI.faq + targetId).then(function(resultAPI){
					if(resultAPI.status == 204){
						/** FAQリストを再取得 */
						$timeout(function(){
							swal("正常に削除されました");
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

		/**
		 * 役に立ったボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.useful = function(faq){
			connectApiService.put(constURI.faqs+faq.id).then(function(apiResult){
				$scope.usefulCount = apiResult.data;
			});
		};

		/**
		 * マニュアルエリア開閉フラグチェック
		 * @type {Boolean}
		 */
		// $scope.$watch (function() {
		// 	return sharedService.isShowManual;
		// },function() {
		// 	$scope.isShowManual = sharedService.isShowManual;
		// });



	}

	//moduleへの登録
	angular.module('indexModule').controller('ListFaqController',['$scope','$state','connectApiService','constURI','sharedService','$timeout','APP_CONF',ListFaqCtrl]);
})();

