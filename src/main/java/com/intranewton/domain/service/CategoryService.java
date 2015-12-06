package com.intranewton.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.Category;
import com.intranewton.domain.repository.CategoryRepository;

@Service
public class CategoryService {
	@Autowired
	CategoryRepository categoryRepository;
	
	//カテゴリ区分からカテゴリ一覧を取得
	public List<Category> findByCategoriDiv(Integer categori_div){
		return categoryRepository.findByCategory_div(categori_div);
	}
	
	
}
