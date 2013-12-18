package com.productprint.pp.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class Utilities {
	
	public byte[] toByteArray(Blob fromImageBlob) {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			return toByteArrayImpl(fromImageBlob, baos);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public byte[] toByteArrayImpl(Blob fromImageBlob, 
			ByteArrayOutputStream baos) throws SQLException, IOException {
		byte buf[] = new byte[4000];
		int dataSize;
		InputStream is = fromImageBlob.getBinaryStream();
		
		if(fromImageBlob!=null && fromImageBlob.length()>0) {
			try {
				while((dataSize=is.read(buf)) != -1) {
					baos.write(buf, 0, dataSize);
				}    
			} finally {
				if(is != null) {
					is.close();
				}
			}
		} else {
			System.out.println("INVALID LOGO/CONTACT IMAGE BLOB!");
		}
		return baos.toByteArray();
	}
	
	public String formatDate(String str_date,String type,boolean flag) {
		String final_date = "";
		try {
			DateFormat formatter;
			Date date;
			if(flag) formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			else formatter = new SimpleDateFormat("yyyy-MM-dd");
			
			DateFormat dd = new SimpleDateFormat(type);
			date = formatter.parse(str_date);
			final_date = dd.format(date);

		} catch (ParseException e) {
			e.printStackTrace();
		}
		return final_date;
	}
	
	public int safeLongToInt(long l) {
	    if (l < Integer.MIN_VALUE || l > Integer.MAX_VALUE) {
	        throw new IllegalArgumentException
	            (l + " cannot be cast to int without changing its value.");
	    }
	    return (int) l;
	}
	
	public long dateDifference(String date,String type) {
		DateFormat formatter;
		formatter = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date endDate = null;
		Date startDate = null;
		long diffDays = 0;
		try {
			endDate = formatter.parse(date);
			startDate = Calendar.getInstance().getTime();
			long startTime = startDate.getTime();
			long endTime = endDate.getTime();
			long diffTime = endTime - startTime;
			diffDays = diffTime / (1000 * 60 * 60 * 24);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return diffDays;
	}

	// Data Graph - jqPlot can't run in iPad if instance of xAxis is not in yyyy-MM-dd format
	// Solution proposed: (By using hardcode method) provide full date format yyyy-MM-dd instead of yyyy-MM in dataGraphMapFinal model attribute.
	/** @deprecated Previously Used In Data Graph Of Demographics */
	public void addDataGraphMap(boolean isNotExist, Map<String, String> dataGraphMapFinal, List<String> xAxis, List<String> yAxis, String dateToAdd, int i) {
		if(isNotExist==true) {
			dataGraphMapFinal.put(dateToAdd.concat("-01"), "0");
		} else {
			dataGraphMapFinal.put(xAxis.get(i).concat("-01"), yAxis.get(i));
		}
	}
	
	// kasiang_koi: Used In Data Graph of Demographics and Product Metrics
	public List<String> getMonthIncrementList(String dateFormat, List<String> xAxis, int numberOfIncrement) {
		SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
		String maxDate = Collections.max(xAxis); // Maximum Date
		String dateIncrement = new String();
		Calendar calIncrement = Calendar.getInstance();
		List<String> dateIncrementFinal = new ArrayList<String>();
		for(int i=0, X=numberOfIncrement; i<=X; i++) {
			try {
				calIncrement.setTime(sdf.parse(maxDate));
				calIncrement.add(Calendar.MONTH, -i);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			dateIncrement = sdf.format(calIncrement.getTime());
			dateIncrementFinal.add(dateIncrement);
		}
		return dateIncrementFinal;
	}
}