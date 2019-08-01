package com.erxi.ms.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;
import java.util.Map;

/**
 * @ClassName 营运报告接口
 * @dOscription TODO
 * @Author HXX1
 * @Date 2018/11/13 18:23
 * @Version 1.0
 **/
@Mapper
public interface YyybgDao {
	@SelectProvider(type = getgetYyybgs.class, method = "getFindAllYynbgDao")
    public List<Map<String, Object>> getFindAllYynbgDao(@Param("date") String date,@Param("stime") String stime, @Param("etime") String etime, @Param("pageIndex") Integer pageIndex,
                                                        @Param("pageSize") Integer pageSize);
	
	
    @SelectProvider(type = getgetYyybgs.class, method = "getFindAllYyybgDao")
    public List<Map<String, Object>> getFindAllYyybgDao(@Param("date") String date,@Param("stime") String stime, @Param("etime") String etime, @Param("pageIndex") Integer pageIndex,
                                                        @Param("pageSize") Integer pageSize);
    
    @SelectProvider(type = getgetYyybgs.class, method = "getFindAllYyrbgDao")
    public List<Map<String, Object>> getFindAllYyrbgDao(@Param("date") String date,@Param("str") String str,@Param("stime") String stime, @Param("etime") String etime, @Param("pageIndex") Integer pageIndex,
                                                        @Param("pageSize") Integer pageSize);

    class getgetYyybgs {
    	 public String getFindAllYynbgDao(@Param("date") String date, @Param("stime") String stime, @Param("etime") String etime,@Param("pageIndex") Integer pageIndex,
                 @Param("pageSize") Integer pageSize) {
    		 		String tj="";
		    		if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
		 				tj += " and day >='"+stime.replace("-", "")+"'";
		 			}
		 			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
		 				tj += " and day <='"+etime.replace("-", "")+"'";
		 			}
    		 		String sql="select * "
    		 				+ " from (select substr(day,1,6) TIME,COUNT(distinct CPHM) CPH,SUM(TJCS) ZYYCS,round(SUM(JINE),2) ZYYJE, SUM(YSSC) CCSC,ceil(SUM(ZLC)) ZLIC,ceil(SUM(SZLC)) SZZLC,ceil(SUM(KSLC)) KSZLC from JJQ_TJ_"+date+"0"+1+"_DAY  where type='5' group by substr(day,1,6)";
    		 		sql +=tj;
    		 		for(int i=2;i<=9;i++){
    		 			sql +=" union all select substr(day,1,6) TIME,COUNT(distinct CPHM) CPH,SUM(TJCS) ZYYCS,round(SUM(JINE),2) ZYYJE, SUM(YSSC) CCSC,ceil(SUM(ZLC)) ZLIC,ceil(SUM(SZLC)) SZZLC,ceil(SUM(KSLC)) KSZLC  from JJQ_TJ_"+date+"0"+i+"_DAY  where type='5' group by substr(day,1,6)";
    		 			sql +=tj;
    		 		}
					for(int i=10;i<=12;i++){
						sql +=" union all select substr(day,1,6) TIME,COUNT(distinct CPHM) CPH,SUM(TJCS) ZYYCS,round(SUM(JINE),2) ZYYJE, SUM(YSSC) CCSC,ceil(SUM(ZLC)) ZLIC,ceil(SUM(SZLC)) SZZLC,ceil(SUM(KSLC)) KSZLC  from JJQ_TJ_"+date+i+"_DAY  where type='5' group by substr(day,1,6)";
						sql +=tj;
    		 		}
					sql +=") m order by time";

