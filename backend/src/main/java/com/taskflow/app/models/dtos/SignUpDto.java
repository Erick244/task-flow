package com.taskflow.app.models.dtos;

import java.net.URL;

public record SignUpDto(String username, String email, String password, URL avatarUrl) {

}
