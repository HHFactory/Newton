
/**
 * faq一覧画面Controller
 */
(function(){
	'use strict';

	function ListFaqCtrl($scope,$state,connectApiService,constURI,sharedService){
	 	
	 	/**
	 	 * FAQ取得処理
	 	 * @param  {[type]}
	 	 * @return {[type]}
	 	 */
		connectApiService.get(constURI.getFaqList).then(function(apiResult){
	 		$scope.faqList = apiResult.data;
	 	});

	    /**
	     * FAQ詳細画面を開く
	     * @param  {[type]} faq [description]
	     * @return {[type]}     [description]
	     */
	    $scope.openDetail = function(faq){
	    	sharedService.data = faq;
	    	$state.go('detailFaq');
	    }
	    
	    /**
	     * 新規登録画面を開く 
	     */
		$scope.create = function(){
			$state.go('createFaq');
		};	

		/**
		 * 修正対象リストを開く
		 */
		$scope.checkModifyTaskList = function(){
			sharedService.checkModifyTask = true;
		};

		/**
		 * ファイルインポートダイアログを開く
		 * @return {[type]} [description]
		 */
		$scope.importExcel = function() {

		}

	}

	//moduleへの登録
	angular.module('indexModule').controller('ListFaqController',['$scope','$state','connectApiService','constURI','sharedService',ListFaqCtrl]);
})();
