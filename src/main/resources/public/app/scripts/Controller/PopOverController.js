'use strict';

//お知らせの既読、未読者リストパネル用コントローラ
angular.module('indexModule')
	.controller('PopOverCtrl',function($scope,$http){
		//既読、未読者リストを取得する
		//todo:それ用のapiを作る

		var contentList = []
		contentList.push($scope.notification.readMemberList);
		contentList.push($scope.notification.unreadMemberList);

		//既読者リストをpopover表示
		$scope.readMemberList={
			content:$scope.notification.readMemberList,
			templateUrl:'app/views/popover.html'
		};

		//未読者リストをpopover表示
		$scope.dynamicPopOver = {
			content:$scope.notification.unreadMemberList,
			templateUrl:'app/views/popover.html'
		};



	});	