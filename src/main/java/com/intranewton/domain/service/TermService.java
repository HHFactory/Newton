package com.intranewton.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.Term;
import com.intranewton.domain.repository.TermRepository;

@Service
public class TermService {
	@Autowired
	TermRepository termRepository;
	
	/**
	 * タイトルのLIKE検索
	 * @param title
	 * @return
	 */
	public List<Term> searchByTitle(String title) {
		return termRepository.searchTerm(title);
	}
	
	/**
	 * 用語登録
	 * @param term
	 * @return
	 */
	public Term saveTerm(Term term) {
		return termRepository.save(term);
	}
}
