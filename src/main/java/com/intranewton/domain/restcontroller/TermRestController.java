package com.intranewton.domain.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.intranewton.domain.entity.Term;
import com.intranewton.domain.service.TermService;

@RestController
public class TermRestController {
	@Autowired
	TermService termService;
	
	
	/**
	 * 用語取得
	 * @param title
	 * @return
	 */
	@RequestMapping(value="/api/v1/term",method=RequestMethod.GET)
	List<Term> searchByTitle(@RequestParam String title) {
		return termService.searchByTitle(title);
	}
	
	/**
	 * 用語登録
	 * @param term
	 * @return
	 */
	@RequestMapping(value="/api/v1/term",method=RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	Term postTerm(@RequestBody Term term) {
		return termService.saveTerm(term);
	}
}
