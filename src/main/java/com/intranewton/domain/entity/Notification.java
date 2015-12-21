package com.intranewton.domain.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Where;
import org.springframework.data.elasticsearch.annotations.Document;

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
@Table(name = "m_notification")
@Where(clause = "status='valid'")
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "jdbc", type = "notification")
public class Notification extends AbstractEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private String title;
	private String content;
	private String filePath;
	private Integer importance;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "m_notification_id")
	private List<NotificationTargetRole> notificationTargetRoles;
}
