package com.intranewton.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.FaqRevision;

/**
 * [JPA Repository] FAQ更新履歴リポジトリ
 */
@Repository
public interface FaqRevisionRepository extends JpaRepository<FaqRevision, Integer>{
}