
/**
 * 辞書モーダルコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function DictionaryCtrl($scope,connectApiService,constURI,$timeout) {
		$scope.isShowCreatePanel = false;
		
		/**
		 * 全用語取得
		 * @param  {[type]} apiResult)
		 * @return {[type]}           
		 */
		connectApiService.get(constURI.terms).then(function(apiResult){
			$scope.termList = apiResult.data;
		});

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
			connectApiService.post(constURI.term,term).then(function(apiResult){
				if(apiResult.status == 201){
					console.log(apiResult.data);
					$scope.isShowCreatePanel = false;
					connectApiService.get(constURI.terms).then(function(apiResult){
						$scope.termList = apiResult.data;
					});
				}else{
					$timeout(function(){
						swal("登録に失敗しました");
					},1000);
				}

			});
		}

	}

	//moduleへの登録
	angular.module('indexModule').controller('DictionaryModalController',['$scope','connectApiService','constURI','$timeout',DictionaryCtrl]);
})();