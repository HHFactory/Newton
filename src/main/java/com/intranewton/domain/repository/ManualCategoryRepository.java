package com.intranewton.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.ManualCategory;

/**
 * m_manual_categoryテーブルリポジトリ
 */
@Repository
public interface ManualCategoryRepository extends JpaRepository<ManualCategory, Integer>{
	@Query("SELECT mc FROM ManualCategory mc WHERE mc.id=?")
	ManualCategory findManualCategoryByID(Integer id);
}
