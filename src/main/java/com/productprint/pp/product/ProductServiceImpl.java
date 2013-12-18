package com.productprint.pp.product;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service("productService")
public class ProductServiceImpl implements ProductService{
	@Autowired
	private ProductDAO productDAO;
	@Override
	public void createProduct(Product product) {
		// TODO Auto-generated method stub
		if(!StringUtils.isBlank(product.getProductName())){
			product.setCreateDate(new Date());
			productDAO.createProduct(product);
		}
	}

	@Override
	public void updateProduct(Product product) {
		// TODO Auto-generated method stub
		if(null!=product&&0!=product.getId()){
			Product dbProduct = productDAO.getProduct(product.getId());
			dbProduct.setProductName(product.getProductName());
			dbProduct.setStandard(product.getStandard());
			dbProduct.setDescription(product.getDescription());
			dbProduct.setUom(product.getUom());
			dbProduct.setUpdateDate(new Date());
			productDAO.updateProduct(dbProduct);
		}
	}

	@Override
	public List<Product> getAllProduct() {
		// TODO Auto-generated method stub
		return productDAO.getAllProduct();
	}

	@Override
	public Product getProduct(int productId) {
		// TODO Auto-generated method stub
		return productDAO.getProduct(productId);
	}

	@Override
	public void delete(int productId) {
		// TODO Auto-generated method stub
		productDAO.delete(productId);
	}

	@Override
	public List<Product> findProducts(Product product) {
		// TODO Auto-generated method stub
		return productDAO.findProducts(product);
	}

}
