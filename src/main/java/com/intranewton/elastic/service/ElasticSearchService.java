package com.intranewton.elastic.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.elasticsearch.index.query.FilterBuilders;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.TermFilterBuilder;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.FAQ;
import com.intranewton.domain.entity.FAQCategory;
import com.intranewton.domain.repository.FAQCategoryRepository;
import com.intranewton.domain.repository.FaqRepository;
import com.intranewton.domain.service.FaqService;
import com.intranewton.elastic.document.FaqDoc;
import com.intranewton.elastic.repository.FAQElasticsearchRepository;

/**
 * elasticsearchを使った検索処理
 *
 */
@Service
public class ElasticSearchService{
	@Autowired
	private ElasticsearchTemplate elasticsearchTemplate;
	@Autowired
	private FAQCategoryRepository categoryRepository;
	@Autowired
	FaqRepository faqRepository;
	@Autowired
	FAQElasticsearchRepository elasticsearchRepository;
	@Autowired
	FaqService faqService;
	
	/** 1ページあたりのデータ数*/
	private static final int limit = 100;
	
	/**
	 * FAQリスト、FAQカテゴリリストを返却する
	 * @param searchWord
	 * @return　searchMap hashmap
	 */
	public HashMap<String, Object> searchFaqs(String searchWord,int page){
		return faqService.convertReturnMap(findByMultiMatchQuery(searchWord, page));
//		return convertReturnMap(findByMultiMatchQuery(searchWord, page));
	}
	
	/**
	 * 全件取得処理
	 * @return
	 */
	public HashMap<String, Object> searchAll(int page){
		return faqService.convertReturnMap(findByMatchAll(page));
	}
	
	/**
	 * IDで検索
	 * @param targetId
	 * @return
	 */
	public HashMap<String, Object> findOne(Integer targetId){
		FAQ targetFaq = faqRepository.findOne(targetId);
		List<FAQ> targetData = new ArrayList<>();
		targetData.add(targetFaq);
		return faqService.convertReturnMap(targetData);
	}	
		
	/**
	 * 対象documentの削除
	 * @param id
	 */
	public void deleteFaqDoc(Integer id){
		elasticsearchRepository.delete(id);
	}
	
//	/**
//	 * ESから取得したデータをクライアント返却用にmapに詰める
//	 * @param targetData
//	 * @return
//	 */
//	private HashMap<String, Object> convertReturnMap(List<FAQ> targetData){
//		HashMap<String, Object> searchResultMap = new HashMap<>();
//		searchResultMap.put("faqList", targetData);
//		searchResultMap.put("faqCategoryList", getDistinctCategoryList(targetData));
//		return searchResultMap;
//	}
	
	/**
	 * match_allで検索
	 * @param offset
	 * @return
	 */
	private List<FAQ> findByMatchAll(int page){
		SearchQuery query = buildQuery(QueryBuilders.matchAllQuery(), page);	
		List<FaqDoc> faqDocs = elasticsearchTemplate.queryForList(query, FaqDoc.class);
		return convertToFaqList(faqDocs);
	}
	
	/**
	 * Multi_matchQueryで検索
	 * @param searchWord
	 * @return
	 */
	private List<FAQ> findByMultiMatchQuery(String searchWord,int page){
		SearchQuery query = buildQuery(QueryBuilders.multiMatchQuery(searchWord, "title","content"), page);
		List<FaqDoc> faqDocs = elasticsearchTemplate.queryForList(query, FaqDoc.class);
		return convertToFaqList(faqDocs);
	}
		
	/**
	 * 引数からQueryを作成
	 * @param queryBuilder
	 * @param offset
	 * @return
	 */
	private SearchQuery buildQuery(org.elasticsearch.index.query.QueryBuilder queryBuilder,int page){
		return  new NativeSearchQueryBuilder().withQuery(queryBuilder)
											  .withFilter(FilterBuilders.boolFilter().must(new TermFilterBuilder("status", "valid")))//status=validのみ
											  .withPageable(new PageRequest(page, limit))//1ページあたりのデータ数を制限
											  .withSort(SortBuilders.fieldSort("useful_count").order(SortOrder.DESC))//usefulcountの降順でソート
											  .withSort(SortBuilders.fieldSort("create_datetime").order(SortOrder.ASC))
											  .build();
	}
	
	/**
	 * ES取得データを元に、DBから対象FAQを取得しリスト化して返却
	 * 
	 * @param List<FaqDoc>
	 * @return List<FAQ>
	 */
	private List<FAQ> convertToFaqList(List<FaqDoc> faqDocs){
		List<FAQ> convertedFaqList = 
				 faqDocs.stream()
						.map(doc -> {
							FAQ convertedFaq = new FAQ();
							convertedFaq.setId(doc.getId());
							convertedFaq.setTitle(doc.getTitle());
							convertedFaq.setContent(doc.getContent());
							convertedFaq.setUsefulCount(doc.getUseful_count());
							convertedFaq.setCategories(getCategoriesByFaqId(doc.getId()));
							return convertedFaq;
						})
						.collect(Collectors.toList());
		return convertedFaqList;
	}
	
	/**
	 * 対象FAQ.IDに紐づくカテゴリリストを返却する
	 * 
	 * @param taregetFAQId
	 * @return
	 */
	private List<FAQCategory> getCategoriesByFaqId(Integer taregetFAQId){
		//DBに格納されているFAQカテゴリを取得
		List<FAQCategory> allCategories = categoryRepository.findAll();
		List<FAQCategory> returnCategories = new ArrayList<>();
		
		for(FAQCategory category: allCategories){
			//FAQカテゴリに紐づくFAQデータを取得
			for(FAQ faq: category.getFaqs()){
				//検索対象FAQデータと一致するカテゴリを返却
				if(faq.getId().equals(taregetFAQId)){
					returnCategories.add(category);
				}
			}
		}
				
		return returnCategories;
	}
	
//	/**
//	 * 重複なしのカテゴリリスト作成処理
//	 * @param faqList
//	 * @return
//	 */
//	private List<FaqCategoryDTO> getDistinctCategoryList(List<FAQ> faqList){
//		//FAQリストから重複のないカテゴリリストを作成
//		List<FaqCategoryDTO> categoryList =  faqList.stream()
//													.flatMap(faq -> faq.getCategories().stream())
//													.distinct()
//													.map(category -> new FaqCategoryDTO(category.getId(), category.getName()))
//													.collect(Collectors.toList());
//		return categoryList;
//	}
	

}
