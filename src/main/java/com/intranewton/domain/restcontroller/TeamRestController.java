package com.intranewton.domain.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.entity.Team;
import com.intranewton.domain.service.TeamService;

@RestController
public class TeamRestController {
	@Autowired
	TeamService teamService;
	
	/**
	 * チーム全件取得
	 * @return
	 */
	@RequestMapping(value="/api/v1/teams/",method=RequestMethod.GET)
	public List<Team> findAll(){
		return teamService.findAll();
	}

}
