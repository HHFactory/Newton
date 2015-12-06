package com.intranewton.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.intranewton.domain.entity.Role;
import com.intranewton.domain.entity.User;

/**
 * m_userテーブルリポジトリ
 */
public interface UserRepository extends JpaRepository<User, Integer>{
	//ロールリストから該当するユーザを取得する
	@Query("SELECT u.name FROM User u Where :targetRole MEMBER OF u.roleList")
	public String findbyTargetRole(@Param("targetRole") Role targetRole);
}
