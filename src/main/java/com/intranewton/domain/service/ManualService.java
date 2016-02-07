package com.intranewton.domain.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
			//最上位カテゴリ->子カテゴリ->孫カテゴリ・・・となるように返却
			//自分自身のアイテムは含めない
			if(category.getParents().size() == 1 && category.getParents().get(0).getPathLength() == 0) {
				ManualDTO dto = new ManualDTO();
				dto.setName(category.getName());
				dto.setManuals(category.getManuals());
				//１つ下の子要素を取得する
				dto.setChildren(getCategoryChildItem(category.getChildren()));
				manualDTOs.add(dto);				
			}
		}
		return manualDTOs;
	}
			
	/**
	 * 子要素の取得
	 * @param targetRelations
	 * @return
	 */
	private List<ManualDTO> getCategoryChildItem(List<ManualCategoryRelations> targetRelations) {
		List<ManualDTO> children = new ArrayList<>();
		for(ManualCategoryRelations relation : targetRelations){
			//1つ下の子要素のみ取得
			if ( relation.getPathLength() == 1 ) {
				ManualDTO child = new ManualDTO();
				ManualCategory category = categoryRepository.findManualCategoryByID(relation.getDescendantId());
				child.setName(category.getName());
				child.setManuals(category.getManuals());
				child.setChildren(getCategoryChildItem(category.getChildren()));
				children.add(child);
			}
		}
		return children;
	}
	
	/**
	 * アップロードしたマニュアルファイル情報をDBに格納する
	 * @param uploadedFile
	 * @return
	 */
	public Manual postManual(String fileName, String filePath,Integer categoryID) {
		Manual loadedFile = new Manual();
		ManualCategory category = categoryRepository.findManualCategoryByID(categoryID);
		loadedFile.setFileName(fileName);
		loadedFile.setFilePath("../../app/files/" + fileName);
		loadedFile.setCategory(category);
		loadedFile.setStatus("valid");
		return manualRepository.save(loadedFile);
	}
	

}
