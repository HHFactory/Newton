package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.NotificationTargetRole;

/**
 * notification_target_roleテーブルリポジトリ
 */
@Repository
public interface NotificationTargetRoleRepository extends JpaRepository<NotificationTargetRole, Integer>{
	//指定したユーザ名に紐づくお知らせを取得する
	@Query("SELECT nt FROM NotificationTargetRole nt WHERE nt.targetUser = :targetUser")
	List<NotificationTargetRole> findbyTargetUser(@Param("targetUser") String targetUser);
	
	//指定したユーザ、お知らせIDから既読にする
//	@Query("UPDATE NotificationTargetRole nt SET nt.readFlag = 1 WHERE nt.notificationId = :targetId AND nt.targetUser = :targetUser")
//	public void isRead(@Param("targetId") Integer id,@Param("targetUser") String userName);
}
