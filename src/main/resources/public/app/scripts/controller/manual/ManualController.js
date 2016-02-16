
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
		connectApiService.get(constURI.getManualList).then(function(resultAPI){
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
				templateUrl: "/app/views/template/fileUploadModal.html",
				controller: "FileUploadModalController",
				animation: false
			});
		}

		//ui.tree test
		$scope.remove = function (scope) {
		  scope.remove();
		};

		$scope.toggle = function (scope) {
			console.log('toggle');
			scope.toggle();
		};

		$scope.moveLastToTheBeginning = function () {
		  var a = $scope.data.pop();
		  $scope.data.splice(0, 0, a);
		};

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
		 * ファイル追加モーダルを開く
		 */
		$scope.addManualFile = function(node) {
			console.log(node);
		}

		$scope.deleteFile = function($event){
			console.log('delete');
		}

	}

	//moduleへの登録
	angular.module('indexModule').controller('ManualController',['$scope','$uibModal','connectApiService','constURI',ManualCtrl]);
})();
