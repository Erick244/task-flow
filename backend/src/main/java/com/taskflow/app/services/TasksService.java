package com.taskflow.app.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.taskflow.app.models.dtos.tasks.SyncTasksDto;
import com.taskflow.app.models.dtos.tasks.TaskCreateDto;
import com.taskflow.app.models.entities.Task;
import com.taskflow.app.models.entities.TaskColumn;
import com.taskflow.app.models.entities.User;
import com.taskflow.app.models.repositiories.TaskColumnRepository;
import com.taskflow.app.models.repositiories.TaskRepository;
import com.taskflow.app.models.repositiories.UserRepository;

@Service
public class TasksService {

	@Autowired
	private TaskColumnRepository taskColumnRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TaskRepository taskRepository;

	public ResponseEntity<?> create(TaskCreateDto taskCreateDto) {
		TaskColumn taskColumn = this.taskColumnRepository.findById(taskCreateDto.taskColumnId()).orElse(null);
		User user = this.userRepository.findById(taskColumn.getUser_id()).orElse(null);

		if (taskColumn == null || user == null) {
			return ResponseEntity.notFound().build();
		}

		Task newTask = new Task(taskCreateDto.goal(), taskCreateDto.description(), taskCreateDto.isCompleted(),
				taskColumn, user);
		this.taskRepository.save(newTask);

		return ResponseEntity.ok().build();
	}

	public ResponseEntity<Iterable<Task>> syncTasks(SyncTasksDto syncTasksDto) {

		List<Integer> tasksIds = syncTasksDto.tasksIds();
		Integer userId = syncTasksDto.userId();

		if (tasksIds == null || tasksIds.isEmpty()) {
			return this.findAllByUserId(userId);
		}

		Iterable<Task> syncTasks = this.taskRepository.findAllByIdNotInAndUserId(tasksIds, userId);

		return ResponseEntity.ok(syncTasks);

	}

	public ResponseEntity<Iterable<Task>> findAllByUserId(int userId) {
		Iterable<Task> tasks = this.taskRepository.findAllByUserId(userId);

		return ResponseEntity.ok(tasks);
	}

}
