
/**
 * メニューバー用コントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function MenuCtrl($scope,$state,$uibModal,sharedService,APP_CONF){
		/** ラベル */
		$scope.labelNotification = APP_CONF.columnTitleNotification;
		$scope.labelAddFaq = APP_CONF.iconLabelAddFaq;
		$scope.labelImportFaq = APP_CONF.iconLabelImportFaq;
		$scope.labelManual = APP_CONF.columnTitleManual;
		$scope.labelTerm = APP_CONF.iconLabelTerm;
		/**
		 * マニュアルアイコン押下処理
		 * @return {[type]} [description]
		 */
		$scope.showManual = function(){
			sharedService.isShowManual = true;
		};

		/**
		 * お知らせアイコン押下処理
		 * @return {[type]} [description]
		 */
		$scope.showNotification = function(){
			sharedService.isShowFaqImport = false;
			sharedService.isShowNotification = true;
		}

		/**
		 * FAQ追加アイコン押下処理
		 * @return {[type]} [description]
		 */
		$scope.createFaq = function(){
			$state.go('createFaq');
		}

		/**
		 * FAQ一括登録アイコン押下処理
		 * @return {[type]} 
		 */
		$scope.importExcel = function(){
			sharedService.isShowFaqImport = true;
		}

		 /**
		  * 辞書アイコン押下処理
		  * @return {[type]} [description]
		  */
		$scope.openDictionary = function() {
			$uibModal.open({
				templateUrl: "app/views/template/dictionaryModal.html",
				controller: "DictionaryModalController",
				animation: false
			});
		}

	}


	angular.module('indexModule').controller('MenuController', ['$scope','$state','$uibModal','sharedService','APP_CONF',MenuCtrl]);
})();