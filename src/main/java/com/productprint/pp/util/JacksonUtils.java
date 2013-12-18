package com.productprint.pp.util;

import org.codehaus.jackson.map.ObjectMapper;

public class JacksonUtils {

	public static <T> T getEntityFromJson(String json,Class<T> valueType)throws Exception{
		ObjectMapper mapper = new ObjectMapper(); // can reuse, share globally;
		mapper.configure(org.codehaus.jackson.map.DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		return (T)(mapper.readValue(json, valueType));
	}
	
	public static String getJsonFromObject(Object obj){
		ObjectMapper mapper = new ObjectMapper(); 
		String str = "";
		try{
			str = mapper.writeValueAsString(obj);
		}catch(Exception e){
			e.printStackTrace();
		}
		return str;
	}

}
