package com.intranewton.domain.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexContoller {
	//index.htmlを返す
	@RequestMapping(value="/index",method=RequestMethod.GET)
	String indexURL(){			
		return "app/views/index.html";
	}
}
