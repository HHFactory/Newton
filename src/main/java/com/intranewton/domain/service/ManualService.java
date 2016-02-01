package com.intranewton.domain.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.lucene.analysis.compound.DictionaryCompoundWordTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.dto.ManualCategoryItem;
import com.intranewton.domain.dto.ManualDTO;
import com.intranewton.domain.entity.Manual;
import com.intranewton.domain.entity.ManualCategory;
import com.intranewton.domain.entity.ManualCategoryRelations;
import com.intranewton.domain.repository.ManualCategoryRepository;
import com.intranewton.domain.repository.ManualRepository;

@Service
public class ManualService {
	@Autowired
	ManualRepository manualRepository;
	@Autowired
	ManualCategoryRepository categoryRepository;
	
	/**
	 * マニュアル取得
	 * @return
	 */
	public List<Manual> getManualList() {
		return manualRepository.findAll();
	}
	
	/**
	 * マニュアルカテゴリ取得
	 * @return
	 */
	public List<ManualDTO> getManualCategories() {
		List<ManualCategory> categories = categoryRepository.findAll();
		List<ManualDTO> manualDTOs = new ArrayList<>();
		for(ManualCategory category : categories) {
			ManualDTO dto = new ManualDTO();
			dto.setName(category.getName());
			dto.setManuals(category.getManuals());
			dto.setChildren(getChildrenList(category.getChildren(), categories));
			dto.setParents(getChildrenList(category.getParents(), categories));
			manualDTOs.add(dto);			
		}
		return manualDTOs;
	}
	
	/**
	 * 子カテゴリの中でpathLength=0以外を返す
	 * @param category
	 * @return
	 */
	private List<ManualCategoryRelations> removeSelfItem(List<ManualCategoryRelations> targetList) {
		List<ManualCategoryRelations> categoryRelations = new ArrayList<>();
		for(ManualCategoryRelations relationItem : targetList) {
			if(relationItem.getPathLength() != 0) {
				categoryRelations.add(relationItem);
			}
		}
		return categoryRelations;
	}
	
	/**
	 * 
	 * @param targetCategory
	 * @return
	 */
	private List<ManualCategoryItem> getChildrenList(List<ManualCategoryRelations> targetList,List<ManualCategory> categoryList) {
		List<ManualCategoryItem> categoryItems = new ArrayList<>();
		for ( ManualCategoryRelations relation : targetList ) {
			for ( ManualCategory category : categoryList ) {
				//parents
				if(relation.getDescendantId().equals(category.getId())){
					ManualCategoryItem categoryItem = new ManualCategoryItem();
					ManualCategory tmpCategory = categoryRepository.findOne(relation.getAnscestorId());
					categoryItem.setName(tmpCategory.getName());
					categoryItem.setManuals(tmpCategory.getManuals());
					categoryItem.setPathLength(relation.getPathLength());
					categoryItems.add(categoryItem);
					break;	
				}
				//children
				if ( category.getId().equals(relation.getDescendantId()) ) {
					ManualCategoryItem categoryItem = new ManualCategoryItem();
					categoryItem.setName(category.getName());
					categoryItem.setManuals(category.getManuals());
					categoryItem.setPathLength(relation.getPathLength());
					categoryItems.add(categoryItem);
					break;
				}
			}
		}
		return categoryItems;
	}
	

}
