package com.intranewton.domain.restcontroller;
/**
 * ユーザ関連のrestcontroller
 * @author hide
 *
 */

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.entity.Role;
import com.intranewton.domain.entity.User;
import com.intranewton.domain.repository.RoleRepository;
import com.intranewton.domain.repository.UserRepository;
import com.intranewton.domain.service.NotificationService;
import com.intranewton.domain.service.UserService;


@RestController
public class UserRestController {
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	NotificationService notificationService;
	@Autowired
	UserService userService;
	
	/**
	 * user entityをリストで取得
	 * @return　user list
	 */
	@RequestMapping(value="/api/v1/users",method=RequestMethod.GET)
	List<User> findAllUsers(){
		return userService.getAllUsers();
	}

	/**
	 * role entityをリストで取得
	 * @return　role list
	 */
	@RequestMapping(value="/api/v1/roles",method=RequestMethod.GET)
	List<Role> findAllRoles(){
		return userService.getAllRoles();
	}
		
	/**
	 * 渡したスキル名に紐づくユーザリストを取得する
	 * @param targetSkill
	 * @return 対象ユーザ名のリスト
	 */
	@RequestMapping(value="/api/v1/targetusers",method=RequestMethod.GET)
	List<String> findUsersbySkills(@RequestParam List<String> targetSkill){
		return userService.getTargetUsersbySkills(targetSkill);
	}
	
	/**
	 * 渡したスキル名リストに紐づくroleクラスを取得する
	 * @param targetSkills
	 * @return　role list
	 */
	@RequestMapping(value="/api/v1/targetroles",method=RequestMethod.GET)
	List<Role> findRolesbySkills(@RequestParam List<String> targetSkills){
		return userService.getTargetRolesbySkills(targetSkills);
	}

}
