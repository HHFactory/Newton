
//グローバルサーチの検索結果パネルに表示するクラス
//各apiから取得した値を詰め直し、返却
package com.intranewton.domain.searchResult;


import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchResult {
	//マニュアル、FAQ、お知らせ
	private String category;
	//タイトル、コンテンツを格納するmap
	private List<Map<String, String>> contentsMapList;
	
}
