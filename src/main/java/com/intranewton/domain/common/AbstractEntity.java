package com.intranewton.domain.common;

import java.sql.Timestamp;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
public class AbstractEntity {
	@Id
	@GeneratedValue
	public Integer id;
	private Timestamp create_datetime;
	private String create_user;
	private Timestamp update_datetime;
	private String update_user;
	private String status;
}
