package com.intranewton.domain.dto;

import java.util.List;

import com.intranewton.domain.entity.NotificationTargetRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * クライアントに返却するお知らせDTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
	private Integer id;
	private String title;
	private String content;
	private String filePath;
	private Integer importance;
	private String createUser;
	private List<NotificationTargetRole> notificationTargetRoles;
	private List<String> readMemberList;
	private List<String> unreadMemberList;
}
