/**
 * 修正対象FAQリスト用コントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function ModifyTaskListCtrl($scope,connectApiService,constURI,sharedService){
		$scope.showMenuFlag = false;
		var status = {status:"valid"};
		/**
		 * 修正対象リストを取得する
		 */
		connectApiService.get(constURI.getToDoList,status).then(function(apiResult){
			$scope.modifyTaskList = apiResult.data;
		});

		/**
		 * SVユーザリストを取得する
		 */
		connectApiService.get(constURI.users).then(function(apiResult){
			$scope.targeUserList = apiResult.data;
		});

		/**
		 * 修正対象ユーザを決定する
		 */
		

		/**
		 * 詳細画面を開く
		 */
		$scope.openDetailView = function($event){
			$scope.showMenuFlag = true;
			
		}

		/**
		 * FAQ一覧画面に戻る
		 * @return {[type]} [description]
		 */
		$scope.backToFaqList = function(){
			sharedService.checkModifyTask = false;
		}


	}

	//module
	angular.module('indexModule').controller('ModifyTaskListController',['$scope','connectApiService','constURI','sharedService',ModifyTaskListCtrl]);
})();