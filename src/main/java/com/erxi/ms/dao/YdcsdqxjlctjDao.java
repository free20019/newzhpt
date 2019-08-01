package com.erxi.ms.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;
import java.util.Map;

/**
 * @ClassName 单车速度曲线及车辆统计接口
 * @dOscription TODO
 * @Author HXX
 * @Date 2018/11/13 15:36
 * @Version 1.0
 **/

@Mapper
public interface YdcsdqxjlctjDao {

    @SelectProvider(type = getYdcsdqx.class, method = "getYdcsdqxjlctjDaoFindAll")
    public List<Map<String, Object>> getYdcsdqxjlctjDaoFindAll(@Param("kssj") String kssj, @Param("jssj") String jssj, @Param("cph")
            String cph, @Param("csz") String csz
//            ,@Param("pageIndex") Integer pageIndex, @Param("pageSize") Integer pageSize
            );



    class getYdcsdqx {
        public String getYdcsdqxjlctjDaoFindAll(@Param("kssj") String kssj, @Param("jssj") String jssj, @Param("cph")
                String cph, @Param("csz") String csz
//                ,@Param("pageIndex") Integer pageIndex, @Param("pageSize") Integer pageSize
                ) {

            String tj = "";
            String data = kssj.replaceAll("-", "").substring(2,6);

            if (kssj != null && !kssj.isEmpty() && !kssj.equals("null") && kssj.length() > 0) {
            	tj+= "AND b.SPEED_TIME >=str_to_date('"+kssj+"','%Y-%m-%d %H:%i:%s')";

            }

            if (jssj != null && !jssj.isEmpty() && !jssj.equals("null") && jssj.length() > 0) {
                tj+= "AND b.SPEED_TIME <=str_to_date('"+jssj+"','%Y-%m-%d %H:%i:%s')";
            }


            if (cph != null && !cph.isEmpty() && !cph.equals("null") && cph.length() > 0) {
                tj += "AND b.vehicle_num = '" + cph + "'";
            }

            if (csz != null && !csz.isEmpty() && !csz.equals("null") && csz.length() > 0) {
                tj += "AND b.SPEED >=" + Integer.parseInt(csz) + "";

            }

            String sql = "select b.VEHICLE_NUM,b.LONGI,b.LATI,b.SPEED,b.DIRECTION,date_format(b.SPEED_TIME,'%Y-%m-%d %H:%i:%s') TIME from TB_GPS_"+data+"  b where 1=1 ";
            sql += tj;

           /* String sql = "SELECT G.VEHICLE_NUM,G.LONGI,G.LATI,G.SPEED,G.DIRECTION," +
                    "date_format(G.SPEED_TIME,'%Y-%m-%d %H:%i:%s') TIME" +
                    " FROM hzgps_taxi.TB_GPS_1811@gps_113 G ";
            sql += " where 1=1 " + tj;*/
            System.out.println("单车速度曲线及车辆统计接口" + sql);
            return sql;
        }
    }




    @SelectProvider(type = getYdcsdqxExport.class, method = "getYdcsdqxjlctjDaoFindAllExport")
    public List<Map<String, Object>> getYdcsdqxjlctjDaoFindAllExport(@Param("kssj") String kssj, @Param("jssj") String jssj, @Param("cph")
            String cph, @Param("csz") String csz);
    class getYdcsdqxExport {
        public String getYdcsdqxjlctjDaoFindAllExport(@Param("kssj") String kssj, @Param("jssj") String jssj, @Param("cph")
                String cph, @Param("csz") String csz) {

        	String tj = "";
            String data = kssj.replaceAll("-", "").substring(2,6);

            if (kssj != null && !kssj.isEmpty() && !kssj.equals("null") && kssj.length() > 0) {
            	tj+= "AND b.SPEED_TIME >=str_to_date('"+kssj+"','%Y-%m-%d %H:%i:%s')";

            }

            if (jssj != null && !jssj.isEmpty() && !jssj.equals("null") && jssj.length() > 0) {
                tj+= "AND b.SPEED_TIME <=str_to_date('"+jssj+"','%Y-%m-%d %H:%i:%s')";
            }


            if (cph != null && !cph.isEmpty() && !cph.equals("null") && cph.length() > 0) {
                tj += "AND b.vehicle_num = '" + cph + "'";
            }

            if (csz != null && !csz.isEmpty() && !csz.equals("null") && csz.length() > 0) {
                tj += "AND b.SPEED >=" + Integer.parseInt(csz) + "";

            }

            String sql = "select b.VEHICLE_NUM,b.LONGI,b.LATI,b.SPEED,b.DIRECTION,date_format(b.SPEED_TIME,'%Y-%m-%d %H:%i:%s') TIME from TB_GPS_"+data+"  b where 1=1 ";
            sql += tj;

             /* String sql = "SELECT G.VEHICLE_NUM,G.LONGI,G.LATI,G.SPEED,G.DIRECTION," +
                      "date_format(G.SPEED_TIME,'%Y-%m-%d %H:%i:%s') TIME" +
                      " FROM hzgps_taxi.TB_GPS_1811@gps_113 G ";
              sql += " where 1=1 " + tj;*/
              System.out.println("单车速度曲线及车辆统计接口导出" + sql);
              return sql;
        }
    }










//Name
        @Select("SELECT DISTINCT G.VEHICLE_NUM FROM hzgps_taxi.TB_GPS_1811@gps_113 G where G.VEHICLE_NUM LIKE #{cph}")
   public List<Map<String, Object>> getYdcsdqxjlctjDaoFindAllName(@Param("cph") String cph);

/*
@SelectProvider(type = getqxtName.class,method = "getYdcsdqxjlctjDaoFindAllName")
    public List<Map<String, Object>> getYdcsdqxjlctjDaoFindAllName(@Param("cph") String cph);

class getqxtName{
    public String getYdcsdqxjlctjDaoFindAllName(@Param("cph") String cph){

String tj="";
        if (cph != null && !cph.isEmpty() && !cph.equals("null") && cph.length() > 0) {
            tj += "AND b.vehicle_num like '%" + cph + "%'";
        }



        String sql = "select (select count(*) COUNT from (select * from (select gv.* from hzgps_taxi.TB_GPS_1811@gps_113 gv) b where 1=1 ";
        sql += tj;
        sql += ")) as count, tt.* from (select t.* ,rownum as rn from (select"
                + " b.VEHICLE_NUM from (select gv.* from hzgps_taxi.TB_GPS_1811@gps_113 gv) b where 1=1 ";
        sql += tj;
        sql += " ) t where rownum <= 500) tt where tt.rn > 0";


        System.out.println("导出车辆牌号"+sql);
        return sql;
    }
}
*/


}
