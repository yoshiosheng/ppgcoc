package com.productprint.pp.security.permission;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sec_roles_permissions", catalog = "printproduct")
public class RolesPermissions implements Serializable {
	
    @Id
    @Column(name = "ROLE_ID")
    private int roleID;

    @Column(name = "ELEMENT")
    private String element;

	public int getRoleID() {
		return roleID;
	}

	public void setRoleID(int roleID) {
		this.roleID = roleID;
	}

	public String getElement() {
		return element;
	}

	public void setElement(String element) {
		this.element = element;
	}
}
