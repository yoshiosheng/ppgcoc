package com.productprint.pp.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class HttpSessionUtil {
	public static void addToSession(String attributeName, Object value) {

		RequestContextHolder.currentRequestAttributes().setAttribute(attributeName, value, RequestAttributes.SCOPE_SESSION);
	}

	public static Object getSessionAttribute(String attributeName) {

		return RequestContextHolder.currentRequestAttributes().getAttribute(attributeName, RequestAttributes.SCOPE_SESSION);
	}

	public static void removeFromSession(String attributeName) {

		RequestContextHolder.currentRequestAttributes().removeAttribute(attributeName, RequestAttributes.SCOPE_SESSION);
	}
	
	/**
     * returns the current http session object
     * 
     * @return session
     */
    public HttpSession getSession() {        
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession contextSession = servletRequestAttributes.getRequest().getSession(true);
        
        return contextSession; 
    }
    
    public static String getContextUri(){    	
    	ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
    	HttpServletRequest httpServletRequest = servletRequestAttributes.getRequest();
    	
    	String scheme = httpServletRequest.getScheme();
    	String serverName = httpServletRequest.getServerName();
    	int serverPort = httpServletRequest.getServerPort();
    	String contextPath = httpServletRequest.getContextPath();
    	
    	String serverUrl = scheme + "://" + serverName + ":" + serverPort + contextPath;
		return serverUrl;
	}
}
