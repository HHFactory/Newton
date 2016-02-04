
/***
* パラメータとして渡されたAPIとの接続処理をするService
* @Param apiURI
* @Return apiResult
*/
(function(){
'use strict';
	
	function ConnectApiService($http){
		// var transform = function(data){
		// 	return $.param(data);
		// }

		var ConnectAPI = {
			/**
			 * http.get
			 * @param  {[type]}
			 * @return {[type]}
			 */
			get: function(apiURI,param){
				var getData = $http.get(apiURI,{params:param}).success(function(data,status,headers,config){		
					return data;
				}).error(function(data,status,headers,config){
					return status;
				});
				return getData;
			},

			/**
			 * http.put
			 * @param  {[type]}
			 * @param  {[type]}
			 * @return {[type]}
			 */
			put:function(apiURI,argdata){
				var putData =$http.put(apiURI,argdata).success(function(data,status,headers,config){					
					console.log('useful countup');
				}).error(function(data,status,headers,config) {
					return status;
				});
				return putData;
			},

			/**
			 * http.post
			 * @return {[type]}
			 */
			post:function(apiURI,argdata){
				var postData = $http.post(apiURI,argdata).success(function(data,status,headers,config){
					return status;
				}).error(function(data,status,headers,config){
					return status;
				});
				return postData;
			}
		};
		return ConnectAPI;
	}

	//moduleにfactoryを登録
	angular.module('indexModule').factory('connectApiService',ConnectApiService);


})();