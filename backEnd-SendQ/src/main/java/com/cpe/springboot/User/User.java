package com.cpe.springboot.User;

public class User {
	
	private Integer id;
	private String login;
	private String pwd;
	private float account;
	private String lastName;
	private String surName;
	private String email;
	
	/**
	 * Constructor
	 * @param id
	 * @param login
	 * @param pwd
	 */
	public User(Integer id, String login, String pwd) {
		super();
		this.id = id;
		this.login = login;
		this.pwd = pwd;
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getLogin() {
		return login;
	}


	public void setLogin(String login) {
		this.login = login;
	}


	public String getPwd() {
		return pwd;
	}


	public void setPwd(String pwd) {
		this.pwd = pwd;
	}


	public float getAccount() {
		return account;
	}


	public void setAccount(float account) {
		this.account = account;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getSurName() {
		return surName;
	}


	public void setSurName(String surName) {
		this.surName = surName;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	@Override
	public String toString() {
		return "{'id':'" + id + "', 'login':'" + login + "', 'password':'" + pwd + "', 'account':'" + account + "', 'lastname':'"
				+ lastName + "', 'surname':'" + surName + "', 'email':" + email + "'}";
	}
	
}
