package com.intranewton.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.intranewton.domain.service.ManualService;

@Controller
public class ManualContoller {
	@Autowired
	ManualService manualService;
	
	//index.htmlを返す
	@RequestMapping(value="/index",method=RequestMethod.GET)
	String indexURL(){
		System.out.println("return index.html");
		return "app/views/index.html";
	}
	
	//modal.htmlを返す
	@RequestMapping(value="index/modal",method=RequestMethod.GET)
	String modalURL(){
		return "html/modal";
	}
	
	//createArticleModal.htmlを返す
	@RequestMapping(value="index/createarticle",method=RequestMethod.GET)
	String createArticleModal(){
		System.out.println("why execute this method");
		return "app/views/createArticleModal.html";
	}
	
	//popover.htmlを返す
	@RequestMapping(value="index/popover",method=RequestMethod.GET)
	String popoverPanel(){
		System.out.println("このメソッドは呼び出さない");
		return "html/popover";
	}
}
