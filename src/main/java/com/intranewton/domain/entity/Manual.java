package com.intranewton.domain.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * m_manualテーブルエンティティ
 */
@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="manual")
@Where(clause="status='valid'")
public class Manual implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private Integer id;
	
	@Column(nullable=false,columnDefinition="char(8) DEFAULT 'valid'")
	private String status;
	
	@Column(nullable=false)
	private String fileName;
	
	@Column(nullable=false)
	private String fullFileName;
	
	@Column(nullable=false)
	private String filePath;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="manual_category_id")
	ManualCategory category;
}