					System.out.println("nian营运报告" + sql);
					return sql;
				}

        public String getFindAllYyybgDao(@Param("date") String date,@Param("stime") String stime, @Param("etime") String etime, @Param("pageIndex") Integer pageIndex,
                                         @Param("pageSize") Integer pageSize) {

            String tj = "";
            if (date != null && !date.isEmpty() && !date.equals("null") && date.length() > 0) {
                tj += "day >=date_format(str_to_date('" + date + "', '%Y%m'), '%Y%m')";
            }
    		if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
 				tj += " and day >='"+stime.replace("-", "")+"'";
 			}
 			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
 				tj += " and day <='"+etime.replace("-", "")+"'";
 			}
            String sql= "select (select count(*) COUNT from (SELECT day TIME,COUNT(distinct CPHM) CPH,SUM(TJCS) ZYYCS,round(SUM(JINE),2) ZYYJE," +
                    " SUM(YSSC) CCSC,ceil(SUM(ZLC)) ZLIC,ceil(SUM(SZLC)) SZZLC,ceil(SUM(KSLC)) KSZLC FROM JJQ_TJ_"+date+"_DAY";
            sql += " WHERE " + tj + " and type='5' group by day";
            sql += ") m ) as COUNT,a.* from (SELECT day TIME,COUNT(distinct CPHM) CPH,SUM(TJCS) ZYYCS,round(SUM(JINE),2) ZYYJE," +
                    " SUM(YSSC) CCSC,ceil(SUM(ZLC)) ZLIC,ceil(SUM(SZLC)) SZZLC,ceil(SUM(KSLC)) KSZLC FROM JJQ_TJ_"+date+"_DAY";
            sql += " WHERE " + tj + " and type='5' group by day) a limit "+((pageIndex-1)*pageSize)+","+pageSize;
            System.out.println("yue营运报告" + sql);
            return sql;
        }
        public String getFindAllYyrbgDao(@Param("date") String date,@Param("stime") String stime, @Param("etime") String etime, @Param("str") String str,@Param("pageIndex") Integer pageIndex,
                @Param("pageSize") Integer pageSize) {

            String tj = "";
            if (date != null && !date.isEmpty() && !date.equals("null") && date.length() > 0) {
                tj += "day =date_format(str_to_date('" + date + "', '%Y%m%d'), '%Y%m%d')";
            }
            if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
 				tj += " and day >='"+stime.replace("-", "")+"'";
 			}
 			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
 				tj += " and day <='"+etime.replace("-", "")+"'";
 			}
            String sql= "select (select count(*) COUNT from (SELECT day TIME,COUNT(distinct CPHM) CPH,SUM(TJCS) ZYYCS,round(SUM(JINE),2) ZYYJE," +
                    " SUM(YSSC) CCSC,ceil(SUM(ZLC)) ZLIC,ceil(SUM(SZLC)) SZZLC,ceil(SUM(KSLC)) KSZLC FROM JJQ_TJ_"+str+"_DAY";
            sql += " WHERE " + tj + " and type='5' group by day";
            sql += ") m ) as COUNT,tt.* from (select a.* from (SELECT day TIME,COUNT(distinct CPHM) CPH,SUM(TJCS) ZYYCS,round(SUM(JINE),2) ZYYJE," +
                    " SUM(YSSC) CCSC,ceil(SUM(ZLC)) ZLIC,ceil(SUM(SZLC)) SZZLC,ceil(SUM(KSLC)) KSZLC FROM JJQ_TJ_"+str+"_DAY";
            sql += " WHERE " + tj + " and type='5' group by day) a limit "+((pageIndex-1)*pageSize)+","+pageSize+") tt ";
            System.out.println("ri营运报告" + sql);
            return sql;
		}

    }

    /**
     * Export
     *
     * @param n
     * @param y
     * @return
     */
    @SelectProvider(type = getYyybgsExport.class, method = "getFindAllYynbgDaodc")
    List<Map<String, Object>> getFindAllYynbgDaodc(@Param("date") String date,@Param("stime") String stime, @Param("etime") String etime);
    
    @SelectProvider(type = getYyybgsExport.class, method = "getFindAllYyybgDaodc")
    List<Map<String, Object>> getFindAllYyybgDaodc(@Param("date") String date,@Param("stime") String stime, @Param("etime") String etime);
    
    @SelectProvider(type = getYyybgsExport.class, method = "getFindAllYyrbgDaodc")
    List<Map<String, Object>> getFindAllYyrbgDaodc(@Param("date") String date,@Param("str") String str,@Param("stime") String stime, @Param("etime") String etime);
    class getYyybgsExport {
	   public String getFindAllYynbgDaodc(@Param("date") String date,@Param("stime") String stime, @Param("etime") String etime) {
		    String tj="";
		    if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and day >='"+stime.replace("-", "")+"'";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and day <='"+etime.replace("-", "")+"'";
			}
			String sql="select substr(day,0,6) TIME,COUNT(distinct CPHM) CPH,SUM(TJCS) ZYYCS,round(SUM(JINE),2) ZYYJE, SUM(YSSC) CCSC,ceil(SUM(ZLC)) ZLIC,ceil(SUM(SZLC)) SZZLC,ceil(SUM(KSLC)) KSZLC "
	 				+ " from (select * from JJQ_TJ_"+date+"0"+1+"_DAY";
	 		for(int i=2;i<=9;i++){
	 		sql +=" union all select * from JJQ_TJ_"+date+"0"+i+"_DAY";
	 		}
			for(int i=10;i<=12;i++){
				sql +=" union all select * from JJQ_TJ_"+date+i+"_DAY";
	 		}
			sql +=") m where type='5'"+tj+" group by substr(day,0,6) order by substr(day,0,6)";

			System.out.println("nian营运报告" + sql);
			return sql;
      }
        public String getFindAllYyybgDaodc(@Param("date") String date,@Param("stime") String stime, @Param("etime") String etime) {

        	 String tj = "";
             if (date != null && !date.isEmpty() && !date.equals("null") && date.length() > 0) {
                 tj += "day >=date_format(str_to_date('" + date + "', '%Y%m'), '%Y%m')";
             }
             if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
 				tj += " and day >='"+stime.replace("-", "")+"'";
 			}
 			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
 				tj += " and day <='"+etime.replace("-", "")+"'";
 			}
             String sql="SELECT day TIME,COUNT(distinct CPHM) CPH,SUM(TJCS) ZYYCS,round(SUM(JINE),2) ZYYJE," +
                     " SUM(YSSC) CCSC,ceil(SUM(ZLC)) ZLIC,ceil(SUM(SZLC)) SZZLC,ceil(SUM(KSLC)) KSZLC FROM JJQ_TJ_"+date+"_DAY";
             sql += " WHERE " + tj + " and type='5' group by day order by day";
             System.out.println("营运报告daochu " + sql);
             return sql;
        }
        public String getFindAllYyrbgDaodc(@Param("date") String date, @Param("str") String str,@Param("stime") String stime, @Param("etime") String etime) {

            String tj = "";
            if (date != null && !date.isEmpty() && !date.equals("null") && date.length() > 0) {
                tj += "day =date_format(str_to_date('" + date + "', '%Y%m%d'), '%Y%m%d')";
            }
            if(stime!=null&&!stime.isEmpty()&&!stime.equals("null")&&stime.length()>0&&!stime.equals("开始时间")){
				tj += " and day >='"+stime.replace("-", "")+"'";
			}
			if(etime!=null&&!etime.isEmpty()&&!etime.equals("null")&&etime.length()>0&&!etime.equals("结束时间")){
				tj += " and day <='"+etime.replace("-", "")+"'";
			}
            String sql= "SELECT day TIME,COUNT(distinct CPHM) CPH,SUM(TJCS) ZYYCS,round(SUM(JINE),2) ZYYJE," +
                    " SUM(YSSC) CCSC,ceil(SUM(ZLC)) ZLIC,ceil(SUM(SZLC)) SZZLC,ceil(SUM(KSLC)) KSZLC FROM JJQ_TJ_"+str+"_DAY";
            sql += " WHERE " + tj + " and type='5' group by day";
            System.out.println("ri营运报告dachu" + sql);
            return sql;
		}

    }
//
//	public List<Map<String, Object>> getFindAllYynbgDao(String n, String y,
//			String d, Integer pageIndex, Integer pageSize);


}

