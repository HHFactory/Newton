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
	 * 渡されたDAOのスキル名リストをユーザ名リストに変換し、お知らせとして登録する
	 * 
	 * @param notificationDAO
	 */
	public void createNotification( NotificationParam notificationDAO ) {
		notificationDAO.setTargetUserList(userService.getTargetUsersbySkills(notificationDAO.getTargetUserList()));
		notificationRepository.save(convertDAOtoEntity(notificationDAO));
		System.out.println("notification post success");
	}

	/**
	 * 渡されたDAOからnotificationクラスに詰め替える
	 * 
	 * @param notificationDAO
	 * @return notification
	 */
	public Notification convertDAOtoEntity( NotificationParam notificationDAO ) {
		Notification notification = new Notification();
		notification.setCreate_user(notificationDAO.getCreate_user());
		notification.setUpdate_user(notificationDAO.getUpdate_user());
		notification.setStatus("valid");
		notification.setTitle(notificationDAO.getTitle());
		notification.setContent(notificationDAO.getContent());
		notification.setFile_path(notificationDAO.getFile_path());
		notification.setImportance(notificationDAO.getImportance());
		List<NotificationTargetRole> targetRoleList = new ArrayList<>();
		for ( String targetUser : notificationDAO.getTargetUserList() ) {
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
	public List<NotificationDTO> getDTObyUserName( String userName ) {
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
	public List<Notification> getEntitybyUserName( String userName ) {
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
	public List<String> createReadUserList( List<NotificationTargetRole> targetRoleList, String userName ) {
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
	public List<String> createUnReadUserList( List<NotificationTargetRole> targetRoleList, String userName ) {
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
