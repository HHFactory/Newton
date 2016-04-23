package com.intranewton.domain.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * roleテーブルエンティティ
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="role")
@Where(clause="status='valid'")
public class Role implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Integer id;
	
	@Column(nullable=false,columnDefinition="char(8) DEFAULT 'valid'")
	private String status;
	
	@Column(nullable=false)
	private String name;
	
	/** クライアント側表示用ロール名*/
	@Column(nullable=false)
	private String alias;
	
	/** 保有する権限リスト*/
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="role_has_permission",
			joinColumns=@JoinColumn(name="role_id",referencedColumnName="id"),
			inverseJoinColumns=@JoinColumn(name="permission_id",referencedColumnName="id")
			)
	List<Permission> permissions;
}