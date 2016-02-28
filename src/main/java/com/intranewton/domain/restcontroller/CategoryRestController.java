package com.intranewton.domain.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.entity.FAQCategory;
import com.intranewton.domain.service.CategoryService;

@RestController
public class CategoryRestController {

	@Autowired
	CategoryService categoryService;
	
	/*
	 * FAQカテゴリ全件取得
	 */
	@RequestMapping(value="/api/v1/category/faq/", method=RequestMethod.GET)
	public List<FAQCategory> findFaqCategories(){
		return categoryService.findFaqCategories();
	}	
	

}
