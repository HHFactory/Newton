package com.intranewton.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.intranewton.domain.dto.LoginUserDetails;
import com.intranewton.domain.entity.User;
import com.intranewton.domain.repository.UserRepository;

@Service
public class LoginUserDetailsService implements UserDetailsService{
	@Autowired
	UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String mailaddress) throws UsernameNotFoundException{
		User user = userRepository.findOne(mailaddress);
		if(user == null){
			throw new UsernameNotFoundException("対象のユーザ情報がありません");
		}
		return new LoginUserDetails(user);
	}
}
