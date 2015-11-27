
/**
 * FAQController
 */
(function(){
	'use strict';

	function FAQCtrl($scope,$state,connectApiService,constURI,modalService){
	 	/**
	 	 * FAQ取得APIをServiceを通して呼び出す 
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
	     * 新規登録用モーダルを開く 
	     */
		$scope.create = function(){
			$state.go('create');
		};		
	}

	//moduleへの登録
	angular.module('indexModule').controller('FAQController',FAQCtrl);
})();

