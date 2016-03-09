
/**
 * メニューバー用コントローラ
 * @return {[type]} [description]
 */
(function(){
'use strict';
	
	function MenuCtrl($scope,$state,$uibModal,sharedService,APP_CONF){
		/** ラベル */
		$scope.labelCreateNotification = APP_CONF.iconLabelCreateNotification;
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
			sharedService.isShowNotification = false;
			sharedService.isShowFaqImport = false;
			sharedService.isShowCreateNotificationPanel = false;
			sharedService.isShowManual = !sharedService.isShowManual;
		};

		/**
		 * お知らせアイコン押下処理
		 * @return {[type]} [description]
		 */
		$scope.showNotification = function(){
			sharedService.isShowManual = false;
			sharedService.isShowFaqImport = false;
			sharedService.isShowCreateNotificationPanel = false;
			sharedService.isShowNotification = !sharedService.isShowNotification;

		}

		/**
		 * 新規お知らせアイコン押下処理
		 * @return {[type]} [description]
		 */
		$scope.showCreateNotificationPanel = function(){
			sharedService.isShowFaqImport = false;
			sharedService.isShowManual = false;
			sharedService.isShowNotification = true;
			sharedService.isShowCreateNotificationPanel = !sharedService.isShowCreateNotificationPanel;
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
			sharedService.isShowManual = false;
			sharedService.isShowNotification = false;
			sharedService.isShowCreateNotificationPanel = false;
			sharedService.isShowFaqImport = !sharedService.isShowFaqImport;
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


	angular.module(appName).controller('MenuController', ['$scope','$state','$uibModal','sharedService','APP_CONF',MenuCtrl]);
})();