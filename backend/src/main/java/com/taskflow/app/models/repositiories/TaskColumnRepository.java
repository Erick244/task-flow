package com.taskflow.app.models.repositiories;

import org.springframework.data.repository.CrudRepository;

import com.taskflow.app.models.entities.TaskColumn;

public interface TaskColumnRepository extends CrudRepository<TaskColumn, Integer> {

	Iterable<TaskColumn> findAllByUserId(int userId);
}
