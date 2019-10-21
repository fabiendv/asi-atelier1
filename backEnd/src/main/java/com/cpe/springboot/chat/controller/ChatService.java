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
        chat = new ChatModel(userOneId, userTwoId);
        chatRepository.save(chat);
        return chat;
    }

    public ChatModel addMessage(Integer chatId, String username, String message){
        chat = chatRepository.findById(chatId);
        chat.addMessage(username, message);
        return chat;
    }

    public Optional<ChatModel> getChat(Integer chatId){
        return chatRepository.findById(chatId);
    }

    public List<ChatModel> getAllChats() {
		List<ChatModel> chatList = new ArrayList<>();
		chatRepository.findAll().forEach(chatList::add);
		return chatList;
	}
	

}
