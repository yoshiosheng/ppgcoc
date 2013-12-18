package com.productprint.pp.userloginactivities;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.productprint.pp.dao.HibernateDao;

@Repository("userLoginActivitiesDAO")
public class UserLoginActivitiesDAOImpl extends HibernateDao implements UserLoginActivitiesDAO {
	
	/** @deprecated Previously Used In Logged In User Count **/
	public int totalActiveUsers() {
		Query activeUsersQuery = getSession().createQuery("SELECT COUNT(*) " +
															"FROM User u " +
															// Subject To Change: 0 indicated user logged in
															"WHERE u.isInactive = 0");
		return ((Number)activeUsersQuery.uniqueResult()).intValue();
	}
	
	public void updateLoggedInUserSession(int loggedInUserId, String loggedInTime, String loggedInSessionNameId, String userDevice) {
		Session session = getSession();
		UserSession usse = new UserSession();
		usse.setUserId(loggedInUserId);
		usse.setLoginTime(loggedInTime);
		usse.setSessionNameId(loggedInSessionNameId);
		usse.setDevice(userDevice);
		session.save(usse);
		// Hibernate Performance Tuning
		// Flush the Save Operation For Efficient Memory Management
		session.flush();
		session.clear();
	}
	
	public List<String> getAllUserLog() {
		List<String> userList = null;
		try {
			String sql = "SELECT su.USERNAME as userName, aus.LOGIN_TIME, aus.DEVICE " +
						"FROM app_user_session aus "+
						"INNER JOIN sec_users su ON aus.user_id = su.id "+
						"ORDER BY aus.login_time DESC " +
						"LIMIT 200";
			userList = getSession().createSQLQuery(sql).list();
		} catch(Exception e) {
			e.printStackTrace();
		}
		return userList;
	}
	
	public List<Object[]> getUserLogTwoWeeks() {
		List<Object[]> userList = null;
		try {
			String sql = "SELECT COUNT(session_id) AS rows, DATE(login_time) AS loginDate " +
						"FROM app_user_session aus " +
						"WHERE login_time > DATE_SUB(NOW(), INTERVAL 13 DAY) " +
						"GROUP BY DATE(login_time) DESC";
			userList = getSession().createSQLQuery(sql).list();
		} catch(Exception e) {
			e.printStackTrace();
		}
		return userList;
	}
}