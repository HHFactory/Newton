package com.intranewton.domain.service;

import org.dozer.DozerBeanMapper;
import org.dozer.loader.api.BeanMappingBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.intranewton.domain.entity.FAQ;
import com.intranewton.domain.entity.FAQRevision;

@Configuration
public class FaqFaqRevisionDozerMapperConfiguration {
	@Autowired
	DozerBeanMapper dozerBeanMapper;

	@Bean
	public DozerBeanMapper faqFaqRevisionDozerMapper() {
		dozerBeanMapper.addMapping(buildBeanMapping());
		return dozerBeanMapper;
	}

	private BeanMappingBuilder buildBeanMapping() {
		return new BeanMappingBuilder() {
			@Override
			protected void configure() {
				mapping(FAQ.class, FAQRevision.class)
						.exclude("id")
						.fields("this", "faq");
			}
		};
	}
}
