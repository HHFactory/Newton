package com.intranewton.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.ManualCategory;
import com.intranewton.domain.entity.Notification;
import com.intranewton.domain.repository.FaqRepository;
import com.intranewton.domain.repository.ManualRepository;
import com.intranewton.domain.repository.NotificationRepository;

@Service
public class ManualService {
	@Autowired 
	ManualRepository manualRepository;
	@Autowired
	FaqRepository faqRepository;
	@Autowired
	NotificationRepository notificationRepository;
	
	//マニュアル取得
	public List<ManualCategory> getManualList(){
		List<ManualCategory> manualCategories = manualRepository.findAll();
		return manualCategories;
	}
	
//	//FAQ取得
//	public List<FAQ> getFaqList(){
//		List<FAQ> faqs = faqRepository.findAll();
//		return faqs;
//	}
//	
//	//FAQ.useful_countインクリメント処理
//	public Integer countUpUsefulCount(Integer id){
//		Integer test = faqRepository.countUpUsefulCount(id);
//		return test;
//	}
//	
//	//FAQ新規登録
//	public FAQ createFaq(FAQ faq){
//		return faqRepository.save(faq);
//	}

	//お知らせ取得
	public List<Notification> getNotificationList(){
		List<Notification> notifications = notificationRepository.findAll();
		return notifications;
	}
	
}
