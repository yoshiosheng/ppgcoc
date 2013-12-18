package com.productprint.pp.web;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.concurrent.ConcurrentMap;

import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.cache.CacheManagerAware;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.SimpleSession;
import org.apache.shiro.session.mgt.eis.AbstractSessionDAO;
import org.apache.shiro.session.mgt.eis.EnterpriseCacheSessionDAO;
import org.apache.shiro.session.mgt.eis.SessionDAO;
import org.apache.shiro.util.CollectionUtils;

public class ShiroDAO extends AbstractSessionDAO implements CacheManagerAware{

	private ConcurrentMap<Serializable, Session> sessions;
	private SessionDAO enterpriseCacheSessionDAO;

	@Override
	public void setCacheManager(CacheManager cacheManager) {
		((EnterpriseCacheSessionDAO)enterpriseCacheSessionDAO).setCacheManager(cacheManager);		
	}

	@Override
	public void update(Session session) throws UnknownSessionException {
		Serializable sessionId = session.getHost().replace(".", "");
		session.setAttribute("id", sessionId);
		enterpriseCacheSessionDAO.update(session);
	}

	@Override
	public void delete(Session session) {
		enterpriseCacheSessionDAO.delete(session);
	}

	@Override
	public Collection<Session> getActiveSessions() {
		Collection<Session> sessions = internalGetActiveSessions();
		if( CollectionUtils.isEmpty(sessions) ){
			try{
				sessions = enterpriseCacheSessionDAO.getActiveSessions();
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		return sessions;
	}
	
	private Collection<Session> internalGetActiveSessions(){
		if(sessions == null) return Collections.emptySet();
		Collection<Session> values = sessions.values();
        if (CollectionUtils.isEmpty(values)) {
            return Collections.emptySet();
        } else {
            return Collections.unmodifiableCollection(values);
        }
	}

	@Override
	protected Serializable doCreate(Session session) {
		Serializable sessionId = session.getHost().replace(".", "");
		enterpriseCacheSessionDAO = new EnterpriseCacheSessionDAO();

		Session simpleSession = new SimpleSession();
		//assignSessionId(simpleSession, sessionId);
		simpleSession.setAttribute("id", sessionId);
		simpleSession.setAttribute("username", session.getAttribute("username"));
		simpleSession.setAttribute("password", session.getAttribute("password"));
		simpleSession.setAttribute("isRememberME", session.getAttribute("isRememberME"));
		simpleSession.setAttribute("startTimeStamp", session.getAttribute("startTimeStamp"));
		enterpriseCacheSessionDAO.create(simpleSession);
		return sessionId;
	}

	@Override
	protected Session doReadSession(Serializable sessionId) {
		return enterpriseCacheSessionDAO.readSession(sessionId);
	}
}
