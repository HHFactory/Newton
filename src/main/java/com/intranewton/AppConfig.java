package com.intranewton;

import java.net.URISyntaxException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import net.sf.log4jdbc.Log4jdbcProxyDataSource;

@Configuration
public class AppConfig {
	@Autowired
	DataSourceProperties properties;
	DataSource dataSource;
	
	@ConfigurationProperties("spring.datasource")
	@Bean
	DataSource realDatasource() throws URISyntaxException {		
		DataSourceBuilder factory = DataSourceBuilder
				.create(this.properties.getClassLoader())
				.url(this.properties.getUrl())
		        .username(this.properties.getUsername())
		        .password(this.properties.getPassword());
		this.dataSource = factory.build();
		return this.dataSource;
	}
	
	@Primary
	@Bean
	DataSource datasource() {
		return new Log4jdbcProxyDataSource(this.dataSource);
	}

}
