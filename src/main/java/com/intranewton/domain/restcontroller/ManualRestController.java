package com.intranewton.domain.restcontroller; 

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.entity.ManualCategory;
import com.intranewton.domain.service.ManualService;
import com.intranewton.domain.service.NotificationService;
import com.intranewton.domain.service.SearchService;
import com.intranewton.domain.service.UserService;

@RestController
public class ManualRestController {
	@Autowired
	ManualService manualService;
	@Autowired
	SearchService searchService;
	@Autowired
	NotificationService NotificationService;
	@Autowired
	UserService userService;
	
//-----マニュアル関連------

	//マニュアル取得
	@RequestMapping(value="/api/v1/manuals",method=RequestMethod.GET)
	List<ManualCategory> findAllManuals(){
		List<ManualCategory> manualCategories = manualService.getManualList();
		System.out.println("connect manual api");
		return manualCategories;
	}
	
	
//-----FAQ関連-----------
//	//FAQ取得
//	@RequestMapping(value="/api/v1/faqs",method=RequestMethod.GET)
//	List<FAQ> getFaqList(){
//		List<FAQ> faqs = manualService.getFaqList();
//		System.out.println("connect faq api");
//		return faqs;
//	}
//	
//	//FAQ.useful_countインクリメント処理
//	@RequestMapping(value="/api/v1/faqs/countupuseful/{id}",method=RequestMethod.PUT)
//	@ResponseStatus(HttpStatus.OK)
//	public Integer updateUseful(@PathVariable Integer id){
//		Integer usefulcount = manualService.countUpUsefulCount(id);
//		System.out.println(usefulcount);
//		return usefulcount;
//	}
//	
//	//FAQ新規登録
//	@RequestMapping(value="/api/v1/faq",method=RequestMethod.POST)
//	@ResponseStatus(HttpStatus.CREATED)
//	FAQ postFaq(@RequestBody FAQ faq){	
//		return manualService.createFaq(faq);
//	}
//	
//	//FAQ,マニュアル、お知らせを全て検索する
//	@RequestMapping(value="/api/v1/faq",method=RequestMethod.GET)
//	List<SearchResult> searchALL(@Param("title") String title){
//		List<SearchResult> searchResults = searchService.searchAll(title);
//		return searchResults;
//	}

//------お知らせ関連-----------
//	//お知らせ登録
//	@RequestMapping(value="/api/v1/notifications",method=RequestMethod.POST)
//	@ResponseStatus(HttpStatus.CREATED)
//	Integer postNotification(@RequestBody CreateNotificationDAO notificationDAO){
//		NotificationService.createNotification(notificationDAO);
//		return 200;
//	}
	
//	//user情報の取得
//	@RequestMapping(value="/api/v1/users",method=RequestMethod.GET)
//	List<User> getUsers(){
//		return userService.getUser();
//	}
//	
//	//role情報の取得
//	@RequestMapping(value="/api/v1/roles",method=RequestMethod.GET)
//	List<Role> getRoles(@RequestParam List<String> targetSkills){
//		return userService.getRole(targetSkills);
//	}
	
//	//ログインユーザへのお知らせ情報取得
//	@RequestMapping(value="/api/v1/notifications",method=RequestMethod.GET)
//	List<NotificationDTO> getNotificationsToLoginUser(@RequestParam(required=false) String userName){
//		return NotificationService.findToLoginUser(userName);
//	}
//	
//	//パラメータとして渡したスキルを持つuserを取得する
//	@RequestMapping(value="/api/v1/targetusers",method=RequestMethod.GET)
//	List<String> findTargetUsers(@RequestParam List<String> targetSkill){
//		return NotificationService.findbyTargetRole(targetSkill);
//	}
//	
//	@RequestMapping(value="/api/v1/notificationuser",method=RequestMethod.GET)
//	List<Notification> getNotifications(@RequestParam String userName){
//		return NotificationService.findbyTargetUser(userName);
//	}
	
	
	
}
