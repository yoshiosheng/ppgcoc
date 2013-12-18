package com.productprint.pp.security.permission;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.productprint.pp.dao.HibernateDao;
@Repository("permissionDAO")
@SuppressWarnings("unchecked")
public class PermissionDAOImpl extends HibernateDao implements PermissionDAO{

	@Override
	public void create(Permissions permissions) {
		// TODO Auto-generated method stub
		getSession().save( permissions );
	}

	@Override
	public List<Permissions> getAllPermissions() {
		// TODO Auto-generated method stub
		return getSession().createQuery("from Permissions").list();
	}

	@Override
	public void update(Permissions permissions) {
		// TODO Auto-generated method stub
		getSession().update(permissions);
	}

	@Override
	public Permissions getPermissions(int id) {
		// TODO Auto-generated method stub
		return (Permissions)getSession().get(Permissions.class, id);
	}

	@Override
	public List<Permissions> findPermissions(Permissions permissions) {
		// TODO Auto-generated method stub
		Criteria criteria = getSession().createCriteria(Permissions.class);
    	
    	if(!StringUtils.isBlank(permissions.getNameField())){
    		criteria.add(Restrictions.eq("nameField", permissions.getNameField()));
		}
    	
    	if(!StringUtils.isBlank(permissions.getCode())){
    		criteria.add(Restrictions.eq("code", permissions.getCode()));
		}
    	
    	return criteria.list();
	}

}
