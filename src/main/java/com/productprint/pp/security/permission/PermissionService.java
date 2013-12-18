package com.productprint.pp.security.permission;

import java.util.List;

public interface PermissionService {
	public void create(Permissions permissions);
	public List<Permissions> getAllPermissions();
	public void update(Permissions permissions);
	public List<Permissions> findPermissions(Permissions permissions);
}
