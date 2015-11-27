package com.intranewton.domain.restcontroller;
/*
 * FAQ関連のrestcontroller
 * FAQServiceを呼び出す
 * 
 */
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.entity.FAQ;
import com.intranewton.domain.service.FaqService;
import com.intranewton.elastic.service.FAQElasticsearchService;

@RestController
public class FaqRestController {
	@Autowired
	FaqService faqService;
	@Autowired
	FAQElasticsearchService faqElasticService;
	
	/**
	 * 全てのFAQを取得する
	 * @return FAQ List
	 */
	@RequestMapping(value="/api/v1/faqs",method=RequestMethod.GET)
	List<FAQ> findAllFaqs(){
		List<FAQ> faqs = faqService.getFaqList();
		System.out.println("connect faq api");
		return faqs;
	}
	
	/**
	 * 引き渡されたidを持つFAQ.useful_countをインクリメントする
	 * @param id
	 * @return integer
	 */
	@RequestMapping(value="/api/v1/faqs/{id}",method=RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Integer countUpUsefulCount(@PathVariable Integer id){
		Integer usefulcount = faqService.countUpUsefulCount(id);
		return usefulcount;
	}
	
	/**
	 * FAQを新規登録する
	 * @param faq
	 * @return FAQ
	 */
	@RequestMapping(value="/api/v1/faq",method=RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	FAQ postFaq(@RequestBody FAQ faq){	
		return faqService.createFaq(faq);
	}
		
	/**
	 * elasticsearchでFAQ.contentを検索する
	 * @param content
	 * @return FAQ list
	 */
//	@RequestMapping(value="/api/v1/elastic/faqs",method=RequestMethod.GET)
//	List<FAQ> findbyContentLike(@RequestParam String content){
//		return faqElasticService.findbyContentLike(content);
//	}
	
	/**
	 * elasticsearchでFAQを全て取得する
	 * @return FAQ iterable
	 */
	@RequestMapping(value="/api/v1/elastic/allfaqs",method=RequestMethod.GET)
	Iterable<FAQ> findallfaqs(){		
		return faqElasticService.findAllFaqsbyElasticsearch();
	}
	
	
	@RequestMapping(value="/api/v1/elastic/faqs",method=RequestMethod.GET)
	List<FAQ> findTitleOrContent(@RequestParam String title){
		return faqElasticService.findbyTitleOrContent(title,title);
	}
	
	
//	//FAQ,マニュアル、お知らせを全て検索する
//	@RequestMapping(value="/api/v1/faq",method=RequestMethod.GET)
//	List<SearchResult> searchALL(@Param("title") String title){
//		List<SearchResult> searchResults = searchService.searchAll(title);
//		return searchResults;
//	}

}
