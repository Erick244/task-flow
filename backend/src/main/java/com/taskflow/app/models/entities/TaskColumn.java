package com.taskflow.app.models.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;

@Entity(name = "task_columns")
public class TaskColumn {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotBlank
	private String title;
	
	@OneToMany(mappedBy = "taskColumn", cascade = CascadeType.PERSIST)
	private List<Task> tasks = new ArrayList<>();
	
	@ManyToOne(cascade = CascadeType.PERSIST)
	private User user;
	
	public TaskColumn() {}

	public TaskColumn(@NotBlank String title, @NotBlank User user) {
		super();
		this.title = title;
		this.user = user;
	}
	
	public void addTask(Task task) {
		tasks.add(task);
	}
	

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
	
	@JsonIgnore
	public int getUser_id() {
		return user.getId();
	}
	
	@JsonIgnore
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getId() {
		return id;
	}
	
}
