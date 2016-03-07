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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.entity.FAQ;
import com.intranewton.domain.entity.FAQCategory;
import com.intranewton.domain.service.FaqService;

@RestController
public class FaqRestController {
	@Autowired
	FaqService faqService;
	
	/**
	 * 全てのFAQを取得する
	 * @return FAQ List
	 */
	@RequestMapping(value="/api/v1/faqs/",method=RequestMethod.GET)
	List<FAQ> findAllFaqs(){
		List<FAQ> faqs = faqService.getFaqList();
		return faqs;
	}
	
	/**
	 * IDで取得
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/api/v1/faqs/{id}",method=RequestMethod.GET)
	FAQ findOne(@PathVariable Integer id){
		return faqService.findFaqById(id);
	}
	
	/**
	 * FAQカテゴリを全件取得
	 * @return
	 */
	@RequestMapping(value="/api/v1/faqcategories",method=RequestMethod.GET)
	List<FAQCategory> findAllCategories() {
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
		faqService.countUpUsefulCount(id);
		Integer usefulcount = faqService.findFaqById(id).getUsefulCount();
		return usefulcount;
	}
	
	/**
	 * FAQを新規登録する
	 * @param faq
	 * @return FAQ
	 */
	@RequestMapping(value="/api/v1/faq/",method=RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	FAQ postFaq(@RequestBody FAQ faq){	
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
		targetFaq.setId(id);
		return faqService.editFaq(targetFaq);
	}
	
	/**
	 * FAQ削除処理
	 * @param id
	 */
	@RequestMapping(value="/api/v1/faq/{id}",method=RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteFaq(@PathVariable Integer id) {
		faqService.deleteFaq(id);
	}	
}
