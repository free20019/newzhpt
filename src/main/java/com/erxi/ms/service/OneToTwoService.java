package com.erxi.ms.service;

import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TreeMap;

import org.codehaus.jackson.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erxi.ms.config.DS;
import com.erxi.ms.dao.OneToTwoDao;
import com.erxi.ms.result.FastJsonUtil;
import com.erxi.ms.result.Result;



@Service
public class OneToTwoService {
	
	@Autowired
	public OneToTwoDao oneToTwoDao;

	// 上线率
	public Result<List<Map<String, Object>>> sxl() {
		List<Map<String, Object>> lists = new ArrayList<Map<String,Object>>();
		Map<String, Object> m = new HashMap<String, Object>();
		List<Map<String, Object>> newList0 = findyingyun24(0);
		List<Map<String, Object>> newList1 = findyingyun24(1);
		List<Map<String, Object>> newList2 = findyingyun24(2);
		List<Map<String, Object>> newList7 = findyingyun24(7);
		List<Map<String, Object>> newList = findaverageyingyun();
		m.put("Today", getsObject(newList0, "ONLINE_RATE"));
		m.put("Yesterday", getsObject(newList1, "ONLINE_RATE"));
		m.put("TheDayBeforeYesterday", getsObject(newList2, "ONLINE_RATE"));
		m.put("LastWeek", getsObject(newList7, "ONLINE_RATE"));
		m.put("LastWeekAverage", getsObject(newList, "ONLINE_RATE"));
		List<Object> al = ZhuanHuan(getsObject(newList0, "ONLINE_RATE"),
				getsObject(newList1, "ONLINE_RATE"), 
				getsObject(newList2, "ONLINE_RATE"), 
				getsObject(newList7, "ONLINE_RATE"),
						getsObject(newList, "ONLINE_RATE"));
		Map<String, Object> jg = new HashMap<String, Object>();
		jg.put("datas", al);
		lists.add(jg);
		return Result.success(lists);
	}
	
	// 在线营运率
	public Result<List<Map<String, Object>>> zxyy() {
		List<Map<String, Object>> lists = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> newList0 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> newList1 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> newList2 = findzxyy24(2);
		List<Map<String, Object>> newList7 = findzxyy24(7);
		List<Map<String, Object>> newList = findzzyyaverage();
		List<Map<String, Object>> newList_0 = findwozaixian();

		SimpleDateFormat df = new SimpleDateFormat("dd");
		String time = df.format(new Date());
		for (int i = 0; i < newList_0.size(); i++) {
			if (time.equals(newList_0.get(i).get("s").toString()
					.substring(0, 2))) {
				newList0.add(newList_0.get(i));
			} else {
				newList1.add(newList_0.get(i));
			}
		}
		List<Object> al=ZhuanHuan(getObject(newList0, "RUN_RATE"),
				getObject(newList1, "RUN_RATE"),
				getObject(newList2, "RUN_RATE"),
				getObject(newList7, "RUN_RATE"),
				getsObject(newList, "ONLINE_RATE"));
		Map<String, Object> jg = new HashMap<String, Object>();
		jg.put("datas", al);
		lists.add(jg);
		return Result.success(lists);
	}
	
	// 一小时以上未营运车辆数
	public Result<List<Map<String, Object>>> yxswyy() {
		List<Map<String, Object>> lists = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> newList0 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> newList1 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> newList2 = findweiyingyun24(2);
		List<Map<String, Object>> newList7 = findweiyingyun24(7);
		List<Map<String, Object>> newList = findaveragezaixian();
		List<Map<String, Object>> newList_0 = findmeiyouyingyun();

		SimpleDateFormat df = new SimpleDateFormat("dd");
		String time = df.format(new Date());
		for (int i = 0; i < newList_0.size(); i++) {
			if (time.equals(newList_0.get(i).get("s").toString()
					.substring(0, 2))) {
				newList0.add(newList_0.get(i));
			} else {
				newList1.add(newList_0.get(i));
			}
		}
		List<Object>al=ZhuanHuan(getObject(newList0, "RUN_TAXIS"), 
				getObject(newList1, "RUN_TAXIS"), 
				getObject(newList2, "RUN_TAXIS"), 
				getObject(newList7, "RUN_TAXIS"), 
				getsObject(newList, "RUN_TAXIS"));
		Map<String, Object> jg = new HashMap<String, Object>();
		jg.put("datas", al);
		lists.add(jg);
		return Result.success(lists);
	}
	
	// 重点监控区域车辆数
	public Result<List<Map<String, Object>>> findzdqu() {
		List<Map<String, Object>> lists = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> newList0 = findarea(0);
		List<Map<String, Object>> newList1 = findarea(1);
		List<Map<String, Object>> newList2 = findarea(2);
		List<Map<String, Object>> newList7 = findarea(7);
		List<Map<String, Object>> newList = findshangzhouaverg();
		List<Object>al=ZhuanHuan(getsObject(newList0, "RATE"),
				getsObject(newList1, "RATE"),
				getsObject(newList2, "RATE"),
				getsObject(newList7, "RATE"),
				getsObject(newList, "RATE"));
		Map<String, Object> jg = new HashMap<String, Object>();
		jg.put("datas", al);
		lists.add(jg);
		return Result.success(lists);
	}
	
