package com.taskflow.app.models.dtos.tasks;

public record TaskCreateDto(int taskColumnId, String goal, String description, Boolean isCompleted) {

}
