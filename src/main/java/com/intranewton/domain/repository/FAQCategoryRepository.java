package com.intranewton.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.FAQCategory;

/**
 * m_manual_categoryテーブルリポジトリ
 */
@Repository
public interface FAQCategoryRepository extends JpaRepository<FAQCategory, Integer>{
	public FAQCategory findByName(String categoryName);
}
