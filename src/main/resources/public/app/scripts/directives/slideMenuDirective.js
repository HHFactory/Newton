/**
 * 
 * @return {[type]} [description]
 */
(function() {
    'use strict';

    function slideMenu() {
        return {
            ristrict: 'E',
            templateUrl: '/app/views/faq/modifyTaskDetail.html',
            transclude: true,
            raplace: true
        };
    }


    angular.module('indexModule').directive('slideMenuDirective', [slideMenu]);
})()
