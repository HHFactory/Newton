
/**
 * Modalに関する処理
 * 
 * @return {[type]}
 */
(function(){
'use strict';
	function ModalService($uibModal){
		/**
		 * モーダルを開く
		 */
		var ModalService = {
			openModal:function(argData){
				$uibModal.open({
					templateUrl:"../../app/views/template/modal.html",
					controller:"ModalController",
					resolve:{
						argdata:function(){
							return argData;
						}
					}			
				});
			},
			openSendModal:function(){
				$uibModal.open({
					templateUrl:"../../app/views/template/sendModal.html",
					controller:"SendModalController",
					resolve:{
						
					}
				});
			}
		};
		return ModalService;

	}

	//moduleへの登録
	angular.module('indexModule').factory('modalService',ModalService);
})();