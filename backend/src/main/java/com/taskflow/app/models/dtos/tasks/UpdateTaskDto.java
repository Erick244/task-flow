package com.taskflow.app.models.dtos.tasks;

public record UpdateTaskDto(String goal, String description, Boolean isCompleted, Integer taskColumnId) {

	public boolean isEmpty() {
		if (goal == null && description == null && isCompleted == null && taskColumnId == null) {
			return true;
		} else {
			return false;
		}
	}
}
