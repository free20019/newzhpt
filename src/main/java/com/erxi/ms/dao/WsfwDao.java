package com.erxi.ms.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultType;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;
import org.springframework.web.bind.annotation.RequestParam;

import com.erxi.ms.result.FastJsonUtil;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * 网上服务中的几个功能
 * @author xianlehuang
 * @date 2018/12/20 
 */

@Mapper
public interface WsfwDao {
	
	/**
	 * 下拉所有公司
	 * @return
	 */
	@Select("select distinct FGS from JJQ_COMPANY order by FGS")
	@ResultType(String.class)
	public List<Map<String, Object>> getAllComp();
	
	/**
	 * 下拉栏
	 * @param table
	 * @param field
	 * @return
	 */
	@Select("select distinct ${field} from ${table} where ${field} <> '0'")
	public List<Map<String, Object>> findxll(
			@Param("table")String table,
			@Param("field")String field);
	/**
	 * 车辆在线查询
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param company
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findclzxcx")
	public List<Map<String, Object>> findclzxcx(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("company")String company,
			@Param("pageIndex")Integer pageIndex, 
			@Param("pageSize")Integer pageSize);
	
	/**
	 * 车辆在线导出
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param company
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findclzxcxdc")
	public List<Map<String, Object>> findclzxcxdc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("company")String company);
	/**
	 * 分公司里程统计
	 * @param stime
	 * @param etime
	 * @param company
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findfgslctj")
	public List<Map<String, Object>> findfgslctj(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("company")String company,
			@Param("vehicle")String vehicle,
			@Param("pageIndex")Integer pageIndex, 
			@Param("pageSize")Integer pageSize);
	/**
	 *  分公司里程统计导出
	 * @param stime
	 * @param etime
	 * @param company
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findfgslctjdc")
	public List<Map<String, Object>> findfgslctjdc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("company")String company,
			@Param("vehicle")String vehicle);
	/**
	 * 司机营运数据分析
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param company
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findsjyysjfx")
	public List<Map<String, Object>> findsjyysjfx(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("company")String company,
			@Param("pageIndex")Integer pageIndex, 
			@Param("pageSize")Integer pageSize);
	
	/**
	 * 司机营运数据分析导出
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param company
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findsjyysjfxdc")
	public List<Map<String, Object>> findsjyysjfxdc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("company")String company);
	
	/**
	 * 企业营运数据分析
	 * @param stime
	 * @param etime
	 * @param company
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findqyyysjfx")
	public List<Map<String, Object>> findqyyysjfx(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("company")String company,
			@Param("pageIndex")Integer pageIndex, 
			@Param("pageSize")Integer pageSize);
	/**
	 * 企业营运数据分析导出
	 * @param stime
	 * @param etime
	 * @param company
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findqyyysjfxdc")
	public List<Map<String, Object>> findqyyysjfxdc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("company")String company);	
	/**
	 * 执法稽查信息
	 * @param stime
	 * @param etime
	 * @param event
	 * @param vehicle
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findzfjc")
	public List<Map<String, Object>> findzfjc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("event")String event,
			@Param("vehicle")String vehicle, 
			@Param("pageIndex")Integer pageIndex, 
			@Param("pageSize")Integer pageSize);
	
	/**
	 * 执法稽查信息导出
	 * @param stime
	 * @param etime
	 * @param event
	 * @param vehicle
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findzfjcdc")
	public List<Map<String, Object>> findzfjcdc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("event")String event,
			@Param("vehicle")String vehicle);
	
	/**
	 * 单车平均分析（今天，昨天）
	 * @param module
	 * @param i
	 * @param field1
	 * @param time
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "finddcpjfx")
	public List<Map<String, Object>> finddcpjfx(
			@Param("module") String module,
			@Param("i") Integer i,
			@Param("field1") String field1,
			@Param("time") String time);
	/**
	 * 单车平均分析（前天，上周，上月，上年）
	 * @param i
	 * @param field2
	 * @param time
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findday")
	public List<Map<String, Object>> findday(
			@Param("i") Integer i,
			@Param("field2") String field2,
			@Param("time") String time);
	/**
	 * 单车平均分析(上周平均)
	 * @param field2
	 * @param time
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findaverage")
	public List<Map<String, Object>> findaverage(
			@Param("field2") String field2,
			@Param("time") String time);
	/**
	 * 单车平均分析(上半月最大最小)
	 * @param field3
	 * @param time
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findmaxmin")
	public List<Map<String, Object>> findmaxmin(
			@Param("field3") String field3,
			@Param("time") String time);
	
	/**
	 * 服务质量综合评定
	 * @param postData
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findfwzlxx")
	public List<Map<String, Object>> findfwzlxx(
			@Param("postData")String postData);
	
	/**
	 * 服务质量综合评定导出
	 * @param postData
	 * @return
	 */
	@SelectProvider(type = yyywsjtj.class, method = "findfwzlxxdc")
	public List<Map<String, Object>> findfwzlxxdc(
			@Param("postData")String postData);
	class yyywsjtj{
		public String findclzxcx(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("company")String company,
				@Param("pageIndex")Integer pageIndex, 
				@Param("pageSize")Integer pageSize){
			String tj1="";
			String tj2="";
	        long ts = getDaySub(stime, etime)+1;
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj1 += " and a.DB_TIME >=str_to_date('"+stime+"','%Y-%m-%d')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj1 += " and a.DB_TIME <=str_to_date('"+etime+"','%Y-%m-%d')";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj2 += " and a.VEHI_NO= '"+vehicle+"'";
			}
			if(company!=null&&!company.isEmpty()&&!company.equals("null")&&company.length()>0&&!company.equals("公司")){
				tj2 += " and b.COMP_NAME = '"+company+"'";
			}
			String sql = "select (select count(distinct b.VEHI_NO) from VW_VEHICLE b where 1=1";
			sql +=tj2;
			sql += ") as COUNT, tt.* from (select t.*,a.ONLINE_TIME,b.COUNTBZX,case when a.online_time is null then '在线' else '不在线' end as LICHENG "
					+ "from (select distinct VEHI_NO,VEHI_NUM,COMP_NAME,VEHI_SIM,HOME_TEL,NIGHT_TEL,OWN_NAME from VW_VEHICLE b";
			sql +=tj2;
			sql += 	") t"
					+ " left join (select distinct max(date_format(ONLINE_TIME,'%Y-%m-%d %H:%i:%s')) ONLINE_TIME,VEHI_NO,count(1) c from TB_TAXI_NOT_ONLINE a where a.ONLINE_TIME<=sysdate()";
			sql +=tj1;
			sql += " group by VEHI_NO having c>="+ts+") a on a.VEHI_NO=t.VEHI_NO"
			+ " left join (select count(distinct a.VEHI_NO) COUNTBZX  from TB_TAXI_NOT_ONLINE a where a.VEHI_NO <> ' '";
			sql +=tj1;
			sql += ") b on 1=1"
					+ " order by online_time desc )tt limit "+((pageIndex-1)*pageSize)+","+pageSize;
			System.out.println("sql="+sql);
			return sql;
			
		}
		public String findclzxcxdc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("company")String company){
			String tj1="";
			String tj2="";
			long ts = getDaySub(stime, etime)+1;
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj1 += " and a.DB_TIME >=str_to_date('"+stime+"','%Y-%m-%d')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj1 += " and a.DB_TIME <=str_to_date('"+etime+"','%Y-%m-%d')";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj2 += " and a.VEHI_NO= '"+vehicle+"'";
			}
			if(company!=null&&!company.isEmpty()&&!company.equals("null")&&company.length()>0&&!company.equals("公司")){
				tj2 += " and b.COMP_NAME = '"+company+"'";
			}
			String sql = "select t.*,a.ONLINE_TIME,b.COUNTBZX,case when a.online_time is null then '在线' else '不在线' end as LICHENG "
					+ "from (select distinct VEHI_NO,VEHI_NUM,COMP_NAME,VEHI_SIM,HOME_TEL,NIGHT_TEL,OWN_NAME from VW_VEHICLE b";
			sql +=tj2;
			sql += 	") t"
					+ " left join (select distinct max(date_format(ONLINE_TIME,'%Y-%m-%d %H:%i:%s')) ONLINE_TIME,VEHI_NO,count(1) c from TB_TAXI_NOT_ONLINE a where a.ONLINE_TIME<=sysdate()";
			sql +=tj1;
			sql += " group by VEHI_NO having c>="+ts+") a on a.VEHI_NO=t.VEHI_NO"
			+ " left join (select count(distinct a.VEHI_NO) COUNTBZX  from TB_TAXI_NOT_ONLINE a where a.VEHI_NO <> ' '";
			sql +=tj1;
			sql += ") b on 1=1"
					+ " order by online_time desc ";
			System.out.println("sql="+sql);
			return sql;
		}
		public String findfgslctj(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("company")String company,
				@Param("vehicle")String vehicle,
				@Param("pageIndex")Integer pageIndex, 
				@Param("pageSize")Integer pageSize){
			String tj="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			String searchDate=sdf.format(calendar.getTime()).substring(0,6);
			int c=0;
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and DAY >='"+stime.replaceAll("-","")+"'";
				c++;
				searchDate = stime.replaceAll("-","").substring(0,6);
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and DAY <='"+etime.replaceAll("-","")+"'";
				c++;
				searchDate = etime.replaceAll("-","").substring(0,6);
			}
			if(company!=null&&!company.isEmpty()&&!company.equals("null")&&company.length()>0&&!company.equals("公司")){
				tj += " and FGS = '"+company+"'";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号")){
				tj += " and CPHM = '"+vehicle.replace("浙", "")+"'";
			}
			String sql = "select (select count(distinct CPHM) from jjq_tj_"+searchDate+"_day where 1 = 1 and type = 5 and FGS <> ''";
			sql += tj;				
			sql += ") as COUNT, CONCAT('浙',CPHM) CPHM,FGS,ceil(sum(zlc)) ZLC from jjq_tj_"+searchDate+"_day " +
                    " where 1 = 1 and type = 5 and FGS <> ''";
            sql += tj;		
			sql +=" group by CPHM limit "+((pageIndex-1)*pageSize)+","+pageSize;
			System.out.println("sql2="+sql);
			return sql;
			
		}
		public String findfgslctjdc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("company")String company,
				@Param("vehicle")String vehicle){
			String tj="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			String searchDate=sdf.format(calendar.getTime()).substring(0,6);
			int c=0;
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and DAY >='"+stime.replaceAll("-","")+"'";
				c++;
				searchDate = stime.replaceAll("-","").substring(0,6);
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and DAY <='"+etime.replaceAll("-","")+"'";
				c++;
				searchDate = etime.replaceAll("-","").substring(0,6);
			}
			if(company!=null&&!company.isEmpty()&&!company.equals("null")&&company.length()>0&&!company.equals("公司")){
				tj += " and FGS = '"+company+"'";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号")){
				tj += " and CPHM = '"+vehicle.replace("浙", "")+"'";
			}
			String sql = "select CONCAT('浙',CPHM) CPHM,FGS,ceil(sum(zlc)) ZLC from jjq_tj_"+searchDate+"_day " +
                    " where 1 = 1 and type = 5 and FGS <> ''";
            sql += tj;		
			sql +=" group by CPHM ";
			System.out.println("sql2dc="+sql);
			return sql;		
		}
		public String findsjyysjfx(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("company")String company,
				@Param("pageIndex")Integer pageIndex, 
				@Param("pageSize")Integer pageSize){
			String tj="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			String searchDate=sdf.format(calendar.getTime()).substring(0,6);
			int c=0;
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and DAY >='"+stime.replaceAll("-","")+"'";
				c++;
				searchDate = stime.replaceAll("-","").substring(0,6);
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and DAY <='"+etime.replaceAll("-","")+"'";
				c++;
				searchDate = etime.replaceAll("-","").substring(0,6);
			}
			if(company!=null&&!company.isEmpty()&&!company.equals("null")&&company.length()>0&&!company.equals("公司")){
				tj += " and FGS = '"+company+"'";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and CONCAT('浙',CPHM)= '"+vehicle+"'";
			}
			String sql = "select (select count(distinct CPHM) from jjq_tj_"+searchDate+"_day where 1 = 1 and type = 5 ";
			sql += tj;	
			sql += ") as COUNT,  t.*,v.* from (select CONCAT('浙',CPHM) CPHM, sum(tjcs) as YYCS, sum(jine) as YYJE,ceil(sum(zlc)) as ZLC, ceil(sum(kslc)) as KSLC, ceil(sum(szlc)) as ZKLC,ceil(sum(YSSC)) as ZKSJ, ceil(sum(dhsj)) as ZKDHSJ," +
                    " CONCAT(round((sum(szlc) / sum((zlc)))*100, 2),'%') SZL from jjq_tj_"+searchDate+"_day " +
                    " where 1 = 1 and type = 5 ";
            sql += tj ;		
			sql +=" group by CPHM limit "+((pageIndex-1)*pageSize)+","+pageSize;
			sql +=") t left join vw_vehicle v on v.vehi_no=t.CPHM";
			System.out.println("SFsql="+sql);
			return sql;
			
		}
		public String findsjyysjfxdc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("company")String company){
			String tj="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			String searchDate=sdf.format(calendar.getTime()).substring(0,6);
			int c=0;
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and DAY >='"+stime.replaceAll("-","")+"'";
				c++;
				searchDate = stime.replaceAll("-","").substring(0,6);
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and DAY <='"+etime.replaceAll("-","")+"'";
				c++;
				searchDate = etime.replaceAll("-","").substring(0,6);
			}
			if(company!=null&&!company.isEmpty()&&!company.equals("null")&&company.length()>0&&!company.equals("公司")){
				tj += " and FGS = '"+company+"'";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and CONCAT('浙',CPHM)= '"+vehicle+"'";
			}
			String sql = "select t.*,v.* from (select CONCAT('浙',CPHM) CPHM, sum(tjcs) as YYCS, sum(jine) as YYJE,ceil(sum(zlc)) as ZLC, ceil(sum(kslc)) as KSLC, ceil(sum(szlc)) as ZKLC,ceil(sum(YSSC)) as ZKSJ, ceil(sum(dhsj)) as ZKDHSJ," +
                    " CONCAT(round((sum(szlc) / sum((zlc)))*100, 2),'%') SZL from jjq_tj_"+searchDate+"_day " +
                    " where 1 = 1 and type = 5 ";
            sql += tj ;		
			sql +=" group by CPHM ";
			sql +=") t left join vw_vehicle v on v.vehi_no=t.CPHM";
			System.out.println("SFsqldc="+sql);
			return sql;
		}
		public String findqyyysjfx(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("company")String company,
				@Param("pageIndex")Integer pageIndex, 
				@Param("pageSize")Integer pageSize){
			String tj="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			String searchDate=sdf.format(calendar.getTime()).substring(0,6);
			int c=0;
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and DAY >='"+stime.replaceAll("-","")+"'";
				c++;
				searchDate = stime.replaceAll("-","").substring(0,6);
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and DAY <='"+etime.replaceAll("-","")+"'";
				c++;
				searchDate = etime.replaceAll("-","").substring(0,6);
			}
			if(company!=null&&!company.isEmpty()&&!company.equals("null")&&company.length()>0&&!company.equals("公司")){
				tj += " and ZGS = '"+company+"'";
			}
			String sql = "select (select count(distinct ZGS) from jjq_tj_"+searchDate+"_day where 1 = 1 and type = 5  and ZGS <> ''";
			sql += tj;	
			sql += ") as COUNT,  t.*,v.CLS,CONCAT(round((cast(t.YYS as SIGNED) / cast(v.CLS as SIGNED))*100, 2),'%') CCL from (select ZGS,count(distinct CPHM) YYS, sum(tjcs) as YYCS, sum(jine) as YYJE,ceil(sum(zlc)) as ZLC, ceil(sum(kslc)) as KSLC, ceil(sum(szlc)) as ZKLC,ceil(sum(YSSC)) as ZKSJ, ceil(sum(dhsj)) as ZKDHSJ," +
                    " CONCAT(round((sum(szlc) / sum((zlc)))*100, 2),'%') SZL from jjq_tj_"+searchDate+"_day " +
                    " where 1 = 1 and type = 5  and ZGS <> ''";
            sql += tj ;		
			sql +=" group by ZGS limit "+((pageIndex-1)*pageSize)+","+pageSize;
			sql +=") t left join (select ZGS,count(distinct CPHM) CLS from jjq_company  group by ZGS) v on v.ZGS=t.ZGS";
			System.out.println("hahhahsql="+sql);
			return sql;
			
		}
		public String findqyyysjfxdc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("company")String company){
			String tj="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(new Date());
			String searchDate=sdf.format(calendar.getTime()).substring(0,6);
			int c=0;
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and DAY >='"+stime.replaceAll("-","")+"'";
				c++;
				searchDate = stime.replaceAll("-","").substring(0,6);
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and DAY <='"+etime.replaceAll("-","")+"'";
				c++;
				searchDate = etime.replaceAll("-","").substring(0,6);
			}
			if(company!=null&&!company.isEmpty()&&!company.equals("null")&&company.length()>0&&!company.equals("公司")){
				tj += " and ZGS = '"+company+"'";
			}
			String sql = "select t.*,v.CLS,CONCAT(round((cast(t.YYS as SIGNED) / cast(v.CLS as SIGNED))*100, 2),'%') CCL from (select ZGS,count(distinct CPHM) YYS, sum(tjcs) as YYCS, sum(jine) as YYJE,ceil(sum(zlc)) as ZLC, ceil(sum(kslc)) as KSLC, ceil(sum(szlc)) as ZKLC,ceil(sum(YSSC)) as ZKSJ, ceil(sum(dhsj)) as ZKDHSJ," +
                    " CONCAT(round((sum(szlc) / sum((zlc)))*100, 2),'%') SZL from jjq_tj_"+searchDate+"_day " +
                    " where 1 = 1 and type = 5  and ZGS <> ''";
            sql += tj ;		
			sql +=" group by ZGS ";
			sql +=") t left join (select ZGS,count(distinct CPHM) CLS from jjq_company  group by ZGS) v on v.ZGS=t.ZGS";
			System.out.println("hahhahsql="+sql);
			return sql;
		}
		
		public String findzfjc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("event")String event,
				@Param("vehicle")String vehicle, 
				@Param("pageIndex")Integer pageIndex, 
				@Param("pageSize")Integer pageSize){
			String tj="";
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and illegal_time >=str_to_date('"+stime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and illegal_time <=str_to_date('"+etime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(event!=null&&!event.isEmpty()&&!event.equals("null")&&event.length()>0&&!event.equals("公司")){
				tj += " and ILLEGAL_FACT like '%" + event + "%'";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and VEHICLE_PLATE_NUMBER like '%" + vehicle.replace("浙", "") + "%'";
			}
			String sql = "select (select count(*) from (select * from "
					+ "  V_TW_TAXI_CASE V where audit_type ='12' and (vehicle_plate_number like '%ALT%' or vehicle_plate_number like '%APT%' or vehicle_plate_number like '%AT%' or vehicle_plate_number like '%AQT%' or vehicle_plate_number like '%AUT%' or vehicle_plate_number like '%ACT%')";
			sql += tj;
			sql += ") m ) as count, t.* from (select * "
					+ " from  V_TW_TAXI_CASE v where audit_type ='12' and (vehicle_plate_number like '%ALT%' or vehicle_plate_number like '%APT%' or vehicle_plate_number like '%AT%' or vehicle_plate_number like '%AQT%' or vehicle_plate_number like '%AUT%' or vehicle_plate_number like '%ACT%')";
			sql += tj;
			sql += " order by illegal_time desc) t limit "+((pageIndex-1)*pageSize)+","+pageSize;
			System.out.println("jc="+sql);
			return sql;
			
		}
		public String findzfjcdc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("event")String event,
				@Param("vehicle")String vehicle){
			String tj="";
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and illegal_time >=str_to_date('"+stime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and illegal_time <=str_to_date('"+etime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(event!=null&&!event.isEmpty()&&!event.equals("null")&&event.length()>0&&!event.equals("公司")){
				tj += " and ILLEGAL_FACT like '%" + event + "%'";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and VEHICLE_PLATE_NUMBER like '%" + vehicle.replace("浙", "") + "%'";
			}
			String sql = "select * from  V_TW_TAXI_CASE v where audit_type ='12' and"
					+ " (vehicle_plate_number like '%ALT%' or vehicle_plate_number like '%APT%' or vehicle_plate_number like '%AT%' or vehicle_plate_number like '%AQT%' or vehicle_plate_number like '%AUT%' or vehicle_plate_number like '%ACT%')";
			sql += tj;
			sql += " order by illegal_time desc ";
			return sql;
		}
		public String finddcpjfx(
				@Param("module") String module,
				@Param("i") Integer i,
				@Param("field1") String field1,
				@Param("time") String time){
//			String cx="SELECT table_name FROM information_schema.TABLES WHERE table_name ='jjq_tj_201812_day' or table_name ='jjq_tj_201812_day'";			
			String tj="";
			String sql ="";
			time=findtime(i,time);
			if(time!=null&&!time.isEmpty()&&!time.equals("null")&&time.length()>0&&!time.equals("时间")){
				tj += " and shangchedate ='"+time+"'";
			}
			if(module.equals("yysy")){				
				sql += "select date_format(shangche, '%H') TIME,round(sum("+field1+")/count(distinct vhic)/100,2) COUNT";
			}else if(module.equals("zklc")||module.equals("kslc")){				
				sql += "select date_format(shangche, '%H') TIME,round(sum("+field1+")/count(distinct vhic)/10,2) COUNT";
			}else if(module.equals("xszlc")){				
				sql += "select date_format(shangche, '%H') TIME,round((sum("+field1+")+sum(KONGSHI))/count(distinct vhic)/10,2) COUNT";
			}else if(module.equals("yycs")){				
				sql += "select date_format(shangche, '%H') TIME,round(count("+field1+")/count(distinct vhic),2) COUNT";
			}else if(module.equals("zksj")){				
				sql += "select date_format(shangche, '%H') TIME,round(sum(timestampdiff(MINUTE, "+field1+", XIACHE))/count(distinct vhic),2) COUNT";
			}else if(module.equals("zkdhsj")){				
				sql += "select date_format(shangche, '%H') TIME,round(sum("+field1+")/count(TIME_TO_SEC(str_to_date(denghou,'%H%i%s')))/60,2) COUNT";
			}
			sql +=  " from jjq"+time.substring(0, 6)+"_1 where flag = '1000000000' ";
            sql += tj ;		
			sql +="  GROUP BY date_format(shangche, '%H') order by date_format(shangche, '%H')";
			System.out.println("dcpjfx="+sql);
			return sql;
			
		}
		public String findday(
				@Param("i") Integer i,
				@Param("field2") String field2,
				@Param("time") String time){
			String tj="";
			time=findtime(i,time);
			if(time!=null&&!time.isEmpty()&&!time.equals("null")&&time.length()>0&&!time.equals("时间")){
				tj += " and date_format(db_time, '%Y%m%d') ='"+time+"'";
			}
			String sql = "select sum("+field2+") COUNT, date_format(db_time, '%H') TIME from TB_TAXI_RUN_INFO_RECORD_test "
					+ " where date_format(db_time, '%i') = '00'";
			sql += tj;
			sql += " group by date_format(db_time, '%H') order by date_format(db_time, '%H')";
			System.out.println("findday="+sql);
			return sql;
			
		}
		public String findaverage(
				@Param("field2") String field2,
				@Param("time") String time){
			String tj="";
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar calendar = Calendar.getInstance();
			if(time!=null&&!time.isEmpty()&&!time.equals("null")&&time.length()>0&&!time.equals("时间")){
				time = time.replaceAll("-","");
			}else{
				time=sdf.format(new Date());
			}
			try {
				calendar.setTime(sdf.parse(time));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			calendar.setFirstDayOfWeek(Calendar.MONDAY);
			calendar.add(Calendar.DATE, -7);
		    calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		    String stime = sdf.format(calendar.getTime());
		    calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		    String etime = sdf.format(calendar.getTime());
		    
			if(time!=null&&!time.isEmpty()&&!time.equals("null")&&time.length()>0&&!time.equals("时间")){
				tj += " and date_format(db_time, '%Y%m%d') >='"+stime+"'";
				tj += " and date_format(db_time, '%Y%m%d') <='"+etime+"'";
			}
			String sql = "select round(sum("+field2+") / 7,2) COUNT,date_format(db_time, '%H') TIME from TB_TAXI_RUN_INFO_RECORD_test "
					+ " where date_format(db_time, '%i') = '00'";
			sql+=tj;
			sql+= " group by date_format(db_time, '%H') order by date_format(db_time, '%H')";
			System.out.println("平均  " + sql);
			return sql;
			
		}
		public String findmaxmin(
				@Param("field3") String field3,
				@Param("time") String time){
			String tj="";
			time=findtime(1,time);
			if(time!=null&&!time.isEmpty()&&!time.equals("null")&&time.length()>0&&!time.equals("时间")){
				tj += " and date_format(enddate, '%Y%m%d') ='"+time+"'";
			}
			String sql = "select * from TB_HALF_MONTH_ONLINE_RUN_RATE  where 1=1";
			sql += tj;
			sql += " group by date_format(db_time, '%H') order by date_format(db_time, '%H')";
			System.out.println("findday="+sql);
			return sql;
		}
		private String findtime(Integer i, String time) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
			Calendar calendar = Calendar.getInstance();
			if(time!=null&&!time.isEmpty()&&!time.equals("null")&&time.length()>0&&!time.equals("时间")){
				time = time.replaceAll("-","");
			}else{
				calendar.setTime(new Date());
				time=sdf.format(calendar.getTime());
			}
			
			try {
				calendar.setTime(sdf.parse(time));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			if(i==0){
				return time;
			}else if(i==1){
				calendar.add(Calendar.DATE, -1);
				Date date = calendar.getTime();
				time=sdf.format(date);
				return time;
			}else if(i==2){
				calendar.add(Calendar.DATE, -2);
				Date date = calendar.getTime();
				time=sdf.format(date);
				return time;
			}else if(i==3){
				calendar.add(Calendar.DATE, -7);
				Date date = calendar.getTime();
				time=sdf.format(date);
				return time;
			}else if(i==7){
				calendar.add(Calendar.MONDAY, -1);
				Date date = calendar.getTime();
				time=sdf.format(date);
				return time;
			}else if(i==8){
				calendar.add(Calendar.YEAR, -1);
				Date date = calendar.getTime();
				time=sdf.format(date);
				return time;
			}
			return null;
		}
		public String findfwzlxx(
				@Param("postData")String postData){
			Map<String, Object> paramMap = FastJsonUtil.stringToMap(postData);
			int pageIndex = Integer.valueOf(String.valueOf(paramMap.get("page")));
			int pageSize = Integer.valueOf(String.valueOf(paramMap.get("pageSize")));
			String pd_qymc = String.valueOf(paramMap.get("pd_qymc"));
			String pd_nd = String.valueOf(paramMap.get("pd_nd"));
			String pd_xydj = String.valueOf(paramMap.get("pd_xydj"));
			String tj="";
			if(pd_nd!=null&&!pd_nd.isEmpty()&&!pd_nd.equals("null")&&pd_nd.length()>0&&!pd_nd.equals("时间")){
				tj += " and SJ ='"+pd_nd+"'";
			}
			if(pd_qymc!=null&&!pd_qymc.isEmpty()&&!pd_qymc.equals("null")&&pd_qymc.length()>0&&!pd_qymc.equals("公司")){
				tj += " and YHMC ='"+pd_qymc+"'";
			}
			if(pd_xydj!=null&&!pd_xydj.isEmpty()&&!pd_xydj.equals("null")&&pd_xydj.length()>0&&!pd_xydj.equals("荣誉等级")){
				tj += " and XYDJ ='"+pd_xydj+"'";
			}
			String sql = "select (select count(*) from SERVICEEVALUATION where 1=1";
			sql += tj;
			sql += ") as COUNT, t.* from (select * from  SERVICEEVALUATION where 1=1";
			sql += tj;
			sql += " order by SJ desc) t limit "+((pageIndex-1)*pageSize)+","+pageSize;
			System.out.println("findfwzlxx="+sql);
			return sql;
			
		}
		public String findfwzlxxdc(
				@Param("postData")String postData){
			Map<String, Object> paramMap = FastJsonUtil.stringToMap(postData);
			String pd_qymc = String.valueOf(paramMap.get("pd_qymc"));
			String pd_nd = String.valueOf(paramMap.get("pd_nd"));
			String pd_xydj = String.valueOf(paramMap.get("pd_xydj"));
			String tj="";
			if(pd_nd!=null&&!pd_nd.isEmpty()&&!pd_nd.equals("null")&&pd_nd.length()>0&&!pd_nd.equals("时间")){
				tj += " and SJ ='"+pd_nd+"'";
			}
			if(pd_qymc!=null&&!pd_qymc.isEmpty()&&!pd_qymc.equals("null")&&pd_qymc.length()>0&&!pd_qymc.equals("公司")){
				tj += " and YHMC ='"+pd_qymc+"'";
			}
			if(pd_xydj!=null&&!pd_xydj.isEmpty()&&!pd_xydj.equals("null")&&pd_xydj.length()>0&&!pd_xydj.equals("荣誉等级")){
				tj += " and XYDJ ='"+pd_xydj+"'";
			}
			String sql = "select t.* from (select * from  SERVICEEVALUATION where 1=1";
			sql += tj;
			sql += " order by SJ desc) t";
			System.out.println("findfwzlxxdc="+sql);
			return sql;
		}
		
		public static long getDaySub(String beginDateStr,String endDateStr)
	    {
	        long day=0;
	        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	        Date beginDate;
	        Date endDate;
	        Calendar calendar = Calendar.getInstance();
	        calendar.add(Calendar.DATE, -1); //得到前一天
	        Date date = null;
	        try {
	            date = format.parse(format.format(calendar.getTime()));
	        } catch (ParseException e) {
	            e.printStackTrace();
	        }
	        try {
	            beginDate = format.parse(beginDateStr);
	            endDate= format.parse(endDateStr);
	            if(endDate.getTime()>date.getTime()){
	                day=(date.getTime()-beginDate.getTime())/(24*60*60*1000);
	            }else{
	                day=(endDate.getTime()-beginDate.getTime())/(24*60*60*1000);
	            }
	        } catch (ParseException e) {
	            e.printStackTrace();
	        }
	        return day;
	    }
		
	}	
}