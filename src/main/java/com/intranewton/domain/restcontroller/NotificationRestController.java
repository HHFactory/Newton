package com.intranewton.domain.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.dto.NotificationDTO;
import com.intranewton.domain.dto.NotificationParam;
import com.intranewton.domain.entity.Notification;
import com.intranewton.domain.service.NotificationService;

@RestController
public class NotificationRestController {
	@Autowired
	NotificationService notificationService;
	
	/**
	 * 渡したDAOからお知らせを登録する
	 * @param notification
	 */
	@RequestMapping(value="/api/v1/notification/",method=RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Notification postNotification(@RequestBody NotificationParam notificationParam){
		return notificationService.createNotification(notificationParam);
	}
	
	/**
	 * 渡したユーザ名に紐づくお知らせを取得する
	 * @param userName
	 * @return　notificationDTO List
	 */
	@RequestMapping(value="/api/v1/notifications/",method=RequestMethod.GET)
	public List<NotificationDTO> findDTObyUserName(@RequestParam(required=false) String userName){
		return notificationService.getDTObyUserName(userName);
	}
	
	/**
	 * お知らせ既読処理
	 */
//	@RequestMapping(value="/api/v1/notification/{id}",method=RequestMethod.PUT)
//	@ResponseStatus(HttpStatus.OK)
//	public void readNotification(@PathVariable Integer id, @RequestBody String userName){
//		notificationService.readNotification(id, userName);
//	}
	
	
	/**
	 * elasticsearchでお知らせを全件取得する
	 * @return notification.iterable
	 */
//	@RequestMapping(value="/api/v1/elastic/allnotifications",method=RequestMethod.GET)
//	public Iterable<Notification> findall(){
//		return notificationElasticService.findall();
//	}
	
}
