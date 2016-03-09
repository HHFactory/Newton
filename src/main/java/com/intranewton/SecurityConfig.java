//package com.intranewton;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//
//@Configuration
//@EnableWebMvcSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter{
//	@Override
//	public void configure(WebSecurity web) throws Exception{
//		web.ignoring().antMatchers("/app/scripts/**","/app/views/**");
//	}
//	
//	@Override
//	protected void configure(HttpSecurity http) throws Exception{
//		http.authorizeRequests().antMatchers("/loginform").permitAll()
//			.anyRequest().authenticated();
//		
//		http.formLogin()
//			.loginPage("/login")
//			.permitAll()
//			.failureUrl("/loginform?error")
//			.defaultSuccessUrl("/index",true)
//			.usernameParameter("username").passwordParameter("password")
//			.and();
//		
//		http.logout()
//			.logoutRequestMatcher(new AntPathRequestMatcher("/logout**")).logoutSuccessUrl("/loginform");
//
//	}
//	
//	@Configuration
//	static class AuthenticationConfiguration extends GlobalAuthenticationConfigurerAdapter{
//		@Autowired
//		UserDetailsService userDetailsService;
//		
//		@Bean
//		PasswordEncoder passwordEncoder(){
//			return new BCryptPasswordEncoder();
//		}
//		
//		@Override
//		public void init(AuthenticationManagerBuilder auth) throws Exception{
//			auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
//		}
//		
//	}
//}
