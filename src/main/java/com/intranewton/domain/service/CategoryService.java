package com.intranewton.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.FAQCategory;
import com.intranewton.domain.repository.FAQCategoryRepository;

/**
 * FAQカテゴリ関連サービス
 *
 */
@Service
public class CategoryService {
	@Autowired
	FAQCategoryRepository faqCategoryRepository;

	/**
	 * カテゴリIDからFAQカテゴリを取得
	 * @param categoryID
	 * @return
	 */
	public FAQCategory findFaqCategory(Integer categoryID) {
		return faqCategoryRepository.findOne(categoryID);
	}
	
	/**
	 * FAQカテゴリ全件取得処理
	 * @return
	 */
	public List<FAQCategory> findFaqCategories(){
		return faqCategoryRepository.findAll();
	}
	
}
