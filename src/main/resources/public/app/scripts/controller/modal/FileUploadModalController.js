/**
 * ファイルアップロードモーダルコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function FileUploadCtrl($scope,$state,Upload,$uibModalInstance,connectApiService,constURI) {
		
		/**
		 * 
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		connectApiService.get(constURI.getManualCategories).then(function(apiResult){
			$scope.loadedCategories = apiResult.data;
			console.dir($scope.loadedCategories);
		});

		/**
		 * 
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		$scope.targetCategories = function(query) {
			var targetCategories = [];
			for(var i = 0; i < $scope.loadedCategories.length; i = (i+1)){
				var category = {};
				category["text"] = $scope.loadedCategories[i]["name"];
				targetCategories.push(category);
			}
			return targetCategories;
		}

		/**
		 * 
		 * @return {[type]} 
		 */
		$scope.submit = function() {
			for(var i = 0; i < $scope.loadedCategories.length; i = (i+1)){
				if($scope.selectCategory[0]["text"] === $scope.loadedCategories[i]["name"]){
					var categoryID = $scope.loadedCategories[i]["id"];
				}
			}
			upload($scope.file, categoryID);
		}

		/**
		 * 
		 * @param  {[type]} 
		 * @return {[type]} 
		 */
		var upload = function(file,categoryID){
			Upload.upload({
				url: '/upload',
				data: {file:file,categoryID:categoryID}
			}).then(function(resp) {
				console.log(resp);
				$uibModalInstance.close(resp);
				$state.reload();
			},function(resp) {
				console.log(resp.status);
			});
		}
	} 

	angular.module('indexModule').controller('FileUploadModalController',['$scope','$state','Upload','$uibModalInstance','connectApiService','constURI',FileUploadCtrl]);
})();