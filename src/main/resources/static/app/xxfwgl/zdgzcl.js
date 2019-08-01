var zdgzcl = (function($) {
	var vehilist, heartCar ,zdgzclMap, zdgzvehilist;
	var all=[];
	var heartCar = [];
	var pointSimplifierIns,groupStyleMap={};
	var addzdgzcl='';
	var removezdgzcl='';
	
	jqxhr=$.ajax({
 		type: "POST",
	        url:"../../common/power",
	        data:{},
	        dataType: 'json',
			timeout : 3600000,
			success:function(data){
				console.log(data)
				if(data.data[0].menus.split(',').indexOf('重点关注车辆添加')>-1){
					addzdgzcl='添加';
				}
				if(data.data[0].menus.split(',').indexOf('重点关注车辆移除')>-1){
					removezdgzcl='移除';
				}
				if(addzdgzcl!='添加'){
					$(".icon-excel").hide();
				}
				if(removezdgzcl=='移除'){
					document.getElementById("clearVehi").style.display="block";//隐藏
				}
			}
	});

	
	function heartAppendEmpty(id) {
		$(id).empty();
		for (var i = 0; i < heartCar.length; i++) {
			var item = heartCar[i];
			var li = $('<li>').addClass('listItem').attr('style', 'height:40px');
			var title = $('<span>').addClass('col').attr('type', 'licensePlate').text(item);
			var heart = $('<span>').addClass('col iconfont icon-attention-all').attr({type : 'button',key : i}).on('click', function() {
				var index = $(this).attr('key');
				layer.confirm('确认删除吗？', {
					  btn: ['确认','取消'] // 按钮
					}, function(layerIndex){
						delOne(id,index,heartCar[index]);
						layer.close(layerIndex);
					}, function(){}
				);
				
			});
			li.append(title);
			if(removezdgzcl=='移除'){
				li.append(heart);
			}
			$('#zdgzcl-heartCarList').append(li);
		}
		$(".carevehi").html(heartCar.length);
		initClick();
		
		$(".clearVehi").off("click").on("click",function(){
			layer.confirm('确认删除吗？', {
				  btn: ['确认','取消'] // 按钮
				}, function(layerIndex){
				  delAll();
				  $('#searchCarItem').html("");
				  layer.close(layerIndex);
				}, function(){}
			);
		});
	}
//	
	function delAll(){
		jqxhr=$.ajax({
     		type: "POST",
 	        url:"../../claq/delAllVehi",
 	        data:{},
 	        dataType: 'json',
 			timeout : 3600000,
 			success:function(data){
 				console.log(data)
 				if(data.msg == "数据异常"){
// 					layer.msg("数据异常");
 				}else{
 					layer.msg("清除成功");
 					heartCar.length = 0;
 					$('#zdgzcl-heartCarList').html("");
 					$(".carevehi").html("0");
// 					heartAppendEmpty(id);
 				}
 			}
		});
	}
	
	function delOne(id,index,obj){
		jqxhr=$.ajax({
     		type: "POST",
 	        url:"../../claq/delVehi",
 	        data:{"vehi":obj},
 	        dataType: 'json',
 			timeout : 3600000,
 			success:function(data){
 				console.log(data)
 				if(data.msg == "数据异常"){
// 					layer.msg("数据异常");
 				}else{
 					heartCar.splice(index, 1);
 					if(heartCar.length == 0){
 						$('#searchCarItem').html("");
 					}
 					heartAppendEmpty(id);
 					layer.msg("清除成功");
 				}
 			}
		});
	}
	
	function insOne(id,obj){
		console.log(obj)
		var count=0;
		for(var i=0;i<=vehilist.length;i++){
			if(vehilist[i] != undefined && vehilist[i].vehino == obj){
				count ++;
				jqxhr=$.ajax({
		     		type: "POST",
		 	        url:"../../claq/insVehi",
		 	        data:{"vehi":obj,
		 	        	  "type":"0",
		 	        	  "longi":vehilist[i].longi,
		 	        	  "lati":vehilist[i].lati},
		 	        dataType: 'json',
//		 	        cache:false, 
//		 	        async:false, 
		 			timeout : 3600000,
		 			success:function(data){
		 				console.log(data)
		 				if(data.msg == "数据异常"){
//		 					layer.msg("数据异常");
		 					return;
		 				}else{
		 					heartCar.push(obj);
		 					heartAppendEmpty(id);
		 					layer.msg("关注成功");
		 					return;
		 				}
		 			}
				});
			}
		}
		if(count==0){			
			layer.msg("请输入正确的车牌号码");
		}
	}
	
	function init(){
		$('.scrollbar-macosx').scrollbar();
		$('.searchBar[type=searchAndExcel] .btn-last:nth-last-child(2)').on('click',function() {
			if ($(this).hasClass('ip-icon-search')) {/* 搜索功能 */
				var input = $(this).siblings('input[type=text]');
				if (!input.val()){
					$('#searchCarItem').html("");
					return layer.msg('无结果');
					$(".carevehi").html("0");
				}
				var vehi = input.val();
				console.log(vehi)
				var text = "";
				var item = $('#searchCarItem');
				var title = $('<span>').addClass('col').attr('type', 'licensePlate').text(input.val());
				var heart = $('<span>').addClass('col btn-heart iconfont icon-attention-oll').attr('type', 'button').on('click',function() {
					if ($(this).hasClass('icon-attention-oll')) {
						console.log("###")
						layer.confirm('确认关注吗？', {
							  btn: ['确认','取消'] // 按钮
							}, function(){
								insOne('#zdgzcl-heartCarList',vehi);
								layer.close();
								$(this).removeClass('icon-attention-oll').addClass('icon-attention-all');
							}, function(){
						});
					} else if ($(this).hasClass('icon-attention-all')) {
						layer.confirm('确认删除吗？', {
							  btn: ['确认','取消'] // 按钮
							}, function(){
								delOne('#zdgzcl-heartCarList',heartCar.indexOf(vehi),vehi);
								layer.close();
								$(this).removeClass('icon-attention-all').addClass('icon-attention-oll');
							}, function(){}
						);
					}
				});
				if(vehi.length >= 7){
					if(heartCar.indexOf(vehi) != -1){
						console.log("sss")
						text +='<span class="col" type="licensePlate">'+vehi+'</span>'+
						'<span class="col btn-heart iconfont icon-attention-all-empty" type="button"></span>';
						heart.removeClass('icon-attention-oll').addClass('icon-attention-all');
					}else{
						for(var i=0;i<=vehilist.length;i++){
							if(vehilist[i] != undefined && vehilist[i].vehino == vehi){
								text +='<span class="col" type="licensePlate">'+vehi+'</span>'+
									'<span class="col btn-heart iconfont icon-attention-all-empty" type="button"></span>';
							}
						}
					}
					$('#searchCarItem').html(text);
					initZdgzcl();
				}else{
					$('#searchCarItem').html("");
					layer.msg("请输入完整车牌号");
					return;
				}
				
				item.empty();
				item.append(title);
				if(addzdgzcl=='添加'){
					item.append(heart);					
				}
			} else {/* 上传文件 */
				console.log("###")
				$('#form_cl').ajaxSubmit({
					url:"../../claq/upload",
		        　　  	type : 'POST',
		         　　 	dataType : 'json',
		         　　	headers : {"ClientCallMode" : "ajax"}, //添加请求头部
		        　　  	success : function(data) {
		        　　  		console.log(data)
	            		if(data.msg == "success"){
	            			//插入数据成功  读取数据  地图打点
	            			console.log("ok");
	            			initZdgzcl();
	            		}
		           　　    }
				});
			}
		});
		
		$('.searchBar[type=searchAndExcel] .btn-last:last-child').on('click',function() {
			var btn = $(this).prev('.btn-last');
			var input = $(this).siblings('input[type=text]');
			var icon = $(this).siblings('.icon-first');
			var heartListBox = $('#zdgzcl-heartCarList');
			var searchCarItem = $('#searchCarItem');
			if ($(this).hasClass('icon-excel')) {/* 跳转到-上传文件 */
				var inputFile = $('<input>').attr({type : 'file',id : 'zdgzclfile',name:'file'}).css({display : 'none'}).on('change',function(){
					input.val($(this).val());
				});
				input.after(inputFile)
				$(this).removeClass('iconfont icon-excel').addClass('ip-iconfont ip-icon-remove');
				btn.removeClass('ip-iconfont ip-icon-search').addClass('ip-iconfont ip-icon-open');
				icon.removeClass('iconfont icon-car').addClass('ip-iconfont ip-icon-folder-open').css({fontSize : '14px'});
				input.prop('placeholder', '文件选择...').on('click',function() {
					inputFile.trigger('click');
				});
				searchCarItem.hide();
				$('.scrollbar-macosx').scrollbar();
				heartListBox.parents('.scrollbar-macosx').css({height : 'calc(100% - 228px)'}).next('.btn').on('click', function() {
					heartListBox.empty();
				});
			} else {/* 跳转到-搜索框 */
				var file = $(this).siblings('input[type=file]');
				console.info('file', file)
				if (file.length > 0)
					file.remove();
				$(this).removeClass('ip-iconfont ip-icon-remove').addClass('iconfont icon-excel');
				btn.removeClass('ip-iconfont ip-icon-open').addClass('ip-iconfont ip-icon-search');
				icon.removeClass('ip-iconfont ip-icon-folder-open').addClass('iconfont icon-car').removeAttr('style');
				input.prop('placeholder', '输入完整车牌号').off('click');
				searchCarItem.show();
				$('.scrollbar-macosx').scrollbar();
				heartListBox.parents('.scrollbar-macosx').css({height : 'calc(100% - 273px)'}).next('.btn').on('click', function() {
					heartListBox.empty();
				});
			}
		});
	}
	
	function initZdgzcl(){
		jqxhr=$.ajax({
     		type: "POST",
 	        url:"../../claq/zdgzcl",
 	        data:{},
 	        dataType: 'json',
 			timeout : 3600000,
 			success:function(data){
 				heartCar = [];
 				console.log(data)
 				if(data == null){                     
// 					layer.msg("数据异常");
 				}else{
 					zdgzvehilist = data.data;
 					for(var i=0;i<zdgzvehilist.length;i++){
 						heartCar.push(zdgzvehilist[i].VEHICLE);
 					}
 					heartAppendEmpty('#zdgzcl-heartCarList');
//   				打印位置
 					for (var i = 0; i < vehilist.length; i++) {
 						for(var j = 0; j < zdgzvehilist.length; j++){
 							if(vehilist[i].vehino == zdgzvehilist[j].VEHICLE) {
 								var ve  = vehilist[i];
 								var s = {};
 								s.lnglat = [ve.longi,ve.lati];
 								s.vehino = ve.vehino;
 								s.compname = ve.compname;
 								s.simka = ve.simka;
 								s.mdt_no=ve.mdt_no;
 								s.ownname = ve.ownname;
 								s.owntel = ve.owntel;
 								s.longi = ve.longi;
 								s.lati = ve.lati;
 								s.speed = ve.speed;
 								s.dateTime=ve.dateTime;
 								s.heading = ve.heading;
 								s.carState = ve.carState;
 								s.onoffstate = ve.onoffstate;
 								s.type = (zdgzvehilist[j].TYPE=="0"?"重点监控车辆":"逾期未维修车辆");
 								if (ve.onoffstate=="1") {
 									if (ve.carStatus=="0") {
 										s.groupId = dirc("empty",ve.heading);
 									}else{
 										s.groupId = dirc("busy",ve.heading);
 									}
 								}else{
 									s.groupId = dirc("off",ve.heading);
 								}
 								all.push(s);
 							}
 						}
					}
					markvehi(all);
 					
 					$(".carevehi").html(zdgzvehilist.length);
 					
 					$('#zdgzclcph').on("keyup",function(){
 	 					var vehi = this.value;
 	 					var text = "";
 	 					heartCar.length = 0;
 	 					if(this.value.length >= 3){
 	 						for(var i=0;i<=zdgzvehilist.length;i++){
 	 							if(zdgzvehilist[i] != undefined && zdgzvehilist[i].VEHICLE.indexOf(vehi) != -1){
 	 								text +='<li class="listItem">'+
 	 									       '<span class="col" type="licensePlate">'+zdgzvehilist[i].VEHICLE+'</span>'+
 	 									       '<span class="col iconfont icon-attention-all" type="button"></span>'+
 	 									    '</li>';
 	 								heartCar.push(zdgzvehilist[i].VEHICLE);
 	 							}
 	 						}
 	 					}else if(this.value.length == 0){
 	 						for(var i=0;i<=zdgzvehilist.length;i++){
 	 							if(zdgzvehilist[i] != undefined){
 	 								text +='<li class="listItem">'+
 	 									       '<span class="col" type="licensePlate">'+zdgzvehilist[i].VEHICLE+'</span>'+
 	 									       '<span class="col iconfont icon-attention-all" type="button"></span>'+
 	 									    '</li>';
 	 								heartCar.push(zdgzvehilist[i].VEHICLE);
 	 							}
 	 						}
 	 					}
 	 					$(".carevehi").html(zdgzvehilist.length);
 	 					$('#zdgzcl-heartCarList').html(text);
 	 					heartAppendEmpty('#zdgzcl-heartCarList');
 					});
 				}
 			}
		});
	}
	
	//判断方向
	function dirc(e,obj){
		if(e == "busy"){
			if(obj==0||obj==360){
				return 1;
			}else if(obj==90){
				return 2;
			}else if(obj==180){
				return 3;
			}else if(obj==270){
				return 4;
			}else if(obj>0&&obj<90){
				return 5;
			}else if(obj>90&&obj<180){
				return 6;
			}else if(obj>180&&obj<270){
				return 7;
			}else if(obj>270&&obj<360){
				return 8;
			}
		}else if(e == "off"){
			if(obj==0||obj==360){
				return 9;
			}else if(obj==90){
				return 10;
			}else if(obj==180){
				return 11;
			}else if(obj==270){
				return 12;
			}else if(obj>0&&obj<90){
				return 13;
			}else if(obj>90&&obj<180){
				return 14;
			}else if(obj>180&&obj<270){
				return 15;
			}else if(obj>270&&obj<360){
				return 16;
			}
		}else{
			if(obj==0||obj==360){
				return 17;
			}else if(obj==90){
				return 18;
			}else if(obj==180){
				return 19;
			}else if(obj==270){
				return 20;
			}else if(obj>0&&obj<90){
				return 21;
			}else if(obj>90&&obj<180){
				return 22;
			}else if(obj>180&&obj<270){
				return 23;
			}else if(obj>270&&obj<360){
				return 24;
			}
		}
	}
	
	var flag = true;
	function markvehi(obj){
		if(pointSimplifierIns != undefined){
			console.log("clear")
			pointSimplifierIns.setData(null);
		}
		if(!flag){
			pointSimplifierIns.setData(obj);
			return;
		}
		AMapUI.load(['ui/misc/PointSimplifier', 'lib/$'], function(PointSimplifier, $) {
	        if (!PointSimplifier.supportCanvas) {
	            alert('当前环境不支持 Canvas！');
	            return;
	        }
	        for (var i = 0; i < 8; i++) {
		   		groupStyleMap[(i+1)] = {
					    pointStyle: {
					        content: PointSimplifier.Render.Canvas.getImageContent("../../resources/images/car/z"+(i+1)+".png"),
					        width: 30,
					        height: 30,
					        offset: ['-50%', '-50%'],
					        fillStyle: null
					    }
					};
		   		groupStyleMap[(i+9)] = {
					    pointStyle: {
					        content: PointSimplifier.Render.Canvas.getImageContent("../../resources/images/car/l"+(i+1)+".png"),
					        width: 30,
					        height: 30,
					        offset: ['-50%', '-50%'],
					        fillStyle: null
					    }
					};
		   		groupStyleMap[(i+17)] = {
					    pointStyle: {
					        content: PointSimplifier.Render.Canvas.getImageContent("../../resources/images/car/k"+(i+1)+".png"),
					        width: 30,
					        height: 30,
					        offset: ['-50%', '-50%'],
					        fillStyle: null
					    }
					};
			}
	    	pointSimplifierIns = new PointSimplifier({
	            zIndex: 300,
	            map: zdgzclMap, // 所属的地图实例
	            autoSetFitView: false,
	            getPosition: function(item) {
            		return item.lnglat;
	            },
	            getHoverTitle: function(dataItem, idx) {
//		            	remark(dataItem);
//		            	return null;
	            },
	            // 使用GroupStyleRender
	            renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
	            renderOptions: {
	            	pointStyle: {
	                    width: 5,
	                    height: 5,
	                    fillStyle:'#A2D0FA'
	                },
	                getGroupId: function(item, idx) {
	                	return item.groupId;
	                },
	                groupStyleOptions: function(gid) {
	                	return groupStyleMap[gid];
	                }
	            }
	        });
	    	pointSimplifierIns.setData(obj);
	    	zdgzclMap.setZoomAndCenter(14,[120.153576,30.287459])
	    	pointSimplifierIns.on("pointClick",function(e,p){
	    		makerCar(p.data);
	    	});
	    	flag = false;
		});
	}
	
	function initClick(){
		$('#zdgzcl-heartCarList li').on('click',function(){
			zdgzclMap.clearMap();
			var ve = $($(this).children()[0]).html();
			for(var i=0;i<=all.length;i++){
				if(all[i] != undefined && all[i].vehino == ve){
					makerCar(all[i]);
					break;
				}
			}
		});
	}
	
	function makerCar(obj){
		console.log(obj)
		var status,statue;
		if (obj.lati == null || "" == obj.lati
				|| 0==obj.lati
				|| ""==obj.longi
				|| 0 ==obj.longi 
		) {
			status = "off";
			statue = "离线";
		}else{
			if (obj.onoffstate=="1") {
				if (obj.carStatus=="0") {
					status = "empty";
					statue = "空车";
				}else{
					status = "busy";
					statue = "重车";
				}
			}else if (obj.onoffstate=="0") {
				status = "off";
				statue = "离线";
			}
		}
		obj.time = obj.dateTime.substring(0,19);
		var inforWindow = new AMap.InfoWindow({
		    offset:new AMap.Pixel(0,0)
		});
		var txt = '<div class="mapInfo-body">'+
						'<div class="mapInfo-title">'+obj.vehino+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="所属公司">'+obj.compname+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="SIM卡">'+obj.simka+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="终端号">'+obj.mdt_no+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="车辆所属人">'+obj.ownname+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="联系电话">'+obj.owntel+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="经度">'+obj.longi+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="纬度">'+obj.lati+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="速度">'+obj.speed+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="方向">'+fxzh(obj.heading)+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="状态">'+statue+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="GPS时间">'+obj.time+'</div>'+
						'<div class="mapInfo-item" type="mapInfoItem" title="关注类型">'+obj.type+'</div>'+
					'</div>';
		inforWindow.setContent(txt);
		inforWindow.open(zdgzclMap,new AMap.LngLat(obj.longi,obj.lati));
		zdgzclMap.setZoomAndCenter(14,new AMap.LngLat(obj.longi,obj.lati));
	}
	
	function initAll(){
		jqxhr=$.ajax({
     		type: "POST",
 	        url:"../../claq/qyjk",
 	        data:{},
 	        dataType: 'json',
 			timeout : 3600000,
 			success:function(data){
 				console.log(data)
 				if(data == null){
// 					layer.msg("数据异常");
 				}else{
 					vehilist = data.vehilist;
 					initZdgzcl();
 					init();
 				}
 			}
		});
	}
	
	$(function() {
		zdgzclMap = new AMap.Map('zdgzclMap', {
			zoom:14,
			center: new AMap.LngLat(120.153576,30.287458)
		});
//		initZdgzcl();
		initAll();
		setInterval(function(){
			console.log("20s again")
			initAll();
		},20000);
//		init();
	})
})(jQuery);