package com.productprint.pp.dashboard;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.productprint.pp.service.UserService;

@Controller
@RequestMapping("/dashboard")
public class DashboardController {
	
	protected static Logger logger = Logger.getLogger(DashboardController.class);
	
	private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

	@RequestMapping(value = "/landing", method = RequestMethod.GET)
	public String landing(Model model, HttpServletRequest request, HttpServletResponse response) {

		
		return "redirect:/word/list";
	}
}