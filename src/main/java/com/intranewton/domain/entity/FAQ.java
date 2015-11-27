package com.intranewton.domain.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Where;
import org.springframework.data.elasticsearch.annotations.Document;

import com.intranewton.domain.common.AbstractEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@Table(name="m_faq")
@Where(clause="status='valid'")
@Document(indexName="jdbc",type="jdbc")
@NoArgsConstructor
@AllArgsConstructor
public class FAQ extends AbstractEntity{
	private String title;
	private String content;
	private Integer useful_count;
}
