package com.cpe.springboot.chat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ChatModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
    private Integer userOneId;
    private Integer userTwoId;
	private String data;
	

    public ChatModel(Integer userOneId, Integer userTwoId){
        this.userOneId = userOneId;
        this.userTwoId = userTwoId
        this.data = "";
    }

	public Integer getId() {
		return id;
	}

	public Integer getuserOneId() {
		return userOneId;
	}

    public Integer getuserTwoId() {
        return userTwoId;
	}

	public String addMessage(String username, String message){
        this.data = this.data + username + " : " + message + "\n";
        return this.data;
    }

    public String toJSONString(){
        return '{"id":"'+Integer.valueOf(this.id)+'","userOneId":"'+Integer.valueOf(this.userOneId)
        +'","userTwoId":"'+Integer.valueOf(this.userOneId)+'","data":"'+this.data+'"}';
    }

}
