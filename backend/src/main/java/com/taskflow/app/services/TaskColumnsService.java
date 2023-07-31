package com.taskflow.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.taskflow.app.models.dtos.TaskColumnCreateDto;
import com.taskflow.app.models.entities.TaskColumn;
import com.taskflow.app.models.entities.User;
import com.taskflow.app.models.repositiories.TaskColumnRepository;
import com.taskflow.app.models.repositiories.UserRepository;

@Service
public class TaskColumnsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private TaskColumnRepository taskColumnRepository;

	public ResponseEntity<?> create(TaskColumnCreateDto taskColumnCreateDto) {
		User user = this.userRepository.findById(taskColumnCreateDto.user_id()).orElse(null);
		
		if (user == null) {
			return ResponseEntity.notFound().build();
		}
		
		TaskColumn newTaskColumn = new TaskColumn(taskColumnCreateDto.title(), user);
		this.taskColumnRepository.save(newTaskColumn);
		
		return ResponseEntity.ok().build();
		
	}

	public ResponseEntity<Iterable<TaskColumn>> findAllByUserId(int userId) {
		Iterable<TaskColumn> userTaskColumns = this.taskColumnRepository.findAllByUserId(userId);
		
		if (userTaskColumns == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(userTaskColumns);
	}
}
