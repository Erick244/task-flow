package com.taskflow.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskflow.app.models.dtos.LoginDto;
import com.taskflow.app.models.dtos.LoginResponseDto;
import com.taskflow.app.models.dtos.SignUpDto;
import com.taskflow.app.services.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;

	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody @Valid SignUpDto signUpDto) {
		return this.authService.singUp(signUpDto);
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginDto loginDto) {
		return this.authService.signIn(loginDto);
	}
}
