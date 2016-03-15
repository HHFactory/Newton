(function(){
'use strict';

	function sharedService(){
		return {
			faqList: {faqList:[],faqCategoryList:[]},
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