
//ModalControler
(function(){
'use strict';
	
	//参照用モーダルコントローラ	
	function ModalCtrl($scope,$modalInstance,argdata,connectApiService,constURI){
		//contentはmarkdownをhtmlに変換して表示する
		$scope.title= argdata.title;
		$scope.content = marked(argdata.content);

		/**
		 * 役に立ったボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.useful = function(){
			connectApiService.put(constURI.putFAQuseful+argdata.id,argdata).then(function(){
				$modalInstance.close();
			});
		};

		/**
		 * 閉じるボタン押下処理
		 * @return {[type]} [description]
		 */
		$scope.cancel = function(){
			$modalInstance.dismiss();
		};
	}

	//moduleへ登録
	angular.module('indexModule').controller('ModalController',ModalCtrl);
})();
