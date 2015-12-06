package com.intranewton.domain.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * m_codeテーブルエンティティ
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="m_code")
@Where(clause="status='valid'")
public class Code implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Integer id;
	private String name;
}
