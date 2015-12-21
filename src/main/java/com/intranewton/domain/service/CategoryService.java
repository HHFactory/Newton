package com.intranewton.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.FaqCategory;
import com.intranewton.domain.repository.FAQCategoryRepository;
import com.intranewton.domain.repository.ManualCategoryRepository;

/**
 * マニュアル、FAQカテゴリ関連サービス
 *
 */
@Service
public class CategoryService {
	@Autowired
	ManualCategoryRepository categoryRepository;
	@Autowired
	FAQCategoryRepository faqCategoryRepository;

	/**
	 * カテゴリIDからFAQカテゴリを取得
	 * @param categoryID
	 * @return
	 */
	public List<FaqCategory> findFaqCategory(Integer categoryID) {
		return faqCategoryRepository.findById(categoryID);
	}
}
