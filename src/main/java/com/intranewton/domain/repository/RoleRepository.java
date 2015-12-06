package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.Role;

/**
 * m_roleテーブルリポジトリ
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer>{
	//スキルリストから該当するロールを取得
	@Query("SELECT r FROM Role r WHERE r.skill_name IN :targetSkillList")
	public List<Role> findBySkillList(@Param("targetSkillList") List<String> targetSkillList);
	
}
