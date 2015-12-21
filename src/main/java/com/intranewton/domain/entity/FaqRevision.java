package com.intranewton.domain.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Where;
import org.springframework.data.elasticsearch.annotations.Document;

import com.intranewton.domain.common.AbstractEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * [JPA Entity] FAQ更新履歴
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "m_faq_revision")
@Where(clause = "status='valid'")
@Document(indexName = "jdbc",type = "jdbc")
@NoArgsConstructor
@AllArgsConstructor
public class FaqRevision extends AbstractEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private String title;
	private String content;
	private String talk_script;
	private Integer useful_count;

	@ManyToOne
	@JoinColumn(name="m_faq_id")
	private Faq faq;
}
