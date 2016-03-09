/**
 * FAQカテゴリフィルタ
 * @return {[type]} [description]
 */
(function(){
'use strict';

	var CategoryFilter = function(){
		return function(faqList,selectedCategories){
			if(selectedCategories.length > 0){
				var filteredList = [];
				for(var i=0; i<faqList.length; i++){
					// 表示されているFAQ一覧が持つカテゴリ名リストを作成
					var hasCategories = getHasCategoryNameList(faqList[i]);

					//選択されたカテゴリリストとの比較
					for(var k=0; k<hasCategories.length; k++){
						for(var l=0; l<selectedCategories.length; l++){
							if(hasCategories[k] == selectedCategories[l]["name"]){
								filteredList.push(faqList[i]);
							}
						}
					}
				}
				/** リスト内重複削除 */
				var distinctList = filteredList.filter(distinct);
				return distinctList;
			}else{
				return faqList;
			}
		}
	}

	/**
	 * FAQ一覧データが持っているカテゴリ名リスト作成
	 * @param  {[type]} faqList 
	 * @return {[type]}         
	 */
	 var getHasCategoryNameList = function(faq){
	 	var hasCategories = [];
	 	for(var j=0; j<faq["categories"].length; j++){
	 		hasCategories.push(faq["categories"][j]["name"]);
	 	}
	 	return hasCategories;
	 }

	 /**
	  * リスト内で重複していないindexを返す
	  * @param  value [target list]
	  * @param  index [index of list]
	  * @param  self  [item of list]
	  * @return distinct index      [index]
	  */
	 var distinct = function(value,index,self){
	 	return self.indexOf(value) === index;
	 }

	angular.module(appName).filter('categoryFilter',[CategoryFilter]);
})();
