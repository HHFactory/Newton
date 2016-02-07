
/**
* 各種APIのURIを定義する定数Service
* @Param
* @Return
*/
(function(){
'use strict';	
	var hostName = "http://localhost:8080";

	angular.module('indexModule').value(
		'constURI',{
			'getFaqList': hostName + "/api/v1/faqs",
			'postFaq': hostName + "/api/v1/faq",
			'postFaqList': hostName + "/api/v1/faqlist",
			'putFaqUseful': hostName + "/api/v1/faqs/",
			'getModifyFaqList': hostName + "/api/v1/modifyfaqs",
			'getNotificationList': hostName + "/api/v1/notifications",
			'postNotification': hostName + "/api/v1/notification",
			'getManual': hostName + "/api/v1/manual",
			'getManualList': hostName + "/api/v1/manuallist",
			'getManualCategories': hostName + "/api/v1/manualcategory",
			'postManual': hostName +"/api/v1/manual",
			'putManual': hostName +"/api/v1/manual",
			'getSkillList': hostName + "/api/v1/roles",
			'getUserList': hostName +"/api/v1/users",
			'getToDoList': hostName +"/api/v1/todos",
			'getToDoListByTargetUser': hostName +"/api/v1/targettodos",
			'postToDo': hostName +"/api/v1/todo",
			'searchTerm': hostName + "/api/v1/term",
			'postTerm': hostName + "/api/v1/term",
			'searchAPI': hostName +"/api/v1/elastic/querysearch"
		}
	);

})();