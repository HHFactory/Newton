package com.intranewton.domain.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Where;

import com.intranewton.domain.common.AbstractEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="m_manual_category")
@Where(clause="status='valid'")
public class ManualCategory extends AbstractEntity {
	private String name;
	@OneToMany(fetch=FetchType.LAZY)
	@JoinColumn(name="m_manual_category_id")
	private List<ManualList> manualLists;
}
