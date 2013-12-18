package com.productprint.pp.security.permission;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/permission")
public class PermissionController {
	@Autowired
	private PermissionService permissionService;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Model model, HttpServletRequest request, HttpServletResponse response) {
		List<Permissions> permissionsList = permissionService.getAllPermissions();
		model.addAttribute("permissionsList", permissionsList);
		model.addAttribute("permissions", new Permissions());
		return "/permission/list";
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(Model model, Permissions permissions,HttpServletRequest request, HttpServletResponse response) {
		if(0!=permissions.getId()){
			permissionService.update(permissions);
		}else{
			permissionService.create(permissions);
		}
		
		return "redirect:/permission/list";
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public String search(Model model, Permissions permissions,HttpServletRequest request, HttpServletResponse response) {
		List<Permissions> permissionsList = permissionService.findPermissions(permissions);
		model.addAttribute("permissionsList", permissionsList);
		model.addAttribute("permissions", new Permissions());
		return "/permission/list";
	}
}
