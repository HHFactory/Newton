package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
	@Query("UPDATE NotificationTargetRole nt SET nt.readFlag = 1 WHERE nt.notification.id = :targetId AND nt.targetUser = :targetUser")
	@Modifying
	@Transactional
	public void isRead(@Param("targetId") Integer notificationId, @Param("targetUser") String targetUser);
}
