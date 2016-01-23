
/**
* 各種APIのURIを定義する定数Service
* @Param
* @Return
*/
(function(){
'use strict';	

	angular.module('indexModule').value(
		'constURI',{
			'getFaqList':"http://localhost:8080/api/v1/faqs",
			'postFaq':"http://localhost:8080/api/v1/faq",
			'putFaqUseful':"http://localhost:8080/api/v1/faqs/",
			'getModifyFaqList':"http://localhost:8080/api/v1/modifyfaqs",
			'getNotificationList':"http://localhost:8080/api/v1/notifications",
			'putNotification':"http://localhost:8080/api/v1/notification",
			'getManualList':"http://localhost:8080/api/v1/manuals",
			'postManual':"http://localhost:8080/api/v1/manual",
			'putManual':"http://localhost:8080/api/v1/manual",
			'getSkillList':"http://localhost:8080/api/v1/roles",
			'getUserList':"http://localhost:8080/api/v1/users",//ToDO:スキルに応じたユーザ取得に切り替え
			'getToDoList':"http://localhost:8080/api/v1/todos",
			'getToDoListByTargetUser':"http://localhost:8080/api/v1/targettodos",
			'postToDo':"http://localhost:8080/api/v1/todo",
			'searchAPI':"http://localhost:8080/api/v1/elastic/querysearch"
		}
	);

})();