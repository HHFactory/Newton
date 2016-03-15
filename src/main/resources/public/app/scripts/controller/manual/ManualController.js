/**
 * manual.controller
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function ManualCtrl($scope,$state,$uibModal,connectApiService,constURI,sharedService,APP_CONF){
		/** カラムタイトル */
		$scope.columnTitle = APP_CONF.columnTitleManual;
		
		/**
		 * 閉じるボタン押下
		 * @return {Boolean} [description]
		 */
		$scope.isClose = function(){
			sharedService.isShowManual = false;
		}

		/**
		 * マニュアルリストを取得
		 * @param  {[type]}
		 * @return {[type]}
		 */
		connectApiService.get(APP_CONF.urlBase + constURI.manuals).then(function(apiResult){
			sharedService.manualList = apiResult.data;
			$scope.data = sharedService.manualList;
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
		 * ファイルを追加するカテゴリ情報を受け取る
		 * @param  {[type]} event
		 * @param  {[type]} data
		 * @return {[type]}
		 */
		$scope.$on('addFile',function(event,data){
			event.stopPropagation();
			addFile(data);
		});

		/**
		 * 削除対象ファイル情報を受け取る
		 * @param  
		 * @param  
		 * @return 
		 */
		$scope.$on('deleteFile',function(event,data){
			event.stopPropagation();
			deleteFile(data);
		})

		/**
		 * ファイルアップロードモーダルを開く
		 * @param {[type]} node 
		 */
		var addFile = function(node){
			$uibModal.open({
				templateUrl: "app/views/template/fileUploadModal.html",
				controller: "FileUploadModalController",
				animation: true,
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
		var deleteFile = function(manual){
			var param = {id:manual["id"], name:manual["fullFileName"]};
			connectApiService.delete(APP_CONF.urlBase + constURI.deleteFile,param).then(function(resultAPI){
				$state.reload();
			});
		}
	}

	//moduleへの登録
	angular.module(appName).controller('ManualController',['$scope','$state','$uibModal','connectApiService','constURI','sharedService','APP_CONF',ManualCtrl]);
})();
