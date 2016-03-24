package com.intranewton.domain.restcontroller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
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
	private static final Logger logger = LoggerFactory.getLogger(TermRestController.class);
	
	/**
	 * 全用語取得
	 * @return
	 */
	@RequestMapping(value="/api/v1/terms/",method=RequestMethod.GET)
	List<Term> getAllTerms() {
		return termService.getAllTerms();
	}
	
	/**
	 * タイトル検索
	 * @param title
	 * @return
	 */
	@RequestMapping(value="/api/v1/term/",method=RequestMethod.GET)
	List<Term> searchByTitle(@RequestParam String title) {
		return termService.searchByTitle(title);
	}
	
	/**
	 * 用語登録
	 * @param term
	 * @return
	 */
	@RequestMapping(value="/api/v1/term/",method=RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	Term postTerm(@RequestBody Term term) {
		return termService.postTerm(term);
	}
	
	/**
	 * 用語編集
	 * @param id
	 * @param targetTerm
	 * @return
	 */
	@RequestMapping(value="/api/v1/terms/{id}",method=RequestMethod.PUT)
	@ResponseStatus(HttpStatus.CREATED)
	public Term editTerm(@PathVariable Integer id, @RequestBody Term targetTerm){
		return termService.editTerm(targetTerm);
	}
	
	/**
	 * 用語削除
	 * @param id
	 */
	@RequestMapping(value="/api/v1/terms/{id}",method=RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteTerm(@PathVariable Integer id ){
		termService.deleteTerm(id);
	}
	
}
