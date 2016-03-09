package com.intranewton.domain.service;

import org.springframework.security.core.authority.AuthorityUtils;

import com.intranewton.domain.entity.User;

import lombok.Data;

@Data
public class LoginUserDetails extends org.springframework.security.core.userdetails.User{
	private static final long serialVersionUID = 1L;
	
	private final User user;
	
	public LoginUserDetails(User user){
		super(user.getName(), user.getEncodedPassword(), AuthorityUtils.createAuthorityList("ROLE_USER"));
		this.user = user;
	}
	
}