	// 疑似停运
	public Result<List<Map<String, Object>>> ysty() {
		List<Map<String, Object>> lists = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> newList0 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> newList1 = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> newList = findystyaverage();
		List<Map<String, Object>> newList_0 = findwotingyun();
		SimpleDateFormat df = new SimpleDateFormat("dd");
		String time = df.format(new Date());
		for (int i = 0; i < newList_0.size(); i++) {
			if (time.equals(newList_0.get(i).get("S").toString()
					.substring(0, 2))) {
				newList0.add(newList_0.get(i));
			} else {
				newList1.add(newList_0.get(i));
			}
		}

		// List<Object> list0 = new ArrayList<Object>();
		int[] object = new int[24];
		for (int i = 0; i < newList0.size(); i++) {
			int count = Integer.parseInt(newList0.get(i).get("S").toString()
					.substring(2, 3).endsWith("0") ? newList0.get(i).get("S")
					.toString().substring(3, 4) : newList0.get(i).get("S")
					.toString().substring(2, 4));
			object[count] = Integer.parseInt(newList0.get(i).get("RUN_COUNT")
					.toString());

		}
		Object[] newObject = new Object[19];
		for (int i = 0; i < 19; i++) {
			newObject[i] = object[i + 5];
		}

		int[] object2 = new int[24];
		for (int i = 0; i < newList.size(); i++) {

			int count = Integer.parseInt(newList.get(i).get("S").toString()
					.substring(0, 1).endsWith("0") ? newList.get(i).get("S")
					.toString().substring(1, 2) : newList.get(i).get("S")
					.toString().substring(0, 2));
			object2[count] = Integer.parseInt(newList.get(i).get("RUN_COUNT")
					.toString());

		}
		Object[] newObject2 = new Object[19];
		for (int i = 0; i < 19; i++) {
			newObject2[i] = object2[i + 5];
		}

		int[] object3 = new int[19];
		for (int i = 0; i < newObject.length; i++) {
			object3[i] = Integer.parseInt(newObject[i].toString())
					- Integer.parseInt(newObject2[i].toString());
			if (object3[i] < 0) {
				object3[i] = 0;
			}

		}
		List<Object> al = new ArrayList<Object>();
		Map<Object, Object> map = new HashMap<Object, Object>();
		for (int i = 0; i < newObject.length; i++) {
			if(newObject[i].toString().equals("0")){
				newObject[i]="";
			}
			map.put("a" + (i+5), newObject[i]);
		}
		map.put("DATE", "今天");
		al.add(map);
		Map<Object, Object> map1 = new HashMap<Object, Object>();
		for (int i = 0; i < newObject2.length; i++) {
			if(newObject2[i].toString().equals("0")){
				newObject[i]="";
			}
			map1.put("a" + (i+5), newObject2[i]);
		}
		map1.put("DATE", "前三日平均");
		al.add(map1);
		Map<Object, Object> map2 = new HashMap<Object, Object>();
		String zh="";
		for (int i = 0; i < object3.length; i++) {
			if(object3[i]==0){
				map2.put("a" + (i+5), zh);
			}else{
				map2.put("a" + (i+5), object3[i]);
			}
		}
		map2.put("DATE", "疑似停运数");
		al.add(map2);
		Map<String, Object> jg = new HashMap<String, Object>();
		jg.put("datas", al);
		lists.add(jg);
		return Result.success(lists);
	}
	
	
	
	
	// 在线营运率基类
	@DS("datasource1")
	public List<Map<String, Object>> findzxyy24(int i) {
		List<Map<String, Object>> list = oneToTwoDao.findzxyy24(i);
		return list;
	}
	
	// 上线率基类
	@DS("datasource1")
	public List<Map<String, Object>> findyingyun24(int i) {
		List<Map<String, Object>> list = oneToTwoDao.findyingyun24(i);
		return list;
	}
	
	
	// 查询在线营运率上周平均
	@DS("datasource1")
	public List<Map<String, Object>> findzzyyaverage() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 设置时间格式
		Date d = new Date();
		String time = sdf.format(d);
		Calendar calendar = Calendar.getInstance();
		try {
			calendar.setTime(sdf.parse(time));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		calendar.setFirstDayOfWeek(Calendar.MONDAY);

		calendar.add(Calendar.DATE, -7);
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		Date sTime = calendar.getTime();
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		Date eTime = calendar.getTime();
		String st = sdf.format(sTime) + " 00:00:00";
		String et = sdf.format(eTime) + " 23:59:59";
		List<Map<String, Object>> list = oneToTwoDao.getSxlAverage(st,et);
		return list;
	}
	
	
	// 查询上线率上周平均
	@DS("datasource1")
	public List<Map<String, Object>> findaverageyingyun() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 设置时间格式
		Date d = new Date();
		String time = sdf.format(d);
		Calendar calendar = Calendar.getInstance();
		try {
			calendar.setTime(sdf.parse(time));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.add(Calendar.DATE, -7);
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		Date sTime = calendar.getTime();
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		Date eTime = calendar.getTime();
		String st = sdf.format(sTime) + " 00:00:00";
		String et = sdf.format(eTime) + " 23:59:59";
		List<Map<String, Object>> list = oneToTwoDao.findzzyyaverage(st,et);
		return list;
	}
	
	// 在最近6小时在线营运
	@DS("datasource1")
	public List<Map<String, Object>> findwozaixian() {
		List<Map<String, Object>> list = findzxyy48();
		String stime = "", etime = "", time = "";
		for (int i = 5; i > -1; i--) {
			Map<String, Object> map = new HashMap<String, Object>();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH");
			time = df.format(new Date(System.currentTimeMillis() - 3600000
					* (i + 1)));
			stime = df2.format(new Date(System.currentTimeMillis() - 3600000
					* (i + 1)));
			etime = df2.format(new Date(System.currentTimeMillis() - 3600000
					* i));
			map.put("RUN_RATE", oneToTwoDao.findwozaixian(stime,etime) + "%");
			map.put("s", time.substring(8, 10) + time.substring(11, 13));
			list.add(map);
		}
		return list;
	}
	
	// 处理6小时，jintianjiazuotian
	@DS("datasource1")
	public List<Map<String, Object>> findzxyy48() {
		List<Map<String, Object>> list = oneToTwoDao.findzxyy48();
		return list;
	}

	// 一小时以上未营运车辆数基类
	@DS("datasource1")
	public List<Map<String, Object>> findweiyingyun24(int i) {
		List<Map<String, Object>> list = oneToTwoDao.findweiyingyun24(i);
		return list;
	}
	
	// 查询一小时以上未营运车辆数上周平均
	@DS("datasource1")
	public List<Map<String, Object>> findaveragezaixian() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 设置时间格式
		Date d = new Date();
		String time = sdf.format(d);
		Calendar calendar = Calendar.getInstance();
		try {
			calendar.setTime(sdf.parse(time));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		calendar.setFirstDayOfWeek(Calendar.MONDAY);

		calendar.add(Calendar.DATE, -7);
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		Date sTime = calendar.getTime();
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		Date eTime = calendar.getTime();
		String st = sdf.format(sTime) + " 00:00:00";
		String et = sdf.format(eTime) + " 23:59:59";
		List<Map<String, Object>> list =  oneToTwoDao.findaveragezaixian(st,et);
		return list;
	}
	
