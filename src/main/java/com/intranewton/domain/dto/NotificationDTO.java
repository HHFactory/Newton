package com.intranewton.domain.dto;
/**
 * クライアントに返却するお知らせDTO
 * @author hide
 *
 */

import java.util.List;

import com.intranewton.domain.entity.NotificationTargetRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
	private String title;
	private String content;
	private String file_path;
	private Integer importance;
	private List<NotificationTargetRole> notificationTargetRoles;
	private List<String> readMemberList;
	private List<String> unreadMemberList;
}
