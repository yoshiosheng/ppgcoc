package com.productprint.pp.customer;

import java.util.List;

public interface CustomerDAO {
	public void createCustomer(Customer customer);
	public void updateCustomer(Customer customer);
	public List<Customer> getAllCustomer();
	public Customer getCustomer(int customerId);
	public void delete(int customerId);
	public List<Customer> findCustomers(Customer customer);
}
