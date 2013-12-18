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

package com.productprint.pp.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.productprint.pp.dao.UserDAO;
import com.productprint.pp.security.User;
import com.productprint.pp.security.permission.Permissions;
import com.productprint.pp.util.StringHashUtil;

/**
 * Default implementation of the {@link UserService} interface.  This service implements
 * operations related to User data.
 */
@Service("userService")
public class UserServiceImpl implements UserService {

    private UserDAO userDAO;

    @Autowired
    public void setUserDAO(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User getCurrentUser() {
        final Integer currentUserId = (Integer) SecurityUtils.getSubject().getPrincipal();
        if( currentUserId != null ) {
            return getUser(currentUserId);
        } else {
            return null;
        }
    }

    public void createUser(String username, String email, String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword( new Sha256Hash(password).toHex() );
        userDAO.createUser( user );
    }

    public List<User> getAllUsers() {
        return userDAO.getAllUsers();
    }

    public User getUser(Integer userId) {
        return userDAO.getUser(userId);
    }

    public void deleteUser(Integer userId) {
        userDAO.deleteUser( userId );
    }

    public void updateUser(User user) {
        userDAO.updateUser( user );
    }
    
    @Transactional
	@Override
	public void createUser(User user) {
		// TODO Auto-generated method stub
		userDAO.createUser(user);
	}

    @Transactional
	@Override
	public void updateUserInfo(User user,List<Integer> permissionsIdList) {
		// TODO Auto-generated method stub
		if(null!=user&&0!=user.getId()){
			User dbUser = userDAO.getUser(user.getId());
			Set<Permissions> permissions = new HashSet<Permissions>();
			
			//update password
			String[] outStrings = StringHashUtil.hashPassword(user.getPassword());
			dbUser.setHashPassword(outStrings[0]);
			dbUser.setSaltPassword(outStrings[1]);
			dbUser.setPassword(user.getPassword());
			
			//update permissions
			if(null!=permissionsIdList&&permissionsIdList.size()>0){
				for(int i=0;i<permissionsIdList.size();i++){
					Permissions permission = new Permissions();
					permission.setId(permissionsIdList.get(i));
					permissions.add(permission);
				}
			}
			
			dbUser.setPermissions(permissions);
			userDAO.merge(dbUser);
		}
	}

    @Transactional
	@Override
	public void createUser(User user, List<Integer> permissionsIdList) {
		// TODO Auto-generated method stub
		if(null!=user&&!StringUtils.isBlank(user.getUsername())&&!StringUtils.isBlank(user.getPassword())){
			//set password
			String[] outStrings = StringHashUtil.hashPassword(user.getPassword());
			user.setHashPassword(outStrings[0]);
			user.setSaltPassword(outStrings[1]);
			
			userDAO.createUser(user);
			
			//set permissions
			if(null!=permissionsIdList&&permissionsIdList.size()>0){
				Set<Permissions> permissions = new HashSet<Permissions>();
				for(int i=0;i<permissionsIdList.size();i++){
					Permissions permission = new Permissions();
					permission.setId(permissionsIdList.get(i));
					permissions.add(permission);
				}
				user.setPermissions(permissions);
				userDAO.merge(user);
			}
		}
	}

	@Override
	public List<User> searchUsers(User user, Integer permissionId) {
		// TODO Auto-generated method stub
		return userDAO.searchUser(user, permissionId);
	}

}