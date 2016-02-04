package com.intranewton.domain.service;

import java.util.ArrayList;
import java.util.List;

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
	 * m_manualテーブル確認用
	 */
	public List<Manual> getAllManual() {
		return manualRepository.findAll();
	}
	
	/**
	 * m_manual_categoryテーブル確認用
	 * @return
	 */
	public List<ManualCategory> getAllManualCategories() {
		return categoryRepository.findAll();
	}
	
	/**
	 * m_manual_categoryをID検索
	 * @return
	 */
	public ManualCategory getManualCategory() {
		return categoryRepository.findManualCategoryByID(1);
	}
//-----------------------------------	
	
	/**
	 * マニュアルカテゴリ取得
	 * @return
	 */
	public List<ManualDTO> getManualCategories() {
		List<ManualCategory> categories = categoryRepository.findAll();

		List<ManualDTO> manualDTOs = new ArrayList<>();
		for ( ManualCategory category : categories ) {
			//最上位カテゴリのみ返却
			if(category.getParents().size() == 1 && category.getParents().get(0).getPathLength() == 0) {
				ManualDTO dto = new ManualDTO();
				dto.setName(category.getName());
				dto.setManuals(category.getManuals());
				dto.setChildren(getRelationItemsInfo(category.getChildren()));// manualcategoryitem.list
				manualDTOs.add(dto);				
			}
		}
		return manualDTOs;
	}
		
	/**
	 * カテゴリ要素の作成
	 * @param targetCategory
	 * @return
	 */
	private List<ManualCategoryItem> getRelationItemsInfo(List<ManualCategoryRelations> targetList) {
		List<ManualCategoryItem> categoryItems = new ArrayList<>();
		for ( ManualCategoryRelations relation : targetList ) {
			ManualCategoryItem categoryItem = new ManualCategoryItem();
			//自身を除くitemの情報を取得する
			if(relation.getPathLength() == 0) {
				continue;
			}
			ManualCategory category = categoryRepository.findManualCategoryByID(relation.getDescendantId());
			categoryItem.setName(category.getName());
			categoryItem.setManuals(category.getManuals());
			categoryItem.setPathLength(relation.getPathLength());				
			categoryItems.add(categoryItem);
		}
		return categoryItems;
	}
	

}
