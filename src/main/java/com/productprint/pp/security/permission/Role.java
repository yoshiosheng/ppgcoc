package com.productprint.pp.security.permission;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CollectionOfElements;
import org.hibernate.annotations.Index;

/**
 * Model object that represents a security role.
 */
@Entity
@Table(name = "sec_roles", catalog = "printproduct")
@Cache(usage= CacheConcurrencyStrategy.READ_WRITE)
public class Role implements Serializable {

    private static final long serialVersionUID = 4611651121639354575L;

    private int id;

    private String name;

    private String description;

    private Integer statusFlag;

    private Date createDate;

    private String createByUser;

    private Date lastModifiedDate;

    private String lastModifiedByUser;

    private Set<String> permissions;

    private String lastModifiedDateString;
    
    
    protected Role() {
    }

    public Role(String name) {
        this.name = name;
    }
    
    
    @Id
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic(optional=false)
    @Column(name = "NAME")
    @Index(name="idx_roles_name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "DESCRIPTION")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "STATUS_FLAG")
    public Integer getStatusFlag() {
        return statusFlag;
    }

    public void setStatusFlag(Integer statusFlag) {
        this.statusFlag = statusFlag;
    }

    @Column(name = "CREATE_DATE")
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    @Column(name = "CREATE_BY_USER")
    public String getCreateByUser() {
        return createByUser;
    }

    public void setCreateByUser(String createByUser) {
        this.createByUser = createByUser;
    }

    @Column(name = "LAST_MODIFIED_DATE")
    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    @Column(name = "LAST_MODIFIED_BY_USER")
    public String getLastModifiedByUser() {
        return lastModifiedByUser;
    }

    public void setLastModifiedByUser(String lastModifiedByUser) {
        this.lastModifiedByUser = lastModifiedByUser;
    }
    
    @CollectionOfElements
    @JoinTable(
    	name = "sec_roles_permissions",
    	joinColumns = @JoinColumn(name = "ROLE_ID")
    )
    @Cache(usage=CacheConcurrencyStrategy.READ_WRITE)
    public Set<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<String> permissions) {
        this.permissions = permissions;
    }

    @Transient
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
}
