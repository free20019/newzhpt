var wxclcx=(function ($) {
	var clfb_map;
	$(function () {
		$('#wxcl-stateTime').datetimepicker(datetimeDefaultOption);
//		$('#wxcl-stateTime').val(new Date().Format('yyyy-MM-dd hh:mm:ss'));
		$('#wxcl-endTime').datetimepicker(datetimeDefaultOption);
//		$('#wxcl-endTime').val(new Date().Format('yyyy-MM-dd hh:mm:ss'));

		findvehicle('');
		$(document).ready(function() {
			$(".select2").select2({  
				language: "zh-CN",  //设置 提示语言
				tags:true,  
		        allowClear: true,
				createTag:function (decorated, params) {  
					return null;  
				},  
			});
		});
		function findvehicle(obj){
			jqxhr=$.ajax({
				type: "POST",
				url: "../../sbwx/clxll",
				data:{"table":"tb_vehicle"},
				timeout : 180000,
				dataType: 'json',
				success:function(data){
					$("#wxcl-cphm").empty();
					$("#wxcl-cphm").append('<option value="" selected></option>');
					$("#wxcl-cphm").append('<option value="null">全部车辆</option>');
					for(var i=0; i<data.length;i++){
						if(obj.length>0){
							if(obj == data[i].VEHI_NO){
								$("#wxcl-cphm").append('<option value="'+data[i].VEHI_NO+'" selected>'+data[i].VEHI_NO+'</option>');
							}else{
								$("#wxcl-cphm").append('<option value="'+data[i].VEHI_NO+'">'+data[i].VEHI_NO+'</option>');
							}
						}else{
							$("#wxcl-cphm").append('<option value="'+data[i].VEHI_NO+'">'+data[i].VEHI_NO+'</option>');
						}
					}
				},
				error: function(){
				}         
			});
		}
		
		jqxhr=$.ajax({
			type: "POST",
			url: "../../sbwx/xll",
			data:{"table":"tb_company"},
			timeout : 180000,
			dataType: 'json',
			success:function(data){
				$("#wxcl-company").empty();
				$("#wxcl-company").append('<option value="" disabled selected>业户</option>');
				$("#wxcl-company").append('<option value="null">全部业户</option>');
				for(var i=0; i<data.length;i++){
					$("#wxcl-company").append('<option value="'+data[i].COMP_NAME+'">'+data[i].COMP_NAME+'</option>');				
				}
			},
			error: function(){
			}         
		});
		
		
		var bljlFields = [
		                  	{name: 'id', title: '序号', width: 60, align: 'center'},
		                  	{name: 'cphm', title: '车牌号', width: 80, align: 'center'},
			    			{name: 'gs', title: '业户', width: 120, align: 'center'},
			    			{name: 'gzlx', title: '当前故障类型', width: 240, align: 'center'},
			    			{name: 'simk', title: 'SIM卡', width: 120, align: 'center'},
			    			{name: 'cz', title: '车主', width: 80, align: 'center'},
			    			{name: 'sjhm', title: '手机号码', width: 120, align: 'center'},
			    			{name: 'gzsj', title: '故障发生时间', width: 80, align: 'center'},
			    			{name: 'caozuo', title: '操作', width: 60, align: 'center'},
			    		];
		$('#wxcl-select').on('click', function () {
			findwxcl();
		});
		function findwxcl(){
			var all = 0;
			$('#wxclTable').jsGrid({
				width: '100%',
				height: 'calc(100% - 55px)',
				autoload: true,
				paging: true,
				pageLoading: true,
				editing: true,

				pageSize: 15,
				pageIndex: 1,
				controller: {
                    loadData: function(filter) {
                    	var d = $.Deferred();
                    	var a = re(filter, function(item){
                    		d.resolve(item);
                    	})
                    	return d.promise();
                    }
                },
                fields: bljlFields,
				pagerContainer: null,
			    pageButtonCount: 5,
			    pagerFormat: "{first} {prev} {pages} {next} {last} {pageIndex} of {pageCount}",
			    pagePrevText: "上一页",
			    pageNextText: "下一页",
			    pageFirstText: "第一页",
			    pageLastText: "末页",
			    pageNavigatorNextText: ">",
			    pageNavigatorPrevText: "<"
          	});
		}
		function re(filter, callback){
            var startIndex = (filter.pageIndex - 1) * filter.pageSize;
            jqxhr=$.ajax({
            	type: "POST",
				url: "../../sbwx/findwxcl",
				data:{"stime":$("#wxcl-stateTime").val(),
					"etime":$("#wxcl-endTime").val(),
					"vehicle":$("#wxcl-cphm").val(),
					"company":$("#wxcl-company").val(),
					"terminal":$("#wxcl-terminal").val(),
					"pageIndex":filter.pageIndex,
     				"pageSize":filter.pageSize
					},
				timeout : 180000,
				dataType: 'json',
            }).done(function(data) {
            		var jsycxData = [];
     				all = data[0].count;
         			if(data.length>0){
         				for(var i = 0; i< data[0].datas.length ;i++){
         					var rs={};
         					var vehicle=data[0].datas[i];
         					var gz='';
         					//主机故障
         					if(vehicle.LOW_VOLTAGE!='0'||vehicle.NO_POWER!='0'||vehicle.NO_GPS!='0'||vehicle.NO_UPLOAD!='0'){
         						gz +='主机故障(';
         						if(vehicle.LOW_VOLTAGE!='0'){
         							gz +='终端主电源欠压,';
         						}
         						if(vehicle.NO_POWER!='0'){
         							gz +='主电源掉电,';
         						}
         						if(vehicle.NO_GPS!='0'){
         							gz +='无定位数据,';
         						}
         						if(vehicle.NO_UPLOAD!='0'){
         							gz +='无数据上传,';
         						}
         						gz +='),';
         					}
         					//定位故障
         					if(vehicle.MOD_FAULT!='0'||vehicle.ANT_FAULT!='0'||vehicle.INEXACT!='0'){
         						gz +='定位故障(';
         						if(vehicle.MOD_FAULT!='0'){
         							gz +='定位模块故障,';
         						}
         						if(vehicle.ANT_FAULT!='0'){
         							gz +='天线短路,';
         						}
         						if(vehicle.INEXACT!='0'){
         							gz +='非精确定位,';
         						}
         						gz +='),';
         					}
         					//通信故障
         					if(vehicle.COMM_FAULT!='0'){
         						gz +='通信故障(';
         						gz +='通讯故障';
         						gz +='),';
         					}
         					//定位回传故障
         					if(vehicle.GPS_OVER_BACK!='0'||vehicle.GPS_NO_BACK!='0'){
         						gz +='定位回传故障(';
         						if(vehicle.GPS_OVER_BACK!='0'){
         							gz +='定位回传过密,';
         						}
         						if(vehicle.GPS_NO_BACK!='0'){
         							gz +='回传数据丢失,';
         						}
         						gz +='),';
         					}
         					//摄像头故障
         					if(vehicle.CAM_OCCLUSION!='0'||vehicle.CAM_NOSIGN!='0'){
         						gz +='摄像头故障(';
         						if(vehicle.CAM_OCCLUSION!='0'){
         							gz +='摄像头遮挡,';
         						}
         						if(vehicle.CAM_NOSIGN!='0'){
         							gz +='摄像头信号丢失,';
         						}
         						gz +='),';
         					}
         					//视频主机/存储故障
         					if(vehicle.HD_FAULT!='0'||vehicle.SD_FAULT!='0'||vehicle.VD_FAULT!='0'||vehicle.VD_EX_FAULT!='0'){
         						gz +='视频主机/存储故障(';
         						if(vehicle.HD_FAULT!='0'){
         							gz +='硬盘故障,';
         						}
         						if(vehicle.SD_FAULT!='0'){
         							gz +='SD卡故障,';
         						}
         						if(vehicle.VD_FAULT!='0'){
         							gz +='视频主机故障,';
         						}
         						if(vehicle.VD_EX_FAULT!='0'){
         							gz +='视频扩展故障,';
         						}
         						gz +='),';
          					}
         					//计价器断开故障
         					if(vehicle.METER_DISCONN!='0'){
         						gz +='计价器断开故障(';
         						gz +='计价器连接断开';
         						gz +='),';
         					}
         					//导航屏断开故障
         					if(vehicle.NAV_DISCONN!='0'){
         						gz +='导航屏断开故障(';
         						gz +='导航屏断开';
         						gz +='),';
         					}
         					//空车灯故障
         					if(vehicle.ST_NO_CHG!='0'||vehicle.ST_OVER_CHG!='0'){
         						gz +='空车灯故障(';
         						if(vehicle.ST_NO_CHG!='0'){
         							gz +='空重车不变化,';
         						}
         						if(vehicle.ST_OVER_CHG!='0'){
         							gz +='空重车切换频繁,';
         						}
         						gz +='),';
         					}
         					rs.id =  startIndex+i+1;
         					rs.gs =  data[0].datas[i].COMP_NAME;
         					rs.cphm =  data[0].datas[i].VEHICLE_NO;
         					rs.gzlx =  gz;
         					rs.simk =  data[0].datas[i].SIM_NUM;
         					rs.cz =  data[0].datas[i].OWN_NAME;
         					rs.sjhm =  data[0].datas[i].OWN_TEL;
         					rs.gzsj = (data[0].datas[i].DB_TIME==null?"":(new Date(data[0].datas[i].DB_TIME)).Format("yyyy-MM-dd hh:mm:ss"));
         					rs.caozuo = "<a href='javascript:void(0);' onclick='findclzz(\""+vehicle.VEHICLE_NO+"\");'>跟踪</a>";
         					jsycxData.push(rs);
         				}
         				return callback({
                            data: jsycxData,
                            itemsCount: all
                        });
         			}else{
        			}
            }).fail(function() {
//        			alert("数据异常");
            });
		}
		findwxcl();
		$('#wxcl-reset').on('click', function () {
			$('.panel-queryBar .form-control').val('');
			$('.panel-queryBar .select2').val([""]).trigger("change");
			$('#wxcl-terminal').html('<option value="" disabled selected>具体异常状态</option>');
		});
		$('#wxcl-dc').on('click', function () {
			layer.confirm('你确定要导出数据', {
				btn: ['确定', '取消'],
				offset: '100px'
			}, function (layerIndex) {
				window.open(basePath+"sbwx/findwxcldc?stime="+$("#wxcl-stateTime").val()
						+"&etime="+$("#wxcl-endTime").val()
						+"&vehicle="+$("#wxcl-cphm").val()
						+"&company="+$("#wxcl-company").val()
						+"&terminal="+$("#wxcl-terminal").val()
				);
				layer.close(layerIndex);
			}, function (layerIndex) {
				layer.close(layerIndex);
			});
		});
	})
	
})(jQuery)
function findclzz(vehicle){
	var _parent = parent.$(window.parent.document);
	if (_parent.find('.ip-tabBarItem[data-name="wxcltj"]').length > 0) {
		_parent.find('.ip-tabBarItem[data-name="wxcltj"]').trigger('click');
		_parent.find('#wxcltj').get(0).contentWindow.location.reload(true);
	}
	_parent.find('.ip-menuItem [data-skip="wxcltj"]').trigger("click");
	_parent.find('#defaultVehicle').val(vehicle);
}
function findgz(){
	var gz=$('#wxcl-type').val();
	var text='';
	if(gz=='0'){
		text +='<option value="">全部</option>';
	}
	if(gz=='1'){
		text +='<option value="LOW_VOLTAGE">终端主电源欠压</option>'
			  +'<option value="NO_POWER">主电源掉电</option>'
			  +'<option value="NO_GPS">无定位数据</option>'
			  +'<option value="NO_UPLOAD">无数据上传</option>';
	}
	if(gz=='2'){
		text +='<option value="MOD_FAULT">定位模块故障</option>'
			  +'<option value="ANT_FAULT">天线短路</option>'
			  +'<option value="INEXACT">非精确定位</option>';
	}
	if(gz=='3'){
		text +='<option value="COMM_FAULT">通讯故障</option>';
	}
	if(gz=='4'){
		text +='<option value="GPS_OVER_BACK">定位回传过密</option>'
			  +'<option value="GPS_NO_BACK">回传数据丢失</option>';
	}
	if(gz=='5'){
		text +='<option value="CAM_OCCLUSION">摄像头遮挡</option>'
			  +'<option value="CAM_NOSIGN">摄像头信号丢失</option>';
	}
	
	if(gz=='6'){
		text +='<option value="HD_FAULT">硬盘故障</option>'
			  +'<option value="SD_FAULT">SD卡故障</option>'
			  +'<option value="VD_FAULT">视频主机故障</option>'
			  +'<option value="VD_EX_FAULT">视频扩展故障</option>';
	}
	if(gz=='7'){
		text +='<option value="METER_DISCONN">计价器连接断开</option>';
	}
	if(gz=='8'){
		text +='<option value="NAV_DISCONN">导航屏断开</option>';
	}
	if(gz=='9'){
		text +='<option value="ST_NO_CHG">空重车不变化</option>'
			  +'<option value="ST_OVER_CHG">空重车切换频繁</option>';
	}
	$('#wxcl-terminal').html(text);
}
