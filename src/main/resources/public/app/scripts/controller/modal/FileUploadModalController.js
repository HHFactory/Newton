/**
 * ファイルアップロードモーダルコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function FileUploadCtrl($scope,Upload,$uibModalInstance) {
		
		$scope.submit = function() {
			console.log($scope.file);
			upload($scope.file);
		}

		var upload = function(file){
			Upload.upload({
				url: '/upload',
				data: {file:file}
			}).then(function(resp) {
				console.log(resp);
				console.log('success');
				$uibModalInstance.close(resp);
			},function(resp) {
				console.log('error' + resp.status);
			});
		}
	} 

	angular.module('indexModule').controller('FileUploadModalController',['$scope','Upload','$uibModalInstance',FileUploadCtrl]);
})();