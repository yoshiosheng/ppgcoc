package com.productprint.pp.security.permission;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "sec_roles_history", catalog = "printproduct")
public class RoleHistory implements Serializable {

	private static final long serialVersionUID = -4643953612104140486L;

	@Id
    @Column(name = "ID")
    @GeneratedValue
    private int id;

    @Column(name = "ROLE_ID")
    private int roleId;

    @Column(name = "ROLE_NAME")
    private String roleName;

    @Column(name = "LAST_MODIFIED_DATE")
    private Date lastModifiedDate;

    @Column(name = "LAST_MODIFIED_BY_USER")
    private String lastModifiedByUser;

    @Transient
    private String lastModifiedDateString;

    @Column(name = "ACTION")
    private String action;
    
    @Column(name = "RESOURCE_NAME")
    private String resourceName;
    
    @Column(name = "GROUP_NAME")
    private String groupName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getLastModifiedByUser() {
        return lastModifiedByUser;
    }

    public void setLastModifiedByUser(String lastModifiedByUser) {
        this.lastModifiedByUser = lastModifiedByUser;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getLastModifiedDateString() {
        if(getLastModifiedDate()==null) {
            return null;
        }
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        lastModifiedDateString = dateFormat.format(getLastModifiedDate());
        return lastModifiedDateString;
    }

    public void setLastModifiedDateString(String lastModifiedDateString) {
        this.lastModifiedDateString = lastModifiedDateString;
    }

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
}
