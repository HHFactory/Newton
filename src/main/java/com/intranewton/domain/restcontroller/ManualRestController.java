package com.intranewton.domain.restcontroller; 

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	@RequestMapping(value="/api/v1/manuallist",method=RequestMethod.GET)
	List<ManualDTO> findAllManualCategories() {
		return manualService.getManualCategories();
	}
		
	/**
	 * 確認用１
	 * @return
	 */
	@RequestMapping(value="/api/v1/manual",method=RequestMethod.GET)
	List<Manual> findAllManual() {
		return manualService.getAllManual();
	}
	
	/**
	 * 確認用2
	 * @return
	 */
	@RequestMapping(value="/api/v1/manualcategory",method=RequestMethod.GET)
	List<ManualCategory> findAllManualCategory() {
		return manualService.getAllManualCategories();
	}
	
	/**
	 * 確認用3
	 * @return
	 */
	@RequestMapping(value="/api/v1/manualitem",method=RequestMethod.GET)
	ManualCategory findCategoryItem() {
		return manualService.getManualCategory();
	}
	
}
