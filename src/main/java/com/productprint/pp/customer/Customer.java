package com.productprint.pp.customer;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@SuppressWarnings("serial")
@Entity
@Table(name = "app_customer", catalog = "printproduct")
@Cache(usage= CacheConcurrencyStrategy.READ_WRITE)
public class Customer implements Serializable {
	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)  
	private int id;
	
	@Column(name = "ACCOUNT_NUMBER")
	private String accoutNumber;
	
	@Column(name = "CREDIT_TERMS")
	private String creditTerms;
	
	@Column(name = "SHIP_VIA")
	private String shipVia;
	
	@Column(name = "CONSIGNMENT_NOTE_NUMBER")
	private String signmentNoteNumber;
	
	@Column(name = "ATTENTION")
	private String attention;
	
	@Column(name = "TELEPHONE")
	private String telephone;
	
	@Column(name = "REMARKS")
	private String remarks;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAccoutNumber() {
		return accoutNumber;
	}

	public void setAccoutNumber(String accoutNumber) {
		this.accoutNumber = accoutNumber;
	}

	public String getCreditTerms() {
		return creditTerms;
	}

	public void setCreditTerms(String creditTerms) {
		this.creditTerms = creditTerms;
	}

	public String getShipVia() {
		return shipVia;
	}

	public void setShipVia(String shipVia) {
		this.shipVia = shipVia;
	}

	public String getSignmentNoteNumber() {
		return signmentNoteNumber;
	}

	public void setSignmentNoteNumber(String signmentNoteNumber) {
		this.signmentNoteNumber = signmentNoteNumber;
	}

	public String getAttention() {
		return attention;
	}

	public void setAttention(String attention) {
		this.attention = attention;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
}
