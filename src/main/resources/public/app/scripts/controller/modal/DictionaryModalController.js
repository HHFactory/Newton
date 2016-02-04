
/**
 * 辞書モーダルコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function DictionaryCtrl($scope,connectApiService,constURI) {
		$scope.isShowCreatePanel = false;
		
		/**
		 * 用語のタイトル検索
		 * @param  {[type]} query [description]
		 * @return {[type]}       [description]
		 */
		$scope.search = function(query) {
			var keyword = {title: query};
			connectApiService.get(constURI.searchTerm,keyword).then(function(resultAPI){
				console.dir(resultAPI.data);
				$scope.termList = resultAPI.data;
			});
		}

		/**
		 * 用語の意味を表示
		 * @param  {[type]} term [description]
		 * @return {[type]}      [description]
		 */
		$scope.openContent = function(term) {
			$scope.title = term.title;
			$scope.content = term.content;
		}

		/**
		 * 登録パネルとの切り替え処理
		 * @return {[type]} [description]
		 */
		$scope.toggleCreatePanel = function() {
			if($scope.isShowCreatePanel == false) {
				$scope.isShowCreatePanel = true;
			}else{
				$scope.isShowCreatePanel = false;
			}
		}

		/**
		 * 新規用語登録処理
		 * @param  {[type]} term [description]
		 * @return {[type]}      [description]
		 */
		$scope.submit = function(term) {
			console.dir(term);
			term.status = "valid";
			connectApiService.post(constURI.postTerm,term).then(function(resultAPI){
				console.log(resultAPI.data);
				$scope.isShowCreatePanel = false;
			});
		}

	}

	//moduleへの登録
	angular.module('indexModule').controller('DictionaryModalController',['$scope','connectApiService','constURI',DictionaryCtrl]);
})();