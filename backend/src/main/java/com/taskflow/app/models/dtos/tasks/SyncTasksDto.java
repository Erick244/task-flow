package com.taskflow.app.models.dtos.tasks;

import java.util.List;

public record SyncTasksDto(List<Integer> tasksIds, Integer userId) {

}
