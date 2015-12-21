package com.intranewton.elastic.repository;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.intranewton.domain.entity.Faq;

public interface FAQElasticsearchRepository extends ElasticsearchRepository<Faq, Integer>{
	List<Faq> findByContentLike(String content);
	List<Faq> findByTitleOrContent(String title,String content);
	
	@Query("{\"query_string\":{\"fields\":[\"title\",\"content\"],\"query\":\"?0\",\"default_operator\":\"AND\"}}")
	List<Faq> findbyquery(String query);
}
