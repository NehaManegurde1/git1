package com.app.controller;

public class UserController1 {

}
/*package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.User;
import com.app.service.UserService;

@RestController // =@Controller class level  + @ResponseBody : 
//added implicitly on rety type of all req handling methods
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	// depcy
	@Autowired
	private UserService userService;

	public UserController() {
		System.out.println("in def ctor of " + getClass());
	}

	// URL : http://host:port/employees, method : GET
	// get all users
	@GetMapping("/login/getusers")
	public List<User> getUsers() {
		System.out.println("in get users");
		return userService.getAllUser();
	}

	// URL : http://host:port/employees, method : POST
	// add new emp details
	@PostMapping("/signup")
	public User addNewUser(@RequestBody User transientUser) {
		System.out.println("in add new User " + transientUser);
		return userService.addNewUser(transientUser);
	}

	// URL : http://host:port/employees/{empId}, method : GET
	// get emp details by it's id
	@GetMapping("/login/{userId}")
	//@PathVariable => method arg level anno : for binding URI variable to the method arg
	public User getEmpDetails(@PathVariable Long userId) {
		System.out.println("in get user " + userId);
		return userService.getUserDetails(userId);

	}

	// URL : http://host:port/employees, method : PUT
	// COMPLETE updation of emp details
	@PutMapping("/login/update")
	public User updateEmpDetails(@RequestBody User detachedUser) {
		System.out.println("in update user " + detachedUser);
		return userService.updateUser(detachedUser);
	}
	// URL : http://host:port/employees/{empId}, method : DELETE
	// delete emp details by id
	@DeleteMapping("/login/{userId}")
	public String deleteUserDetails(@PathVariable Long userId)
	{
		System.out.println("in del emp "+userId);
		return userService.deleteUser(userId);
	}

}
*/