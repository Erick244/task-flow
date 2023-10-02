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
import com.taskflow.app.models.repositiories.UserRepository;

@Service
public class TaskColumnsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TaskColumnRepository taskColumnRepository;

	public ResponseEntity<?> create(TaskColumnCreateDto taskColumnCreateDto) {
		User user = this.userRepository.findById(taskColumnCreateDto.userId()).orElse(null);

		if (user == null) {
			return ResponseEntity.notFound().build();
		}

		TaskColumn newTaskColumn = new TaskColumn(taskColumnCreateDto.title(), user);
		this.taskColumnRepository.save(newTaskColumn);

		return ResponseEntity.ok().build();

	}

	public ResponseEntity<Iterable<TaskColumn>> syncTaskColumns(SyncTaskColumnsDto syncTaskColumnsDto) {

		List<Integer> taskColumnsIds = syncTaskColumnsDto.taskColumnsIds();
		Integer userId = syncTaskColumnsDto.userId();

		if (taskColumnsIds == null || taskColumnsIds.isEmpty()) {
			return this.findAllByUserId(userId);
		}

		Iterable<TaskColumn> syncTaskColumns = this.taskColumnRepository.findAllByIdNotInAndUserId(taskColumnsIds, userId);

		return ResponseEntity.ok(syncTaskColumns);

	}

	public ResponseEntity<Iterable<TaskColumn>> findAllByUserId(int userId) {
		Iterable<TaskColumn> userTaskColumns = this.taskColumnRepository.findAllByUserId(userId);

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
