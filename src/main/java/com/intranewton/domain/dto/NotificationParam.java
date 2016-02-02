package com.intranewton.domain.dto;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 登録時にクライアントから渡されるお知らせパラメータクラス
 * 当クラスをnotification entityに変換し、DBに登録する
 */
@Data
@NoArgsConstructor
public class NotificationParam {
	private String title;
	private String content;
	private String createUser;
	private String updateUser;
	private Integer importance;
	private String filePath;
	private List<String> targetUserList;
}
