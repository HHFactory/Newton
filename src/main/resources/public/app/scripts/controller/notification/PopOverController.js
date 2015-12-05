
(function(){
'use strict';
	
	function PopOverCtrl($scope){
		var contentList = []
		contentList.push($scope.notification.readMemberList);
		contentList.push($scope.notification.unreadMemberList);
		
		//既読者リストをpopover表示
		$scope.readMemberList={
			content:$scope.notification.readMemberList,
			templateUrl:'../../app/views/notification/notification003.html'
		};

		//未読者リストをpopover表示
		$scope.dynamicPopOver = {
			content:$scope.notification.unreadMemberList,
			templateUrl:'../../app/views/notification/notification003.html'
		};

	}

	angular.module('indexModule').controller('PopOverController',PopOverCtrl);
})();
