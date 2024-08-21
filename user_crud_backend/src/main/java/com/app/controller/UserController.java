package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.User;
import com.app.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserService userService;

	public UserController() {
		System.out.println("in def ctor of " + getClass());
	}

	
	
	
	// Get all users
	@GetMapping("/login/getusers")
	public ResponseEntity<List<User>> getUsers() {
		System.out.println("in get users");
		List<User> users = userService.getAllUser();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}

	// Add new user
	@PostMapping("/signup")
	public ResponseEntity<User> addNewUser(@RequestBody User transientUser) {
		System.out.println("in add new User " + transientUser);
		User createdUser = userService.addNewUser(transientUser);
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}

	// Get user details by ID
	@GetMapping("/login/{userId}")
	public ResponseEntity<User> getUserDetails(@PathVariable Long userId) {
		System.out.println("in get user " + userId);
		User user = userService.getUserDetails(userId);
		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Update user details
	@PutMapping("/login/update")
	public ResponseEntity<User> updateUserDetails(@RequestBody User detachedUser) {
		System.out.println("in update user " + detachedUser);
		User updatedUser = userService.updateUser(detachedUser);
		if (updatedUser != null) {
			return new ResponseEntity<>(updatedUser, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Delete user by ID
	@DeleteMapping("/login/{userId}")
	public ResponseEntity<String> deleteUserDetails(@PathVariable Long userId) {
		System.out.println("in del emp " + userId);
		String result = userService.deleteUser(userId);
		if (result.equals("User deleted successfully")) {
			return new ResponseEntity<>(result, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
		}
	}
	@PostMapping("/login")
	public ResponseEntity<String> validateLogin(@RequestBody User loginRequest) {
		System.out.println("in validate login " + loginRequest.getEmail());
		User user = userService.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
		if (user != null) {
			return new ResponseEntity<>("Login successful", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
		}
	}
	
	
	/////////////////////////////////////////////////////////////////////////////////

    @GetMapping("/tables")
    public ResponseEntity<List<String>> getAllTableNames() {
        List<String> tableNames = userService.getAllTableNames();
        return new ResponseEntity<>(tableNames, HttpStatus.OK);
    }
    ///////////////////////////////////////////////////////////
    @GetMapping("/count-null-values/{tableName}")
    public ResponseEntity<Long> countNullValuesInTable(@PathVariable String tableName) {
        try {
            long count = userService.countNullValuesInTable(tableName);
            System.out.println("count="+count);
            return ResponseEntity.ok(count);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/count-zero-values/{tableName}")
    public ResponseEntity<Long> countZeroValuesInTable(@PathVariable String tableName) {
        try {
            long count = userService.countRowsWithZeroInAllColumns(tableName);
            return ResponseEntity.ok(count);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
