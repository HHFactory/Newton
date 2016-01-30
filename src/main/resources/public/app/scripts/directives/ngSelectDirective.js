/**
 * 
 * @return {[type]} [description]
 */
(function(){
'use strict';

    function ngFileSelect() {
        return {
            link: function($scope,element) {
                element.bind("change", function(e){
                    var reader = new FileReader();
                    var file = e.target.files[0];

                    reader.onload = function(e) {
                        var loadFile = e.target.result;
                        var workbook = XLSX.read(loadFile, {type: 'binary'});
                        $scope.getDataFromExcel(workbook);
                    };

                    reader.readAsBinaryString(file);
                });
            }
        }
    };

    angular.module('indexModule').directive("ngFileSelect",[ngFileSelect]);
})();