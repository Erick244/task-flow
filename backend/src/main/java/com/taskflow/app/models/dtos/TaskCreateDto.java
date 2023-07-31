package com.taskflow.app.models.dtos;

public record TaskCreateDto(int task_column_id, String goal, String description, Boolean is_completed) {

}
