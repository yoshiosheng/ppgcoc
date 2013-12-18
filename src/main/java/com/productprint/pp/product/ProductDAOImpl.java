package com.productprint.pp.product;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.productprint.pp.dao.HibernateDao;

@Repository("productDAO")
@SuppressWarnings("unchecked")
public class ProductDAOImpl extends HibernateDao implements ProductDAO{

	@Override
	public void createProduct(Product product) {
		// TODO Auto-generated method stub
		getSession().save( product );
	}

	@Override
	public void updateProduct(Product product) {
		// TODO Auto-generated method stub
		getSession().update( product );
	}

	@Override
	public List<Product> getAllProduct() {
		// TODO Auto-generated method stub
		return getSession().createQuery("from Product").list();
	}

	@Override
	public Product getProduct(int productId) {
		// TODO Auto-generated method stub
		return (Product)getSession().get(Product.class, productId);
	}

	@Override
	public void delete(int productId) {
		// TODO Auto-generated method stub
		Product product = getProduct(productId);
		if(null!=product&&0!=product.getId()){
			getSession().delete(product);
		}
	}

	@Override
	public List<Product> findProducts(Product product) {
		// TODO Auto-generated method stub
		Criteria criteria = getSession().createCriteria(Product.class);
    	
    	if(!StringUtils.isBlank(product.getProductName())){
    		criteria.add(Restrictions.eq("productName", product.getProductName()));
		}
    	
    	if(!StringUtils.isBlank(product.getStandard())){
    		criteria.add(Restrictions.eq("standard", product.getStandard()));
		}
    	
    	return criteria.list();
	}

}
