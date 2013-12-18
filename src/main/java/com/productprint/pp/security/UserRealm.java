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

package com.productprint.pp.security;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SaltedAuthenticationInfo;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.codec.Base64;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.apache.shiro.util.SimpleByteSource;
import org.apache.shiro.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.productprint.pp.dao.UserDAO;
import com.productprint.pp.security.permission.Role;

/**
 * The Spring/Hibernate sample application's one and only configured Apache Shiro Realm.
 *
 * <p>Because a Realm is really just a security-specific DAO, we could have just made Hibernate calls directly
 * in the implementation and named it a 'HibernateRealm' or something similar.</p>
 *
 * <p>But we've decided to make the calls to the database using a UserDAO, since a DAO would be used in other areas
 * of a 'real' application in addition to here. We felt it better to use that same DAO to show code re-use.</p>
 */
@Component
public class UserRealm extends AuthorizingRealm {

    protected UserDAO userDAO = null;

    public UserRealm() {
        setName("UserRealm"); //This name must match the name in the User class's getPrincipals() method
        HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(Sha256Hash.ALGORITHM_NAME);
        matcher.setHashIterations(10);
        matcher.setStoredCredentialsHexEncoded(false);
        setCredentialsMatcher(matcher);
    }
    
    @Autowired
    public void setUserDAO(UserDAO userDAO) {
        this.userDAO = userDAO;
    }
    
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        User user = userDAO.findUser(token.getUsername());
        
        if(user != null) {
        	String inputPlain = String.valueOf(token.getPassword());
        	HashedCredentialsMatcher hashMatcher = (HashedCredentialsMatcher) getCredentialsMatcher();
        	
        	if(StringUtils.hasText(user.getPassword()) && 
        			StringUtils.hasText(inputPlain) && 
        			user.getPassword().equals(inputPlain) && 
        			!StringUtils.hasText(user.getHashPassword()) && 
        			!StringUtils.hasText(user.getSaltPassword())) {
        		String outStrings[] = hashPassword(inputPlain, hashMatcher.getHashIterations());
        		user.setHashPassword(outStrings[0]);
        		user.setSaltPassword(outStrings[1]);
        		userDAO.updateUser(user);
        	}
        	
        	ByteSource salt = new SimpleByteSource(Base64.decode(user.getSaltPassword())); 
        	SaltedAuthenticationInfo info = new SimpleAuthenticationInfo(user.getId(), user.getHashPassword(), salt, getName());
        	
        	if(hashMatcher.doCredentialsMatch(token, info)) { return info; } 
        	else { return null; }
        } else {
        	return null;
        }
    }

    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
    	Integer userId = (Integer) principals.fromRealm(getName()).iterator().next();
        User user = userDAO.getUser(userId);
        if( user != null ) {
            SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
//            for( Role role : user.getRoles() ) {
//                info.addRole(role.getName());
//                info.addStringPermissions( role.getPermissions() );
//            }
            return info;
        } else {
            return null;
        }
    }
	
	private String[] hashPassword(String inputPlain, int hashIteration) {
		ByteSource salt = getNextSalt();
	    String hash = hashAndSalt(inputPlain, salt, hashIteration);
	    return new String[]{hash, salt.toBase64()};
	}
	
	private String hashAndSalt(String inputPlain, ByteSource salt, int hashIteration) {
	    return new Sha256Hash(inputPlain, salt, hashIteration).toBase64();
	}
	
	private ByteSource getNextSalt() {
	    return new SecureRandomNumberGenerator().nextBytes();
	}
}