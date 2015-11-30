package com.intranewton.elastic.restcontroller;

import java.util.HashMap;

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
	
	@RequestMapping(value="/api/v1/elastic/querysearch",method=RequestMethod.GET)
	public HashMap<String, Object> searchFaqsAndNotifications(@RequestParam String searchWord){	
		return elasticSearchService.searchFaqsAndNotifications(searchWord);
	}
	
	
}