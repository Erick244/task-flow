package com.taskflow.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.taskflow.app.models.dtos.taskColumns.SyncTaskColumnsDto;
import com.taskflow.app.models.dtos.taskColumns.TaskColumnCreateDto;
import com.taskflow.app.models.dtos.taskColumns.UpdateTaskColumnDto;
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
	
	@GetMapping("/findAll")
	public ResponseEntity<Iterable<TaskColumn>> findAll() {
		return this.taskColumnsService.findAll();
	}
	
	@PostMapping("/sync")
	public ResponseEntity<Iterable<TaskColumn>> syncTaskColumns(@RequestBody SyncTaskColumnsDto syncTaskColumnsDto) {
		return this.taskColumnsService.syncTaskColumns(syncTaskColumnsDto);
	}
	
	@GetMapping("/findOne/{taskColumnId}")
	public ResponseEntity<TaskColumn> findOne(@PathVariable int taskColumnId) {
		return this.taskColumnsService.findOne(taskColumnId);
	}
	
	@DeleteMapping("/{taskColumnId}")
	public ResponseEntity<?> delete(@PathVariable int taskColumnId) {
		return this.taskColumnsService.delete(taskColumnId);
	}
	
	@RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH}, path = "/{taskColumnId}")
	public ResponseEntity<?> update(@RequestBody UpdateTaskColumnDto taskColumnDto, @PathVariable int taskColumnId) {
		return this.taskColumnsService.update(taskColumnDto, taskColumnId);
	}
}
