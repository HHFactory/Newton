package com.intranewton.domain.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.Team;
import com.intranewton.domain.entity.User;
import com.intranewton.domain.repository.TeamRepository;

@Service
public class TeamService {
	@Autowired
	TeamRepository teamRepository;
	
	/**
	 * チーム全件取得
	 * @return
	 */
	public List<Team> findAll() {
		return teamRepository.findAll();
	}
	
	/**
	 * チームに所属しているユーザ名リストを取得
	 * @param teamName
	 * @return
	 */
	public List<String> getMemberNameList(String teamName){
		List<User> memberList = teamRepository.findOne(teamName).getUsers();
		return memberList
				.stream()
				.map(member -> member.getName())
				.collect(Collectors.toList());
	}
}
