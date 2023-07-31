package com.taskflow.app.models.repositiories;

import org.springframework.data.repository.CrudRepository;

import com.taskflow.app.models.entities.Task;

public interface TaskRepository extends CrudRepository<Task, Integer> {

}
