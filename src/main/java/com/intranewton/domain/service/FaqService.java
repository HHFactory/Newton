package com.intranewton.domain.service;
/*
 * FAQ関連サービス
 * 1.getFaqList=FAQの取得
 * 2.countUpUsefulCount=役に立ったボタン押下時に、usefulcountをインクリメントする
 * 3.createFaq=FAQの新規登録
 */

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.FAQ;
import com.intranewton.domain.entity.FAQCategory;
import com.intranewton.domain.repository.FAQCategoryRepository;
import com.intranewton.domain.repository.FaqRepository;

@Service
public class FaqService {
	@Autowired
	FaqRepository faqRepository;
	@Autowired
	FAQCategoryRepository categoryRepository;

	/**
	 * FAQ全件取得
	 * @return
	 */
	public List<FAQ> getFaqList() {
		List<FAQ> faqs = faqRepository.findAll();
		return faqs;
	}

	/**
	 * FAQ.usefulCountインクリメント処理
	 * @param id
	 * @return
	 */
	public Integer countUpUsefulCount( Integer id ) {
		return faqRepository.countUpUsefulCount(id);
	}

	/**
	 * FAQ新規登録処理
	 * @param faq
	 * @return
	 */
	public FAQ createFaq( FAQ faq ) {
		return faqRepository.save(faq);
	}
	
	/**
	 * FAQリストからの新規登録
	 * @param faqs
	 */
	public Integer postFaqList(List<FAQ> faqs) {
		for(FAQ faq:faqs) {
			faqRepository.save(faq);
		}
		return 200;
	}
	
	/**
	 * FAQカテゴリを全件取得
	 * @return
	 */
	public List<FAQCategory> findAllCategories() {
		return categoryRepository.findAll();
	}
	
	/**
	 * FAQ更新処理
	 * @param id
	 * @param target
	 * @return
	 */
	public FAQ editFaq(FAQ target) {
		return faqRepository.save(target);
	}
	
	/**
	 * FAQ削除処理
	 * @param id
	 * @return
	 */
	public void deleteFaq(Integer id) {
		faqRepository.delete(id);
	}
	

}
