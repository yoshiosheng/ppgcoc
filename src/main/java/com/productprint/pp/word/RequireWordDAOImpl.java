package com.productprint.pp.word;

import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.productprint.pp.dao.HibernateDao;

@Repository("requireWordDAO")
@SuppressWarnings("unchecked")
public class RequireWordDAOImpl  extends HibernateDao implements RequireWordDAO {

	@Override
	public void insert(RequireWord requireWord) {
		// TODO Auto-generated method stub
		getSession().save( requireWord );
	}

	@Override
	public List<RequireWord> getAll() {
		// TODO Auto-generated method stub
		return getSession().createQuery("from RequireWord").list();
	}

	@Override
	public void distinctWord() {
		// TODO Auto-generated method stub
		String sql = "SELECT B_WORD,COUNT(*) FROM `printproduct`.`app_req_word` GROUP BY B_WORD HAVING COUNT(*)>1";
		
		Query query = getSession().createSQLQuery(sql);
		query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
		
		List<Map<String,Object>> list = query.list();
		for(int i = 0;i<list.size();i++){
			Map<String,Object> map = list.get(i);
			String word = (String)map.get("B_WORD");
			if("微信公众平台'".equals(word)){
				System.out.println();
			}
			
			String dupSql = "SELECT ID FROM `printproduct`.`app_req_word` WHERE B_WORD=:bword";
			
			Query dupQuery = getSession().createSQLQuery(dupSql);
			dupQuery.setParameter("bword", word);
			//dupQuery.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
			List<Integer> idList = dupQuery.list();
			String idString = "";
			for(int j = 1;j<idList.size();j++){
				if(j == idList.size()-1){
					idString = idString + idList.get(j);
				}else{
					idString = idString + idList.get(j) + ",";
				}
			}
			
			String updateSql = "DELETE FROM `printproduct`.`app_req_word` WHERE ID IN("+idString+")";
					
			Query upQuery = getSession().createSQLQuery(updateSql);
			upQuery.executeUpdate();
			
			System.out.println("deleted "+word);
		}
	}

}
