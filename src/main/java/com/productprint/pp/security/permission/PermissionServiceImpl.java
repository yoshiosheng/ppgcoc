package com.productprint.pp.security.permission;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service("permissionService")
public class PermissionServiceImpl implements PermissionService{
	@Autowired
	private PermissionDAO permissionDAO;

	@Override
	public void create(Permissions permissions) {
		// TODO Auto-generated method stub
		if(null!=permissions&&!StringUtils.isBlank(permissions.getNameField())&&!StringUtils.isBlank(permissions.getCode())){
			permissionDAO.create(permissions);
		}
	}

	@Override
	public List<Permissions> getAllPermissions() {
		// TODO Auto-generated method stub
		return permissionDAO.getAllPermissions();
	}

	@Override
	public void update(Permissions permissions) {
		// TODO Auto-generated method stub
		if(0!=permissions.getId()){
			Permissions newPermissions = permissionDAO.getPermissions(permissions.getId());
			newPermissions.setCode(permissions.getCode());
			newPermissions.setIndex(permissions.getIndex());
			newPermissions.setLink(permissions.getLink());
			newPermissions.setNameField(permissions.getNameField());
			
			permissionDAO.update(newPermissions);
		}
	}

	@Override
	public List<Permissions> findPermissions(Permissions permissions) {
		// TODO Auto-generated method stub
		return permissionDAO.findPermissions(permissions);
	}
}