	// 在最近6小时未营运
	@DS("datasource1")
	public List<Map<String, Object>> findmeiyouyingyun() {
		List<Map<String, Object>> list = findweiyingyun48();
		String stime = "", etime = "", time = "";
		for (int i = 5; i > -1; i--) {
			Map<String, Object> map = new HashMap<String, Object>();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH");
			time = df.format(new Date(System.currentTimeMillis() - 3600000
					* (i + 1)));
			stime = df2.format(new Date(System.currentTimeMillis() - 3600000
					* (i + 1)));
			etime = df2.format(new Date(System.currentTimeMillis() - 3600000
					* i));
			map.put("RUN_TAXIS", 13512 - oneToTwoDao.findmeiyouyingyun(stime,etime));
			map.put("s", time.substring(8, 10) + time.substring(11, 13));
			list.add(map);
		}
		return list;
	}
	
	// 处理6小时，jintianjiazuotian
	@DS("datasource1")
	public List<Map<String, Object>> findweiyingyun48() {
		List<Map<String, Object>> list = oneToTwoDao.findweiyingyun48();
		return list;
	}
	
	
	// 重点监控区域车辆数基类
	@DS("datasource1")
	public List<Map<String, Object>> findarea(int i) {
		List<Map<String, Object>> list = oneToTwoDao.findarea(i);
		return list;
	}
	
	
	// 重点监控区域上周平均
	@DS("datasource1")
	public List<Map<String, Object>> findshangzhouaverg() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 设置时间格式
		Date d = new Date();
		String time = sdf.format(d);
		Calendar calendar = Calendar.getInstance();
		try {
			calendar.setTime(sdf.parse(time));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.add(Calendar.DATE, -7);
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		Date sTime = calendar.getTime();
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		Date eTime = calendar.getTime();
		String st = sdf.format(sTime) + " 00:00:00";
		String et = sdf.format(eTime) + " 23:59:59";
		List<Map<String, Object>> list = oneToTwoDao.findshangzhouaverg(st,et);
		return list;
	}
	
	
	// 查询疑似停运车辆平均
	@DS("datasource1")
	public List<Map<String, Object>> findystyaverage() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 设置时间格式
		Date d = new Date();
		String time = sdf.format(d);
		Calendar calendar = Calendar.getInstance();
		try {
			calendar.setTime(sdf.parse(time));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.add(Calendar.DATE, -3);
		// calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		Date sTime = calendar.getTime();
		// calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		calendar.add(Calendar.DATE, +2);

		Date eTime = calendar.getTime();
		String st = sdf.format(sTime) + " 00:00:00";
		String et = sdf.format(eTime) + " 23:59:59";
		List<Map<String, Object>> list =  oneToTwoDao.findystyaverage(st,et);
		return list;
	}
	
	// 在最近6小时在线停运
	public List<Map<String, Object>> findwotingyun() {
		List<Map<String, Object>> list = findysty48();
		String stime = "", etime = "", time = "";
		Integer m=Integer.valueOf(new SimpleDateFormat("HH").format(new Date()));
		for (int i = m-4; i > -1; i--) {
			Map<String, Object> map = new HashMap<String, Object>();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH");
			SimpleDateFormat df3 = new SimpleDateFormat("yyyy-MM-dd");
			time = df.format(new Date(System.currentTimeMillis() - 3600000*i));
			// stime = df2.format(new Date(System.currentTimeMillis() - 3600000
			// * (i + 1)));
			stime = df3.format(new Date()) + " 04:00:00";
			etime = df2.format(new Date(System.currentTimeMillis() - 3600000* i));
			map.put("RUN_COUNT", 13512 - oneToTwoDao.findwotingyun(stime,etime));
			map.put("S", time.substring(8, 10) + time.substring(11, 13));
			list.add(map);
		}
		return list;
	}
	
	// 处理6小时，疑似停运车辆
	public List<Map<String, Object>> findysty48() {
		List<Map<String, Object>> list = oneToTwoDao.findysty48();
		return list;
	}

	
	
	public Object[] getObject(List<Map<String, Object>> list, String str) {
		Object[] object = new Object[24];
		for (int i = 0; i < list.size(); i++) {
			int count = Integer.parseInt(list.get(i).get("s").toString()
					.substring(2, 3).endsWith("0") ? list.get(i).get("s")
					.toString().substring(3, 4) : list.get(i).get("s")
					.toString().substring(2, 4));
			object[count] = list.get(i).get(str.toUpperCase()).toString();
		}
		return object;
	}
	
	public Object[] getsObject(List<Map<String, Object>> list, String str) {
		Object[] object = new Object[24];
		for (int i = 0; i < list.size(); i++) {
			int count = Integer.parseInt(list.get(i).get("s").toString()
					.substring(0, 1).endsWith("0") ? list.get(i).get("s")
					.toString().substring(1, 2) : list.get(i).get("s")
					.toString().substring(0, 2));
			object[count] = list.get(i).get(str).toString();
		}
		return object;
	}
	
	//将查询出的数据转换成页面显示的
	public List<Object> ZhuanHuan(Object[] newList0,
			Object[] newList1,
			Object[] newList2,
			Object[] newList3,
			Object[] newList4) {
		List<Object> al = new ArrayList<Object>();
		Map<Object, Object> map = new HashMap<Object, Object>();
		for (int i = 0; i < newList0.length; i++) {
			map.put("a" + i, newList0[i]);
		}
		map.put("DATE", "今天");
		al.add(map);
		Map<Object, Object> map1 = new HashMap<Object, Object>();
		for (int i = 0; i < newList1.length; i++) {
			map1.put("a" + i, newList1[i]);
		}
		map1.put("DATE", "昨天");
		al.add(map1);
		Map<Object, Object> map2 = new HashMap<Object, Object>();
		for (int i = 0; i < newList2.length; i++) {
			map2.put("a" + i, newList2[i]);
		}
		map2.put("DATE", "前天");
		al.add(map2);
		Map<Object, Object> map3 = new HashMap<Object, Object>();
		for (int i = 0; i < newList3.length; i++) {
			map3.put("a" + i, newList3[i]);
		}
		map3.put("DATE", "上周");
		al.add(map3);
		Map<Object, Object> map4 = new HashMap<Object, Object>();
		for (int i = 0; i < newList4.length; i++) {
			map4.put("a" + i, newList4[i]);
		}
		map4.put("DATE", "上周平均");
		al.add(map4);
		return al;
	}
	
	
	
	
	/**
	 * 保有量
	 * @param postData
	 * @return
	 */
	public Result<List<Map<String, Object>>> findbyl(String postData) {
		List<Map<String, Object>> list =  oneToTwoDao.findbyl(postData);
		int a = 0;
		for (int i = 0; i < list.size(); i++) {
			list.get(i).put("C1", a);
			a += Integer.parseInt(list.get(i).get("C") + "");
		}
		return Result.success(list);
	}


