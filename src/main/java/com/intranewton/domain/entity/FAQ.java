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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@NoArgsConstructor
@AllArgsConstructor
public class FAQ extends AbstractEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Column(nullable=false)
	private String title;
	
	@Column(columnDefinition="TEXT",nullable=false)
	private String content;
	
	@Column(nullable=true,columnDefinition="TEXT")
	private String talkScript;
	
	@Column(columnDefinition="int(11) DEFAULT '0'",nullable=false)
	private Integer usefulCount;
	
	@ManyToMany
	@JoinTable(
			name="faq_has_faq_category",
			joinColumns=@JoinColumn(name="faq_id",referencedColumnName="id"),
			inverseJoinColumns=@JoinColumn(name="faq_category_id",referencedColumnName="id")
			)
	@JsonIgnoreProperties(value="faqs")
	private List<FAQCategory> categories;	
	
}
