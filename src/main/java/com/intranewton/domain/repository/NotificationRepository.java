package com.intranewton.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.intranewton.domain.entity.Notification;
import com.intranewton.domain.entity.NotificationTargetRole;

/**
 * m_notificationテーブルリポジトリ
 */
public interface NotificationRepository extends JpaRepository<Notification, Integer>{
	//文字列検索用クエリ（elasticsearchに移行)
	@Query("SELECT n FROM Notification n where n.title like %:title% order by n.updateDatetime asc")
	List<Notification> searchNotification(@Param("title") String title);
	
	//targetRoleで検索
	@Query("SELECT n FROM Notification n WHERE :targetRole MEMBER OF n.notificationTargetRoles")
	Notification  findByTargetRoles(@Param("targetRole") NotificationTargetRole targetRole);
	
}
