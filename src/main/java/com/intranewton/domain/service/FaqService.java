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
import com.intranewton.domain.repository.ManualCategoryRepository;
import com.intranewton.domain.repository.FaqRepository;

@Service
public class FaqService {
	@Autowired
	FaqRepository faqRepository;
	@Autowired
	ManualCategoryRepository categoryRepository;

	// FAQ取得
	public List<FAQ> getFaqList() {
		List<FAQ> faqs = faqRepository.findAll();
		return faqs;
	}

	// FAQ.useful_countインクリメント処理
	public Integer countUpUsefulCount( Integer id ) {
		Integer test = faqRepository.countUpUsefulCount(id);
		return test;
	}

	// FAQ新規登録
	public FAQ createFaq( FAQ faq ) {
		return faqRepository.save(faq);
	}
	

}
