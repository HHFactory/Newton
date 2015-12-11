package com.intranewton.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.ManualCategory;
import java.lang.Integer;
import java.util.List;

/**
 * m_manual_categoryテーブルリポジトリ
 */
@Repository
public interface ManualCategoryRepository extends JpaRepository<ManualCategory, Integer>{
	//カテゴリIDからカテゴリを取得する
	List<ManualCategory> findById(Integer id);
}
