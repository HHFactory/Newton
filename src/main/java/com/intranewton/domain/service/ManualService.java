package com.intranewton.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.Manual;
import com.intranewton.domain.repository.ManualRepository;

@Service
public class ManualService {
	@Autowired
	ManualRepository manualRepository;
	
	// マニュアル取得
	public List<Manual> getManualList() {
		List<Manual> manuals = manualRepository.findAll();
		return manuals;
	}

}
