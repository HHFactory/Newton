package com.intranewton.domain.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * notification_target_roleテーブルエンティティ
 */
@Entity
@Table(name="notification_target_role")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationTargetRole implements Serializable{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Integer id;
	
	@Column(nullable=false)
	private String targetUser;
	
	@Column(nullable=false,columnDefinition="bit(1)")
	private boolean readFlag;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="notification_id")
	private Notification notification;
	
//	@Column(name="notification_id",insertable=false,updatable=false,nullable=false)
//	private Integer notificationId;

}
