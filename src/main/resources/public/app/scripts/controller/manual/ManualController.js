
/**
 * manualbar.controller
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function ManualCtrl($scope,$uibModal,connectApiService,constURI){

		/**
		 * マニュアルリストを取得
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(constURI.manuals).then(function(resultAPI){
			//$scope.categories = resultAPI.data;
			$scope.data = resultAPI.data;
			console.dir($scope.data);
		});

		/**
		 * ファイル登録モーダルを開く
		 * @return {[type]} [description]
		 */
		$scope.openFileUploadModal = function() {
			$uibModal.open({
				templateUrl: "app/views/template/fileUploadModal.html",
				controller: "FileUploadModalController",
				animation: false
			});
		}

		/**
		 * 子カテゴリを追加
		 * @param  {[type]} scope [description]
		 * @return {[type]}       [description]
		 */
		$scope.newSubItem = function (scope,itemName) {
			var nodeData = scope.$modelValue;
			console.dir(scope.$modelValue);
			nodeData.children.push({
				id: "",
				name: itemName,
				children: []
			});
		};

		/**
		 * ファイルアップロードモーダルを開く
		 * @param {[type]} node 
		 */
		$scope.addFile = function(node){
			$uibModal.open({
				templateUrl: "app/views/template/fileUploadModal.html",
				controller: "FileUploadModalController",
				animation: false,
				resolve: {
					params: function(){
						return {
							node:node
						};
					}
				}
			});
		}

		/**
		 * ファイル削除処理
		 * @param  {[type]} manual 
		 * @return {[type]}        
		 */
		$scope.deleteFile = function(manual){
			var param = {id:manual["id"], name:manual["fullFileName"]};
			connectApiService.delete(constURI.deleteFile,param).then(function(resultAPI){
				console.log('delete success');
			});
		}
	}

	//moduleへの登録
	angular.module('indexModule').controller('ManualController',['$scope','$uibModal','connectApiService','constURI',ManualCtrl]);
})();
