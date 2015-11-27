package com.intranewton.elastic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.FAQ;
import com.intranewton.elastic.repository.FAQElasticsearchRepository;

@Service
public class FAQElasticsearchService {
	@Autowired
	FAQElasticsearchRepository faqElasticsearchRepository;
	
	/**
	 * elasticsearchでFAQを全件取得する
	 * @return FAQ Iterable
	 */
	public Iterable<FAQ> findAllFaqsbyElasticsearch(){
		System.out.println(faqElasticsearchRepository.findAll());
		return faqElasticsearchRepository.findAll();
	}
			
	/**
	 * elasticsearchでFAQ.contentをあいまい検索する
	 * @param content
	 * @return FAQ.list
	 */
	public List<FAQ> findbyContentLike(String content){			
		return faqElasticsearchRepository.findByContentLike(content);
	}
	
	/**
	 * タイトルとコンテンツカラムから合致するデータを取得する
	 * @param title
	 * @param content
	 * @return FAQ list
	 */
	public List<FAQ> findbyTitleOrContent(String title,String content){			
		return faqElasticsearchRepository.findByTitleOrContent(title,content);
	}
}
