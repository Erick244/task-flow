package com.taskflow.app.services;

import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.taskflow.app.models.dtos.auth.LoginDto;
import com.taskflow.app.models.dtos.auth.LoginResponseDto;
import com.taskflow.app.models.dtos.auth.SignUpDto;
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
		String email = signUpDto.email();
		String username = signUpDto.username();
		String password = signUpDto.password();
		String confirmPassword = signUpDto.confirmPassword();
		URL avatarUrl = signUpDto.avatarUrl();
		
		Boolean isEmailAlreadyUsed = userRepository.findByEmail(email) != null;
		if (isEmailAlreadyUsed) {
			return ResponseEntity.badRequest().body("This email is already being used");
		}
		
		Boolean passwordsDontMatch = password == confirmPassword;
		if (passwordsDontMatch) {
			return ResponseEntity.badRequest().body("Passwords do not match");
		}
		
		String passwordEncrypted = bCryptPasswordEncoder.encode(password);
		User newUser = new User(username, email, passwordEncrypted, avatarUrl);
		userRepository.save(newUser);
		
		return ResponseEntity.ok().build();
	}
	
	public ResponseEntity<LoginResponseDto> signIn(LoginDto loginDto) {
		String email = loginDto.email();
		String password = loginDto.password();
		
		User user = this.userRepository.findByEmail(email);
		
		if (user == null) {
			return ResponseEntity.notFound().build();
		}
		
		UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(email, password);
		Authentication auth = this.authenticationManager.authenticate(login);
		
		String token = this.jwtService.generateToken((UserDetails) auth.getPrincipal());
		LoginResponseDto loginResponseDto = new LoginResponseDto(user, token);
		
		return ResponseEntity.ok(loginResponseDto);
	}
	
	public User getUserAuth() {
		User userAuth = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		return userAuth;
	}

}
