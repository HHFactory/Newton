package com.intranewton.domain.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.entity.FAQCategory;
import com.intranewton.domain.service.CategoryService;

@RestController
public class CategoryRestController {

	@Autowired
	CategoryService categoryService;
	
	@RequestMapping(value="/api/v1/category/faq/{id}")
	public List<FAQCategory> findFaqCategories(Integer id){
		return categoryService.findFaqCategory(id);
	}
}
