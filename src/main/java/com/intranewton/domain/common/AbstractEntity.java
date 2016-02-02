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
	private Timestamp createDatetime;
	private String createUser;
	private Timestamp updateDatetime;
	private String updateUser;
	private String status;
}
