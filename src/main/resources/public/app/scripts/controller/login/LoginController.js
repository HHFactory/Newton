/**
 * ログイン用コントローラ
 * 
 * @return
 */
(function(){
'use strict';

	function LoginCtrl($state,$localStorage,connectApiService,constURI,APP_CONF){
		var self = this;
		/** ラベル設定 */
		self.buttonLabel = APP_CONF.buttonLabelLogin;

		/**
		 * ログインボタン押下処理
		 * @param  {[type]} loginInfo [description]
		 * @return {[type]}           [description]
		 */
		self.login = function(loginInfo){
			self.loading = true;
			connectApiService.post(constURI.login,loginInfo)
				.success(function(apiResult){
					$localStorage.userinfo = apiResult;
					$localStorage.$save();
					$state.go('main');
				})
				.error(function(apiResult){
					self.error = true;
				});
		}

	}

	angular.module(indexModule).controller('LoginController',['$state','$localStorage','connectApiService','constURI','APP_CONF',LoginCtrl]);
})();