
/***
* パラメータとして渡されたAPIとの接続処理をするService
* @Param apiURI
* @Return apiResult
*/
(function(){
'use strict';
	
	function ConnectApiService($http,$timeout){

		var ConnectAPI = {
			/**
			 * http.get
			 * @param  {[type]}
			 * @return {[type]}
			 */
			get: function(apiURI,param){
				var getData = $http.get(apiURI,{params:param}).success(function(data,status,headers,config){
					// return data;
				}).error(function(data,status,headers,config){
					swal("データ取得に失敗しました");
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

				}).error(function(data,status,headers,config) {
					swal("更新に失敗しました");
				});
				return putData;
			},

			/**
			 * http.post
			 * @return {[type]}
			 */
			post:function(apiURI,argdata){
				var postData = $http.post(apiURI,argdata).success(function(data,status,headers,config){
					$timeout(function(){
						swal({
							title: "登録完了",
							type: "success",
							timer: 1000,
							showConfirmButton: false
						},function(){
							swal.close();
						});
					});
				}).error(function(data,status,headers,config){
					swal("登録に失敗しました");
				});
				return postData;
			},

			/**
			 * http.delete
			 * @param  {[type]} apiURI     
			 * @param  {[type]} targetData 
			 * @return {[type]}            
			 */
			delete:function(apiURI,param){
				var deleteData = $http.delete(apiURI, {params:param}).success(function(data,status,headers,config){
					$timeout(function(){
						swal({
							title: "正常に削除されました",
							type: "success",
							timer: 1000,
							showConfirmButton: false
						},function(){
							swal.close();
						});
					});
				}).error(function(data,status,headers,config){
					swal("削除に失敗しました");
				});
				return deleteData;
			}
		};
		return ConnectAPI;
	}

	//moduleにfactoryを登録
	angular.module('connectApiService',[]).service('connectApiService',['$http','$timeout',ConnectApiService]);
})();