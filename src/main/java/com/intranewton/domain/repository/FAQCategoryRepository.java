package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.FAQ;
import com.intranewton.domain.entity.FAQCategory;

/**
 * m_manual_categoryテーブルリポジトリ
 */
@Repository
public interface FAQCategoryRepository extends JpaRepository<FAQCategory, Integer>{
	public FAQCategory findByName(String categoryName);
	
	@Query("SELECT fc FROM FAQCategory fc WHERE :targetFaq MEMBER OF fc.faqs")
	public List<FAQCategory> findsByFaq(@Param("targetFaq") FAQ targetFaq);

}
