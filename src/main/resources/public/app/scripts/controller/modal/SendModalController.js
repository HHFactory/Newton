/**
 * FAQ修正依頼送信モーダルController
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function SendModalCtrl($scope,$state,$modalInstance,connectApiService,constURI,sharedService){
			
		//対象FAQを取得		
		$scope.faq = sharedService.data;
		$scope.title = "[FAQ修正依頼]対象FAQ#"+$scope.faq.id;
		
		/**
		 * 送信対象者リスト取得処理	
		 * @param  {[type]} apiResult){			$scope.targetList [description]
		 * @return {[type]}                                  [description]
		 */
		connectApiService.get(constURI.getUserList).then(function(apiResult){
			$scope.targetUserList = apiResult.data;
		});

		/**
		 * 送信ボタン押下処理	
		 * @param  {[type]} todo [description]
		 * @return {[type]}      [description]
		 */
		$scope.send = function(todo){
			todo.title = $scope.title;
			connectApiService.post(constURI.postToDo,todo).then(function(apiResult){
				$modalInstance.close();
			});
		};

		/**
		 * キャンセルボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.cancel = function(){
			$modalInstance.dismiss();
		};
	}

	//moduleに登録
	angular.module('indexModule').controller('SendModalController',SendModalCtrl);
})();