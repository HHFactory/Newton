package com.intranewton.domain.service;
/*
 * FAQ関連サービス
 * 1.getFaqList=FAQの取得
 * 2.countUpUsefulCount=役に立ったボタン押下時に、usefulcountをインクリメントする
 * 3.createFaq=FAQの新規登録
 */

import java.util.List;

import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.Faq;
import com.intranewton.domain.entity.FaqRevision;
import com.intranewton.domain.repository.FaqRepository;
import com.intranewton.domain.repository.FaqRevisionRepository;
import com.intranewton.domain.repository.ManualCategoryRepository;

@Service
public class FaqService {
	@Autowired
	FaqRepository faqRepository;
	@Autowired
	FaqRevisionRepository faqRevisionRepository;
	@Autowired
	ManualCategoryRepository categoryRepository;

	@Autowired
	private Mapper dozerBeanMapper;

	// FAQ取得
	public List<Faq> getFaqList() {
		List<Faq> faqs = faqRepository.findAll();
		return faqs;
	}

	// FAQ.useful_countインクリメント処理
	public Integer countUpUsefulCount( Integer id ) {
		Integer test = faqRepository.countUpUsefulCount(id);
		return test;
	}

	// FAQ新規登録
	public Faq createFaq( Faq faq ) {
		Faq persistedFaq = faqRepository.save(faq);

		FaqRevision revision = dozerBeanMapper.map(persistedFaq, FaqRevision.class);
		faqRevisionRepository.save(revision);

		return persistedFaq;
	}


}
