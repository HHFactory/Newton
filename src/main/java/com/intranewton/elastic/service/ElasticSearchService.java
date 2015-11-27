package com.intranewton.elastic.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.FAQ;
import com.intranewton.domain.entity.Notification;
import com.intranewton.elastic.repository.FAQElasticsearchRepository;
import com.intranewton.elastic.repository.NotificationElasticsearchRepository;

/**
 * elasticsearchを使った検索機能
 * @author hide
 *
 */
@Service
public class ElasticSearchService {
	@Autowired
	FAQElasticsearchRepository faqElasticsearchRepository;
	@Autowired
	NotificationElasticsearchRepository notificationElasticsearchRepository;
	
	/**
	 * FAQとNotificationからパラメータに合致したデータを取得し、mapで返却する
	 * @param searchWord
	 * @return　searchMap hashmap
	 */
	public HashMap<String, Object> searchFaqsAndNotifications(String searchWord){
		HashMap<String, Object> searchResultMap = new HashMap<>();
		List<FAQ> faqList = faqElasticsearchRepository.findbyquery(searchWord);
		List<Notification> notificationList = notificationElasticsearchRepository.findNotificationbyquery(searchWord);
		searchResultMap.put("faqResult", faqList);
		searchResultMap.put("notificationResult", notificationList);
		return searchResultMap;
	}

	
}
