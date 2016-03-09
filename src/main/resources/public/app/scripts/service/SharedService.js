(function(){
'use strict';

	function sharedService(){
		return {
			faqList: null,
			manualList: null,
			notificationList: null,
			isShowManual: false,
			isShowNotification: false,
			isShowCreateNotificationPanel: false,
			isShowFaqImport: false,
			searchQuery: null
		};
	}

	angular.module(appName).factory('sharedService',sharedService);
})();