package com.productprint.pp.product;

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
@RequestMapping("/product")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Model model, HttpServletRequest request, HttpServletResponse response) {
		List<Product> productList = productService.getAllProduct();
		
		model.addAttribute("productList", productList);
		model.addAttribute("product", new Product());
		return "/product/list";
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(Model model,Product product, HttpServletRequest request, HttpServletResponse response) {
		if(0!=product.getId()){
			productService.updateProduct(product);
		}else{
			productService.createProduct(product);
		}
		
		return "redirect:/product/list";
	}
	
	@RequestMapping(value = "/delete/{productId}", method = RequestMethod.GET)
	public String delete(Model model,@PathVariable("productId") Integer productId, HttpServletRequest request, HttpServletResponse response) {
		productService.delete(productId);
		return "redirect:/product/list";
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public String search(Model model,Product product, HttpServletRequest request, HttpServletResponse response) {
		List<Product> productList = productService.findProducts(product);
		
		model.addAttribute("productList", productList);
		model.addAttribute("product", new Product());
		return "/product/list";
	}
}
