package com.intranewton.domain.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
 * m_category_categoryテーブルエンティティ
 */
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="manual_category")
@Where(clause="status='valid'")
@Embeddable
public class ManualCategory implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Integer id;
	
	@Column(nullable=false,columnDefinition="char(8) DEFAULT 'valid'")
	private String status;
	
	@Column(nullable=false)
	private String name;
		
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name="manual_category_id")
	private List<Manual> manuals;
	
	@OneToMany(mappedBy="children")
	List<ManualCategoryRelations> children;
	@OneToMany(mappedBy="parents")
	List<ManualCategoryRelations> parents;
}
