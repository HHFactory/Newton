package com.intranewton;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableAutoConfiguration
@ComponentScan
@SpringBootApplication
@EnableJpaRepositories(includeFilters=@ComponentScan.Filter(type=FilterType.ASSIGNABLE_TYPE, value=JpaRepository.class))
@EnableElasticsearchRepositories(includeFilters=@ComponentScan.Filter(type=FilterType.ASSIGNABLE_TYPE,value=ElasticsearchRepository.class))
public class Application {
	public static void main(String[] args){
		SpringApplication.run(Application.class, args);
	}
	
}
