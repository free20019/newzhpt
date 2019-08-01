package com.erxi.ms.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erxi.ms.config.DS;
import com.erxi.ms.dao.YjzhDao;
import com.erxi.ms.result.FastJsonUtil;

/**
 * 应急指挥处置系统
 * @author xianlehuang
 * @date 2018/12/20 
 */

@Service
public class YjzhServics {
	
    @Autowired
    private YjzhDao YjzhDao;
    private Map<String, Object> map;
   
    @DS("datasource1")
   	public String findxll(String table,String field) {
   		List<Map<String, Object>> list = YjzhDao.findxll(table,field);
   		return FastJsonUtil.toJSONString(list);
   	}
    @DS("datasource1")
   	public String findzbb() {
   		 	List<Map<String, Object>> list = YjzhDao.findzbb();
   		 	List<Map<String, Object>> listweek = YjzhDao.findzbbweek();
   			map = new HashMap<String, Object> ();
   			map.put("NOW",list);
   			map.put("WEEK",listweek);
   			return FastJsonUtil.toJSONString(map);
   	}
    @DS("datasource1")
   	public String fingyjsjjr(String sjzt) {
   		 	List<Map<String, Object>> list = YjzhDao.fingyjsjjr(sjzt);
   			return FastJsonUtil.toJSONString(list);
   	}
    @DS("datasource1")
   	public Integer jrsave(String postData) {
    		Integer msg = YjzhDao.jrsave(postData);
   			return msg;
   	}
    @DS("datasource1")
    public Integer jrUpdate(String postData) {
    	Integer msg = YjzhDao.jrUpdate(postData);
    	return msg;
    }
    @DS("datasource1")
    public Integer jrRzsh(String id) {
    	Integer msg = YjzhDao.jrRzsh(id);
    	return msg;
    }
    @DS("datasource1")
    public Integer jrDelete(String id) {
    	Integer msg = YjzhDao.jrDelete(id);
    	return msg;
    }
    @DS("datasource1")
   	public String getAllNames(String table) {
   		List<Map<String, Object>> list = YjzhDao.getAllNames(table);
   		return FastJsonUtil.toJSONString(list);
   	}
    @DS("datasource1")
   	public String getContent(String table,String id) {
   		List<Map<String, Object>> list = YjzhDao.getContent(table,id);
   		return String.valueOf(list.get(0).get("CONTENT"));
   	}
    @DS("datasource1")
    public Integer saveContent(HttpServletRequest request) {
    	String table=request.getParameter("table");
    	String name=request.getParameter("name");
    	String content=request.getParameter("content");
    	Integer msg = YjzhDao.saveContent(table,name,content);
    	return msg;
    }
    @DS("datasource1")
    public Integer editContent(HttpServletRequest request) {
    	String table=request.getParameter("table");
    	String id=request.getParameter("id");
    	String name=request.getParameter("name");
    	String content=request.getParameter("content");
    	Integer msg = YjzhDao.editContent(table,id,name,content);
    	return msg;
    }
    @DS("datasource1")
   	public String findclsj(String info) {
    	List<Map<String, Object>> list =null;
    	if(info.equals("")){
    		list = YjzhDao.findclsj1();
    	}else{
    		list = YjzhDao.findclsj2(info);
    	}
   		return FastJsonUtil.toJSONString(list);
   	}
    @DS("datasource1")
   	public String findjtsj() {
    	List<Map<String, Object>> list =null;
    	list = YjzhDao.findjtsj();
   		return FastJsonUtil.toJSONString(list);
   	}
}
