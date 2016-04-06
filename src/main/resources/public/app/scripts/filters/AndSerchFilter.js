/**
 * 用語集and検索用filter
 * @return
 */
(function(){
	'use strict';

	function andSearchFilter(filterFilter){
		return function(list,searchQuery){
			if(searchQuery.title){
				// 全角スペースを半角スペースに置換
				var query = searchQuery.title.replace(/　/g, " ");
			}

	        // 検索フォームに文字が入力されている場合
	        if (query) {
	            // 検索対象ワードの配列を作成
	            var queryWordArray = query.split(" ");
	            var filteredList = [];
	           
	            queryWordArray.forEach(function(searchWord){
			        	// １つ目の検索ワード結果はそのまま格納
			        	if(filteredList.length == 0){
			        		filteredList.push.apply(filteredList,filterFilter(list,searchWord));
			        	}
			        	// ２つ目以降の検索ワードは1つ前の検索結果リストに対して行う
			        	else{
			        		filteredList = filterFilter(filteredList,searchWord);
			        	}
			        });

	            return filteredList;
	        }else{
	        	return list;
	        }
	    }
	}

	angular.module('hhfAndSearch',[]).filter("andSearchFilter",['filterFilter',andSearchFilter]);
})();