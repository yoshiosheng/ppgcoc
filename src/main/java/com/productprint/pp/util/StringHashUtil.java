package com.productprint.pp.util;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SaltedAuthenticationInfo;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.codec.Base64;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.util.ByteSource;
import org.apache.shiro.util.SimpleByteSource;

import com.productprint.pp.security.User;

public class StringHashUtil {
	public static String[] hashPassword(String inputPlain) {
		int hashIteration = 10;
		ByteSource salt = getNextSalt();
		String hash = hashAndSalt(inputPlain, salt, hashIteration);
	    return new String[]{hash, salt.toBase64()};
	}
	
	private static ByteSource getNextSalt() {
	    return new SecureRandomNumberGenerator().nextBytes();
	}
	
	private static String hashAndSalt(String inputPlain, ByteSource salt, int hashIteration) {
	    return new Sha256Hash(inputPlain, salt, hashIteration).toBase64();
	}
	
	public static boolean doAuthentication(String plainUserName,String plainPassword,
			User dbUser) throws AuthenticationException {
		// TODO Auto-generated method stub
		AuthenticationToken token = new UsernamePasswordToken(plainUserName,plainPassword);
		
		HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(Sha256Hash.ALGORITHM_NAME);
		matcher.setHashIterations(10);
        matcher.setStoredCredentialsHexEncoded(false);
		
    	ByteSource salt = new SimpleByteSource(Base64.decode(dbUser.getSaltPassword())); 
    	SaltedAuthenticationInfo info = new SimpleAuthenticationInfo(dbUser.getId(), dbUser.getHashPassword(), salt, "StringHashUtil");

    	if(matcher.doCredentialsMatch(token, info)) { 
    		return true; 
    	}else { 
    		return false; 
    	}
	}
}
