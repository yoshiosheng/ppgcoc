package com.productprint.pp.security.permission;

import java.util.List;

public interface RoleHistoryDAO {
	
    public List<RoleHistory> getAllRoleHistory();
    
    public boolean saveRoleHistory(RoleHistory roleHistory);
    
    public RoleHistory getRoleHistoryById(int id);
    
    public List<RoleHistory> getAllRoleHistorysByRoleId(int roleId);
    
    public List<RoleHistory> getLatestFiveRoleHistorysByRoleId(int roleId);
    
}
