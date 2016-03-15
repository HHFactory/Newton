package com.intranewton.domain.service;

/*
 * お知らせ関連サービス
 * 
 */

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.dto.NotificationDTO;
import com.intranewton.domain.dto.NotificationParam;
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
	 * @param notificationParam
	 */
	public Notification createNotification(NotificationParam notificationParam) {
		notificationParam.setTargetUserList(userService.getTargetUsersbySkills(notificationParam.getTargetUserList()));
		return notificationRepository.save(convertParamtoEntity(notificationParam));
	}

	/**
	 * クライアントから渡されたパラメータからnotificationクラスに詰め替える
	 * @param notificationParam
	 * @return notification
	 */
	private Notification convertParamtoEntity(NotificationParam notificationParam) {
		Notification notification = new Notification();
		notification.setCreateUser(notificationParam.getCreateUser());		
		notification.setUpdateUser(notificationParam.getUpdateUser());
		notification.setStatus("valid");
		notification.setTitle(notificationParam.getTitle());
		notification.setContent(notificationParam.getContent());
		notification.setFilePath(notificationParam.getFilePath());
		notification.setImportance(notificationParam.getImportance());
		
		//targetUserListからNotificationTargetRoleリストを生成
		List<NotificationTargetRole> targetRoleList = 
				   notificationParam.getTargetUserList().stream()
														.map(targetUser -> {
															NotificationTargetRole targetRole = new NotificationTargetRole();
															targetRole.setNotification(notification);
															targetRole.setTargetUser(targetUser);
															return targetRole;
														})
														.collect(Collectors.toList());
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
		List<Notification> notifications = getEntityByUserName(userName);
		//更新日で降順ソート
		Collections.sort(notifications, (n1,  n2) -> Long.compare(n2.getUpdateDatetime().getTime(), n1.getUpdateDatetime().getTime()));
		List<NotificationDTO> notificationDTOList = 
				notifications.stream()
							 .map(notification -> new NotificationDTO(notification.getId(),notification.getTitle(),notification.getContent(),notification.getFilePath(),notification.getImportance(),notification.getCreateUser(), null, createReadUserList(notification.getNotificationTargetRoles(), userName),createUnReadUserList(notification.getNotificationTargetRoles(), userName)))
							 .collect(Collectors.toList());
		
		return notificationDTOList;
	}

	/**
	 * 渡されたユーザ名に紐づくお知らせを返却する
	 * 
	 * @param userName
	 * @return notification list
	 */
	private List<Notification> getEntityByUserName(String userName) {
		List<NotificationTargetRole> targetRoleList = notificationTargetRoleRepository.findbyTargetUser(userName);
		List<Notification> notificationList = targetRoleList.stream()
					  										.map(targetRole -> notificationRepository.findByTargetRoles(targetRole))
					  										.collect(Collectors.toList());
		return notificationList;
	}

	/**
	 * お知らせ既読者リストを作成する
	 * 
	 * @param targetRoleList
	 * @param userName
	 * @return 既読ユーザ名のリスト
	 */
	private List<String> createReadUserList(List<NotificationTargetRole> targetRoleList,String userName) {
		List<String> readUserList = new ArrayList<>();
		//listのnullチェック
		if(!targetRoleList.isEmpty()){
			readUserList = targetRoleList.stream()
										 .filter(targetRole -> targetRole.isReadFlag())//readFlag = trueで抽出
										 .map(targetRole -> targetRole.getTargetUser())//ユーザ名リストの生成
										 .collect(Collectors.toList());			
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
	private List<String> createUnReadUserList(List<NotificationTargetRole> targetRoleList,String userName) {		
		List<String> unreadUserList = new ArrayList<>();
		//listのnullチェック
		if(!targetRoleList.isEmpty()){
			//
			unreadUserList =  targetRoleList.stream()
											.filter(targetRole -> !targetRole.isReadFlag())//readFlag = falseで抽出
											.map(targetRole -> targetRole.getTargetUser())//ユーザ名リストの生成
											.collect(Collectors.toList());
		}
		return unreadUserList;
	}
	
	/**
	 * 既読処理
	 * @param id
	 * @param userName
	 */
	public void readNotification(Integer id, String userName){
		notificationTargetRoleRepository.isRead(id, userName);
	}
	
	/**
	 * 削除処理
	 * @param id
	 */
	public void deleteNotification(Integer id){
		notificationRepository.delete(id);
	}

}
