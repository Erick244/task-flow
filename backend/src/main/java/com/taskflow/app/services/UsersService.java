package com.taskflow.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.taskflow.app.models.dtos.users.UpdateUserDto;
import com.taskflow.app.models.entities.User;
import com.taskflow.app.models.repositiories.UserRepository;

@Service
public class UsersService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtService jwtService;
	

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email);
		
		if (user == null) {
			throw new UsernameNotFoundException("User not found");
		}
		
		return user.asUserDetails();
	}
	
	public ResponseEntity<?> findUserByAuthToken(String authToken) {
		
		String userEmail = this.jwtService.validationToken(authToken);
		User user = this.userRepository.findByEmail(userEmail);
		
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid JWT token");
		}
		
		return ResponseEntity.ok(user);
	}
	
	public ResponseEntity<?> update(UpdateUserDto updateUserDto) {		
		User user = getUserAuth();
		
		String username = updateUserDto.username();
		if(username != null) {
			user.setUsername(username);
		}
		
		String avatarUrl = updateUserDto.avatarUrl();
		user.setAvatarUrl(avatarUrl);
		
		this.userRepository.save(user);
		return ResponseEntity.noContent().build();
	}
	
	public User getUserAuth() {
		User userAuth = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		return userAuth;
	}

}
