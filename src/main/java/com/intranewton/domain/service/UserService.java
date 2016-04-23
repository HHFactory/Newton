package com.intranewton.domain.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.Role;
import com.intranewton.domain.entity.User;
import com.intranewton.domain.repository.RoleRepository;
import com.intranewton.domain.repository.TeamRepository;
import com.intranewton.domain.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	TeamRepository teamRepository;

	/**
	 * user entityの取得
	 * 
	 * @return user.class
	 */
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	/**
	 * role entityの取得
	 * 
	 * @return role.class
	 */
	public List<Role> getAllRoles() {
		return roleRepository.findAll();
	}

	/**
	 * 渡したスキル名リストから、roleリストを返却
	 * 
	 * @param targetSkillList
	 * @return role list
	 */
	public List<Role> getTargetRolesbySkills( List<String> targetSkillList ) {
		return roleRepository.findBySkillList(targetSkillList);
	}

	/**
	 * 渡されたチームリストから、対象ユーザを取得する
	 * 
	 * @param targetTeamList
	 * @return user名リスト
	 */
	public List<String> getTargetUsersByTeamName( List<String> targetTeamList ) {
		List<Role> roleList = roleRepository.findBySkillList(targetTeamList);
		List<String> targetUserList = new ArrayList<>();
		for ( Role targetRole : roleList ) {
			List<String> userNameList = userRepository.findbyTargetRole(targetRole);
			targetUserList.addAll(userNameList);
		}
			
		// 重複削除して返却する
		return targetUserList.stream().distinct().collect(Collectors.toList());
	}

}
