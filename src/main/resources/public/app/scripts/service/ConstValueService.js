
/**
* 各種APIのURIを定義する定数Service
* @Param
* @Return
*/
(function(){
'use strict';	
	var hostName = "https://hhfactory-newton.herokuapp.com";

	angular.module('indexModule').value(
		'constURI',{
			'getFaqList': hostName + "/api/v1/faqs",
			'postFaq': hostName + "/api/v1/faq",
			'putFaqUseful': hostName + "/api/v1/faqs/",
			'getModifyFaqList': hostName + "/api/v1/modifyfaqs",
			'getNotificationList': hostName + "/api/v1/notifications",
			'putNotification': hostName + "/api/v1/notification",
			'getManualList': hostName +"/api/v1/manuals",
			'postManual': hostName +"/api/v1/manual",
			'putManual': hostName +"/api/v1/manual",
			'getSkillList': hostName +"/api/v1/roles",
			'getUserList': hostName +"/api/v1/users",
			'getToDoList': hostName +"/api/v1/todos",
			'getToDoListByTargetUser': hostName +"/api/v1/targettodos",
			'postToDo': hostName +"/api/v1/todo",
			'searchAPI': hostName +"/api/v1/elastic/querysearch"
		}
	);

})();