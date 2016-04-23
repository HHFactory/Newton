package com.intranewton.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intranewton.domain.entity.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, String>{
	
}
