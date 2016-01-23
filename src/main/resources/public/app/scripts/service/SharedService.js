(function(){
'use strict';

	function sharedService(){
		return{
			data: null,
			checkModifyTask: false,
			showModifyFaqDetail: false,
			modifyFaqDetail: null,
			isShowManual: false,
			isShowCreateNotificationPanel: false
		};
	}

	angular.module('indexModule').factory('sharedService',sharedService);

})();