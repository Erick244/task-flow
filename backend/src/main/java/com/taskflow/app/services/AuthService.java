package com.taskflow.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.taskflow.app.models.dtos.LoginDto;
import com.taskflow.app.models.dtos.LoginResponseDto;
import com.taskflow.app.models.dtos.SignUpDto;
import com.taskflow.app.models.entities.User;
import com.taskflow.app.models.repositiories.UserRepository;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
	
	
	public ResponseEntity<?> singUp(SignUpDto signUpDto) {
		Boolean existEmailInDatabase = userRepository.findByEmail(signUpDto.email()) != null;
		
		if (existEmailInDatabase) {
			return ResponseEntity.badRequest().body("This email is already being used.");
		}
		
		String passwordEncrypted = bCryptPasswordEncoder.encode(signUpDto.password());
		User newUser = new User(signUpDto.username(), signUpDto.email(), passwordEncrypted, signUpDto.avatarUrl());
		userRepository.save(newUser);
		
		return ResponseEntity.ok().build();
	}
	
	public ResponseEntity<LoginResponseDto> signIn(LoginDto loginDto) {
		User user = this.userRepository.findByEmail(loginDto.email());
		
		if (user == null) {
			return ResponseEntity.notFound().build();
		}
		
		UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(loginDto.email(), loginDto.password());
		Authentication auth = this.authenticationManager.authenticate(login);
		
		String token = this.jwtService.generateToken((UserDetails) auth.getPrincipal());
		LoginResponseDto loginResponseDto = new LoginResponseDto(user, token);
		
		return ResponseEntity.ok(loginResponseDto);
	}

}
