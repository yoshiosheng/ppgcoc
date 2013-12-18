package com.productprint.pp.customer;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/customer")
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Model model, HttpServletRequest request, HttpServletResponse response) {
		List<Customer> customerList = customerService.getAllCustomer();
		
		model.addAttribute("customerList", customerList);
		model.addAttribute("customer", new Customer());
		return "/customer/list";
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(Model model,Customer customer, HttpServletRequest request, HttpServletResponse response) {
		if(0!=customer.getId()){
			customerService.updateCustomer(customer);
		}else{
			customerService.createCustomer(customer);
		}
		
		return "redirect:/customer/list";
	}
	
	@RequestMapping(value = "/delete/{customerId}", method = RequestMethod.GET)
	public String delete(Model model,@PathVariable("customerId") Integer customerId, HttpServletRequest request, HttpServletResponse response) {
		customerService.delete(customerId);
		return "redirect:/customer/list";
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public String search(Model model,Customer customer, HttpServletRequest request, HttpServletResponse response) {
		List<Customer> customerList = customerService.findCustomers(customer);
		
		model.addAttribute("customerList", customerList);
		model.addAttribute("customer", new Customer());
		return "/customer/list";
	}
}
