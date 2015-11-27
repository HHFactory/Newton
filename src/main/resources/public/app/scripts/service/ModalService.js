
/**
 * Modalに関する処理
 * 
 * @return {[type]}
 */
(function(){
'use strict';
	function ModalService($uibModal){
		/**
		 * 参照用モーダルを開く
		 */
		var ModalService = {
			openModal:function(argData){
				$uibModal.open({
					templateUrl:"app/views/modal.html",
					controller:"ModalController",
					resolve:{
						argdata:function(){
							return argData;
						}
					}			
				});
			}
		};
		return ModalService;
	}

	//moduleへの登録
	angular.module('indexModule').factory('modalService',ModalService);
})();