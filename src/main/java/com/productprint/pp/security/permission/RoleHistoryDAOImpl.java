package com.productprint.pp.security.permission;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.productprint.pp.dao.HibernateDao;

@Repository("roleHistoryDAO")
public class RoleHistoryDAOImpl extends HibernateDao implements RoleHistoryDAO {
    
    @SuppressWarnings("unchecked")
	public List<RoleHistory> getAllRoleHistory() {
    	List<RoleHistory> roleHistoryList = null;
    	
    	try {
	    	String hql = " FROM RoleHistory ";
	    	Query query = getSession().createQuery(hql);
	    	roleHistoryList = query.list();
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
    	
    	return roleHistoryList;
    }
    
    public boolean saveRoleHistory(RoleHistory roleHistory) {
    	boolean saveSucc = false;
    	
    	try {
    		getSession().save(roleHistory);
    		saveSucc = true;
    	} catch (Exception e) {
    		e.printStackTrace();
    	}
    	
    	return saveSucc;
    }
    
    public RoleHistory getRoleHistoryById(int id) {
    	RoleHistory roleHistory = null;
        
        try {
            roleHistory = (RoleHistory)getSession().get(RoleHistory.class, id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return roleHistory;
    }
    
    @SuppressWarnings("unchecked")
	public List<RoleHistory> getAllRoleHistorysByRoleId(int roleId) {
        List<RoleHistory> roleHistoryList = null;

        try {
            String hql = " FROM RoleHistory WHERE roleId = :roleId ORDER BY lastModifiedDate DESC ";
            Query query = getSession().createQuery(hql);
            query.setInteger("roleId", roleId);
            roleHistoryList = query.list();
        } catch (Exception e) {
        	e.printStackTrace();
        }
        
        return roleHistoryList;
    }
    
    @SuppressWarnings("unchecked")
	public List<RoleHistory> getLatestFiveRoleHistorysByRoleId(int roleId) {
        List<RoleHistory> roleHistoryList = null;

        try {
            String hql = " FROM RoleHistory WHERE roleId = :roleId ORDER BY lastModifiedDate DESC ";
            Query query = getSession().createQuery(hql);
            query.setInteger("roleId", roleId);
            query.setMaxResults(5);
            roleHistoryList = query.list();
        } catch (Exception e) {
        	e.printStackTrace();
        }
        
        return roleHistoryList;
    }
}
