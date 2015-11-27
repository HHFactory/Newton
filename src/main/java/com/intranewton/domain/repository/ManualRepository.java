package com.intranewton.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.ManualCategory;

@Repository
public interface ManualRepository extends JpaRepository<ManualCategory,Integer>{
	//文字列検索用クエリ
//	@Query("SELECT m FROM ManualCategory m where m.title like %:title% order by m.update_datetime asc")
//	List<FAQ> searchFaq(@Param("title") String title);
}