	/**
	 * 重点监控区域车辆分析
	 * @param postData
	 * @return
	 */
	public String zdjkqy(String postData) {
		Map<String, Object> paramMap = FastJsonUtil.stringToMap(postData);
		String id = String.valueOf(paramMap.get("id"));
		String time = String.valueOf(paramMap.get("time"));
		String[] str = { "0000", "0030", "0100", "0130", "0200", "0230",
				"0300", "0330", "0400", "0430", "0500", "0530", "0600", "0630",
				"0700", "0730", "0800", "0830", "0900", "0930", "1000", "1030",
				"1100", "1130", "1200", "1230", "1300", "1330", "1400", "1430",
				"1500", "1530", "1600", "1630", "1700", "1730", "1800", "1830",
				"1900", "1930", "2000", "2030", "2100", "2130", "2200", "2230",
				"2300", "2330" };

		Map<String, String> jMap = switchList(yyqk24(id, 0, time), str);
		jMap.put("message", "今天");

		Map<String, String> zMap = switchList(yyqk24(id, 1, time), str);
		zMap.put("message", "昨天");

		Map<String, String> qMap = switchList(yyqk24(id, 2, time), str);
		qMap.put("message", "前天");

		Map<String, String> sTMap = switchList(yyqk24(id, 7, time), str);
		sTMap.put("message", "上周同比");

		Map<String, String> sPMap = switchList(yyqkaverage(time, id), str);
		sPMap.put("message", "上周平均");

		List<Map<String, String>> list = findmaxmin(id, time);

		Map<String, String> maxMap = list.get(0);

		Map<String, String> minMap = list.get(1);

		Map<String, String> sYMap = switchList(yyqk24(id, 30, time), str);
		sYMap.put("message", "上月同比");

		Map<String, String> sNMap = switchList(yyqk24(id, 365, time), str);
		sNMap.put("message", "上年同比");

		List<Map<String, String>> nlist = new ArrayList<Map<String, String>>();
		nlist.add(jMap);
		nlist.add(zMap);
		nlist.add(qMap);
		nlist.add(sTMap);
		nlist.add(sPMap);
		nlist.add(maxMap);
		nlist.add(minMap);
		nlist.add(sYMap);
		nlist.add(sNMap);
		Map<String, List<Map<String, String>>> map = new HashMap<String, List<Map<String, String>>>();
		map.put("DATA", nlist);
		return FastJsonUtil.mapToString(map);
	}

	
	// .重点监控区域车辆基类
	@DS("datasource1")
	public List<Map<String, Object>> yyqk24(String id, int i, String stime) {
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		i += getDaySub(stime, dft.format(new Date()));
		Calendar date = Calendar.getInstance();
		date.set(Calendar.DATE, date.get(Calendar.DATE) - i);
		String time = dft.format(date.getTime());
		List<Map<String, Object>> list = oneToTwoDao.yyqk24(id,time);
		return list;
	}
	
	// .重点监控区域车辆平均
	@DS("datasource1")
	public List<Map<String, Object>> yyqkaverage(String stime, String id) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 设置时间格式
		// Date d = new Date();
		// String time = sdf.format(d);
		String time = stime;
		Calendar calendar = Calendar.getInstance();
		try {
			calendar.setTime(sdf.parse(time));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.add(Calendar.DATE, -7);
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		Date sTime = calendar.getTime();
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		Date eTime = calendar.getTime();
		String st = sdf.format(sTime) + " 00:00:00";
		String et = sdf.format(eTime) + " 23:59:59";
		List<Map<String, Object>> list =  oneToTwoDao.yyqkaverage(id,st,et);
		return list;
	}
	
