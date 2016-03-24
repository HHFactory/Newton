/**
 * ローディングバー設定
 */
(function(){
	'use strict';
	angular.module(appName).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
		// 読み込み時のサークルを非表示
		cfpLoadingBarProvider.includeSpinner = false;
		cfpLoadingBarProvider.latencyThreshold = 0;
	}]);
})();
