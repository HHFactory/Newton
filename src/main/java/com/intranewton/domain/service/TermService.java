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
	 * 全用語取得
	 * @return
	 */
	public List<Term> getAllTerms(){
		return termRepository.findAllTermOrderByTitle();
	}
	
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
	 * @param targetTerm
	 * @return
	 */
	public Term postTerm(Term targetTerm) {
		//新規用語の場合
		if(isExistTerm(targetTerm) == null){
			targetTerm.setStatus("valid");
			return termRepository.save(targetTerm);
		}
		//既存用語の場合
		else{
			return editTerm(targetTerm);
		}
	}
	
	/**
	 * 用語更新処理
	 * @param targetTerm
	 * @return
	 */
	public Term editTerm(Term targetTerm) {
		targetTerm.setStatus("valid");
		return termRepository.save(targetTerm);
	}
	
	/**
	 * 用語削除処理
	 * @param targetId
	 */
	public void deleteTerm(Integer targetId){
		termRepository.delete(targetId);
	}
	
	/**
	 * 既存用語があるか確認
	 * @param targetTerm
	 * @return
	 */
	private Integer isExistTerm(Term targetTerm){
		List<Term> existTerms = termRepository.findAll();
		for(Term existTerm:existTerms){
			if(existTerm.getTitle().equals(targetTerm.getTitle())){
				return existTerm.getId();
			}
		}
		return null;
	}
}
