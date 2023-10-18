package com.taskflow.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.taskflow.app.models.dtos.users.UpdateUserDto;
import com.taskflow.app.services.UsersService;

@RestController
@RequestMapping("/users")
public class UsersController {
	
	@Autowired
	private UsersService userService;
	
	@GetMapping("/userByToken")
	public ResponseEntity<?> findUserByAuthToken(
			@RequestParam(name = "authToken", required = true) String authToken
	) {
		return this.userService.findUserByAuthToken(authToken);
	}
	
	@RequestMapping(method = {RequestMethod.PATCH, RequestMethod.PUT})
	public ResponseEntity<?> update(@RequestBody UpdateUserDto updateUserDto) {
		return this.userService.update(updateUserDto);
	}
}
