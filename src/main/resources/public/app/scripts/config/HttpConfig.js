/**
 * http通信時のリクエストエラー、レスポンスエラーを検知して前処理を行う
 * @return {[type]} [description]
 */
(function(){
'use strict';
  angular.module('httpConfig',[]).config(["$httpProvider",function($httpProvider) {
    $httpProvider.interceptors.push(function ($q) {
        return {
          requestError: function(rejection){
            console.log(rejection);
            swal("サーバーへのリクエストが正しくありません");
          },
          responseError: function(rejection) {
            console.log(rejection);
            // if (500 == rejection.status) {
            //   swal("処理中にエラーが発生しました");
            // }
            return $q.reject(rejection);
          }
        }
    })
  }]);
})();

