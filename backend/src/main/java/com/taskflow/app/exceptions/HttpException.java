package com.taskflow.app.exceptions;

import org.springframework.http.HttpStatus;

public class HttpException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public String errorMessage;
	public HttpStatus httpStatus;
	
	public HttpException(String errorMessage, HttpStatus httpStatus) {
		super();
		this.errorMessage = errorMessage;
		this.httpStatus = httpStatus;
	}
}
