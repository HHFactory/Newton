package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.intranewton.domain.entity.Faq;

/**
 * m_FAQテーブルリポジトリ
 */
@Repository
public interface FaqRepository extends JpaRepository<Faq, Integer>{
	//役に立ったボタン押下時にuseful_countカラムをインクリメントする。
	@Query("UPDATE Faq faq SET faq.useful_count = faq.useful_count + 1 WHERE faq.id=?")
	@Modifying
	@Transactional
	Integer countUpUsefulCount(Integer id);

	//文字列検索用クエリ(elasticsearchに移行)
	@Query("SELECT f FROM Faq f where f.title like %:title% order by f.updateDatetime asc")
	List<Faq> searchFaq(@Param("title") String title);
}
