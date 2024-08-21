package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.User;

public interface UserDao extends JpaRepository<User,Long> {
	// Custom query method to find a user by email and password
	User findByEmailAndPassword(String email, String password);

}
