package com.taskflow.app.models.dtos.auth;

import com.taskflow.app.models.entities.User;

public record LoginResponseDto(User user, String access_token) {

}