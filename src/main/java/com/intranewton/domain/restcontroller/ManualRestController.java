package com.intranewton.domain.restcontroller; 

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.dto.ManualDTO;
import com.intranewton.domain.entity.Manual;
import com.intranewton.domain.entity.ManualCategory;
import com.intranewton.domain.service.ManualService;

@RestController
public class ManualRestController {
	@Autowired
	ManualService manualService;
		
	/**
	 * マニュアルカテゴリ取得
	 * @return
	 */
	@RequestMapping(value="/api/v1/manuals",method=RequestMethod.GET)
	List<ManualDTO> findAllManualCategories() {
		return manualService.getManualCategories();
	}
		
	/**
	 * json確認用-manualテーブル
	 * @return
	 */
	@RequestMapping(value="/api/v1/manual",method=RequestMethod.GET)
	List<Manual> findAllManual() {
		return manualService.getAllManual();
	}
	
	/**
	 * json確認用-manualcategoryテーブル
	 * @return
	 */
	@RequestMapping(value="/api/v1/manualcategory",method=RequestMethod.GET)
	List<ManualCategory> findAllManualCategory() {
		return manualService.getAllManualCategories();
	}
	
}
