package com.intranewton.elastic.repository;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.intranewton.domain.entity.Notification;

public interface NotificationElasticsearchRepository extends ElasticsearchRepository<Notification, Integer>{
	List<Notification> findByTitleOrContent(String title,String content);
	
	@Query("{\"query_string\":{\"fields\":[\"title\",\"content\"],\"query\":\"?0\",\"default_operator\":\"AND\"}}")
	List<Notification> findNotificationbyquery(String query);
}