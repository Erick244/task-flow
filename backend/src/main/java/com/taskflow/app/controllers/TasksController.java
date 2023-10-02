package com.taskflow.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskflow.app.models.dtos.tasks.SyncTasksDto;
import com.taskflow.app.models.dtos.tasks.TaskCreateDto;
import com.taskflow.app.models.entities.Task;
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
	
	@GetMapping("/findAllByUserId/{userId}")
	public ResponseEntity<Iterable<Task>> findAllByUserId(@PathVariable int userId) {
		return this.tasksService.findAllByUserId(userId);
	}
	
	@PostMapping("/sync")
	public ResponseEntity<Iterable<Task>> syncTasks(@RequestBody SyncTasksDto syncTasksDto) {		
		return this.tasksService.syncTasks(syncTasksDto);
	}
}
