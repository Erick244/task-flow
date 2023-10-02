package com.taskflow.app.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

@Entity(name = "tasks")
public class Task {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotBlank
	private String goal;
	
	@Column(nullable = true, length = 150)
	private String description;
	
	private Boolean isCompleted;

	@ManyToOne(cascade = CascadeType.PERSIST)
	private TaskColumn taskColumn;
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	private User user;
	
	public Task() {
	}
	
	public Task(@NotBlank String goal, String description, Boolean isCompleted, TaskColumn taskColumn, User user) {
		super();
		this.goal = goal;
		this.description = description;
		this.taskColumn = taskColumn;		
		this.user = user;
		
		if (isCompleted == null) isCompleted = false;
		this.isCompleted = isCompleted;
	}

	public Integer getId() {
		return id;
	}
	
	public Boolean getIsCompleted() {
		return isCompleted;
	}

	public void setIsCompleted(Boolean isCompleted) {
		this.isCompleted = isCompleted;
	}

	public String getGoal() {
		return goal;
	}

	public void setGoal(String goal) {
		this.goal = goal;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@JsonIgnore
	public TaskColumn getTaskColumn() {
		return taskColumn;
	}
	
	public int getTaskColumnId() {
		return taskColumn.getId();
	}

	public void setTaskColumn(TaskColumn taskColumn) {
		this.taskColumn = taskColumn;
	}
	
	@JsonIgnore
	public User getUser() {
		return user;
	}
}
