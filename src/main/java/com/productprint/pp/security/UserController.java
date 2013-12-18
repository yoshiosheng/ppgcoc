package com.productprint.pp.security;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.productprint.pp.security.permission.PermissionService;
import com.productprint.pp.security.permission.Permissions;
import com.productprint.pp.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private PermissionService permissionService;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Model model, HttpServletRequest request, HttpServletResponse response) {
		List<User> userList = userService.getAllUsers();
		List<Permissions> permissionsList = permissionService.getAllPermissions();
		
		model.addAttribute("permissionsList", permissionsList);
		model.addAttribute("userList", userList);
		model.addAttribute("user", new User());
		return "/user/list";
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(Model model,User user, @RequestParam(value="permissionsList",required=false) List<Integer> permissionsIdList,HttpServletRequest request, HttpServletResponse response) {
		if(0!=user.getId()){
			userService.updateUserInfo(user, permissionsIdList);
		}else{
			userService.createUser(user, permissionsIdList);
		}
		
		return "redirect:/user/list";
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public String search(Model model, User user,@RequestParam(value="permissionsId",required=false) Integer permissionsId, HttpServletRequest request, HttpServletResponse response) {
		List<User> userList = userService.searchUsers(user, permissionsId);
		List<Permissions> permissionsList = permissionService.getAllPermissions();
		
		model.addAttribute("permissionsList", permissionsList);
		model.addAttribute("userList", userList);
		model.addAttribute("user", new User());
		return "/user/list";
	}

}
