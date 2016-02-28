/**
 * タグ選択パネル
 * @return 
 */
(function(){
'use strict';

	var hhfTagSelect = function($timeout){
		return {
			restrict: 'EA',
			templateUrl: 'app/views/template/tagSelectPanel.html',
			link: function(scope,element,attrs,ctrl){
				console.log(attrs.ngModel);
				// scope.categoryList.concat(attrs.src);
				scope.selectedList = [];

				/**
				 * 新規カテゴリの追加
				 * @param {[type]} tmpCategory 
				 */
				 scope.addCategory = function(categoryName){
				 	console.log(categoryName);
				 	var tmpCategory = {};
				 	tmpCategory["name"] = categoryName;
				 	tmpCategory["id"] = "";
				 	if(!isDuplicate(scope.selectedList,categoryName)){
				 		scope.selectedList.push(tmpCategory);
				 	}
				 }

				/**
				 * カテゴリ選択
				 * @param  {[type]} category 
				 * @return {[type]}          
				 */
				 scope.selectCategory = function(category){
				 	scope.confirmCategory = true;
				 	if(!isDuplicate(scope.selectedList,category.name)){
				 		scope.selectedList.push(category);
				 	}
				 }

				/**
				 * 選択済みカテゴリ削除
				 * @param  {[type]} category [description]
				 * @return {[type]}          [description]
				 */
				 scope.removeItem = function(category){
				 	scope.selectedList.some(function(item,idx){
				 		if(item.name === category.name) {
				 			scope.selectedList.splice(idx,1);
				 		}
				 	});
				 }

				/**
				 * 重複チェック
				 * @param  {[type]} array [description]
				 * @param  {[type]} id    [description]
				 * @return {[type]}       [description]
				 */
				 var isDuplicate = function(array, name) {
				 	for(var i =0; i<array.length; i=(i+1)){
				 		if(array[i].name === name){
				 			return true;
				 		}
				 	}
				 	return false;
				 }

				/**
				 * OKボタン押下
				 * @return {[type]} [description]
				 */
				 scope.confirm = function(){
				 	scope.isOpenCategory = false;
				 }
			}

		}
	}

	angular.module('indexModule').directive('hhfTagSelect',['$timeout',hhfTagSelect]);
})();