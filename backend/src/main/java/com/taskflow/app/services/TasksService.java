package com.taskflow.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.taskflow.app.models.dtos.TaskCreateDto;
import com.taskflow.app.models.entities.Task;
import com.taskflow.app.models.entities.TaskColumn;
import com.taskflow.app.models.repositiories.TaskColumnRepository;
import com.taskflow.app.models.repositiories.TaskRepository;

@Service
public class TasksService {

	@Autowired
	private TaskColumnRepository taskColumnRepository;
	
	@Autowired
	private TaskRepository taskRepository;
	
	public ResponseEntity<?> create(TaskCreateDto taskCreateDto) {
		TaskColumn taskColumn = this.taskColumnRepository.findById(taskCreateDto.task_column_id()).orElse(null);
		
		if (taskColumn == null) {
			return ResponseEntity.notFound().build();
		}
		
		Task newTask = new Task(taskCreateDto.goal(), taskCreateDto.description(), taskCreateDto.is_completed(), taskColumn);
		this.taskRepository.save(newTask);
		
		return ResponseEntity.ok().build();
	}
}
