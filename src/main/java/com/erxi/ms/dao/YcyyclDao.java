package com.erxi.ms.dao;


import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;


@Mapper
public interface YcyyclDao {
	
	/**
	 * 下拉栏
	 * @param table
	 * @return
	 */
	@Select("select distinct ${field} from ${table} where ILLEGAL_TIME>=str_to_date('${time}','%Y-%m-%d %H:%i:%s') and CASE_STATUS is null ")
	public List<Map<String, Object>> tsxll(
			@Param("field")String field,@Param("table")String table,@Param("time")String time);
	/**
	 * 下拉栏
	 * @param table
	 * @return
	 */
	@Select("select distinct ${field} from ${table} ")
	public List<Map<String, Object>> findxll(
			@Param("field")String field,@Param("table")String table);
	/**
	 * 设备异常未维修查询
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param type
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yccl.class, method = "findsbyc")
	public List<Map<String, Object>> findsbyc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("type")String type,
			@Param("pageIndex")Integer pageIndex, 
			@Param("pageSize")Integer pageSize);
	/**
	 * 设备异常未维修导出
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param type
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yccl.class, method = "findsbycdc")
	public List<Map<String, Object>> findsbycdc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("type")String type);
	/**
	 * 投诉违章未处理查询
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param type
	 * @param address
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yccl.class, method = "findtswz")
	public List<Map<String, Object>> findtswz(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("type")String type,
			@Param("address")String address,
			@Param("pageIndex")Integer pageIndex, 
			@Param("pageSize")Integer pageSize);
	/**
	 * 投诉违章未处理导出
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param type
	 * @param address
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yccl.class, method = "findtswzdc")
	public List<Map<String, Object>> findtswzdc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("type")String type,
			@Param("address")String address);
	/**
	 * 疑似黑车查询
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param type
	 * @param address
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yccl.class, method = "findyshc")
	public List<Map<String, Object>> findyshc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("type")String type,
			@Param("address")String address,
			@Param("pageIndex")Integer pageIndex, 
			@Param("pageSize")Integer pageSize);
	/**
	 * 疑似黑车导出
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param type
	 * @param address
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yccl.class, method = "findyshcdc")
	public List<Map<String, Object>> findyshcdc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("type")String type,
			@Param("address")String address);
	/**
	 * 疑似套牌查询
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param type
	 * @param address
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yccl.class, method = "findystp")
	public List<Map<String, Object>> findystp(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("type")String type,
			@Param("address")String address,
			@Param("pageIndex")Integer pageIndex, 
			@Param("pageSize")Integer pageSize);
	/**
	 * 疑似套牌导出
	 * @param stime
	 * @param etime
	 * @param vehicle
	 * @param type
	 * @param address
	 * @param pageIndex
	 * @param pageSize
	 * @return
	 */
	@SelectProvider(type = yccl.class, method = "findystpdc")
	public List<Map<String, Object>> findystpdc(
			@Param("stime")String stime,
			@Param("etime")String etime, 
			@Param("vehicle")String vehicle, 
			@Param("type")String type,
			@Param("address")String address);
	class yccl{
		public String findsbyc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("type")String type,
				@Param("pageIndex")Integer pageIndex, 
				@Param("pageSize")Integer pageSize){
			String tj="";
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and a.DB_TIME >=str_to_date('"+stime+"','%Y-%m-%d')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and a.DB_TIME <=str_to_date('"+etime+"','%Y-%m-%d')";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and a.VEHICLE_NO= '"+vehicle+"'";
			}
			if(type!=null&&!type.isEmpty()&&!type.equals("null")&&type.length()>0&&!type.equals("类型")){
				tj += " and a."+type+" != '0'";
			}
//			String sql = "select (select count(1) from (select  distinct x.* from TB_ALARM_VEHICLE x where x.ERROR_TIME=(select max(ERROR_TIME) from TB_ALARM_VEHICLE y where y.VEHICLE_NO=x.VEHICLE_NO)) a where 1=1";
//			sql += tj;				
//			sql += ") as count,tt.* from (select a.*,rownum as rn from (select distinct x.* from TB_ALARM_VEHICLE x where x.ERROR_TIME=(select max(ERROR_TIME) from TB_ALARM_VEHICLE y where y.VEHICLE_NO=x.VEHICLE_NO)  order by ERROR_TIME desc) a where 1=1";
//			sql += tj;				
//			sql +=" and rownum <= "+(pageIndex*pageSize)+") tt where tt.rn > "+((pageIndex-1)*pageSize);
			String sql = "select (select count(VEHICLE_NO) from  tb_taxi_gzfx_history a where 1=1";
			sql += tj;				
			sql += ") as COUNT,t.VEHICLE_NO,t.NO_GPS,t.NO_JJQ,t.NO_GPS_JJQ,t.SEVEN_GPS_JJQ,t.EMPTY_HEAVY,date_format(t.DB_TIME,'%Y-%m-%d') DB_TIME from (select * from tb_taxi_gzfx_history a where 1=1";
			sql += tj;				
			sql +=" ) t order by t.DB_TIME desc limit "+((pageIndex-1)*pageSize)+","+pageSize;
			System.out.println("sql="+sql);
			return sql;
		}
		public String findsbycdc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("type")String type){
			String tj="";
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and a.DB_TIME >=str_to_date('"+stime+"','%Y-%m-%d')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and a.DB_TIME <=str_to_date('"+etime+"','%Y-%m-%d')";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and a.VEHICLE_NO= '"+vehicle+"'";
			}
			if(type!=null&&!type.isEmpty()&&!type.equals("null")&&type.length()>0&&!type.equals("类型")){
				tj += " and a."+type+" != '0'";
			}		
