package com.productprint.pp.customer;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.productprint.pp.dao.HibernateDao;

@Repository("customerDAO")
@SuppressWarnings("unchecked")
public class CustomerDAOImpl extends HibernateDao implements CustomerDAO{

	@Override
	public void createCustomer(Customer customer) {
		// TODO Auto-generated method stub
		getSession().save( customer );
	}

	@Override
	public void updateCustomer(Customer customer) {
		// TODO Auto-generated method stub
		getSession().update( customer );
	}

	@Override
	public List<Customer> getAllCustomer() {
		// TODO Auto-generated method stub
		return getSession().createQuery("from Customer").list();
	}

	@Override
	public Customer getCustomer(int customerId) {
		// TODO Auto-generated method stub
		return (Customer)getSession().get(Customer.class, customerId);
	}

	@Override
	public void delete(int customerId) {
		// TODO Auto-generated method stub
		Customer customer = getCustomer(customerId);
		if(null!=customer&&0!=customer.getId()){
			getSession().delete(customer);
		}
	}

	@Override
	public List<Customer> findCustomers(Customer customer) {
		// TODO Auto-generated method stub
		Criteria criteria = getSession().createCriteria(Customer.class);
    	if(null!=customer&&!StringUtils.isBlank(customer.getAccoutNumber())){
    		criteria.add(Restrictions.like("accoutNumber", "%"+customer.getAccoutNumber()+"%"));
    	}
    	
    	if(null!=customer&&!StringUtils.isBlank(customer.getCreditTerms())){
    		criteria.add(Restrictions.like("creditTerms", "%"+customer.getCreditTerms()+"%"));
    	}
    	return criteria.list();
	}

}
