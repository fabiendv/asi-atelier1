package com.cpe.springboot.chat.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cpe.springboot.chat.model.ChatModel;

@Service
public class ChatService {

	@Autowired
	private ChatRepository chatRepository;

    public ChatModel addChat(Integer userOneId, Integer userTwoId){
    	ChatModel chat = new ChatModel(userOneId, userTwoId);
        chatRepository.save(chat);
        return chat;
    }

    public ChatModel addMessage(Integer chatId, String username, String message){
    	Optional<ChatModel> chat = chatRepository.findById(chatId);
    	if (chat.isPresent()) {
    		ChatModel c = chat.get();
    		c.addMessage(username, message);
    		chatRepository.save(c);
    		return c;
    	}
        return null;
    }

    public ChatModel getChat(Integer chatId){
    	Optional<ChatModel> chat = chatRepository.findById(chatId);
    	if (chat.isPresent()) {
    		ChatModel c = chat.get();
    		return c;
    	}
        return null;
    }

    public List<ChatModel> getAllChats() {
		List<ChatModel> chatList = new ArrayList<>();
		chatRepository.findAll().forEach(chatList::add);
		return chatList;
	}
	

}
