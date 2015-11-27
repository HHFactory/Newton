
//ModalControler
(function(){
'use strict';
	
	//参照用モーダルコントローラ	
	function ModalCtrl($scope,$modalInstance,argdata,connectApiService,constURI){
		//contentはmarkdownをhtmlに変換して表示する
		$scope.title= argdata.title;
		$scope.content = marked(argdata.content);

		//役に立ったボタン押下処理
		$scope.useful = function(){
			connectApiService.put(constURI.putFAQuseful+argdata.id,argdata).then(function(){
				$modalInstance.close();
			});
		};

		//閉じるボタン押下処理
		$scope.cancel = function(){
			$modalInstance.dismiss();
		};
	}

	//新規作成用ページコントローラ
	function CreateModalCtrl($scope,$modalInstance,$http,connectApiService,constURI){
		//FAQ新規登録
		$scope.post = function(faq){
			connectApiService.post(constURI.postFAQ,faq).then(function(){
				$modalInstance.close();
			});
		};
	}
	
	//moduleへ登録
	angular.module('indexModule').controller('ModalController',ModalCtrl);
	angular.module('indexModule').controller('CreateModalController',CreateModalCtrl);
})();
