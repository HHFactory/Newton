package com.intranewton.domain.entity;

import java.io.Serializable;
import java.util.List;

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
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * m_userテーブルエンティティ
 */
@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="m_user")
@Where(clause="status='valid'")
public class User implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue
	private Integer id;
	private String status;
	private String name;
	private String password;
	private String mailAddress;
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="m_user_has_m_role",
			joinColumns=@JoinColumn(name="m_user_id",referencedColumnName="id"),
			inverseJoinColumns=@JoinColumn(name="m_role_id",referencedColumnName="id")
			)
	private List<Role> roleList;
 
}
