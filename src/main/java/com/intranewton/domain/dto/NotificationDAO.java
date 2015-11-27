package com.intranewton.domain.dto;
/**
 * 登録時にクライアントから渡されるお知らせDAO
 * 当クラスをnotification entityに変換し、DBに登録する
 * @author hide
 *
 */

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NotificationDAO {
	private String title;
	private String content;
	private String create_user;
	private String update_user;
	private Integer importance;
	private String file_path;
	private List<String> targetUserList;
}
