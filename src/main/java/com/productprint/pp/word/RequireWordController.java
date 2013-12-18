package com.productprint.pp.word;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/word")
public class RequireWordController {
	@Autowired
	private RequireWordService requireWordService;
	
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String add(Model model,@RequestParam(value = "wordDir",required = false) String wordDir,@RequestParam(value = "wordFile",required = false) String wordFile, HttpServletRequest request, HttpServletResponse response) throws Exception {
		if(!StringUtils.isBlank(wordDir)){
			requireWordService.insertFromCsv(wordDir);
		}else if(!StringUtils.isBlank(wordFile)){
			requireWordService.insertFromCsvFile(wordFile);
		}
		return "redirect:/word/list";
	}
	
	@RequestMapping(value = "/distinct", method = RequestMethod.GET)
	public String distinct(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {
		requireWordService.distinctWord();
		return "redirect:/word/list";
	}
	
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public String list(Model model, HttpServletRequest request, HttpServletResponse response) {
		List<RequireWord> requireWordList = requireWordService.getAll();
		model.addAttribute("requireWordList", requireWordList);
		return "/word/list";
	}
}
