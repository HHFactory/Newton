package com.intranewton.domain.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import com.intranewton.domain.common.AbstractEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * notificationテーブルエンティティ
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "notification")
@Where(clause = "status='valid'")
@NoArgsConstructor
@AllArgsConstructor
public class Notification extends AbstractEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Column(nullable=false)
	private String title;
	
	@Column(nullable=true,columnDefinition="TEXT")
	private String content;
	
	@Column(nullable=true)
	private String filePath;
	
	@Column(nullable=true)
	private Integer importance;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "notification_id")
	private List<NotificationTargetRole> notificationTargetRoles;
}
