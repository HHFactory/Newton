(function(){
'use strict';

	function sharedService(){
		return {
			data: null,
			checkModifyTask: false,
			showModifyFaqDetail: false,
			modifyFaqDetail: null,
			isShowManual: false,
			isShowNotification: false,
			isShowCreateNotificationPanel: false,
			isShowFaqImport: false,
			searchQuery: null
		};
	}

	angular.module('indexModule').factory('sharedService',sharedService);
})();