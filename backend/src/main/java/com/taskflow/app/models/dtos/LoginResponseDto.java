package com.taskflow.app.models.dtos;

import com.taskflow.app.models.entities.User;

public record LoginResponseDto(User user, String access_token) {

}