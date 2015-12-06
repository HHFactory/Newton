package com.intranewton.domain.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.entity.Category;
import com.intranewton.domain.repository.CategoryRepository;

@RestController
public class CategoryRestController {

	@Autowired
	CategoryRepository categoryRepository;
	
	@RequestMapping(value="/api/v1/categories/{category_div}",method=RequestMethod.GET)
	public List<Category> findByCategoryDiv(@PathVariable Integer category_div){
		return categoryRepository.findByCategory_div(category_div);
	}
}
