package com.intranewton.domain.restcontroller; 

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.entity.Manual;
import com.intranewton.domain.service.ManualService;

@RestController
public class ManualRestController {
	@Autowired
	ManualService manualService;
	
	//マニュアル取得
	@RequestMapping(value="/api/v1/manuals",method=RequestMethod.GET)
	List<Manual> findAllManuals(){
		List<Manual> manuals = manualService.getManualList();
		System.out.println("connect manual api");
		return manuals;
	}
	
}
