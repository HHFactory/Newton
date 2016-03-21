package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.Term;

@Repository
public interface TermRepository extends JpaRepository<Term, Integer>{
	/**
	 * titleのlike検索
	 * @param title
	 * @return
	 */
	@Query("SELECT t FROM Term t WHERE t.title LIKE %:title%")
	List<Term> searchTerm(@Param("title") String title);
	
	/**
	 * 用語集の全件取得
	 * @return
	 */
	@Query("SELECT t FROM Term t ORDER BY t.title")
	List<Term> findAllTermOrderByTitle();
}
