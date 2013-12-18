package com.productprint.pp.security.permission;

import java.util.List;

public interface PermissionDAO {
	public void create(Permissions permissions);
	public List<Permissions> getAllPermissions();
	public void update(Permissions permissions);
	public Permissions getPermissions(int id);
	public List<Permissions> findPermissions(Permissions permissions);
}
