/**
 * FAQ一括登録ファイル選択directive
 * @return {[type]} [description]
 */
(function(){
'use strict';

    function FileSelect() {
        return {
            link: function($scope,element) {
                element.bind("change", function(e){
                    var reader = new FileReader();
                    var file = e.target.files[0];

                    reader.onload = function(e) {
                        var loadFile = e.target.result;
                        var workbook = XLSX.read(loadFile, {type: 'binary'});
                        //呼び出し元コントローラでエクセル読み込み処理を行う
                        $scope.getDataFromExcel(workbook);
                    };

                    reader.readAsBinaryString(file);
                });
            }
        }
    };

    angular.module(appName).directive("ngFileSelect",[FileSelect]);
})();