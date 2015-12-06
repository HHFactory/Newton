package com.intranewton.domain.entity;

import java.io.Serializable;
import java.util.List;

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
 * m_code_groupテーブルエンティティ
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="m_code_group")
@Where(clause="status='valid'")
public class CodeGroup implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Integer id;
	private String name;
	@OneToMany(fetch=FetchType.LAZY)
	@JoinColumn(name="m_code_group_id")
	List<Code> codes;
}
