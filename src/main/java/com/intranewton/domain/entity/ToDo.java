package com.intranewton.domain.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * m_todoエンティティクラス
 *
 */
@Entity
@Table(name="m_todo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ToDo implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Integer id;
	private Timestamp create_datetime;
	private String create_user;
	private String status;
	private String title;
	private String content;
	private String target_user;
	private Integer importance;
	private Timestamp dead_line;
	private String memo;
}
