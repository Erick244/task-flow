package com.taskflow.app.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

@Service
public class JwtService {

	@Value("${jwt.token.secret}")
	private String secret;
	
	public String generateToken(UserDetails user) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			
			int oneMounthInSeconds = 60 * 60 * 24 * 30;
			Instant expiryTime = this.createExpiryTime(oneMounthInSeconds);
			
			String token = JWT.create()
					.withIssuer("taskflow")
					.withSubject(user.getUsername())
					.withExpiresAt(expiryTime)
					.sign(algorithm);
			
			return token;
		} catch (JWTCreationException e) {
			throw new RuntimeException("[JwtService] JWT token creation error", e);
		}
		
	}
	
	public String validationToken(String token) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			
			String subject = JWT.require(algorithm)
					.withIssuer("taskflow")
					.build()
					.verify(token)
					.getSubject();
			
			return subject;
		} catch (JWTCreationException e) {
			return "";
		}
	}
	
	private Instant createExpiryTime(Integer timeInSeconds) {
		ZoneOffset brazilZoneOffset = ZoneOffset.of("-03:00");
		
		Instant expiryTime = LocalDateTime.now().plusSeconds(timeInSeconds).toInstant(brazilZoneOffset);
		
		return expiryTime;
	}
}
