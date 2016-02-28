package com.intranewton.domain.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Where;
import org.springframework.data.elasticsearch.annotations.Document;

import com.intranewton.domain.common.AbstractEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * FAQテーブルエンティティ
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "faq")
@Where(clause = "status='valid'")
@Document(indexName = "jdbc",type = "jdbc")
@NoArgsConstructor
@AllArgsConstructor
public class FAQ extends AbstractEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String title;
	@Column(name="content",columnDefinition="TEXT")
	private String content;
	private String talkScript;
	@Column(name="useful_count",columnDefinition="int(11) DEFAULT '0'")
	private Integer usefulCount;
	
	@ManyToMany
	@JoinTable(
			name="faq_has_faq_category",
			joinColumns=@JoinColumn(name="faq_id",referencedColumnName="id"),
			inverseJoinColumns=@JoinColumn(name="faq_category_id",referencedColumnName="id")
			)
	private List<FAQCategory> categories;	
	
}
