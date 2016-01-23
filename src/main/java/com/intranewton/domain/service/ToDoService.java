package com.intranewton.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intranewton.domain.entity.ToDo;
import com.intranewton.domain.repository.ToDoRepository;

@Service
public class ToDoService {

	@Autowired
	ToDoRepository toDoRepository;
		
	/**
	 * ユーザ名からToDo一覧を取得する
	 * @param userName
	 * @return
	 */
	public List<ToDo> findByTargetUser(String userName){
		return toDoRepository.findByTarget_user(userName);
	}
	
	/**
	 * 未完了todoリストの一覧を取得する
	 * @return
	 */
	public List<ToDo> findAllUnCompletionToDoList(String status){
		return toDoRepository.findByStatus(status);
	}
	
	/**
	 * ToDoを登録する
	 * @param todo
	 */
	public void createToDo(ToDo todo){
		toDoRepository.save(todo);
	}

}
