package com.intranewton.domain.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="m_notification_target_role")
@Data
@NoArgsConstructor
public class NotificationTargetRole implements Serializable{
	private static final long serialVersionUID = 424525830287419781L;
	
	@Id
	@GeneratedValue
	private Integer id;
	
	private String target_user;
	private boolean read_flag;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="m_notification_id")
	private Notification m_notification;
}
