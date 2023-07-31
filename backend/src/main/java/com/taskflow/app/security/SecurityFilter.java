package com.taskflow.app.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.taskflow.app.models.entities.User;
import com.taskflow.app.models.repositiories.UserRepository;
import com.taskflow.app.services.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String token = extractAuthBearerToken(request);
		
		if (token != null) {
			String email = this.jwtService.validationToken(token);
			User user = this.userRepository.findByEmail(email);
			 						
			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
			
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
		
		filterChain.doFilter(request, response);
		
	}
	
	private String extractAuthBearerToken(HttpServletRequest request) {
		String authToken = request.getHeader("Authorization");
		
		if (authToken == null) return null;
	
		Boolean notBearerToken = !authToken.startsWith("Bearer");	
		if (notBearerToken) return null;
		
		
		return authToken.replace("Bearer ", "");
	}

}
