package com.intranewton.domain.entity;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Where;
import org.springframework.data.elasticsearch.annotations.Document;

import com.intranewton.domain.common.AbstractEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * m_FAQテーブルエンティティ
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "m_faq")
@Where(clause = "status='valid'")
@Document(indexName = "jdbc",type = "jdbc")
@NoArgsConstructor
@AllArgsConstructor
public class Faq extends AbstractEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private String title;
	private String content;
	private String talk_script;
	private Integer useful_count;

//	@OneToOne
//	@JoinColumn(name = "m_category_id")
//	private Category category;

	public Faq(Integer id, Timestamp createDatetime, String createUser, Timestamp updateDatetime, String updateUser,
			String status, String title, String content, String talk_script, Integer useful_count) {
		super(id, createDatetime, createUser, updateDatetime, updateUser, status);
		this.title = title;
		this.content = content;
		this.talk_script = talk_script;
		this.useful_count = useful_count;
	}
}
