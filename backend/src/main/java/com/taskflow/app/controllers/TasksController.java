package com.taskflow.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskflow.app.models.dtos.TaskCreateDto;
import com.taskflow.app.services.TasksService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tasks")
public class TasksController {
	
	@Autowired
	private TasksService tasksService;

	@PostMapping
	public ResponseEntity<?> create(@RequestBody @Valid TaskCreateDto taskCreateDto) {
		return this.tasksService.create(taskCreateDto);
	}
}
