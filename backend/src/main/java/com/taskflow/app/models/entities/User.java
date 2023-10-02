package com.taskflow.app.models.entities;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.taskflow.app.models.adapters.UserAdapter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;

@Entity(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@NotBlank
	private String username;
	
	@NotBlank
	private String email;
	
	@NotBlank
	private String password;
	
	@Column(nullable = true)
	@OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
	private List<TaskColumn> taskColumns = new ArrayList<>();
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
	private List<Task> tasks;
	
	@Column(nullable = true)
	private URL avatarUrl;
	
	public User() {}
	
	public User(@NotBlank String username, @NotBlank String email, @NotBlank String password, URL avatarUrl) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.avatarUrl = avatarUrl;
	}
	
	public UserDetails asUserDetails() {
        return new UserAdapter(this);
    }
	
	public void addTaskColumn(TaskColumn taskColumn) {
		taskColumns.add(taskColumn);
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@JsonIgnore
	public List<TaskColumn> getTaskColumns() {
		return taskColumns;
	}

	public void setTaskColumns(List<TaskColumn> taskColumns) {
		this.taskColumns = taskColumns;
	}

	public URL getAvatarUrl() {
		return avatarUrl;
	}

	public void setAvatarUrl(URL avatarUrl) {
		this.avatarUrl = avatarUrl;
	}

	public int getId() {
		return id;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@JsonIgnore
	public String getPassword() {
		return this.password;
	}

	
}
