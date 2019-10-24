package com.cpe.springboot.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cpe.springboot.chat.model.ChatModel;

//ONLY FOR TEST NEED ALSO TO ALLOW CROOS ORIGIN ON WEB BROWSER SIDE
@CrossOrigin
@RestController
public class ChatRestController {
	
	@Autowired
	private ChatService chatService;
	
	@RequestMapping("/chats")
	private List<ChatModel> getAllChats() {
		return chatService.getAllChats();
	}
	
	@RequestMapping("/chat/{id}")
	private ChatModel getChat(@PathVariable String id) {
		ChatModel chat;
		chat = chatService.getChat(Integer.valueOf(id));
		return chat;
	}
	

}
