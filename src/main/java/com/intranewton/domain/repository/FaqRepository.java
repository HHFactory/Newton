package com.intranewton.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.FAQ;

/**
 * FAQテーブルリポジトリ
 */
@Repository
public interface FaqRepository extends JpaRepository<FAQ, Integer>{
	
}
