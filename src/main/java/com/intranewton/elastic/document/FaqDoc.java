package com.intranewton.elastic.document;

import java.io.Serializable;
import java.sql.Timestamp;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldIndex;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(indexName="newton",type="faq")
@AllArgsConstructor
@NoArgsConstructor
public class FaqDoc implements Serializable{
	private static final long serialVersionUID = 1L;
	
	/** _idと_sourceのidとして設定*/
	@Id
	@Field(type=FieldType.Integer,index=FieldIndex.not_analyzed,store=true)
	private Integer id;
	
	@Field(type=FieldType.Date)
	private Timestamp create_datetime;
	
	@Field(type=FieldType.String)
	private String create_user;
	
	@Field(type=FieldType.Date)
	private Timestamp update_datetime;
	
	@Field(type=FieldType.String)
	private String update_user;
	
	@Field(type=FieldType.String)
	private String status;
		
	@Field( type=FieldType.String,
			index=FieldIndex.analyzed,
			store=true)
	private String title;
	
	@Field( type=FieldType.String,
			index=FieldIndex.analyzed,
			store=true)
	private String content;
	
	@Field(type=FieldType.String,store=false)
	private String talk_script;
	
	@Field( type=FieldType.Integer,
			store=true,
			index=FieldIndex.not_analyzed)	
	private Integer useful_count;
	
}
