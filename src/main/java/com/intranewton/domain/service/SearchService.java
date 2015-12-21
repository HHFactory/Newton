//各repositoryから検索結果用クラスに格納する
package com.intranewton.domain.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.Faq;
import com.intranewton.domain.entity.Notification;
import com.intranewton.domain.repository.FaqRepository;
import com.intranewton.domain.repository.ManualRepository;
import com.intranewton.domain.repository.NotificationRepository;
import com.intranewton.domain.searchResult.SearchResult;

@Service
public class SearchService {
	@Autowired
	FaqRepository faqRepository;
	@Autowired
	ManualRepository manualRepository;
	@Autowired
	NotificationRepository notificationRepository;

	private List<Faq> faqs;
	// private List<ManualCategory> manualCategories;
	private List<Notification> notifications;
	private SearchResult searchResult;
	private Map<String, String> resultMap;
	private List<Map<String, String>> contentList;

	// マニュアル、FAQ、お知らせを同時検索する
	public List<SearchResult> searchAll( String title ) {
		searchResult = new SearchResult();
		List<SearchResult> searchResults = new ArrayList<>();
		faqs = new ArrayList<>();
		notifications = new ArrayList<>();
		contentList = new ArrayList<>();

		faqs.addAll(faqRepository.searchFaq(title));
		// manualCategories.addAll(manualRepository.findAll());
		notifications.addAll(notificationRepository.searchNotification(title));
		resultMap = new HashMap<>();
		// FAQlistからタイトルと本文を格納
		if ( faqs.size() > 1 ) {
			searchResult.setCategory("Faq");
			for ( int i = 0; i < faqs.size(); i++ ) {
				resultMap.put("id", faqs.get(i).getId().toString());
				resultMap.put("title", faqs.get(i).getTitle());
				resultMap.put("content", faqs.get(i).getContent());
				contentList.add(resultMap);
				searchResult.setContentsMapList(contentList);
			}
			searchResults.add(searchResult);
		}
		// manuallistからファイル名とパスを取得
		// if(!(manualCategories.isEmpty())){
		// for(int i=0; i<manualCategories.size(); i++){
		// searchResult.setCategory("manual");
		// resultMap.put("title",
		// manualCategories.get(i).getManualLists().get(i).getManualFiles().get(i).getFile_name());
		// resultMap.put("content",manualCategories.get(i).getManualLists().get(i).getManualFiles().get(i).getFile_path());
		// searchResult.setContentsMap(resultMap);
		// searchResults.add(searchResult);
		// }
		// }
		// notificationlistからタイトルと本文を取得
		if ( notifications.size() > 1 ) {
			searchResult.setCategory("notification");
			for ( int i = 0; i < notifications.size(); i++ ) {
				resultMap.put("id", notifications.get(i).getId().toString());
				resultMap.put("title", notifications.get(i).getTitle());
				resultMap.put("content", notifications.get(i).getContent());
				contentList.add(resultMap);
				searchResult.setContentsMapList(contentList);
			}
			searchResults.add(searchResult);
		}
		return searchResults;
	}
}
