package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.ToDo;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Integer>{

	//user名に紐づくtodoリストを取得
	@Query("SELECT td FROM ToDo td WHERE td.targetUser = :userName")
	List<ToDo> findByTarget_user(@Param("userName") String userName);
	
	//未完了のtodoリストを取得
	@Query("SELECT td FROM ToDo td WHERE td.status = :status")
	List<ToDo> findByStatus(@Param("status") String status);
}
