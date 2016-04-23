package com.intranewton.domain.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

	//指定したユーザ名に紐づくお知らせを取得する（お知らせID降順）
	Page<NotificationTargetRole> findByTargetUserOrderByNotificationIdDesc(String targetuser,Pageable pageable);
	
	//指定したユーザのお知らせを既読にする
	@Query("UPDATE NotificationTargetRole nt SET nt.readFlag = 1 WHERE nt.notification.id = :targetId AND nt.targetUser = :targetUser")
	@Modifying
	@Transactional
	public void isRead(@Param("targetId") Integer notificationId, @Param("targetUser") String targetUser);
}
