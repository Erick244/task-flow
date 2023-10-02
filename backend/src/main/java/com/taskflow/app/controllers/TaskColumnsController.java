package com.taskflow.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskflow.app.models.dtos.taskColumns.SyncTaskColumnsDto;
import com.taskflow.app.models.dtos.taskColumns.TaskColumnCreateDto;
import com.taskflow.app.models.entities.TaskColumn;
import com.taskflow.app.services.TaskColumnsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/taskColumns")
public class TaskColumnsController {
	
	@Autowired
	private TaskColumnsService taskColumnsService;

	@PostMapping
	public ResponseEntity<?> create(@RequestBody @Valid TaskColumnCreateDto taskColumnCreateDto) {
		return this.taskColumnsService.create(taskColumnCreateDto);
	}
	
	@GetMapping("/findAllByUserId/{userId}")
	public ResponseEntity<Iterable<TaskColumn>> findAllByUserId(@PathVariable int userId) {
		return this.taskColumnsService.findAllByUserId(userId);
	}
	
	@PostMapping("/sync")
	public ResponseEntity<Iterable<TaskColumn>> syncTaskColumns(@RequestBody SyncTaskColumnsDto syncTaskColumnsDto) {
		return this.taskColumnsService.syncTaskColumns(syncTaskColumnsDto);
	}
	
	@GetMapping("/findOne/{taskColumnId}")
	public ResponseEntity<TaskColumn> findOne(@PathVariable int taskColumnId) {
		return this.taskColumnsService.findOne(taskColumnId);
	}
}