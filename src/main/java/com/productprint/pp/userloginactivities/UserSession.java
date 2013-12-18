package com.productprint.pp.userloginactivities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "app_user_session", catalog = "printproduct")
public class UserSession implements Serializable {
	
	private static final long serialVersionUID = -4844738367255273993L;

	@Id
	@Column(name = "SESSION_ID")
	@GeneratedValue
	private int sessionId;
	
	// Equivalent to "ID" of "Users"
	@Column(name = "USER_ID")
	private int userId;
	
	@Column(name = "LOGIN_TIME")
	private String loginTime;
	
	@Column(name = "SESSION_NAME_ID")
	private String sessionNameId;
	
	@Column(name = "DEVICE")
	private String device;
	
	public int getSessionId() {
		return sessionId;
	}

	public void setSessionId(int sessionId) {
		this.sessionId = sessionId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(String loginTime) {
		this.loginTime = loginTime;
	}

	public String getSessionNameId() {
		return sessionNameId;
	}

	public void setSessionNameId(String sessionNameId) {
		this.sessionNameId = sessionNameId;
	}

	public String getDevice() {
		return device;
	}

	public void setDevice(String device) {
		this.device = device;
	}
}
