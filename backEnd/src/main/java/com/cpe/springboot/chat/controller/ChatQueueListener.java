package com.cpe.springboot.chat.controller;


import javax.jms.JMSException;
import javax.jms.TextMessage;

import org.apache.activemq.Message;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;
import com.cpe.springboot.chat.model.ChatModel;

@Component
public class ChatQueueListener {
	
	@Autowired
	private ChatService chatService;

	@JmsListener(destination = "chatIn.queue")
	@SendTo("chatOut.queue")
	public String receiveMessage(final Message jsonMessage) throws JMSException, JSONException {
		String messageData = null;
		String response = null;
		if(jsonMessage instanceof TextMessage) {
			TextMessage textMessage = (TextMessage)jsonMessage;
			messageData = textMessage.getText();
			JSONObject JSONChat = new JSONObject(messageData);
			System.out.println("Message received : " + messageData);
            /*
            JSONChat = {
                "id":"",
                "userOneId":"2",
                "userTwoId":"3"
            }
            */
            /*
            JSONChat = {
                "id":"51",
                "username":"toto",
                "message":"message data"
            }
            */

            if (JSONChat.has("id") && JSONChat.getString("id").equals("")){
            	System.out.println("Nouveau chat log créer.");
                if (JSONChat.has("userOneId") && JSONChat.has("userTwoId")){
                    Integer userOneId = Integer.valueOf(JSONChat.getString("userOneId"));
                    Integer userTwoId = Integer.valueOf(JSONChat.getString("userTwoId"));
                    //create a new chat log
                    ChatModel chat = chatService.addChat(userOneId, userTwoId);
                    response = chat.toJSONString();
                }
            }
            if (JSONChat.has("id") && !JSONChat.getString("id").equals("")){
            	System.out.println("Nouveau message dans le chat log " + JSONChat.getString("id"));
            	if (JSONChat.has("username") && JSONChat.has("message") && JSONChat.has("date") && JSONChat.has("time")){
                    Integer id = Integer.valueOf(JSONChat.getString("id"));
                    String username = JSONChat.getString("username");
                    String message = JSONChat.getString("message");
                    String date = JSONChat.getString("date");
                    String time = JSONChat.getString("time");
                    //add a message to a chat log
                    ChatModel chat = chatService.addMessage(id, date, time, username, message);
                    response = chat.toJSONString();
                }
            }
		}
        System.out.println("Response : " + response);
		return response;
	}

}
