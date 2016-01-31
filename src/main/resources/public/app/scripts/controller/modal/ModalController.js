
//ModalControler
(function(){
'use strict';
	
	//参照用モーダルコントローラ	
	function ModalCtrl($scope,data,connectApiService,constURI){
		//contentはmarkdownをhtmlに変換して表示する
		$scope.title= data.title;
		//$scope.content = marked(data.content);

		/**
		 * 役に立ったボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.useful = function(){
			connectApiService.put(constURI.putFAQuseful+data.id,data).then(function(){
				$modalInstance.close();
			});
		};

		/**
		 * 閉じるボタン押下処理
		 * @return {[type]} [description]
		 */
		// $scope.cancel = function(){
		// 	$modalInstance.dismiss();
		// };
	}

	//moduleへ登録
	angular.module('indexModule').controller('ModalController',['$scope','data','connectApiService','constURI',ModalCtrl]);
})();
