package com.intranewton.domain.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
	@Value("${fileurl.path}")
	private String FILE_PATH;

	
	/**
	 * マニュアルカテゴリ取得
	 * @return
	 */
	public List<ManualDTO> getManualCategories() {
		List<ManualCategory> categories = categoryRepository.findAll();
		//ManualCategoryからManualDTOに変換
		List<ManualDTO> manualDTOs =  categories.stream()
												.filter(category -> category.getParents().size() ==1 && category.getParents().get(0).getPathLength() == 0)//自身のアイテムは含めない
												.map(category -> new ManualDTO(category.getId(), category.getName(), category.getManuals(), getCategoryChildItem(category.getChildren())))
												.collect(Collectors.toList());
		return manualDTOs;
	}
			
	/**
	 * 子要素の取得
	 * @param targetRelations
	 * @return
	 */
	private List<ManualDTO> getCategoryChildItem(List<ManualCategoryRelations> targetRelations) {		
		List<ManualDTO> children =  targetRelations.stream()
													.filter(relation -> relation.getPathLength() == 1)//1つ下の子要素のみ取得
													.map(relation -> categoryRepository.findManualCategoryByID(relation.getDescendantId()))
													.map(category -> new ManualDTO( category.getId(), category.getName(), category.getManuals(), getCategoryChildItem(category.getChildren()) ))
													.collect(Collectors.toList());
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
		//トリムしないファイル名も保存する(削除時用)
		loadedFile.setFullFileName(fileName);
		//パスはトリミングしない
		loadedFile.setFilePath(FILE_PATH + fileName);
		loadedFile.setCategory(category);
		loadedFile.setStatus("valid");
		return manualRepository.save(loadedFile);
	}
	
	/**
	 * マニュアルデータの削除
	 * @param manualID
	 */
	public void deleteFileInfo(Integer targetId) {
		manualRepository.delete(targetId);
	}
		
}
