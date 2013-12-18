package com.productprint.pp.security;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Index;

import com.productprint.pp.security.permission.Permissions;

@Entity
@Table(name = "sec_users", catalog = "printproduct")
@Cache(usage= CacheConcurrencyStrategy.READ_WRITE)
public class User implements Serializable {

	private static final long serialVersionUID = 2108482250017443347L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)  
	private int id;
	
	@Basic(optional=false)
	@Column(name = "USERNAME")
	@Index(name="idx_users_username")
	private String username;

	@Basic(optional=false)
	@Column(name = "PASSWORD")
	private String password;
	
	@Column(name = "HASH_PASSWORD")
	private String hashPassword;
	
	@Column(name = "SALT_PASSWORD")
	private String saltPassword;
	
	@Column(name = "FIRST_NAME")
	private String firstName;
	
	@Column(name = "LAST_NAME")
	private String lastName;

	@Column(name = "IS_INACTIVE")
	private boolean isInactive;

	@ManyToMany
    @JoinTable(
    	name = "sec_users_permissions",
    	joinColumns = @JoinColumn(name = "USER_ID"),
    	inverseJoinColumns = @JoinColumn(name = "PERMISSION_ID")
    )
    @Cache(usage=CacheConcurrencyStrategy.READ_WRITE)
	private Set<Permissions> permissions = new HashSet<Permissions>();
	
	@Transient
	private String permissionsId;

	public String getPermissionsId() {
		permissionsId = "";
		if(null!=permissions&&permissions.size()>0){
			for(Permissions perm:permissions){
				permissionsId = permissionsId + perm.getId() + ",";
			}
		}else{
			return permissionsId;
		}
		return permissionsId.substring(0, permissionsId.length()-1);
	}

	public User() {
	}
	
	public User(String username, String password, String hashPassword, String saltPassword, String email) {
		super();
		this.username = username;
		this.password = password;
		this.hashPassword = hashPassword;
		this.saltPassword = saltPassword;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	public String getHashPassword() {
		return hashPassword;
	}

	public void setHashPassword(String hashPassword) {
		this.hashPassword = hashPassword;
	}
	
	
	public String getSaltPassword() {
		return saltPassword;
	}

	public void setSaltPassword(String saltPassword) {
		this.saltPassword = saltPassword;
	}

	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	
	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public boolean isInactive() {
		return isInactive;
	}

	public Set<Permissions> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<Permissions> permissions) {
		this.permissions = permissions;
	}

	public void setInactive(boolean isInactive) {
		this.isInactive = isInactive;
	}

}