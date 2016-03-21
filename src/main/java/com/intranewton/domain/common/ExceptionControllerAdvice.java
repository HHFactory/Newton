package com.intranewton.domain.common;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionControllerAdvice {
	
	private final static Logger logger = LoggerFactory.getLogger(ExceptionControllerAdvice.class);
	
	/**
	 * エラーが発生した場合にlog出力
	 * @param exception
	 */
	@ExceptionHandler(Exception.class)
	public void errorHandling(Exception exception){
		logger.error(exception.toString());
	}
}
