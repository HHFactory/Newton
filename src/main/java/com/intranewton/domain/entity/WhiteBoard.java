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
 * m_white_boardエンティティクラス
 *
 */
@Entity
@Table(name="m_white_board")
@Where(clause="status='valid'")
@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
public class WhiteBoard extends AbstractEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String content;
	
}
