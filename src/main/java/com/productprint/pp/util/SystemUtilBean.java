package com.productprint.pp.util;

import java.util.Date;
import java.util.Calendar;

public class SystemUtilBean {

	private static SystemUtilBean bean;
	
	public static SystemUtilBean getInstance() {
		if(bean==null)
			bean = new SystemUtilBean();
		return bean;
	}
	
	public String getSystemYear() {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		
		return String.valueOf(calendar.get(Calendar.YEAR));
	}
}
