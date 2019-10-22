package com.cpe.springboot.chat.controller;

import org.springframework.data.repository.CrudRepository;

import com.cpe.springboot.chat.model.ChatModel;

public interface ChatRepository extends CrudRepository<ChatModel, Integer> {
	

}
