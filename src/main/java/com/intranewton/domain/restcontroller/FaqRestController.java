package com.intranewton.domain.restcontroller;
import java.util.HashMap;
/*
 * FAQ関連のrestcontroller
 * FAQServiceを呼び出す
 * 
 */
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.intranewton.domain.entity.FAQCategory;
import com.intranewton.domain.service.FaqService;
import com.intranewton.elastic.service.ElasticSearchService;

@RestController
public class FaqRestController {
	@Autowired
	FaqService faqService;
	@Autowired
	ElasticSearchService elasticSearchService;
	
	private static final Logger logger = LoggerFactory.getLogger(FaqRestController.class);
	
	/**
	 * FAQ一覧取得	
	 * @param page
	 * @return
	 */
	@RequestMapping(value="/api/v1/faqs/",method=RequestMethod.GET)
	public HashMap<String, Object> findAllFaqs(@RequestParam int page){
		return faqService.getFaqList(page);
	}
	
	/**
	 * IDで取得
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/api/v1/faqs/{id}",method=RequestMethod.GET)
	public HashMap<String, Object> findOne(@PathVariable Integer id){
		logger.info("search by:#" + id);
		return elasticSearchService.findOne(id);
	}
	
	/**
	 * FAQカテゴリを全件取得
	 * @return
	 */
	@RequestMapping(value="/api/v1/faqcategories",method=RequestMethod.GET)
	public List<FAQCategory> findAllCategories() {
		return faqService.findAllCategories();
	}
	
	/**
	 * 引き渡されたidを持つFAQ.useful_countをインクリメントし結果を返却する
	 * @param id
	 * @return integer
	 */
	@RequestMapping(value="/api/v1/faqs/{id}",method=RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Integer countUpUsefulCount(@PathVariable Integer id){
		Integer usefulcount = faqService.countUpUsefulCount(id).getUsefulCount();
		return usefulcount;
	}
	
	/**
	 * FAQを新規登録する
	 * @param faq
	 * @return FAQ
	 */
	@RequestMapping(value="/api/v1/faq/",method=RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public FAQ postFaq(@RequestBody FAQ faq){	
		logger.info("new FAQ created");
		return faqService.createFaq(faq);
	}
		
	/**
	 * FAQリストから登録する
	 * @param faqs
	 * @return
	 */
	@RequestMapping(value="/api/v1/faqs/",method=RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void postFaqList(@RequestBody List<FAQ> faqs) {
		faqService.postFaqList(faqs);
	}
	
	/**
	 * FAQ更新処理
	 * @param id
	 * @param targetFaq
	 * @return
	 */
	@RequestMapping(value="/api/v1/faq/{id}",method=RequestMethod.PUT)
	@ResponseStatus(HttpStatus.CREATED)
	public FAQ editFaq(@PathVariable Integer id, @RequestBody FAQ targetFaq) {
		logger.info("#" + id + "FAQ updated");
		return faqService.editFaq(targetFaq);
	}
	
	/**
	 * FAQ削除処理(DB,ES両方削除）
	 * @param id
	 */
	@RequestMapping(value="/api/v1/faq/{id}",method=RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteFaq(@PathVariable Integer id) {
		logger.info("#" + id + "FAQ deleted");
		faqService.deleteFaq(id);
		elasticSearchService.deleteFaqDoc(id);
	}	
}
