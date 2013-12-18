package com.productprint.pp.security.permission;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "sec_permissions", catalog = "printproduct")
public class Permissions implements Serializable {

	@Id
    @Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @Column(name = "nameField")
    private String nameField;
    
    @Column(name = "CODE")
    private String code;
    
    @Column(name = "LINK")
    private String link;
    
    @Column(name = "INDEX_N")
    private Integer index;

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getNameField() {
		return nameField;
	}

	public void setNameField(String nameField) {
		this.nameField = nameField;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Integer getIndex() {
		return index;
	}

	public void setIndex(Integer index) {
		this.index = index;
	}
}
