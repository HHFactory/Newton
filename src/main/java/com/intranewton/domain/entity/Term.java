package com.intranewton.domain.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="term")
@Where(clause="status='valid'")
public class Term implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id	
	@GeneratedValue
	private Integer id;
	
	@Column(nullable=false,columnDefinition="char(8) DEFAULT 'valid'")
	private String status;
	
	@Column(nullable=false)
	private String title;
	
	@Column(nullable=false)
	private String content;
}
