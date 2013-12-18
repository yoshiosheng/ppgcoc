package com.productprint.pp.word;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service("requireWordService")
public class RequireWordServiceImpl implements RequireWordService {
	@Autowired
	private RequireWordDAO requireWordDAO;
	@Override
	public void insertFromCsv(String dir)throws Exception {
		// TODO Auto-generated method stub
		File file =new File(dir);  
		if(file.exists()&&file.isDirectory()){
			File[] array = file.listFiles();  
			for(int i=0;i<array.length;i++){   
				if(array[i].isFile()){ 
					readCsvFile(array[i].getAbsolutePath());
				}
			}
		}
	}

	@Override
	public void insertFromCsvFile(String filePath) throws Exception{
		// TODO Auto-generated method stub
		File file =new File(filePath);  
		if(file.isFile()&&file.exists()){
			readCsvFile(filePath);
		}
	}

	@Override
	public List<RequireWord> getAll() {
		// TODO Auto-generated method stub
		return requireWordDAO.getAll();
	}
	
	private void readCsvFile(String filePath)throws Exception{
		File file =new File(filePath);  
		if(file.isFile()&&file.exists()){
			BufferedReader reader = new BufferedReader(new FileReader(filePath));//换成你的文件名 
	         reader.readLine();//第一行信息，为标题信息，不用,如果需要，注释掉 
	         String line = null;  
	         int catindex = 0;
	         String cat = "";
        	 
	         while((line=reader.readLine())!=null){  
	             String item[] = line.split(",");//CSV格式文件为逗号分隔符文件，这里根据逗号切分 
	             
	             RequireWord requireWord = new RequireWord();
	             if(null!=item&&item.length>1){
	            	 if(0 == catindex){
	            		 cat = item[0];
		             }
	            	 try{
	            		 requireWord.setWord(item[0]);
		            	 requireWord.setPv(item[1]);
		            	 requireWord.setCat(cat);
		            	 requireWordDAO.insert(requireWord);
	            	 }catch(Exception e){
	            		 e.printStackTrace();
	            	 }
	            	 
	             }
	             System.out.println(item[0] + "   "+item[1] ); 
	             catindex = catindex + 1;
	         } 
	         
	         reader.close();
		}
	}

	@Override
	public void distinctWord() {
		// TODO Auto-generated method stub
		requireWordDAO.distinctWord();
	}

}
