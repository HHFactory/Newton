package com.intranewton.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.Manual;

/**
 * m_manualテーブルリポジトリ
 */
@Repository
public interface ManualRepository extends JpaRepository<Manual,Integer>{
	
}
