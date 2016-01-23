
/**
 * detailFaq.html(FAQ詳細画面)Controller
 * 
 */
(function(){
'use strict';

	function DetailFaqCtrl($scope,connectApiService,constURI,modalService,sharedService){

		// 表示対象FAQを受け取る
		$scope.faq = sharedService.data;

		/**
		 * 修正依頼ボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.requestModify = function(){
			modalService.openSendModal();
		}

		/**
		 * 閉じるボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.close = function(){

		}

		/**
		 * 役に立ったボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.useful = function(id){
			connectApiService.put(constURI.putFaqUseful+id).then(function(){
				$state.go('main');
			});
		}
	}

	//moduleへ登録
	angular.module('indexModule').controller('DetailFaqController',['$scope','connectApiService','constURI','modalService','sharedService',DetailFaqCtrl]);
})();