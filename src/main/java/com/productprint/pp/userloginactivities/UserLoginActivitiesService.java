package com.productprint.pp.userloginactivities;

import java.util.List;

public interface UserLoginActivitiesService {
	
	/** @deprecated Previously Used In Logged In User Count **/
	public int totalActiveUsers();
	
	public void updateLoggedInUserSession(int loggedInUserId, String loggedInTime, String loggedInSessionNameId, String userDevice);
	
	public List<String> getAllUserLog();
	
	public List<Object[]> getUserLogTwoWeeks();
}
