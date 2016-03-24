package com.intranewton.domain.common;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionControllerAdvice {
	
	private final static Logger logger = LoggerFactory.getLogger(ExceptionControllerAdvice.class);
	
	/**
	 * エラーが発生した場合にlog出力
	 * @param exception
	 */
	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public void errorHandling(Exception exception){
		logger.error(exception.toString());
	}
}
