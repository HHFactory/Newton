package com.intranewton.elastic.repository;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.intranewton.domain.entity.FAQ;

public interface FAQElasticsearchRepository extends ElasticsearchRepository<FAQ, Integer>{
	List<FAQ> findByContentLike(String content);
	List<FAQ> findByTitleOrContent(String title,String content);
	
	@Query("{\"query_string\":{\"fields\":[\"title\",\"content\"],\"query\":\"?0\",\"default_operator\":\"AND\"}}")
	List<FAQ> findbyquery(String query);
}
