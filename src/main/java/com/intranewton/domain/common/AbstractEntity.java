package com.intranewton.domain.common;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.ColumnDefault;

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
	
	@Column(name="create_datetime",columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Timestamp createDatetime;
	private String createUser;
	@Column(name="update_datetime",columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
	private Timestamp updateDatetime;
	private String updateUser;
	@Column(name="status",columnDefinition="char(8) DEFAULT 'valid'")
	private String status;
}
