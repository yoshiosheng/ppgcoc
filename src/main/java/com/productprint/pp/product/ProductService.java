package com.productprint.pp.product;

import java.util.List;

public interface ProductService {
	public void createProduct(Product product);
	public void updateProduct(Product product);
	public List<Product> getAllProduct();
	public Product getProduct(int productId);
	public void delete(int productId);
	public List<Product> findProducts(Product product);
}
