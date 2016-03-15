package com.intranewton.elastic.restcontroller;

import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.elastic.service.ElasticSearchService;

@RestController
public class ElasticsearchRestController {
	@Autowired
	ElasticSearchService elasticSearchService;
	
	private static final Logger logger  = LoggerFactory.getLogger(ElasticsearchRestController.class);
	
	/**
	 * キーワード検索時API
	 * @param searchWord
	 * @return
	 */
	@RequestMapping(value="/api/v1/elastic/querysearch/",method=RequestMethod.GET)
	public HashMap<String, Object> searchFaqs(@RequestParam String searchWord, @RequestParam int page) {	
		logger.info("search by:"+ searchWord);
		return elasticSearchService.searchFaqs(searchWord,page);
	}
	
//	/**
//	 * 一覧取得時API
//	 * @return
//	 */
//	@RequestMapping(value="/api/v1/elastic/matchall/",method=RequestMethod.GET)
//	public HashMap<String, Object> matchall(@RequestParam int page) {
//		return elasticSearchService.searchAll(page);
//	}
	
}
