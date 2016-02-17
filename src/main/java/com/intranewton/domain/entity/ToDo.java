package com.intranewton.domain.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
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
@Table(name="todo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ToDo implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Integer id;
	private Timestamp createDatetime;
	private String createUser;
	@Column(name="status",columnDefinition="char(8) DEFAULT 'valid'")
	private String status;
	private String title;
	private String content;
	private String targetUser;
	private Integer importance;
	private Timestamp deadLine;
	private String memo;
}
