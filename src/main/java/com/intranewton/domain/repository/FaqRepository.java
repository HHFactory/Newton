<<<<<<< HEAD
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
	@Query("UPDATE Faq f SET f.usefulCount = f.usefulCount + 1 WHERE f.id=?")
	@Modifying
	@Transactional
	Integer countUpUsefulCount(Integer id);

	//文字列検索用クエリ(elasticsearchに移行)
	@Query("SELECT f FROM Faq f WHERE f.title LIKE %:title% ORDER BY f.updateDatetime ASC")
	List<Faq> searchFaq(@Param("title") String title);
}
=======
package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.intranewton.domain.entity.FAQ;

/**
 * m_FAQテーブルリポジトリ
 */
@Repository
public interface FaqRepository extends JpaRepository<FAQ, Integer>{
	//役に立ったボタン押下時にuseful_countカラムをインクリメントする。
	@Query("UPDATE FAQ faq SET faq.usefulCount = faq.usefulCount + 1 WHERE faq.id=?")
	@Modifying
	@Transactional
	Integer countUpUsefulCount(Integer id);
	
	//文字列検索用クエリ(elasticsearchに移行)
	@Query("SELECT f FROM FAQ f where f.title like %:title% order by f.updateDatetime asc")
	List<FAQ> searchFaq(@Param("title") String title);
}
>>>>>>> refs/remotes/origin/dev_horinouchi
