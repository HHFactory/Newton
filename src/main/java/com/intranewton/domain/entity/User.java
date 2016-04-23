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
	
	/** メールアドレス */
	@Id
	private String mailAddress;
	
	/** 表示名 */
	private String name;
	
	/** ステータス */
	@Column(nullable=false,columnDefinition="char(8) DEFAULT 'valid'")
	private String status;
	
	/** パスワード */
	private String encodedPassword;
	
	/** ロールリスト */
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="user_has_role",
			joinColumns=@JoinColumn(name="user_name",referencedColumnName="name"),
			inverseJoinColumns=@JoinColumn(name="role_id",referencedColumnName="id")
			)
	private List<Role> roles;
	
	/** チームリスト */
//	@ManyToMany(fetch=FetchType.LAZY)
//	@JoinTable(
//			name="team_has_user",
//			joinColumns=@JoinColumn(name="user_name",referencedColumnName="name"),
//			inverseJoinColumns=@JoinColumn(name="team_id",referencedColumnName="id")
//			)
//	private List<Team> teams;
}
