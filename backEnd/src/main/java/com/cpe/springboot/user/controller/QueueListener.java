package com.cpe.springboot.user.controller;


import javax.jms.JMSException;
import javax.jms.TextMessage;

import org.apache.activemq.Message;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;
import com.cpe.springboot.user.model.UserModel;

@Component
public class QueueListener {
	
	@Autowired
	private UserService userService;

	@JmsListener(destination = "inbound.queue")
	//@SendTo("outbound.queue")
	public String receiveMessage(final Message jsonMessage) throws JMSException, JSONException {
		String messageData = null;
		String response = null;
		if(jsonMessage instanceof TextMessage) {
			TextMessage textMessage = (TextMessage)jsonMessage;
			messageData = textMessage.getText();
			JSONObject JSONUser = new JSONObject(messageData);
			
			System.out.println("Message received : " + messageData);
			
			UserModel user = new UserModel(JSONUser.getString("login"), JSONUser.getString("password"));
			user.setId(Integer.valueOf(JSONUser.getString("id")));
			if (JSONUser.has("account")) {
				user.setAccount(Float.parseFloat(JSONUser.getString("account")));
			}
			if (JSONUser.has("email")) {
				user.setEmail(JSONUser.getString("email"));
			}
			if (JSONUser.has("lastname")) {
				user.setLastName(JSONUser.getString("lastname"));
			}
			if (JSONUser.has("surname")) {
				user.setSurName(JSONUser.getString("surname"));
			}
			
			userService.updateUser(user);
			
			System.out.println("User " + user.getId()+ ", "  + user.getLogin() + " updated !");
		}
		return response;
	}

}
