/*
 * 
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.productprint.pp.web;

import java.io.Serializable;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;

import net.sf.ehcache.CacheManager;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.cache.CacheException;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.mobile.device.site.SitePreference;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.productprint.pp.security.User;
import com.productprint.pp.service.UserService;
import com.productprint.pp.userloginactivities.UserLoginActivitiesService;

/**
 * Web MVC controller that handles security-related web requests, such as login and logout.
 */
@Controller
public class SecurityController{
	
	protected static Logger logger = Logger.getLogger(SecurityController.class);

    private LoginValidator loginValidator = new LoginValidator();
    
    @Resource(name = "userLoginActivitiesService")
	private UserLoginActivitiesService userLoginActivitiesService;
    
    private UserService userService;
    
    private ShiroDAO shiroDao;
    
    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value="/login",method= RequestMethod.GET)
    public String showLoginForm(Model model, @ModelAttribute LoginCommand command, BindingResult errors, SitePreference sitePreference, Device device ) {

    	if(shiroDao != null) {
        	Serializable sessionId = internalGenerateSessionId();
    		Collection<Session> collection = shiroDao.getActiveSessions();
    		if(collection != null && collection.size() != 0) {
	    		for(Session data: collection) {
	    			if(data.getAttribute("id") == null) continue;
	    			
    				if(!data.getAttribute("id").toString().equalsIgnoreCase(sessionId.toString())) continue;
	    			
	    			long dayDiff = getDateDiff((Date) data.getAttribute("startTimeStamp"), new Date(), TimeUnit.DAYS);
	    			if(dayDiff > 14) {
	    		        shiroDao.delete(data);
	    				return "/home/login";
	    			}
	    			command.setUsername(data.getAttribute("username").toString());
	    			command.setPassword(data.getAttribute("password").toString());
	    			command.setRememberMe((Boolean) data.getAttribute("isRememberME"));
	    			return login(model, command, errors, sitePreference, device);
	    		}
    		}
    	}
    	return "/home/login";
    }
    
    public static long getDateDiff(Date startTime, Date currentTime, TimeUnit timeUnit) {
        long diffInMillies = currentTime.getTime() - startTime.getTime();
        return timeUnit.convert(diffInMillies,TimeUnit.MILLISECONDS);
    }

    @RequestMapping(value="/login",method= RequestMethod.POST)
    public String login(Model model, @ModelAttribute LoginCommand command, BindingResult errors, SitePreference sitePreference, Device device) {
        loginValidator.validate(command, errors);

        if( errors.hasErrors() ) {
            return showLoginForm(model, command, errors, sitePreference, device);
        }

        UsernamePasswordToken token = new UsernamePasswordToken(command.getUsername(), command.getPassword(), command.isRememberMe());
        try {
            SecurityUtils.getSubject().login(token);
        } catch (AuthenticationException e) {
            errors.reject( "error.login.generic", "Your login attempt was not successful, please input correct username and password and try again." );
        }
        
        if( errors.hasErrors() ) {
            return showLoginForm(model, command, errors, sitePreference, device);
        } else {
        	// save sesion into cache
        	saveCache(command);
        	
        	// log record	
        	logUserRecord(userService.getCurrentUser(), sitePreference, device);

        	return "redirect:/dashboard/landing";
        }
    }
    
    private void saveCache(LoginCommand command){
		if(!command.isRememberMe()) return;
		
		 // get the currently executing user:
		Subject currentUser = SecurityUtils.getSubject();
		
		// save current user into session
		Session session = currentUser.getSession();
		session.setAttribute("username", command.getUsername());
		session.setAttribute("password", command.getPassword());
		session.setAttribute("isRememberME", command.isRememberMe());
		Date end = session.getLastAccessTime();
		session.setAttribute("startTimeStamp", new Timestamp(end.getTime()));
		long miliseconds = 24 * 1000 * 60 * 60;
		session.setTimeout(miliseconds*14);

		// save current session into cache
		if(shiroDao == null) { 
			shiroDao = new ShiroDAO();
			shiroDao.doCreate(session);
		}
		shiroDao.update(session);
    }
    
    private String internalGenerateSessionId(){
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();
		return session.getHost().replace(".", "");
	}
    
    private void logUserRecord(User user, SitePreference sitePreference, Device device) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Subject currentUser = SecurityUtils.getSubject();
		Session session = currentUser.getSession();
		String loggedInTime = sdf.format(session.getStartTimestamp());
		
		String userDevice = "WEB";
		if (sitePreference == SitePreference.MOBILE) {
			userDevice = SitePreference.MOBILE.toString();
		} else {
			if (device.isTablet()) userDevice = "TABLET";
		}
		userLoginActivitiesService.updateLoggedInUserSession(user.getId(), loggedInTime, session.getId().toString(), userDevice);
    }

    @RequestMapping("/logout")
    public String logout() {
    	if(shiroDao != null) {
        	Serializable sessionId = internalGenerateSessionId();
    		Collection<Session> collection = shiroDao.getActiveSessions();
    		if(collection != null && collection.size() != 0) {
	    		for(Session data: collection) {
	    			if(data.getAttribute("id") == null) continue;
	    			
    				if(!data.getAttribute("id").toString().equalsIgnoreCase(sessionId.toString())) continue;

	    		    shiroDao.delete(data);
	    		}
    		}
    	}
    	SecurityUtils.getSubject().logout();
        // Manually Remove The compSchema Related Cache After Logout
    	try {
    		CacheManager.getInstance().clearAllStartingWith("compSchema");
    	} catch (CacheException e) {
    		e.printStackTrace();
    	}
        
        return "redirect:/";
    }
    
    @RequestMapping(value="/forgotpassword", method = RequestMethod.GET)
	public String forgotPassword(ModelMap model) {
		return "/forgotPassword/forgotPassword";
	}
}