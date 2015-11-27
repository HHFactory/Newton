package com.intranewton.elastic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.Notification;
import com.intranewton.elastic.repository.NotificationElasticsearchRepository;

@Service
public class NotificationElasticService {
	@Autowired
	NotificationElasticsearchRepository notificationElasticsearchRepository;
	
	/**
	 * elasticsearchrepostoryにてお知らせを全件取得する
	 * @return
	 */
	public Iterable<Notification> findall(){
		return notificationElasticsearchRepository.findAll();
	}
}
