package com.taskflow.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskflow.app.models.entities.User;
import com.taskflow.app.models.repositiories.UserRepository;

@RestController
@RequestMapping("/users")
public class UsersController {
	
	@Autowired
	private UserRepository userRepository;

	@GetMapping("/{id}")
	public User findById(@PathVariable int id) {
		return this.userRepository.findById(id).get();
	}
}
