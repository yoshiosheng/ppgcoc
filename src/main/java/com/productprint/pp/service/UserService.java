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

import java.util.List;

import com.productprint.pp.security.User;
import com.productprint.pp.security.permission.Permissions;

/**
 * A service interface for accessing and modifying user data in the system.
 */
public interface UserService {

    User getCurrentUser();

    void createUser(String username, String email, String password);

    List<User> getAllUsers();
    
    List<User> searchUsers(User user,Integer permissionId);

    User getUser(Integer userId);

    void deleteUser(Integer userId);

    void updateUser(User user);
    
    void createUser(User user);
    void createUser(User user,List<Integer> permissionsIdList);
    
    void updateUserInfo(User user,List<Integer> permissionsIdList);
}