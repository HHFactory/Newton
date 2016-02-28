
/**
* 各種APIのURIを定義する定数Service
* @Param
* @Return
*/
(function(){
'use strict';


	var hostName = "http://hhfactory.japanwest.cloudapp.azure.com:8080/newton-1.0/";
	// var hostName = "http://localhost:8080/newton-1.0/";
	angular.module('indexModule').value(
		'constURI',{
			//faq
			'faq': hostName + "api/v1/faq/",
			'faqs': hostName + "api/v1/faqs/",
			'modifyFaqs': hostName + "api/v1/modifyfaqs/",
			'faqCategory': hostName + "api/v1/category/faq/",
			//notification
			'notification': hostName + "api/v1/notification/",
			'notifications': hostName + "api/v1/notifications/",
			//manual
			'manual': hostName +"api/v1/manual",
			'manuals': hostName + "api/v1/manuals",
			'manualCategory': hostName + "api/v1/manualcategory",
			//role&user
			'roles': hostName + "api/v1/roles",
			'users': hostName +"api/v1/users",
			//todo
			// 'postToDo': hostName +"api/v1/todo",
			// 'getToDoList': hostName +"api/v1/todos",
			// 'getToDoListByTargetUser': hostName +"api/v1/targettodos",
			//term
			'term': hostName + "api/v1/term",
			'terms': hostName + "api/v1/terms",
			//elasticsearch
			'searchAPI': hostName +"api/v1/elastic/querysearch",
			//upload&delete
			'deleteFile': hostName + "delete/file"
		}
	);

})();