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

package com.productprint.pp.dao;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import com.productprint.pp.security.User;

@Repository("userDAO")
@SuppressWarnings("unchecked")
public class UserDAOImpl extends HibernateDao implements UserDAO {

    public User getUser(Integer userId) {
    	User user = (User) getSession().get(User.class, userId);
        return user;
    }

    public User findUser(String username) {
        Assert.hasText(username);
        String query = "from User u where u.username = :username";
        User user = null;
        try{
        	user = (User) getSession().createQuery(query).setString("username", username).uniqueResult();
        }catch(Exception e){
        	e.printStackTrace();
        }
        return user;
    }

    public void createUser(User user) {
    	getSession().save( user );
    }
    
    public List<User> searchUser(User user,Integer permissionId) {
    	Criteria criteria = getSession().createCriteria(User.class);
    	
    	if(!StringUtils.isBlank(user.getUsername())){
    		criteria.add(Restrictions.eq("username", user.getUsername()));
		}
    	
    	if(null!=permissionId){
    		criteria.add(Restrictions.sqlRestriction("{alias}.ID IN (SELECT USER_ID FROM `printproduct`.`sec_users_permissions` WHERE PERMISSION_ID="+permissionId+")"));
    	}
    	
    	return criteria.list();
    }

    public List<User> getAllUsers() {
        return getSession().createQuery("from User order by username").list();
    }

    public void deleteUser(Integer userId) {
        User user = getUser(userId);
        if( user != null ) {
            getSession().delete(user);
        }
    }

    public void updateUser(User user) {
        getSession().update(user);
    }

	@Override
	public void merge(User user) {
		// TODO Auto-generated method stub
		getSession().merge(user);
	}

}
