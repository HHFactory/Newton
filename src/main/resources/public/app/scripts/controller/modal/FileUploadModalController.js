/**
 * ファイルアップロードモーダルコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function FileUploadCtrl($scope,$state,Upload,$uibModalInstance,connectApiService,constURI,params) {
		
		/**
		 * マニュアル全階層を取得する
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		// connectApiService.get(constURI.manualCategory).then(function(apiResult){
		// 	$scope.loadedCategories = apiResult.data;
		// });

		/**
		 * マニュアルカテゴリ選択処理
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		// $scope.targetCategories = function(query) {
		// 	var targetCategories = [];
		// 	for(var i = 0; i < $scope.loadedCategories.length; i = (i+1)){
		// 		var category = {};
		// 		category["text"] = $scope.loadedCategories[i]["name"];
		// 		targetCategories.push(category);
		// 	}
		// 	return targetCategories;
		// }

		//登録先カテゴリ名を引数から取得
		$scope.categoryName = params.node["name"];

		/**
		 * 登録ボタン押下処理
		 * @return {[type]} 
		 */
		$scope.submit = function() {
			// for(var i = 0; i < $scope.loadedCategories.length; i = (i+1)){
			// 	if($scope.selectCategory[0]["text"] === $scope.loadedCategories[i]["name"]){
			// 		var categoryID = $scope.loadedCategories[i]["id"];
			// 	}
			// }
			var categoryID = params.node["id"];
			upload($scope.file, categoryID);
		}

		/**
		 * アップロード処理
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		var upload = function(file,categoryID){
			Upload.upload({
				url: '/newton-1.0/upload',
				data: {
					file:file,
					categoryID:categoryID
				}
			}).then(function(resp) {
				console.log(resp);
				$uibModalInstance.close(resp);
				$state.reload();
			},function(resp) {
				console.log(resp.status);
			});
		}
	} 

	angular.module('indexModule').controller('FileUploadModalController',['$scope','$state','Upload','$uibModalInstance','connectApiService','constURI','params',FileUploadCtrl]);
})();