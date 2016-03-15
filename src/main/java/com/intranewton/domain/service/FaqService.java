package com.intranewton.domain.service;
/*
 * FAQ関連サービス
 * 1.getFaqList=FAQの取得
 * 2.countUpUsefulCount=役に立ったボタン押下時に、usefulcountをインクリメントする
 * 3.createFaq=FAQの新規登録
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.intranewton.domain.dto.FaqCategoryDTO;
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
	/** 1ページあたりのデータ数*/
	private static final int limit = 100;

	/**
	 * FAQ全件取得
	 * @return
	 */
	public HashMap<String, Object> getFaqList(int page) {
		Pageable pageable = new PageRequest(page, limit);
		return convertReturnMap(faqRepository.findAll(pageable).getContent());
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
		//登録前にFAQカテゴリを登録する
		faq.setCategories(saveFaqCategory(faq.getCategories()));
		return faqRepository.save(faq);
	}
	
	/**
	 * FAQリストからの新規登録
	 * @param faqs
	 */
	public void postFaqList(List<FAQ> faqs) {
		for(FAQ faq:faqs) {
			//新規FAQタイトルの場合
			if(findExistFaqId(faq) == null){
				faq.setCategories(saveFaqCategory(faq.getCategories()));
				faqRepository.save(faq);				
			}
			//既存FAQタイトルの場合(上書き）
			else{
				faq.setId(findExistFaqId(faq));
				editFaq(faq);
			}
		}
	}
	
	/**
	 * 既存FAQがあるかチェック
	 * @param targetFaq
	 * @return
	 */
	private Integer findExistFaqId(FAQ targetFaq) {
		List<FAQ> existFaqs = faqRepository.findAll();
		for(FAQ existFaq : existFaqs){
			if(targetFaq.getTitle().equals(existFaq.getTitle())){
				return existFaq.getId();
			}
		}
		return null;
	}
	
	/**
	 * FAQカテゴリを全件取得
	 * @return
	 */
	public List<FAQCategory> findAllCategories() {
		return categoryRepository.findAll();
	}
	
	/**
	 * FAQをIDで取得する
	 * @param id
	 * @return
	 */
	public FAQ findFaqById(Integer id) {
		return faqRepository.findOne(id);
	}
	
	/**
	 * FAQ更新処理
	 * @param id
	 * @param target
	 * @return
	 */
	public FAQ editFaq(FAQ target) {
		target.setCategories(saveFaqCategory(target.getCategories()));
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
	
	/**
	 * FAQ登録前のカテゴリ整形処理
	 * @param selectedCategoryList
	 * @return
	 */
	private List<FAQCategory> saveFaqCategory(List<FAQCategory> selectedCategoryList){
		List<FAQCategory> savedCategoryList = new ArrayList<>();
		List<FAQCategory> existCategoryList = categoryRepository.findAll();
		//カテゴリが選択されていない場合は空リストを返す
		if(selectedCategoryList == null || selectedCategoryList.isEmpty()){
			return savedCategoryList;
		}
		//カテゴリ初回登録チェック
		if(existCategoryList.size() > 0){
			//既存カテゴリ名リストを作成
			List<String> existCategoryNameList = existCategoryList.stream().map(existCategory -> existCategory.getName()).collect(Collectors.toList());
			
			//引数のカテゴリリスト内の新規/既存をチェック
			for(FAQCategory selectedCategory:selectedCategoryList){
				//既存カテゴリの場合
				if(existCategoryNameList.contains(selectedCategory.getName())){
					savedCategoryList.add(categoryRepository.findByName(selectedCategory.getName()));
				}
				//新規カテゴリの場合
				else{
					selectedCategory.setStatus("valid");
					savedCategoryList.add(categoryRepository.save(selectedCategory));
				}
			}				
		}else{
			for(FAQCategory selectedCategory:selectedCategoryList){
				selectedCategory.setStatus("valid");
				savedCategoryList.add(categoryRepository.save(selectedCategory));
			}
		}
		return savedCategoryList;
	}
	
	/**
	 * 重複なしのカテゴリリスト作成処理
	 * @param faqList
	 * @return
	 */
	private List<FaqCategoryDTO> getDistinctCategoryList(List<FAQ> faqList){
		//FAQリストから重複のないカテゴリリストを作成
		List<FaqCategoryDTO> categoryList =  faqList.stream()
													.flatMap(faq -> faq.getCategories().stream())
													.distinct()
													.map(category -> new FaqCategoryDTO(category.getId(), category.getName()))
													.collect(Collectors.toList());
		return categoryList;
	}
	
	/**
	 * ESから取得したデータをクライアント返却用にmapに詰める
	 * @param targetData
	 * @return
	 */
	public HashMap<String, Object> convertReturnMap(List<FAQ> targetData){
		HashMap<String, Object> searchResultMap = new HashMap<>();
		searchResultMap.put("faqList", targetData);
		searchResultMap.put("faqCategoryList", getDistinctCategoryList(targetData));
		return searchResultMap;
	}

}
