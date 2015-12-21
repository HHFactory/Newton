package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.FaqCategory;

/**
 * m_manual_categoryテーブルリポジトリ
 */
@Repository
public interface FaqCategoryRepository extends JpaRepository<FaqCategory, Integer>{
	//カテゴリIDからカテゴリを取得する
	List<FaqCategory> findById(Integer id);
}
