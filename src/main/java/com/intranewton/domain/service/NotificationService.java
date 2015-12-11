package com.intranewton.domain.service;

/*
 * お知らせ関連サービス
 * 
 */

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.dto.NotificationParam;
import com.intranewton.domain.dto.NotificationDTO;
import com.intranewton.domain.entity.Notification;
import com.intranewton.domain.entity.NotificationTargetRole;
import com.intranewton.domain.repository.NotificationRepository;
import com.intranewton.domain.repository.NotificationTargetRoleRepository;
import com.intranewton.domain.repository.RoleRepository;
import com.intranewton.domain.repository.UserRepository;

@Service
public class NotificationService {
	@Autowired
	NotificationRepository notificationRepository;
	@Autowired
	NotificationTargetRoleRepository notificationTargetRoleRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	UserService userService;

	/**
	 * 渡されたパラメータのスキル名リストをユーザ名リストに変換し、お知らせとして登録する
	 * 
	 * @param notificationParam
	 */
	public void createNotification(NotificationParam notificationParam) {
		notificationParam.setTargetUserList(userService.getTargetUsersbySkills(notificationParam.getTargetUserList()));
		notificationRepository.save(convertParamtoEntity(notificationParam));
		System.out.println("notification post success");
	}

	/**
	 * クライアントから渡されたパラメータからnotificationクラスに詰め替える
	 * 
	 * @param notificationParam
	 * @return notification
	 */
	public Notification convertParamtoEntity(NotificationParam notificationParam) {
		Notification notification = new Notification();
		notification.setCreate_user(notificationParam.getCreate_user());
		notification.setUpdate_user(notificationParam.getUpdate_user());
		notification.setStatus("valid");
		notification.setTitle(notificationParam.getTitle());
		notification.setContent(notificationParam.getContent());
		notification.setFile_path(notificationParam.getFile_path());
		notification.setImportance(notificationParam.getImportance());
		List<NotificationTargetRole> targetRoleList = new ArrayList<>();
		for ( String targetUser : notificationParam.getTargetUserList() ) {
			NotificationTargetRole targetRole = new NotificationTargetRole();
			targetRole.setM_notification(notification);
			targetRole.setTarget_user(targetUser);
			targetRoleList.add(targetRole);
		}
		notification.setNotificationTargetRoles(targetRoleList);
		return notification;
	}

	/**
	 * 渡されたユーザ名に紐づくお知らせをDTOに変換して返却する
	 * 
	 * @param userName
	 * @return notificationDTO list
	 */
	public List<NotificationDTO> getDTObyUserName(String userName) {
		List<Notification> notifications = getEntitybyUserName(userName);
		List<NotificationDTO> notificationDTOList = new ArrayList<>();
		for ( Notification notification : notifications ) {
			NotificationDTO notificationDTO = new NotificationDTO();
			notificationDTO.setTitle(notification.getTitle());
			notificationDTO.setContent(notification.getContent());
			notificationDTO.setFile_path(notification.getFile_path());
			notificationDTO.setImportance(notification.getImportance());
			notificationDTO.setReadMemberList(createReadUserList(notification.getNotificationTargetRoles(), userName));
			notificationDTO
			        .setUnreadMemberList(createUnReadUserList(notification.getNotificationTargetRoles(), userName));
			notificationDTOList.add(notificationDTO);
		}
		return notificationDTOList;
	}

	/**
	 * 渡されたユーザ名に紐づくお知らせを返却する
	 * 
	 * @param userName
	 * @return notification list
	 */
	public List<Notification> getEntitybyUserName(String userName) {
		List<NotificationTargetRole> targetRoleList = notificationTargetRoleRepository.findbyTargetUser(userName);
		List<Notification> notificationList = new ArrayList<>();
		for ( NotificationTargetRole targetRole : targetRoleList ) {
			Notification notification = notificationRepository.findByTargetRoles(targetRole);
			notificationList.add(notification);
		}
		return notificationList;
	}

	/**
	 * お知らせ既読者リストを作成する
	 * 
	 * @param targetRoleList
	 * @param userName
	 * @return 既読ユーザ名のリスト
	 */
	public List<String> createReadUserList(List<NotificationTargetRole> targetRoleList,String userName) {
		List<String> readUserList = new ArrayList<>();
		if ( !(targetRoleList.size() > 0) )
			return readUserList;
		for ( NotificationTargetRole targetRole : targetRoleList ) {
			if ( targetRole.isRead_flag() ) {
				readUserList.add(targetRole.getTarget_user());
			}
		}
		return readUserList;
	}

	/**
	 * お知らせ未読者リストの作成
	 * 
	 * @param targetRoleList
	 * @param userName
	 * @return 未読ユーザ名のリスト
	 */
	public List<String> createUnReadUserList(List<NotificationTargetRole> targetRoleList,String userName) {
		List<String> unreadUserList = new ArrayList<>();
		if ( !(targetRoleList.size() > 0) )
			return unreadUserList;
		for ( NotificationTargetRole targetRole : targetRoleList ) {
			if ( !targetRole.isRead_flag() ) {
				unreadUserList.add(targetRole.getTarget_user());
			}
		}
		return unreadUserList;
	}

}
