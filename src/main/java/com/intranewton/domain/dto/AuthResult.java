package com.intranewton.domain.dto;

import java.util.List;

import lombok.Data;

@Data
public class AuthResult {
	/** ユーザ名*/
	private String userName;
	/** 権限リスト*/
	private List<String> permissions;
	/** ロール名*/
	private List<String> roles;
//	/** チーム名*/
//	private List<String> teams;
}
