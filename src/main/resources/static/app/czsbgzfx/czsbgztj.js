var czsbgztj = (function($) {
	var all = 0,re;
	$(function () {
		$('#czsbgztj-datetimeStart').datetimepicker(dateDefaultOption);
		$('#czsbgztj-datetimeEnd').datetimepicker(dateDefaultOption);
		var today = new Date();
		var oneday = 1000 * 60 * 10 * 1;
		$('#czsbgztj-datetimeStart').val(new Date(today).Format('yyyy-MM-dd'));
		$('#czsbgztj-datetimeEnd').val(new Date().Format('yyyy-MM-dd'));
		
//		$(".select2").select2({  
//		  	language: "zh-CN",  //设置 提示语言
//	        tags:true,  
//	        createTag:function (decorated, params) {  
//	            return null;  
//	        },  
//	    });
		
//		var yczt =[
//			       {id: '0', text: '主机故障'},
//			       {id: '1', text: '定位故障'},
//			       {id: '2', text: '通信故障'},
//			       {id: '3', text: '定位回传故障'},
//			       {id: '4', text: '摄像头故障'},
//			       {id: '5', text: '视频主机/存储故障'},
//			       {id: '6', text: '计价器断开故障'},
//			       {id: '7', text: '导航屏断开故障'},
//			       {id: '8', text: '空车灯故障'}
//			       ]
//		
//		var gz =[
//		   [  
//		       {id: '0', text: '终端主电源欠压'},
//		       {id: '1', text: '主电源掉电'},
//		       {id: '2', text: '无定位数据'},
//		       {id: '3', text: '无数据上传'}
//		   ],
//		   [  
//		       {id: '0', text: '定位模块故障'},
//		       {id: '1', text: '天线短路'},
//		       {id: '2', text: '非精确定位'}
//		   ],
//		   [  
//		       {id: '0', text: '通讯故障'}
//		   ],
//		   [  
//		       {id: '0', text: '定位回传过密'},
//		       {id: '1', text: '回传数据丢失'}
//		   ],
//		   [  
//		       {id: '0', text: '摄像头遮挡'},
//		       {id: '1', text: '摄像头信号丢失'}
//		   ],
//		   [  
//		       {id: '0', text: '硬盘故障'},
//		       {id: '1', text: 'SD卡故障'},
//		       {id: '2', text: '视频主机故障'},
//		       {id: '3', text: '视频扩展故障'}
//		   ],
//		   [  
//		       {id: '0', text: '计价器连接断开'}
//		   ],
//		   [  
//		       {id: '0', text: '导航屏断开'}
//		   ],
//		   [  
//		       {id: '0', text: '空重车不变化'},
//		       {id: '1', text: '空重车切换频繁'}
//		   ],
//		]
//		
//		$('#czsbgztj_yc').select2({
//			language: 'zh-CN',
//			width: '150',
//			minimumResultsForSearch: -1,
//			allowClear: true,
//			data: yczt
//		});
		
		
		jqxhr=$.ajax({
			type: "POST",
			url:"../../claq/qyveh",
			data:{},
			dataType: 'json',
			timeout : 3600000,
			success:function(json){
				console.log(json);
				var data= json.dataveh;
				for (var i = 0; i < data.length; i++) {
					data[i].id=data[i].ID;
					data[i].text=data[i].PLATE_NUMBER;
				}
				var qb={};
				qb.id='0';
				qb.text='全部';
				data.unshift(qb);
				$('#czsbgztj_cph').select2({
					data: data,
					allowClear: true
					});
			}
		});
		
		jqxhr=$.ajax({
			type: "POST",
			url:"../../claq/qycomp",
			data:{},
			dataType: 'json',
			timeout : 3600000,
			success:function(json){
				console.log(json);
				var data= json.datacomp;
				for (var i = 0; i < data.length; i++) {
					data[i].id=data[i].ID;
					data[i].text=data[i].NAME;
				}
				var qb={};
				qb.id='0';
				qb.text='全部';
				data.unshift(qb);
				$('#czsbgztj_xm').select2({
					data: data,
					allowClear: true
					});
			}
		});
		
		//初始化
		init();
		
		function validtion(a,b){
			if(a.replace("-","").substring(4,6) != b.replace("-","").substring(4,6)){
				return false;
			}else{
				return true;
			}
		}
		
		//图表
		function init(){
			$('#czsbgztjTable2 tbody').html("");
			if(!validtion($('#czsbgztj-datetimeStart').val(),$('#czsbgztj-datetimeEnd').val())){
				layer.msg("无法跨月查询");
				return;
			}
			layer.load(2);
			jqxhr=$.ajax({
     	       url:"../../tjfx/czsbgztj",
     	       data:{
//     	    	   "cph" : "全部",
//     	    	   "xm" :"全部",
//     	    	   "yc" : "全部",
     	    	   "stime":$('#czsbgztj-datetimeStart').val(),
     	    	   "etime":$('#czsbgztj-datetimeEnd').val(),
     	       },
     	       dataType: 'json'
            }).done(function(json) {
            	layer.closeAll('loading');
            	var tjdata = [],tjtitle = [];
            	var obj = json.data[0].datas[0];
            	
//            	if (obj.LOW_VOLTAGE>=0){
//            		tjtitle.push("终端主电源欠压");
//            		tjdata.push(obj.LOW_VOLTAGE);
//    			} if (obj.NO_POWER>=0){
//    				tjtitle.push("主电源掉电");
//    				tjdata.push(obj.NO_POWER);
//    			} 
    			if (obj.NO_GPS>=0){
    				tjtitle.push("有营运无定位");
    				tjdata.push(obj.NO_GPS);
    			}
    			if (obj.NO_JJQ>=0){
    				tjtitle.push("有定位无营运");
    				tjdata.push(obj.NO_JJQ);
    			}
    			if (obj.NO_GPS_JJQ>=0){
    				tjtitle.push("有抓拍无定位无营运");
    				tjdata.push(obj.NO_GPS_JJQ);
    			}
    			if (obj.SEVEN_GPS_JJQ>=0){
    				tjtitle.push("7天无定位无营运");
    				tjdata.push(obj.SEVEN_GPS_JJQ);
    			}
    			if (obj.EMPTY_HEAVY>=0){
    				tjtitle.push("全天空车全天重车");
    				tjdata.push(obj.EMPTY_HEAVY);
    			}
//    			if (obj.NO_UPLOAD>=0){
//    				tjtitle.push("无数据上传");
//    				tjdata.push(obj.NO_UPLOAD);
//    				
//    				
//    			} if (obj.MOD_FAULT>=0){
//    				tjtitle.push("定位模块故障");
//    				tjdata.push(obj.MOD_FAULT);
//    			} if (obj.ANT_FAULT>=0){
//    				tjtitle.push("天线短路");
//    				tjdata.push(obj.ANT_FAULT);
//    			} if (obj.INEXACT>=0){
//    				tjtitle.push("非精确定位");
//    				tjdata.push(obj.INEXACT);
//    				
//    				
//    			} if (obj.COMM_FAULT>=0){
//    				tjtitle.push("通讯故障");
//    				tjdata.push(obj.COMM_FAULT);
//    				
//    			} if (obj.GPS_OVER_BACK>=0){
//    				tjtitle.push("定位回传过密");
//    				tjdata.push(obj.GPS_OVER_BACK);
//    			} if (obj.GPS_NO_BACK>=0){
//    				tjtitle.push("回传数据丢失");
//    				tjdata.push(obj.GPS_NO_BACK);
//    				
//    			} 
//    			if (obj.CAM_OCCLUSION>=0){
//    				tjtitle.push("摄像头故障");
//    				tjdata.push(obj.CAM_OCCLUSION);
//    			} 
//    			if (obj.CAM_NOSIGN>=0){
//    				tjtitle.push("摄像头信号丢失");
//    				tjdata.push(obj.CAM_NOSIGN);
//    			} 
//    			if (obj.HD_FAULT>=0){
//    				tjtitle.push("硬盘故障");
//    				tjdata.push(obj.HD_FAULT);
//    			} if (obj.SD_FAULT>=0){
//    				tjtitle.push("SD卡故障");
//    				tjdata.push(obj.SD_FAULT);
//    			}
//    			if (obj.VD_FAULT>=0){
//    				tjtitle.push("视频主机故障");
//    				tjdata.push(obj.VD_FAULT);
//    			}
//    			if (obj.VD_EX_FAULT>=0){
//    				tjtitle.push("视频拓展故障");
//    				tjdata.push(obj.VD_EX_FAULT);
//    				
//    			} 
//    			if (obj.METER_DISCONN>=0){
//    				tjtitle.push("计价器断开故障");
//    				tjdata.push(obj.METER_DISCONN);
//    				
//    			} 
//    			if (obj.NAV_DISCONN>=0){
//    				tjtitle.push("导航屏断开");
//    				tjdata.push(obj.NAV_DISCONN);
//    				
//    			} if (obj.ST_NO_CHG>=0){
//    				tjtitle.push("空重车不变化");
//    				tjdata.push(obj.ST_NO_CHG);
//    			} if (obj.ST_OVER_CHG>=0){
//    				tjtitle.push("空重车切换频繁");
//    				tjdata.push(obj.ST_OVER_CHG);
//    			}
    			echart(tjtitle,tjdata);
    			var text ="<tr>",all=0;
    			for(var i=0;i<tjdata.length;i++){
    				text+="<td colspan ='5'>"+tjdata[i]+"</td>";
    				all+=tjdata[i];
    			}
    			text+="</tr><tr><td colspan ='5'>总数</td><td colspan ='20'>"+all+"</td></tr>";
    			$('#czsbgztjTable2 tbody').html(text);
            }).fail(function() {
//        			alert("数据异常");
            });
		}
		
		
		function echart(e,c){
			var hyzlEcharts_ddzl = echarts.init(document.getElementById('czsbgztjDown'));
			hyzlEcharts_ddzl.setOption({
				color: ['#1391fd', '#4575b4', '#74add1', '#d48265', '#6e7074', '#749f83', '#c4ccd3', '#fdae61', '#f46d43', '#d73027', '#a50026'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					top: '70px',
					left: '50px',
					right: '80px',
					bottom: '60px'
				},
				xAxis: [
					{
						name: '故障类型',
						type: 'category',
						data: e,
						axisTick: {
							alignWithLabel: true
						}
					}
				],
				yAxis: [
					{	name: '次数',
//						axisLabel: {
//				            formatter: function (value, index) {
//				                return (value/1000)+"千";
//				            }
//				        },
						type: 'value'
					}
				],
				series: [
					{
						name: '订单',
						type: 'bar',
						barWidth: '60%',
						markPoint: {
							data: [
								{type: 'max', name: '最大值'}
							]
						},
						data: c
					}
				]
			});
		}
		
		
		//查询
		$("#czsbgztj_cx").on('click',function(){
			init();
		});

		//导出
		$("#czsbgztj_dc").on('click',function(){
			if(!validtion($('#czsbgztj-datetimeStart').val(),$('#czsbgztj-datetimeEnd').val())){
				layer.msg("无法跨月导出");
				return;
			}
			var data = {
					"cph" : "全部",
	     	    	   "xm" :"全部",
	     	    	   "yc" : "全部",
     				"stime":$('#czsbgztj-datetimeStart').val(),
     				"etime":$('#czsbgztj-datetimeEnd').val()
				};
				url = "../../tjfx/czsbgztjxlsx?data=" + JSON.stringify(data) , window.open(url)
		});
	});
})(jQuery);
