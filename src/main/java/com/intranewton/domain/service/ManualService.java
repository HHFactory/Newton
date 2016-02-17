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
	/** ファイルパス　**/
	private static final String FILE_PATH = "app/files/";
	
	/**
	 * マニュアルカテゴリ取得
	 * @return
	 */
	public List<ManualDTO> getManualCategories() {
		List<ManualCategory> categories = categoryRepository.findAll();

		List<ManualDTO> manualDTOs = new ArrayList<>();
		//親カテゴリ->子カテゴリ->孫カテゴリ・・・となるように整形
		for ( ManualCategory category : categories ) {
			//自分自身のアイテムは含めない
			if(category.getParents().size() == 1 && category.getParents().get(0).getPathLength() == 0) {
				ManualDTO dto = new ManualDTO();
				dto.setId(category.getId());
				dto.setName(category.getName());
				dto.setManuals(category.getManuals());
				//子要素を取得する
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
				child.setId(category.getId());
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
	public Manual postFileInfo(String fileName,Integer categoryID) {
		Manual loadedFile = new Manual();
		ManualCategory category = categoryRepository.findManualCategoryByID(categoryID);
		//timestamp箇所をトリムしてファイル名とする
		String name = fileName.substring(15);
		loadedFile.setFileName(name);
		//パスはトリミングしない
		loadedFile.setFilePath(FILE_PATH + fileName);
		loadedFile.setCategory(category);
		loadedFile.setStatus("valid");
		return manualRepository.save(loadedFile);
	}
		
	/**
	 * m_manualテーブルjson確認用
	 */
	public List<Manual> getAllManual() {
		return manualRepository.findAll();
	}
	
	/**
	 * m_manual_categoryテーブルjson確認用
	 * @return
	 */
	public List<ManualCategory> getAllManualCategories() {
		return categoryRepository.findAll();
	}
	


}
