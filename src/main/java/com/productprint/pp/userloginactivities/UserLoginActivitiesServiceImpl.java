package com.productprint.pp.userloginactivities;

import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userLoginActivitiesService")
@Transactional
public class UserLoginActivitiesServiceImpl implements UserLoginActivitiesService {
	
	protected static Logger logger = Logger.getLogger(UserLoginActivitiesService.class);
	
	@Resource(name = "userLoginActivitiesDAO")
	private UserLoginActivitiesDAO userLoginActivitiesDAO;
	
	/** @deprecated Previously Used In Logged In User Count **/
	public int totalActiveUsers() {
		logger.debug("Retrieving total active users");
		return userLoginActivitiesDAO.totalActiveUsers();
	}
	
	public void updateLoggedInUserSession(int loggedInUserId, String loggedInTime, String loggedInSessionNameId, String userDevice) {
		logger.debug("Update current logged in user's session");
		userLoginActivitiesDAO.updateLoggedInUserSession(loggedInUserId, loggedInTime, loggedInSessionNameId, userDevice);
	}
	
	public List<String> getAllUserLog() {
		logger.debug("Retrieve all logged in user");
		return userLoginActivitiesDAO.getAllUserLog();
	}
	
	public List<Object[]> getUserLogTwoWeeks() {
		logger.debug("Retrieve all logged in user");
		return userLoginActivitiesDAO.getUserLogTwoWeeks();
	}
}
