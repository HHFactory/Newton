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
 * m_notificationテーブルエンティティ
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

	private String title;
	@Column(name="content",columnDefinition="TEXT")
	private String content;
	private String filePath;
	private Integer importance;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "notification_id")
	private List<NotificationTargetRole> notificationTargetRoles;
}
