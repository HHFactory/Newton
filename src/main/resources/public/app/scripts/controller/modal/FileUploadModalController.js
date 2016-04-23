/**
 * マニュアルファイルアップロードモーダルコントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	function FileUploadCtrl($scope,$state,Upload,$uibModalInstance,connectApiService,constURI,params,$timeout,APP_CONF,URL_CONF) {
		
		//登録先カテゴリ名を引数から取得
		$scope.categoryName = params.node["name"];

		/**
		 * 登録ボタン押下処理
		 * @return {[type]} 
		 */
		$scope.submit = function() {
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
				url: URL_CONF.urlBase + 'upload/file',
				data: {
					file:file,
					categoryID:categoryID
				}
			})
			.success(function(resp){
				$uibModalInstance.close(resp);
				swal({
					title: "アップロード完了",
					type: "success",
					timer: 1000,
					showConfirmButton: false
				},function(){
					swal.close();
					$state.reload();
				});
			})
			.error(function(resp){
				$timeout(function(){
					swal("登録に失敗しました");
				});
			});
		}
	} 

	angular.module(indexModule).controller('FileUploadModalController',['$scope','$state','Upload','$uibModalInstance','connectApiService','constURI','params','$timeout','APP_CONF','URL_CONF',FileUploadCtrl]);
})();