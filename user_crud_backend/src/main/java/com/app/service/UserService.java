package com.app.service;

import java.util.List;

import com.app.entities.User;

public interface UserService {
	List<User> getAllUser();

	User addNewUser(User transientUser);

	User getUserDetails(Long userId);

	User updateUser(User detachedUser);

	String deleteUser(Long userId);
	User findByEmailAndPassword(String email, String password);
	/////////////////////////////////////////////
	  List<String> getAllTableNames();
	  Long countNullValuesInTable(String tableName);


	Long countRowsWithZeroInAllColumns(String tableName);

}
