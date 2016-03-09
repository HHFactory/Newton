package com.intranewton.domain.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
 * userテーブルエンティティ
 */
@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user")
@Where(clause="status='valid'")
public class User implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	private String name;

	@Column(name="status",columnDefinition="char(8) DEFAULT 'valid'")
	private String status;
	private String encodedPassword;
	private String mailAddress;
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="user_has_role",
			joinColumns=@JoinColumn(name="user_name",referencedColumnName="name"),
			inverseJoinColumns=@JoinColumn(name="role_id",referencedColumnName="id")
			)
	private List<Role> roleList;

}
