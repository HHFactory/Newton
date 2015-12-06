package com.intranewton.domain.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import com.intranewton.domain.common.AbstractEntity;

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
@Table(name="m_manual")
@Where(clause="status='valid'")
public class Manual extends AbstractEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String file_name;
	private String file_path;
//	@OneToOne
//	@JoinColumn(name="m_category_id")
//	private Category category;
}
