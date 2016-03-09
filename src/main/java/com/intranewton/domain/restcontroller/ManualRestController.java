package com.intranewton.domain.restcontroller; 

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.dto.ManualDTO;
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
	
}
