package com.intranewton.domain.entity;

import java.io.Serializable;

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
 * m_faq_category_relationsテーブルエンティティ
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="m_faq_category_relations")
public class FAQCategoryRelations implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id 
	@GeneratedValue
	private Integer id;
	private Integer anscestor_id;
	private Integer descendant_id;
	private Integer path_length;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="anscestor_id",referencedColumnName="id",insertable=false,updatable=false)
	private FAQCategory children;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="descendant_id",referencedColumnName="id",insertable=false,updatable=false)
	private FAQCategory parent;
}
