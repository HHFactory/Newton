package com.intranewton.domain.entity;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * m_faq_categoryテーブルエンティティ
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="faq_category")
@Where(clause="status='valid'")
@Embeddable
public class FAQCategory implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Integer id;
	private String status;
	private String name;	
}
