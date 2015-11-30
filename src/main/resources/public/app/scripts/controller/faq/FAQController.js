
/**
 * FAQController
 */
(function(){
	'use strict';

	function FAQCtrl($scope,$state,connectApiService,constURI,modalService){
	 	/**
	 	 * FAQ取得処理
	 	 * @param  {[type]}
	 	 * @return {[type]}
	 	 */
		connectApiService.get(constURI.getFAQ).then(function(apiResult){
	 		$scope.faqlist = apiResult.data;
	 	});

	 	/**
	     * 参照用モーダルを開く
	     * @param  {[type]}
	     * @return {[type]}
	     */
	    $scope.open = function(faq){
	    	modalService.openModal(faq);
	    };
	    
	    /**
	     * 新規登録画面を開く 
	     */
		$scope.create = function(){
			$state.go('createFAQ');
		};		
	}

	//moduleへの登録
	angular.module('indexModule').controller('FAQController',FAQCtrl);
})();

