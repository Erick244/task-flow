package com.taskflow.app.models.repositiories;

import org.springframework.data.repository.CrudRepository;

import com.taskflow.app.models.entities.User;

public interface UserRepository extends CrudRepository<User, Integer> {

	User findByEmail(String email);
}
