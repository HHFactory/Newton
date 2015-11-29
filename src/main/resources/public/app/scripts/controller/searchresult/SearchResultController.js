
(function(){

	function SearchResultCtrl($scope,$stateParams,connectApiService,constURI,modalService){
		/**
		 * elasticsearch検索用APIから検索結果を取得する
		 * @param  {[type]}
		 * @return {[type]}
		 */
		console.log($stateParams);
		var searchWord = {searchWord:$stateParams.searchWord};
		connectApiService.get(constURI.searchAPI,searchWord).then(function(apiResult){
			$scope.searchResultFAQs = apiResult.data.faqResult;
			$scope.searchResultNotifications = apiResult.data.notificationResult;
		});

		//参照用モーダルを開く
		$scope.open = function(argData){
			modalService.openModal(argData);
		};
	}

	//moduleへの登録
	angular.module('indexModule').controller('SearchResultController',SearchResultCtrl);
})();