package com.intranewton.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.User;
import com.intranewton.domain.repository.UserRepository;

@Service
public class LoginUserDetailsService implements UserDetailsService{
	@Autowired
	UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException{
		User user = userRepository.findOne(userName);
		if(user == null){
			throw new UsernameNotFoundException("ユーザ名とパスワードが一致していません");
		}
		return new LoginUserDetails(user);
	}
}
