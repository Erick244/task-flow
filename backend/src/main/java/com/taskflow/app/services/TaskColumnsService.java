package com.taskflow.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.taskflow.app.models.dtos.taskColumns.SyncTaskColumnsDto;
import com.taskflow.app.models.dtos.taskColumns.TaskColumnCreateDto;
import com.taskflow.app.models.entities.TaskColumn;
import com.taskflow.app.models.entities.User;
import com.taskflow.app.models.repositiories.TaskColumnRepository;

@Service
public class TaskColumnsService {

	@Autowired
	private TaskColumnRepository taskColumnRepository;
	
	@Autowired
	private AuthService authService;

	public ResponseEntity<?> create(TaskColumnCreateDto taskColumnCreateDto) {
		String title = taskColumnCreateDto.title();
		User userAuth = this.authService.getUserAuth();

		TaskColumn newTaskColumn = new TaskColumn(title, userAuth);
		this.taskColumnRepository.save(newTaskColumn);

		return ResponseEntity.ok().build();

	}

	public ResponseEntity<Iterable<TaskColumn>> syncTaskColumns(SyncTaskColumnsDto syncTaskColumnsDto) {

		List<Integer> taskColumnsIds = syncTaskColumnsDto.taskColumnsIds();
		int userAuthId = this.authService.getUserAuth().getId();

		if (taskColumnsIds == null || taskColumnsIds.isEmpty()) {
			return this.findAll();
		}

		Iterable<TaskColumn> syncTaskColumns = this.taskColumnRepository.findAllByIdNotInAndUserId(taskColumnsIds, userAuthId);

		return ResponseEntity.ok(syncTaskColumns);

	}
	
	public ResponseEntity<Iterable<TaskColumn>> findAll() {
		int userAuthId = this.authService.getUserAuth().getId();
		
		Iterable<TaskColumn> userTaskColumns = this.taskColumnRepository.findAllByUserId(userAuthId);

		return ResponseEntity.ok(userTaskColumns);
	}
	
	public ResponseEntity<TaskColumn> findOne(int taskColumnId) {
		TaskColumn taskColumn = this.taskColumnRepository.findById(taskColumnId).orElse(null);
		
		if (taskColumn == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(taskColumn);
	}
}
