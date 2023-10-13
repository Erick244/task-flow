package com.taskflow.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.taskflow.app.models.dtos.tasks.SyncTasksDto;
import com.taskflow.app.models.dtos.tasks.TaskCreateDto;
import com.taskflow.app.models.dtos.tasks.UpdateTaskDto;
import com.taskflow.app.models.entities.Task;
import com.taskflow.app.models.entities.TaskColumn;
import com.taskflow.app.models.entities.User;
import com.taskflow.app.models.repositiories.TaskColumnRepository;
import com.taskflow.app.models.repositiories.TaskRepository;

@Service
public class TasksService {

	@Autowired
	private TaskColumnRepository taskColumnRepository;

	@Autowired
	private TaskRepository taskRepository;
	
	@Autowired
	private AuthService authService;

	public ResponseEntity<?> create(TaskCreateDto taskCreateDto) {
		int taskColumnId = taskCreateDto.taskColumnId();
		String goal = taskCreateDto.goal();
		String description = taskCreateDto.description();
		Boolean isCompleted = taskCreateDto.isCompleted();
		
		TaskColumn taskColumn = this.taskColumnRepository.findById(taskColumnId).orElse(null);
		User userAuth = this.authService.getUserAuth();

		if (taskColumn == null || userAuth == null) {
			return ResponseEntity.notFound().build();
		}
		
		Task newTask = new Task(goal, description, isCompleted, taskColumn, userAuth);
		this.taskRepository.save(newTask);

		return ResponseEntity.ok().build();
	}

	public ResponseEntity<Iterable<Task>> syncTasks(SyncTasksDto syncTasksDto) {

		List<Integer> tasksIds = syncTasksDto.tasksIds();
		int userAuthId = this.authService.getUserAuth().getId();

		if (tasksIds == null || tasksIds.isEmpty()) {
			return this.findAll();
		}

		Iterable<Task> syncTasks = this.taskRepository.findAllByIdNotInAndUserId(tasksIds, userAuthId);

		return ResponseEntity.ok(syncTasks);

	}

	public ResponseEntity<Iterable<Task>> findAll() {
		int userAuthId = this.authService.getUserAuth().getId();
		
		Iterable<Task> tasks = this.taskRepository.findAllByUserId(userAuthId);

		return ResponseEntity.ok(tasks);
	}
	
	public ResponseEntity<?> delete(int taskId) {
		int userAuthId = this.authService.getUserAuth().getId();
		Task task = this.taskRepository.findById(taskId).orElse(null); 
		
		Boolean theTaskIsTheUser = task.getUser().getId() == userAuthId;
		
		if (theTaskIsTheUser) {
			this.taskRepository.delete(task);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
	}
	
	public ResponseEntity<?> update(UpdateTaskDto updateTaskDto, int taskId) {
		String goal = updateTaskDto.goal();
		String description = updateTaskDto.description();
		Boolean isCompleted = updateTaskDto.isCompleted();
		
		if (updateTaskDto.equals(null)) {
			return ResponseEntity.noContent().build();
		}
		
		Task task = this.taskRepository.findById(taskId).orElse(null);
		
		if (task == null) {
			return ResponseEntity.notFound().build();
		}
		
		if (theTaskIsTheUser(taskId)) {
			task.setGoal(goal);
			task.setDescription(description);
			task.setIsCompleted(isCompleted);
			
			this.taskRepository.save(task);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
		
	}
	
	private boolean theTaskIsTheUser(int taskId) {
		int userAuthId = this.authService.getUserAuth().getId();
		Task task = this.taskRepository.findByIdAndUserId(taskId, userAuthId);
		
		if (task == null) {
			return false;
		} else {
			return true;
		}
		
	}

}
