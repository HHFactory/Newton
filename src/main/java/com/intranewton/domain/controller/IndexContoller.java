package com.intranewton.domain.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexContoller {	

	/**
	 * トップページhtmlを返す
	 * @return
	 */
	@RequestMapping(value="/index",method=RequestMethod.GET)
	String indexURL(){		
		return "app/views/index.html";
	}
	
	/**
	 * 用語集htmlを返す
	 * @return
	 */
	@RequestMapping(value="/term",method=RequestMethod.GET)
	String termURL(){
		return "app/views/term/termbase.html";
	}

}
