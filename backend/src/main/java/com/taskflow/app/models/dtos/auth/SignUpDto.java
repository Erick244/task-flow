package com.taskflow.app.models.dtos.auth;

public record SignUpDto(String username, String email, String password, String confirmPassword, String avatarUrl) {

}
