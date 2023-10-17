package com.taskflow.app.exceptions.taskColumn;

import org.springframework.http.HttpStatus;

import com.taskflow.app.exceptions.HttpException;

public class TaskColumnNotFound extends HttpException {

	private static final long serialVersionUID = 1L;

	public TaskColumnNotFound() {
		super("Task column not found", HttpStatus.NOT_FOUND);
	}
	
}
