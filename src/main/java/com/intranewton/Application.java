package com.intranewton;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableAutoConfiguration
@ComponentScan
@EnableJpaRepositories(includeFilters=@ComponentScan.Filter(type=FilterType.ASSIGNABLE_TYPE, value=JpaRepository.class))
@EnableElasticsearchRepositories(includeFilters=@ComponentScan.Filter(type=FilterType.ASSIGNABLE_TYPE,value=ElasticsearchRepository.class))
@PropertySource({"classpath:config/Application-demo.properties"})
public class Application extends SpringBootServletInitializer{
	
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }
    
    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }

}


