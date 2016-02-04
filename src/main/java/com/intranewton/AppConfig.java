package com.intranewton;

import net.sf.log4jdbc.Log4jdbcProxyDataSource;
import java.net.URI;
import java.net.URISyntaxException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class AppConfig {
	@Autowired
	DataSourceProperties properties;
	DataSource dataSource;
	
	
	@Bean(destroyMethod="close")
	DataSource realDatasource() throws URISyntaxException {
		String url;
		String username;
		String password;
		
		String databaseUrl = System.getenv("DATABASE_URL");
		if(databaseUrl != null) {
			URI dbUri = new URI(databaseUrl);
			url = "jdbc:mysql://" + dbUri.getHost() + dbUri.getPath() + ":" + dbUri.getPort() + dbUri.getPath();
			username = dbUri.getUserInfo().split(":")[0];
			password = dbUri.getUserInfo().split(":")[1];
		}else{
			url = this.properties.getUrl();
			username = this.properties.getUsername();
			password = this.properties.getPassword();
		}
		
		DataSourceBuilder factory = DataSourceBuilder
				.create(this.properties.getClassLoader())
				.url(url)
		        .username(username)
		        .password(password);
		this.dataSource = factory.build();
		return this.dataSource;
	}
	
	@Primary
	@Bean
	DataSource datasource() {
		return new Log4jdbcProxyDataSource(this.dataSource);
	}

}
