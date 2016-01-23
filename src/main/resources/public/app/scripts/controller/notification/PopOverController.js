
(function(){
'use strict';
	
	function PopOverCtrl($scope){
		// var contentList = []
		// contentList.push($scope.notification.readMemberList);
		// contentList.push($scope.notification.unreadMemberList);
		
		// //既読者リストをpopover表示
		// $scope.readMemberList={
		// 	content:$scope.notification.readMemberList,
		// 	templateUrl:'../../app/views/notification/readUserListPopOver.html'
		// };

		// //未読者リストをpopover表示
		// $scope.dynamicPopOver = {
		// 	content:$scope.notification.unreadMemberList,
		// 	templateUrl:'../../app/views/notification/readUserListPopOver.html'
		// };

		//お知らせ対象スキルpopover表示
		$scope.targetUserList = {
			content: $scope.targetSkills,
			templateUrl: '../../../../app/views/template/targetUserList.html'
		}

	}

	angular.module('indexModule').controller('PopOverController',['$scope',PopOverCtrl]);
})();
