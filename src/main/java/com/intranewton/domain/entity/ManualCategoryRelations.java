package com.intranewton.domain.entity;

import java.io.Serializable;

import javax.persistence.Column;
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
 * m_category_relationsテーブルエンティティ
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="manual_category_relations")
public class ManualCategoryRelations implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id 
	@GeneratedValue
	private Integer id;
	
	@Column(nullable=false)
	private Integer anscestorId;

	@Column(nullable=false)
	private Integer descendantId;
	
	@Column(nullable=false)
	private Integer pathLength;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="anscestorId",referencedColumnName="id",insertable=false,updatable=false)
	private ManualCategory children;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="descendantId",referencedColumnName="id",insertable=false,updatable=false)
	private ManualCategory parents;
}
