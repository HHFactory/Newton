package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.FAQCategory;

/**
 * m_manual_categoryテーブルリポジトリ
 */
@Repository
public interface FAQCategoryRepository extends JpaRepository<FAQCategory, Integer>{
	//カテゴリIDからカテゴリを取得する
	List<FAQCategory> findById(Integer id);
}
