
/**
* 各種apiのURIを定義する定数Service
* @Param
* @Return
*/
(function(){
'use strict';
	angular.module('connectURI',[]).value(
		'constURI',{
			//faq
			'faq': "api/v1/faq/",
			'faqs': "api/v1/faqs/",
			'modifyFaqs': "api/v1/modifyfaqs/",
			'faqCategory': "api/v1/category/faq/",
			//notification
			'notification': "api/v1/notification/",
			'notifications': "api/v1/notifications/",
			//manual
			'manual': "api/v1/manual",
			'manuals': "api/v1/manuals",
			'manualCategory': "api/v1/manualcategory",
			//role&user
			'roles': "api/v1/roles",
			'users': "api/v1/users",
			//term
			'term': "api/v1/term/",
			'terms': "api/v1/terms/",
			//elasticsearch
			'searchAPI': "api/v1/elastic/querysearch/",
			// 'searchALL': "api/v1/elastic/matchall/",
			//upload&delete
			'deleteFile': "delete/file"
		}
	);

})();