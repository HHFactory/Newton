package com.intranewton.domain.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * m_faq_categoryテーブルエンティティ
 */
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="m_faq_category")
@Where(clause="status='valid'")
@Embeddable
public class FaqCategory implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Integer id;
	private String status;
	private String name;
	
	@OneToMany
	@JoinColumn(name="m_faq_category_id")
	private List<Faq> faqs;
	
	@OneToMany(mappedBy="children")
	List<FaqCategoryRelation> children;
	@OneToMany(mappedBy="parent")
	List<FaqCategoryRelation> parents;
}
