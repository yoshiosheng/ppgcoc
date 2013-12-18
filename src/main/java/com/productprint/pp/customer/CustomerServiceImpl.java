package com.productprint.pp.customer;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service("customerService")
public class CustomerServiceImpl implements CustomerService{
	@Autowired
	private CustomerDAO customerDAO;
	@Override
	public void createCustomer(Customer customer) {
		// TODO Auto-generated method stub
		if(null!=customer&&!StringUtils.isBlank(customer.getAccoutNumber())){
			customerDAO.createCustomer(customer);
		}
	}

	@Override
	public void updateCustomer(Customer customer) {
		// TODO Auto-generated method stub
		if(null!=customer&&0!=customer.getId()){
			Customer dbCustomer = customerDAO.getCustomer(customer.getId());
			dbCustomer.setAccoutNumber(customer.getAccoutNumber());
			dbCustomer.setAttention(customer.getAttention());
			dbCustomer.setCreditTerms(customer.getCreditTerms());
			dbCustomer.setRemarks(customer.getRemarks());
			dbCustomer.setShipVia(customer.getShipVia());
			dbCustomer.setSignmentNoteNumber(customer.getSignmentNoteNumber());
			dbCustomer.setTelephone(customer.getTelephone());
			customerDAO.updateCustomer(dbCustomer);
		}
	}

	@Override
	public List<Customer> getAllCustomer() {
		// TODO Auto-generated method stub
		return customerDAO.getAllCustomer();
	}

	@Override
	public Customer getCustomer(int customerId) {
		// TODO Auto-generated method stub
		return customerDAO.getCustomer(customerId);
	}

	@Override
	public void delete(int customerIdId) {
		// TODO Auto-generated method stub
		customerDAO.delete(customerIdId);
	}

	@Override
	public List<Customer> findCustomers(Customer customer) {
		// TODO Auto-generated method stub
		return customerDAO.findCustomers(customer);
	}

}
