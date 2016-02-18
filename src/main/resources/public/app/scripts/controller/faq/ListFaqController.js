
/**
 * faq一覧画面Controller
 */
(function(){
	'use strict';

	function ListFaqCtrl($scope,$state,connectApiService,constURI,sharedService,$uibModal){
	 	
	 	/**
	 	 * FAQ取得処理
	 	 * @param  {[type]}
	 	 * @return {[type]}
	 	 */
		connectApiService.get(constURI.faqs).then(function(apiResult){
	 		$scope.faqList = apiResult.data;
	 	});

	    /**
	     * FAQ詳細モーダルを開く
	     * @param  {[type]} faq 
	     * @return {[type]}     
	     */
	    $scope.openDetail = function(faq) {
	    	$uibModal.open({
	    		templateUrl: "app/views/template/modal.html",
	    		controller: "ModalController",
	    		animation: false,
	    		resolve: {
	    			data: function(){
	    				return faq;
	    			}
	    		}
	    	});
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
		$scope.importExcel = function(e) {
			$uibModal.open({
				templateUrl: "app/views/template/fileLoadModal.html",
				controller: "FileLoadModalController",
				animation: false,
				backdrop: true
			});
		}

		/**
		 * 編集画面に遷移する
		 * @param  {[type]} faq [description]
		 * @return {[type]}     [description]
		 */
		$scope.edit = function(faq) {
			console.dir(faq);
			$state.go('createFaq',{editTarget:faq});
		}

	}

	//moduleへの登録
	angular.module('indexModule').controller('ListFaqController',['$scope','$state','connectApiService','constURI','sharedService','$uibModal',ListFaqCtrl]);
})();

