package com.intranewton.domain.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * teamエンティティクラス
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="team")
public class Team {

	@Id
	private String name;
	
	/** ユーザリスト */
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(
			name="team_has_user",
			joinColumns=@JoinColumn(name="team_name",referencedColumnName="name"),
			inverseJoinColumns=@JoinColumn(name="user_name",referencedColumnName="name")
			)
	private List<User> users;
}
