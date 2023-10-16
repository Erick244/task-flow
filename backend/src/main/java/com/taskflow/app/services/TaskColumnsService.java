package com.taskflow.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.taskflow.app.models.dtos.taskColumns.SyncTaskColumnsDto;
import com.taskflow.app.models.dtos.taskColumns.TaskColumnCreateDto;
import com.taskflow.app.models.dtos.taskColumns.UpdateTaskColumnDto;
import com.taskflow.app.models.entities.Task;
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
	
	public ResponseEntity<?> delete(int taskColumnId) {
		TaskColumn taskColumn = this.taskColumnRepository.findById(taskColumnId).orElse(null); 
		
		List<Task> taskColumnTasks = taskColumn.getTasks();
		Boolean existTasks = !taskColumnTasks.isEmpty();
		
		if (existTasks) {
			return ResponseEntity.badRequest().body("Delete the tasks before");
		}
		
		if (theTaskColumnIsTheUser(taskColumn.getId())) {
			this.taskColumnRepository.delete(taskColumn);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
	}
	
	private boolean theTaskColumnIsTheUser(int taskColumnId) {
		int userAuthId = this.authService.getUserAuth().getId();
		TaskColumn taskColumn = this.taskColumnRepository.findByIdAndUserId(taskColumnId, userAuthId);
		
		if (taskColumn == null) {
			return false;
		} else {
			return true;
		}
		
	}
	
	public ResponseEntity<?> update(UpdateTaskColumnDto taskColumnDto, int taskColumnId) {
		String title = taskColumnDto.title();
		
		if (title == null) {
			return ResponseEntity.noContent().build();
		}
		
		TaskColumn taskColumn = this.taskColumnRepository.findById(taskColumnId).orElse(null);
		
		if (taskColumn == null) {
			return ResponseEntity.notFound().build(); 
		}
		
		if (theTaskColumnIsTheUser(taskColumnId)) {
			taskColumn.setTitle(title);
			
			this.taskColumnRepository.save(taskColumn);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
	}

}