//			String sql = "select a.* from (select  distinct x.* from TB_ALARM_VEHICLE x where x.ERROR_TIME=(select max(ERROR_TIME) from TB_ALARM_VEHICLE y where y.VEHICLE_NO=x.VEHICLE_NO) order by ERROR_TIME desc) a where 1=1";
			String sql = "select t.* from (select * from tb_taxi_gzfx_history a where 1=1";
			sql += tj;				
			sql +=" ) t order by t.DB_TIME desc ";
			System.out.println("sqldc="+sql);
			return sql;
		}
		public String findtswz(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("type")String type,
				@Param("address")String address,
				@Param("pageIndex")Integer pageIndex, 
				@Param("pageSize")Integer pageSize){
			Date date =new Date();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.DAY_OF_MONTH, -180);
			date = calendar.getTime();
			String time=sdf.format(date);
			String tj="";
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and ILLEGAL_TIME >=str_to_date('"+stime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and ILLEGAL_TIME <str_to_date('"+etime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and  replace(AUTO_NUM,'.','') = '"+vehicle+"'";
			}
			if(type!=null&&!type.isEmpty()&&!type.equals("null")&&type.length()>0&&!type.equals("类型")){
				tj += " and CASE_REASON = '"+type+"'";
			}
			if(address!=null&&!address.isEmpty()&&!address.equals("null")&&address.length()>0&&!address.equals("采集点")){
				tj += " and AREA = '"+address+"'";
			}
			String sql = "select (select count(1) from (select  distinct * from tb_taxi_illegal_info_out  where 1=1 and CASE_STATUS is null and ILLEGAL_TIME>=str_to_date('"+time+"','%Y-%m-%d %H:%i:%s')";
			sql += tj;				
			sql += ") m ) as COUNT,a.* from (select distinct * from tb_taxi_illegal_info_out where 1=1 and CASE_STATUS is null and ILLEGAL_TIME>=str_to_date('"+time+"','%Y-%m-%d %H:%i:%s')";
			sql += tj;
			sql += " order by ILLEGAL_TIME desc ) a limit "+((pageIndex-1)*pageSize)+","+pageSize;
			System.out.println("sql="+sql);
			return sql;
		}
		public String findtswzdc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("type")String type,
				@Param("address")String address){
			Date date =new Date();
			SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(date);
			calendar.add(Calendar.DAY_OF_MONTH, -180);
			date = calendar.getTime();
			String time=sdf.format(date);
			String tj="";
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and a.ILLEGAL_TIME >=str_to_date('"+stime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and a.ILLEGAL_TIME <str_to_date('"+etime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and replace(a.AUTO_NUM,'.','') = '"+vehicle+"'";
			}
			if(type!=null&&!type.isEmpty()&&!type.equals("null")&&type.length()>0&&!type.equals("类型")){
				tj += " and a.CASE_REASON = '"+type+"'";
			}
			if(address!=null&&!address.isEmpty()&&!address.equals("null")&&address.length()>0&&!address.equals("采集点")){
				tj += " and a.AREA = '"+address+"'";
			}			
			String sql = "select a.* from (select distinct * from tb_taxi_illegal_info_out where  CASE_STATUS is null and ILLEGAL_TIME>=str_to_date('"+time+"','%Y-%m-%d %H:%i:%s') order by ILLEGAL_TIME desc) a "
					+ " where 1=1";
			sql += tj;				
			System.out.println("sql="+sql);
			return sql;
		}
		public String findyshc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("type")String type,
				@Param("address")String address,
				@Param("pageIndex")Integer pageIndex, 
				@Param("pageSize")Integer pageSize){
			String tj="";
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and b.ERROR_TIME >=str_to_date('"+stime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and b.ERROR_TIME <str_to_date('"+etime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and b.VEHICLE_NO= '"+vehicle+"'";
			}
			if(type!=null&&!type.isEmpty()&&!type.equals("null")&&type.length()>0&&!type.equals("类型")){
				tj += " and b.ERROR_TYPE = '"+type+"'";
			}
			if(address!=null&&!address.isEmpty()&&!address.equals("null")&&address.length()>0&&!address.equals("采集点")){
				tj += " and b.ERROR_ADDRESS = '"+address+"'";
			}		
			String sql = "select (select count(1) from (SELECT DISTINCT	b.*	FROM TB_BLACK_TAXI b LEFT JOIN tb_global_vehicle v ON b.VEHICLE_NO = v.plate_number WHERE	b.VEHICLE_NO not LIKE '浙AT%' AND v.plate_number IS NULL";
			sql += tj;				
			sql += ")a ) as COUNT, a.* from (SELECT DISTINCT b.* FROM TB_BLACK_TAXI b LEFT JOIN tb_global_vehicle v ON b.VEHICLE_NO = v.plate_number WHERE	b.VEHICLE_NO not LIKE  '浙AT%' AND v.plate_number IS NULL";
			sql += tj;				
			sql +=" order by b.ERROR_TIME desc) a limit "+((pageIndex-1)*pageSize)+","+pageSize;
			System.out.println("sql="+sql);
			return sql;
		}
		public String findyshcdc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("type")String type,
				@Param("address")String address){
			String tj="";
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and b.ERROR_TIME >=str_to_date('"+stime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and b.ERROR_TIME <str_to_date('"+etime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and b.VEHICLE_NO= '"+vehicle+"'";
			}
			if(type!=null&&!type.isEmpty()&&!type.equals("null")&&type.length()>0&&!type.equals("类型")){
				tj += " and b.ERROR_TYPE = '"+type+"'";
			}
			if(address!=null&&!address.isEmpty()&&!address.equals("null")&&address.length()>0&&!address.equals("采集点")){
				tj += " and b.ERROR_ADDRESS = '"+address+"'";
			}		
			String sql = "select  a.* from (SELECT DISTINCT b.* FROM TB_BLACK_TAXI b LEFT JOIN tb_global_vehicle v ON b.VEHICLE_NO = v.plate_number WHERE	b.VEHICLE_NO not LIKE  '浙AT%' AND v.plate_number IS NULL";
			sql += tj;				
			sql +=" order by b.ERROR_TIME desc) a";
			System.out.println("sql="+sql);
			return sql;
		}
		public String findystp(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("type")String type,
				@Param("address")String address,
				@Param("pageIndex")Integer pageIndex, 
				@Param("pageSize")Integer pageSize){
			String tj="";
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and b.ERROR_TIME >=str_to_date('"+stime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and b.ERROR_TIME <str_to_date('"+etime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and b.VEHICLE_NO= '"+vehicle+"'";
			}
			if(type!=null&&!type.isEmpty()&&!type.equals("null")&&type.length()>0&&!type.equals("类型")){
				tj += " and b.ERROR_TYPE = '"+type+"'";
			}
			if(address!=null&&!address.isEmpty()&&!address.equals("null")&&address.length()>0&&!address.equals("采集点")){
				tj += " and b.ERROR_ADDRESS = '"+address+"'";
			}		
			String sql = "select (select count(1) from (SELECT DISTINCT	b.*	FROM TB_BLACK_TAXI b LEFT JOIN tb_global_vehicle v ON b.VEHICLE_NO = v.plate_number WHERE	b.VEHICLE_NO LIKE '浙AT%' AND v.plate_number IS NULL";
			sql += tj;				
			sql += ")a ) as COUNT, a.* from (SELECT DISTINCT b.* FROM TB_BLACK_TAXI b LEFT JOIN tb_global_vehicle v ON b.VEHICLE_NO = v.plate_number WHERE	b.VEHICLE_NO LIKE '浙AT%' AND v.plate_number IS NULL";
			sql += tj;				
			sql +=" order by b.ERROR_TIME desc) a limit "+((pageIndex-1)*pageSize)+","+pageSize;
			System.out.println("sql="+sql);
			return sql;
		}
		public String findystpdc(
				@Param("stime")String stime,
				@Param("etime")String etime, 
				@Param("vehicle")String vehicle, 
				@Param("type")String type,
				@Param("address")String address){
			String tj="";
			if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and b.ERROR_TIME >=str_to_date('"+stime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and b.ERROR_TIME <str_to_date('"+etime+"','%Y-%m-%d %H:%i:%s')";
			}
			if(vehicle!=null&&!vehicle.isEmpty()&&!vehicle.equals("null")&&vehicle.length()>0&&!vehicle.equals("车牌号码")){
				tj += " and b.VEHICLE_NO= '"+vehicle+"'";
			}
			if(type!=null&&!type.isEmpty()&&!type.equals("null")&&type.length()>0&&!type.equals("类型")){
				tj += " and b.ERROR_TYPE = '"+type+"'";
			}
			if(address!=null&&!address.isEmpty()&&!address.equals("null")&&address.length()>0&&!address.equals("采集点")){
				tj += " and b.ERROR_ADDRESS = '"+address+"'";
			}				
			String sql = "select a.* from (SELECT DISTINCT b.* FROM TB_BLACK_TAXI b LEFT JOIN tb_global_vehicle v ON b.VEHICLE_NO = v.plate_number WHERE	b.VEHICLE_NO LIKE '浙AT%' AND v.plate_number IS NULL";
			sql += tj;				
			sql +=" order by b.ERROR_TIME desc) a ";			
			System.out.println("sql="+sql);
			return sql;
		}
	}
}
