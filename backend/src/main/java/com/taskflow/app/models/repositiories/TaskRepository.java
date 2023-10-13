package com.taskflow.app.models.repositiories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.taskflow.app.models.entities.Task;

public interface TaskRepository extends CrudRepository<Task, Integer> {

	Task findByIdAndUserId(int taskId, int userId);
	
	Iterable<Task> findAllByUserId(int userid);

	Iterable<Task> findAllByIdNotInAndUserId(List<Integer> tasksIds, Integer userId);
}
