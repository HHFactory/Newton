package com.intranewton.domain.common;

import java.sql.Timestamp;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.PreUpdate;

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
	
	@Column(nullable=false,columnDefinition="TIMESTAMP DEFAULT 0")
	private Timestamp createDatetime;
	
	@Column(nullable=false)
	private String createUser;
	
	@Column(nullable=false,columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
	private Timestamp updateDatetime;
	
	@Column(nullable=false)
	private String updateUser;
	
	@Column(nullable=false,columnDefinition="char(8) DEFAULT 'valid'")
	private String status;
	
	/** 更新時に更新日時を設定 */
	@PreUpdate
	private void preUpdate(){
		setUpdateDatetime(new Timestamp(Calendar.getInstance().getTime().getTime()));
	}
}
