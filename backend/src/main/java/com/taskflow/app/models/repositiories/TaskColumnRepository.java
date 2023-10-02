package com.taskflow.app.models.repositiories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.taskflow.app.models.entities.TaskColumn;

public interface TaskColumnRepository extends CrudRepository<TaskColumn, Integer> {

	Iterable<TaskColumn> findAllByUserId(int userId);
	
	Iterable<TaskColumn> findAllByIdNotInAndUserId(List<Integer> taskColumnsIds, Integer userId);
}
