package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.Category;
import java.lang.Integer;

/**
 * m_categoryテーブルリポジトリ
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{

	//指定されたカテゴリ区分でカテゴリ一覧を取得する
	@Query("SELECT c FROM Category c WHERE c.category_div =:category_div")
	List<Category> findByCategory_div(@Param("category_div") Integer category_div);
	
}
