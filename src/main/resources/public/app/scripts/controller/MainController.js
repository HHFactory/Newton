//MainController
(function(){
	'use strict';
	
	function MainCtrl($scope,sharedService){	

		/**
		 * マニュアルエリア開閉フラグチェック
		 * @type {Boolean}
		 */
		$scope.isShowManual = sharedService.isShowManual;
		$scope.$watch (function() {
			return sharedService.isShowManual;
		},function() {
			$scope.isShowManual = sharedService.isShowManual;
		});
		
		/**
		 * FAQ一覧、修正対象リスト画面の切り替え	
		 * @type {[type]}
		 */
		$scope.checkModifyFaqList = sharedService.checkModifyTask;
		$scope.$watch(function() {
		    return sharedService.checkModifyTask;
		}, function() {
		    $scope.checkModifyFaqList = sharedService.checkModifyTask;
		});

	}	

	//moduleへ登録
	angular.module('indexModule').controller('MainController',['$scope','sharedService',MainCtrl]);
})();




