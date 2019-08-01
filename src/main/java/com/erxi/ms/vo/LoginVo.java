package com.erxi.ms.vo;

import javax.validation.constraints.NotNull;


public class LoginVo {
	@NotNull
	private String username;
	@NotNull
	private String password;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "LoginVo [username=" + username + ", password=" + password + "]";
	}
}