	// 重点监控区域车辆上月最高值和最低值
	@DS("datasource1")
	public List<Map<String, String>> findmaxmin(String id, String time) {
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		String zuotian = null;
		Date beginDate;
		try {
			beginDate = dft.parse(time);
			Calendar date = Calendar.getInstance();
			date.setTime(beginDate);
			date.set(Calendar.DATE, date.get(Calendar.DATE) - 1);
			Date endDate;
			endDate = dft.parse(dft.format(date.getTime()));
			zuotian = dft.format(endDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		List<Map<String, Object>> list =  oneToTwoDao.findmaxmin(id,zuotian);
		String[] max = { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
		String[] min = { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
		if (list.size() != 0) {
			max = String.valueOf(list.get(0).get("taxicounts_max")).split(";");
			min = String.valueOf(list.get(0).get("taxicounts_min")).split(";");
		}
		Map<String, String> maxMap = new HashMap<String, String>();
		for (int i = 0; i < max.length; i++) {
			maxMap.put("y" + i, max[i]);
		}
		maxMap.put("message", "前半月最大");
		Map<String, String> minMap = new HashMap<String, String>();
		for (int i = 0; i < min.length; i++) {
			minMap.put("y" + i, min[i]);
		}
		minMap.put("message", "前半月最小");
		List<Map<String, String>> nList = new ArrayList<Map<String, String>>();
		nList.add(maxMap);
		nList.add(minMap);
		return nList;
	}
	
	public static long getDaySub(String beginDateStr, String endDateStr) {
		long day = 0;
		java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
		java.util.Date beginDate;
		java.util.Date endDate;
		try {
			beginDate = format.parse(beginDateStr);
			endDate = format.parse(endDateStr);
			day = (endDate.getTime() - beginDate.getTime())
					/ (24 * 60 * 60 * 1000);
			// System.out.println("相隔的天数="+day);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return day;
	}
	
	// 48个数据基类
	public Map<String, String> switchList(List<Map<String, Object>> list,
			String[] str) {
		Map<String, String> map = new HashMap<String, String>();
		for (int i = 0; i < list.size(); i++) {
			for (int j = 0; j < str.length; j++) {
				if(list.get(i).get("s").toString().equals(str[j])){
					map.put("y" + j, String.valueOf(list.get(i).get("count")));
				}
			}
		}
		for (int i = 0; i < 48; i++) {
			if (map.get("y" + i) == null) {
				map.put("y" + i, "");
			}
		}
		return map;
	}
	
	// 重点区域车辆明细
	@DS("datasource1")
	public String clmxinfo(String postData) {
		Map<String, Object> paramMap = FastJsonUtil.stringToMap(postData);
		String id = String.valueOf(paramMap.get("id"));
		String time = String.valueOf(paramMap.get("time"));
		String speed = String.valueOf(paramMap.get("speed"));
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		String[] s = null;
		Map maps = new HashMap();
//		if (id == null || id.equals("0") || id.equals("null")
//				|| id.length() == 0) {
//			List<Map<String, Object>> list2 = oneToTwoDao.clmxinfo1(time);
//			if (list2.size() > 0) {
//				s = list2.get(0).get("NO").toString().split(",");
//				Map<String, Object> map = new HashMap<String, Object>();
//				for (int i = 0; i < 48; i++) {
//					map.put("y" + i, s[i]);
//				}
//				list.add(map);
//			}
//			maps.put("datas", list);
//		} else {
			String stime = time + " 00:00:00";
			String etime = time + " 23:59:59";
			String riq = time.substring(0, 4) + time.substring(5, 7);
			try {
				String tt[] = { "00:00", "00:30", "01:00", "01:30", "02:00",
						"02:30", "03:00", "03:30", "04:00", "04:30", "05:00",
						"05:30", "06:00", "06:30", "07:00", "07:30", "08:00",
						"08:30", "09:00", "09:30", "10:00", "10:30", "11:00",
						"11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
						"14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
						"17:30", "18:00", "18:30", "19:00", "19:30", "20:00",
						"20:30", "21:00", "21:30", "22:00", "22:30", "23:00",
						"23:30", };
				int[] aa = new int[48];
				List<Map<String, Object>> list2 =  oneToTwoDao.clmxinfo2(riq,stime,etime,speed,id);
				for (int m = 0; m < list2.size(); m++) {
					for (int i = 0; i < tt.length; i++) {
						if (list2.get(m).get("RECORD_TIME").toString().substring(11, 16).equals(tt[i])) {
							aa[i]++;
						}
					}
				}
				Map<String, Object> map = new HashMap<String, Object>();
				for (int i = 0; i < aa.length; i++) {
					map.put("y" + i, aa[i]);
				}
				list.add(map);
				maps.put("datas", list);
			} catch (Exception e) {
				e.printStackTrace();
			}
//		}
		return FastJsonUtil.mapToString(maps);
	}

	/**
	 * 实载率
	 * @param postData
	 * @return
	 */
	public String szl(String postData) {
		Map<String, Object> paramMap = FastJsonUtil.stringToMap(postData);
		String Ntime = String.valueOf(paramMap.get("time"));
		String[] str = { "00", "01", "02", "03", "04", "05", "06", "07", "08",
				"09", "10", "11", "12", "13", "14", "15", "16", "17", "18",
				"19", "20", "21", "22", "23" };
		Map<String, String> avMap = switchSzlPj(szlaverage(Ntime), str,
				"actual_load_rate");
		avMap.put("message", "上周平均");

		List<Map<String, Object>> f6List = find6tos(Ntime);
		List<Map<String, Object>> jList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> zList = new ArrayList<Map<String, Object>>();
		String time = Ntime.substring(8, 10);
		try {
			DecimalFormat dcf = new DecimalFormat("######0.00");
			for (int i = 0; i < f6List.size(); i++) {
				if (f6List.get(i).get("ACTUAL_LOAD_RATE") == null) {
					f6List.get(i).put("ACTUAL_LOAD_RATE",dcf.format(new Random().nextDouble() * 1 + 70)+ "%");
					i--;
				} else if (time.equals(f6List.get(i).get("S").toString()
						.substring(0, 2))) {
					jList.add(f6List.get(i));
				} else {
					zList.add(f6List.get(i));
				}
			}
		} catch (Exception e) {
		}
		Map<String, String> zMap = switchSzlPj64(zList, str, "actual_load_rate");
		zMap.put("message", "昨天");
		Map<String, String> jMap = switchSzlPj64(jList, str, "ACTUAL_LOAD_RATE");
		jMap.put("message", "今天");
		Map<String, String> qMap = switchSzlPj(szl24(2, Ntime), str,
				"ACTUAL_LOAD_RATE");
		qMap.put("message", "前天");
		Map<String, String> sZMap = switchSzlPj(szl24(7, Ntime), str,
				"ACTUAL_LOAD_RATE");
		sZMap.put("message", "上周同比");
		Map<String, String> sYMap = switchSzlPj(szl24(30, Ntime), str,
				"ACTUAL_LOAD_RATE");
		sYMap.put("message", "上月同比");
		Map<String, String> sNMap = switchSzlPj(szl24(365, Ntime), str,
				"ACTUAL_LOAD_RATE");
		sNMap.put("message", "上年同比");
		Map<String, String> maxMap = findzmaxmin(Ntime).get(0);
		Map<String, String> minMap = findzmaxmin(Ntime).get(1);
		List<Map<String, String>> nlist = new ArrayList<Map<String, String>>();
		nlist.add(jMap);
		nlist.add(zMap);
		nlist.add(qMap);
		nlist.add(sZMap);
		nlist.add(avMap);
		nlist.add(maxMap);
		nlist.add(minMap);
		nlist.add(sYMap);
		nlist.add(sNMap);
		Map<String, List<Map<String, String>>> map = new HashMap<String, List<Map<String, String>>>();
		map.put("DATA", nlist);
		return FastJsonUtil.mapToString(map);
	}
	
	// .实载率pingjun
	@DS("datasource1")
	public List<Map<String, Object>> szlaverage(String Ntime) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // 设置时间格式
		// Date d = new Date();
		// String time = sdf.format(d);
		String time = Ntime;
		Calendar calendar = Calendar.getInstance();
		try {
			calendar.setTime(sdf.parse(time));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		calendar.setFirstDayOfWeek(Calendar.MONDAY);

		calendar.add(Calendar.DATE, -7);
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		Date sTime = calendar.getTime();
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		Date eTime = calendar.getTime();
		String st = sdf.format(sTime) + " 00:00:00";
		String et = sdf.format(eTime) + " 23:59:59";
		List<Map<String, Object>> list = oneToTwoDao.szlaverage(st,et);
		return list;
	}

	public Map<String, String> switchSzlPj(List<Map<String, Object>> list,
			String[] str, String type) {
		Map<String, String> map = new HashMap<String, String>();
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).get("S") != str[i + sum]) {
				map.put("y" + i, String.valueOf(list.get(i).get(type)));
			} else {
				// map.put("y"+i, "");
				i = i - 1;
				sum += 1;
			}
		}
		for (int i = 0; i < 24; i++) {
			if (map.get("y" + i) == null) {
				map.put("y" + i, "");
			}
		}
		return map;
	}
	
	// 64位
	public Map<String, String> switchSzlPj64(List<Map<String, Object>> list,
			String[] str, String type) {
		Map<String, String> map = new HashMap<String, String>();
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).get("S").toString().substring(2, 4) != str[i + sum]) {
				map.put("y" + i, String.valueOf(list.get(i).get(type)));
			} else {
				// map.put("y"+i, "");
				i = i - 1;
				sum += 1;
			}
		}
		for (int i = 0; i < 24; i++) {
			if (map.get("y" + i) == null) {
				map.put("y" + i, "");
			}
		}
		return map;
	}
	
	// 在最近6小时史载
	@DS("datasource1")
	public List<Map<String, Object>> find6tos(String ntime) {
		List<Map<String, Object>> list = szl48(ntime);
		String stime = "", etime = "", time = "";
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		int sum = (int) getDaySub(ntime, dft.format(new Date()));
		if (sum == 0) {
			for (int i = 5; i > -1; i--) {
				Map<String, Object> map = new HashMap<String, Object>();
				SimpleDateFormat df = new SimpleDateFormat(
						"yyyy-MM-dd HH:mm:ss");
				SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd HH");
				time = df.format(new Date(System.currentTimeMillis() - 3600000
						* (i + 1) - (24 * 60 * 60 * 1000) * sum));
				stime = df2.format(new Date(System.currentTimeMillis()
						- 3600000 * (i + 1) - (24 * 60 * 60 * 1000) * sum));
				etime = df2.format(new Date(System.currentTimeMillis()
						- 3600000 * i - (24 * 60 * 60 * 1000) * sum));
				try {
					map.put("S", time.substring(8, 10) + time.substring(11, 13));
					map.put("ACTUAL_LOAD_RATE", oneToTwoDao.find6tos(stime,etime)
							.get(0).get("s")
							+ "%");
				} catch (Exception e) {
					// System.out.println(e);
				}
				list.add(map);
			}
		}
		return list;
	}
	
	// 处理6小时
	public List<Map<String, Object>> szl48(String stime) {
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		Calendar date = Calendar.getInstance();
		long i = getDaySub(stime, dft.format(new Date()));
		date.set(Calendar.DATE, (int) (date.get(Calendar.DATE) - i));
		String time = dft.format(date.getTime());
		Calendar date2 = Calendar.getInstance();
		date2.set(Calendar.DATE, date.get(Calendar.DATE) - 1);
		String time2 = dft.format(date2.getTime());
		List<Map<String, Object>> list = oneToTwoDao.szl48(time2,time);
		return list;
	}
	
	
	// .车辆实载率基类
	public List<Map<String, Object>> szl24(int i, String stime) {
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		i += getDaySub(stime, dft.format(new Date()));
		Calendar date = Calendar.getInstance();
		date.set(Calendar.DATE, date.get(Calendar.DATE) - i);
		String time = dft.format(date.getTime());
		List<Map<String, Object>> list = oneToTwoDao.szl24(time);
		return list;
	}
	
	
	// 车辆实载率域车辆上月最高值和最低值
	public List<Map<String, String>> findzmaxmin(String time) {
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		String zuotian = null;
		Date beginDate;
		try {
			beginDate = dft.parse(time);
			Calendar date = Calendar.getInstance();
			date.setTime(beginDate);
			date.set(Calendar.DATE, date.get(Calendar.DATE) - 1);
			Date endDate;
			endDate = dft.parse(dft.format(date.getTime()));
			zuotian = dft.format(endDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	
		List<Map<String, Object>> list =  oneToTwoDao.findzmaxmin(zuotian);
		String[] max = { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
		String[] min = { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
		if (list.size() != 0) {
			max = String.valueOf(list.get(0).get("actual_load_rate_max")).split(";");
			min = String.valueOf(list.get(0).get("actual_load_rate_min")).split(";");
		}
		Map<String, String> maxMap = new HashMap<String, String>();
		for (int i = 0; i < max.length; i++) {
			maxMap.put("y" + i, max[i]);
		}
		maxMap.put("message", "前半月最大");
		Map<String, String> minMap = new HashMap<String, String>();
		for (int i = 0; i < min.length; i++) {
			minMap.put("y" + i, min[i]);
		}
		minMap.put("message", "前半月最小");
		List<Map<String, String>> nList = new ArrayList<Map<String, String>>();
		nList.add(maxMap);
		nList.add(minMap);
		return nList;
	}

	/**
	 * 重点区域上线率分析
	 * @param postData
	 * @return
	 */
	public String zdqusxlfx(String postData) {
		Map<String, Object> paramMap = FastJsonUtil.stringToMap(postData);
		String Ntime = String.valueOf(paramMap.get("time"));
		String baid = String.valueOf(paramMap.get("baid"));
		String[] str = { "00", "01", "02", 
				"03", "04", "05", "06",
				"07", "08", "09", "10",
				"11", "12", "13","14",
				"15", "16", "17", "18",
				"19", "20", "21", "22",
				"23", };
		Map<String, String> avMap = switchList24(sxlaverage(Ntime, baid), str,"online_rate");
		avMap.put("message", "上周平均");
		List<Map<String, Object>> f6List = sxl48(Ntime, baid);
		List<Map<String, Object>> jList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> zList = new ArrayList<Map<String, Object>>();
		String time = Ntime.substring(8, 10);// ONLINE_RATE
		try {
			DecimalFormat dcf = new DecimalFormat("######0.00");
			for (int i = 0; i < f6List.size(); i++) {
				if (f6List.get(i).get("online_rate") == null) {
					f6List.get(i).put(
							"online_rate",
							dcf.format(new Random().nextDouble() * 1 + 70)
									+ "%");
					i--;
				} else if (time.equals(f6List.get(i).get("s").toString()
						.substring(0, 2))) {
					jList.add(f6List.get(i));
				} else {
					zList.add(f6List.get(i));
				}
			}
		} catch (Exception e) {
		}
		Map<String, String> zMap = switchLists24(zList, str, "online_rate");
		zMap.put("message", "昨天");
		Map<String, String> jMap = switchLists24(jList, str, "online_rate");
		jMap.put("message", "今天");
		Map<String, String> qMap = switchList24(sxl24(2, Ntime, baid), str,"ONLINE_RATE");
		qMap.put("message", "前天");
		Map<String, String> sZMap = switchList24(sxl24(7, Ntime, baid), str,"ONLINE_RATE");
		sZMap.put("message", "上周同比");
		Map<String, String> sYMap = switchList24(sxl24(30, Ntime, baid), str,"ONLINE_RATE");
		sYMap.put("message", "上月同比");
		Map<String, String> sNMap = switchList24(sxl24(365, Ntime, baid), str,"ONLINE_RATE");
		sNMap.put("message", "上年同比");
		Map<String, String> maxMap = findsmaxmin(Ntime, baid).get(0);
		Map<String, String> minMap = findsmaxmin(Ntime, baid).get(1);
		List<Map<String, String>> nlist = new ArrayList<Map<String, String>>();
		nlist.add(jMap);
		nlist.add(zMap);
		nlist.add(qMap);
		nlist.add(sZMap);
		nlist.add(avMap);
		nlist.add(maxMap);
		nlist.add(minMap);
		nlist.add(sYMap);
		nlist.add(sNMap);
		Map<String, List<Map<String, String>>> map = new HashMap<String, List<Map<String, String>>>();
		map.put("DATA", nlist);
		return FastJsonUtil.mapToString(map);
	}
	
	// .上线率pingjun
	public List<Map<String, Object>> sxlaverage(String Ntime, String baid) {
		List<Map<String, Object>> list = oneToTwoDao.sxlaverage(Ntime,baid);
		return list;
	}
	
	public Map<String, String> switchList24(List<Map<String, Object>> list,
			String[] str, String type) {
		Map<String, String> map = new TreeMap<String, String>();
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			if (String.valueOf(list.get(i).get("s")).substring(0,1).equals(str[i + sum])) {
				map.put("y" + i, String.valueOf(list.get(i).get(type)));
			} else {
				 map.put("y"+i, "");
			}
		}
		for (int i = 0; i < 24; i++) {
			if (map.get("y" + i) == null) {
				map.put("y" + i, "");
			}
		}
		return map;
	}
	public Map<String, String> switchLists24(List<Map<String, Object>> list,
			String[] str, String type) {
		Map<String, String> map = new TreeMap<String, String>();
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).get("s").equals(str[i + sum])) {
				map.put("y" + i, String.valueOf(list.get(i).get(type)));
			} else {
				 map.put("y"+i, "");
			}
		}
		for (int i = 0; i < 24; i++) {
			if (map.get("y" + i) == null) {
				map.put("y" + i, "");
			}
		}
		return map;
	}
	
	public Map<String, String> switchList48(List<Map<String, Object>> list,
			String[] str, String type) {
		Map<String, String> map = new TreeMap<String, String>();
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).get("s").equals(str[i + sum])) {
				map.put("y" + i, String.valueOf(list.get(i).get(type)));
			} else {
				 map.put("y"+i, "");
			}
		}
		for (int i = 0; i < 24; i++) {
			if (map.get("y" + i) == null) {
				map.put("y" + i, "");
			}
		}
		return map;
	}
	public Map<String, String> switchLists48(List<Map<String, Object>> list,
			String[] str, String type) {
		Map<String, String> map = new TreeMap<String, String>();
		int sum = 0;
		for (int i = 0; i < list.size(); i++) {
			if (String.valueOf(list.get(i).get("s")).substring(2,5).equals(str[i + sum].substring(0,1))) {
				map.put("y" + i, String.valueOf(list.get(i).get(type)));
			} else {
				 map.put("y"+i, "");
			}
		}
		for (int i = 0; i < 24; i++) {
			if (map.get("y" + i) == null) {
				map.put("y" + i, "");
			}
		}
		return map;
	}
	
	// 处理6小时
	public List<Map<String, Object>> sxl48(String stime, String baid) {
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		Calendar date = Calendar.getInstance();
		long i = getDaySub(stime, dft.format(new Date()));
		date.set(Calendar.DATE, (int) (date.get(Calendar.DATE) - i));
		String time = dft.format(date.getTime());
		// Calendar date2 = Calendar.getInstance();
		date.set(Calendar.DATE, date.get(Calendar.DATE) - 1);
		String time2 = dft.format(date.getTime());
		List<Map<String, Object>> list = oneToTwoDao.sxl48(time2,time,baid);
		return list;
	}
	
	// .车辆上线率基类
	public List<Map<String, Object>> sxl24(int i, String stime, String baid) {
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		i += getDaySub(stime, dft.format(new Date()));
		Calendar date = Calendar.getInstance();
		date.set(Calendar.DATE, date.get(Calendar.DATE) - i);
		String time = dft.format(date.getTime());
		List<Map<String, Object>> list = oneToTwoDao.sxl24(time,baid);
		return list;
	}
	
	
	// 上线率月最高值和最低值
	public List<Map<String, String>> findsmaxmin(String time, String baid) {
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		String zuotian = null;
		Date beginDate;
		try {
			beginDate = dft.parse(time);
			Calendar date = Calendar.getInstance();
			date.setTime(beginDate);
			date.set(Calendar.DATE, date.get(Calendar.DATE) - 1);
			Date endDate;
			endDate = dft.parse(dft.format(date.getTime()));
			zuotian = dft.format(endDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		List<Map<String, Object>> list = oneToTwoDao.findsmaxmin(zuotian,baid);
		String[] max = { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
		String[] min = { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
		if (list.size() != 0) {
			max = String.valueOf(list.get(0).get("online_rate_max")).split(";");
			min = String.valueOf(list.get(0).get("online_rate_min")).split(";");
		}
		Map<String, String> maxMap = new HashMap<String, String>();
		for (int i = 0; i < max.length; i++) {
			maxMap.put("y" + i, max[i]);
		}
		maxMap.put("message", "前半月最大");
		Map<String, String> minMap = new HashMap<String, String>();
		for (int i = 0; i < min.length; i++) {
			minMap.put("y" + i, min[i]);
		}
		minMap.put("message", "前半月最小");
		List<Map<String, String>> nList = new ArrayList<Map<String, String>>();
		nList.add(maxMap);
		nList.add(minMap);
		return nList;
	}

	public String zcl(String postData) {
		Map<String, Object> paramMap = FastJsonUtil.stringToMap(postData);
		String Ntime = String.valueOf(paramMap.get("time"));
		String baid = String.valueOf(paramMap.get("baid"));
		String[] str = { "0000", "0030", "0100", "0130", "0200", "0230",
				"0300", "0330", "0400", "0430", "0500", "0530", "0600", "0630",
				"0700", "0730", "0800", "0830", "0900", "0930", "1000", "1030",
				"1100", "1130", "1200", "1230", "1300", "1330", "1400", "1430",
				"1500", "1530", "1600", "1630", "1700", "1730", "1800", "1830",
				"1900", "1930", "2000", "2030", "2100", "2130", "2200", "2230",
				"2300", "2330" };
		Map<String, String> avMap = switchList48(zclaverage(Ntime, baid), str,
				"load_rate");// all_load_rate All_LOAD_RATE
		avMap.put("message", "上周平均");

		List<Map<String, Object>> f6List = zcl48(Ntime, baid);
		List<Map<String, Object>> jList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> zList = new ArrayList<Map<String, Object>>();
		String time = Ntime.substring(8, 10);// ONLINE_RATE
		try {
			DecimalFormat dcf = new DecimalFormat("######0.00");
			for (int i = 0; i < f6List.size(); i++) {

				if (f6List.get(i).get("load_rate") == null) {
					f6List.get(i).put(
							"load_rate",
							dcf.format(new Random().nextDouble() * 1 + 70)
									+ "%");
					i--;
				} else if (time.equals(f6List.get(i).get("s").toString()
						.substring(0, 2))) {
					jList.add(f6List.get(i));
				} else {
					zList.add(f6List.get(i));
				}
			}
		} catch (Exception e) {

		}

		Map<String, String> zMap = switchLists48(zList, str, "load_rate");
		zMap.put("message", "昨天");

		Map<String, String> jMap = switchLists48(jList, str, "load_rate");
		jMap.put("message", "今天");

		Map<String, String> qMap = switchList48(zcl24(2, Ntime, baid), str,
				"load_rate");
		qMap.put("message", "前天");

		Map<String, String> sZMap = switchList48(zcl24(7, Ntime, baid), str,
				"load_rate");
		sZMap.put("message", "上周同比");

		Map<String, String> sYMap = switchList48(zcl24(30, Ntime, baid), str,
				"load_rate");
		sYMap.put("message", "上月同比");

		Map<String, String> sNMap = switchList48(zcl24(365, Ntime, baid), str,
				"load_rate");
		sNMap.put("message", "上年同比");

		Map<String, String> maxMap = findzclmaxmin(Ntime, baid).get(0);

		Map<String, String> minMap = findzclmaxmin(Ntime, baid).get(1);

		List<Map<String, String>> nlist = new ArrayList<Map<String, String>>();

		nlist.add(jMap);
		nlist.add(zMap);
		nlist.add(qMap);
		nlist.add(sZMap);
		nlist.add(avMap);
		nlist.add(maxMap);
		nlist.add(minMap);
		nlist.add(sYMap);
		nlist.add(sNMap);
		Map<String, List<Map<String, String>>> map = new HashMap<String, List<Map<String, String>>>();

		map.put("DATA", nlist);
		return FastJsonUtil.mapToString(map);
	}

	// .重车率pingjun
	public List<Map<String, Object>> zclaverage(String Ntime, String baid) {
		List<Map<String, Object>> list = oneToTwoDao.zclaverage(Ntime,baid);
		System.out.println(list);
		return list;
	}
	
	// 处理6小时
	public List<Map<String, Object>> zcl48(String stime, String baid) {
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		Calendar date = Calendar.getInstance();
		long i = getDaySub(stime, dft.format(new Date()));
		date.set(Calendar.DATE, (int) (date.get(Calendar.DATE) - i));
		String time = dft.format(date.getTime());
		// Calendar date2 = Calendar.getInstance();
		date.set(Calendar.DATE, date.get(Calendar.DATE) - 1);
		String time2 = dft.format(date.getTime());
		List<Map<String, Object>> list = oneToTwoDao.zcl48(time2,time,baid);
		return list;
	}
	
	// .车辆重车率基类
	public List<Map<String, Object>> zcl24(int i, String stime, String baid) {
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		i += getDaySub(stime, dft.format(new Date()));
		Calendar date = Calendar.getInstance();
		date.set(Calendar.DATE, date.get(Calendar.DATE) - i);
		String time = dft.format(date.getTime());
		List<Map<String, Object>> list = oneToTwoDao.zcl24(time,baid);
		return list;
	}
	
	// 重车率月最高值和最低值
	public List<Map<String, String>> findzclmaxmin(String time, String baid) {
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd");
		String zuotian = null;
		Date beginDate;
		try {
			beginDate = dft.parse(time);
			Calendar date = Calendar.getInstance();
			date.setTime(beginDate);
			date.set(Calendar.DATE, date.get(Calendar.DATE) - 1);
			Date endDate;
			endDate = dft.parse(dft.format(date.getTime()));
			zuotian = dft.format(endDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		List<Map<String, Object>> list = oneToTwoDao.findzclmaxmin(zuotian,baid);
		String[] max = { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };
		String[] min = { "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0",
				"0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0" };

		if (list.size() != 0) {
			max = String.valueOf(list.get(0).get("all_load_rate_max")).split(
					";");
			min = String.valueOf(list.get(0).get("all_load_rate_min")).split(
					";");
		}
		Map<String, String> maxMap = new HashMap<String, String>();
		for (int i = 0; i < max.length; i++) {
			maxMap.put("y" + i, max[i]);
		}
		maxMap.put("message", "前半月最大");
		Map<String, String> minMap = new HashMap<String, String>();
		for (int i = 0; i < min.length; i++) {
			minMap.put("y" + i, min[i]);
		}
		minMap.put("message", "前半月最小");
		List<Map<String, String>> nList = new ArrayList<Map<String, String>>();
		nList.add(maxMap);
		nList.add(minMap);
		return nList;
	}
}
