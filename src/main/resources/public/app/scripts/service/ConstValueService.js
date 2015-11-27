
/**
* 各種APIのURIを定義する定数Service
* @Param
* @Return
*/
(function(){
'use strict';	

	angular.module('indexModule').value(
		'constURI',{
			'getFAQ':"http://localhost:8080/api/v1/faqs",
			'getNotification':"http://localhost:8080/api/v1/notifications",
			'getManual':"http://localhost:8080/api/v1/manuals",
			'postFAQ':"http://localhost:8080/api/v1/faq",
			'putFAQuseful':"http://localhost:8080/api/v1/faqs/",
			'putNotification':"http://localhost:8080/api/v1/notification",
			'getSkill':"http://localhost:8080/api/v1/roles",
			'searchAPI':"http://localhost:8080/api/v1/elastic/querysearch"
		}
	);

})();