package com.intranewton.elastic.repository;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.intranewton.domain.entity.FAQ;
import com.intranewton.elastic.document.FaqDoc;

public interface FAQElasticsearchRepository extends ElasticsearchRepository<FaqDoc, Integer>{
	
	@Query("{\"query_string\":{\"fields\":[\"title\",\"content\"],\"query\":\"?0\",\"default_operator\":\"AND\"}}")
	List<FAQ> findbyquery(String query);
	
}
