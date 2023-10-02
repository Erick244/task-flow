package com.taskflow.app.models.dtos.auth;

import java.net.URL;

public record SignUpDto(String username, String email, String password, URL avatarUrl) {

}
