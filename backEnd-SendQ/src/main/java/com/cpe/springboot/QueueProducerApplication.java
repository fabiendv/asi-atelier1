package com.cpe.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.core.JmsTemplate;

import com.cpe.springboot.User.User;

@EnableJms
@SpringBootApplication
public class QueueProducerApplication {
	
	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(QueueProducerApplication.class, args);
		
		Integer id = 6;
		String login = "toto";
		String password = "pass";
		float account = 99;
		String lastName = "lastname";
		String surName = "surname";
		String email = "email";
		
		User user = new User(id, login, password);
		user.setAccount(account);
		user.setLastName(lastName);
		user.setSurName(surName);
		user.setEmail(email);
		
		String message = user.toString();
		
		JmsTemplate jms = ctx.getBean(JmsTemplate.class);
		jms.convertAndSend("inbound.queue", message);
		
		System.out.println("Message sended : " + message);
		
	}

}
