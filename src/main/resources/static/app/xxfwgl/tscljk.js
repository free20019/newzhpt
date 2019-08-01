var tscljk = (function($) {
	$(function () {
		$('.scrollbar-macosx').scrollbar();

		$('#tsclcxTab .mp-tabs-item').on('click', function () {
			var skip = $(this).attr('skip');
			console.info('skip:', skip)
			$(this).addClass('active').siblings('.active').removeClass('active')
			$('#tsclcxTab .mp-tabs-body').find('#'+skip).addClass('active').siblings('.active').removeClass('active')
		});

		$('#tsclcx-datetimeStart').datetimepicker(datetimeDefaultOption);
		$('#tsclcx-datetimeStart').val(new Date().Format('yyyy-MM-dd hh:mm:ss'));
		$('#tsclcx-datetimeEnd').datetimepicker(datetimeDefaultOption);
		$('#tsclcx-datetimeEnd').val(new Date().Format('yyyy-MM-dd hh:mm:ss'));

		$('.form-control[type=calendar] .glyphicon-calendar').on('click', function () {
			$(this).next('input').trigger('focus');
		});
		titlePanelScaling('#tsclcxPanel', {width: 360});

		var shiwumap = new AMap.Map('tsclcxMap', {
			zoom:14,
			center: new AMap.LngLat(120.153576,30.287459)
		});

		var fxudmouseTool = null;
		var polygonfk = null;
		var polygonfks = [null, null];
		var udpolygonOption = {
			strokeColor: "",
			strokeOpacity: 0,
			strokeWeight: 1
		};
		var isStart = false, isEnd = false;
		var mouseTool = null;
		var qd_jwd = "", zd_jwd = "";
		var kt1 = new Array(), kt2 = new Array();
		var zj;


		setTimeout(function () {
			$($($(window.parent.document)).find('.ip-menuItem').get(3)).find('.ip-menuTitle').click();
		}, 1000)


		//起点
		$('#dwqdfw').click(function () {
			if (!isStart) isStart = arawAreaFun(shiwumap, isStart, 1);
		});
		//终点
		$('#dwzdfw').click(function () {
			if (!isEnd) isEnd = arawAreaFun(shiwumap, isEnd, 2);
		});
		//清除地图
		$('#clearMap').click(function () {
			if (polygonfk != null) {
				shiwumap.clearMap();
			}
			qd_jwd = "";
			zd_jwd = "";
			isStart = false;
			isEnd = false;
			polygonfks = [null, null];
			$('#qdfwPanel table tbody, #clxxPanel table tbody, #zdfwPanel table tbody').empty();
		});
		//导出
		$('#swcz_dc').on('click', function () {
			if ($('#clxxPanel table tbody').html() == "") {
				alert("无数据无法导出信息!");
			} else {
				var data = {
					"qd_stime": timestart($("#tsclcx-datetimeStart").val(), $("#qd_etime").val()),
					"qd_etime": timeend($("#tsclcx-datetimeStart").val(), $("#qd_etime").val()),
					"zd_stime": timestart($("#tsclcx-datetimeEnd").val(), $("#zd_etime").val()),
					"zd_etime": timeend($("#tsclcx-datetimeEnd").val(), $("#zd_etime").val()),
					"qd_jwd": qd_jwd,
					"zd_jwd": zd_jwd,
				};
				url = "http://115.236.61.148:9085/zhpt/claq/findswczexcle?data=" + JSON.stringify(data) , window.open(url)
			}
		});
		
		//查询
		$('#swcz_cx').on('click', function () {
			if (qd_jwd == "" || zd_jwd == "") {
				alert("请先选择区域!");
				return;
			}
			layer.load(2);
			$("#swcz_cx").attr('disabled', "true");
			jqxhr=$.ajax({
				type: "POST",
				url: "http://115.236.61.148:9085/zhpt/claq/findswcz",
				data: {
					"qd_stime": timestart($("#tsclcx-datetimeStart").val(), $("#qd_etime").val()),
					"qd_etime": timeend($("#tsclcx-datetimeStart").val(), $("#qd_etime").val()),
					"zd_stime": timestart($("#tsclcx-datetimeEnd").val(), $("#zd_etime").val()),
					"zd_etime": timeend($("#tsclcx-datetimeEnd").val(), $("#zd_etime").val()),
					"qd_jwd": qd_jwd,
					"zd_jwd": zd_jwd,
				},
				dataType: 'json',
				timeout: 3600000,
				success: function (json) {
					console.log(json)
					$('#qdfwPanel table tbody, #clxxPanel table tbody, #zdfwPanel table tbody').empty();
					console.log(json[0].length + "   " + json[1].length + "   " + json[2].length)
					if (json[0].length > 0 || json[1].length > 0 || json[2].length > 0) {
						console.log(json)
						var qd = json[0];
						var zd = json[1];
						zj = json[2];
						for (var i = 0; i < qd.length; i++) {
							var trTag = $('<tr>');
							$('<td>').addClass('t_vehicle').text(qd[i].vehi_no).appendTo(trTag);
							$('<td>').addClass('t_datetime').text(qd[i].stime.replace(",","")).appendTo(trTag);
							$('#qdfwPanel table tbody').append(trTag);
						}
						for (var i = 0; i < zd.length; i++) {
							var trTag = $('<tr>');
							$('<td>').addClass('t_vehicle').text(zd[i].vehi_no).appendTo(trTag);
							$('<td>').addClass('t_datetime').text(zd[i].stime.replace(",","")).appendTo(trTag);
							$('#zdfwPanel table tbody').append(trTag);
						}
						var icon = "../../resources/images/c.png";
						var marker1;
						for (var i = 0; i < zj.length; i++) {
							var trTag = $('<tr>');
							$('<td>').addClass('t_vehicle').text(zd[i].vehi_no).appendTo(trTag);
							var operate = $('<td>').addClass('t_operate');
							operate.append(
								$('<button>').addClass('btn btn-primary btn-xs guijichaxun').data('ip-index', i).text('轨迹').on('click', function () {
									var index = $(this).data('ip-index');
									var _parent = parent.$(window.parent.document);
									if (_parent.find('.ip-tabBarItem[data-name="gjhfgz"]').length > 0) {
										_parent.find('.ip-tabBarItem[data-name="gjhfgz"]').trigger('click');
										_parent.find('#gjhfgz').get(0).contentWindow.location.reload(true);
									}
									_parent.find('#defaultVehi').val(zd[index].vehi_no);
									_parent.find('#defaultStime').val(timestart($("#tsclcx-datetimeStart").val(), $("#qd_etime").val()));
									_parent.find('#defaultEtime').val(timeend($("#tsclcx-datetimeEnd").val(), $("#zd_etime").val()));
									_parent.find('.ip-menuItem [data-skip="gjhfgz"]').trigger("click");
								})
							);
							operate.appendTo(trTag);
							$('#clxxPanel table tbody').append(trTag);
						}
						$('#swcz_cx').removeAttr("disabled");
						layer.closeAll('loading');
					} else {
						$('#swcz_cx').removeAttr("disabled");
						layer.closeAll('loading');
						alert("该时间内起点与终点区域内没有符合条件的车辆");
					}
				},
				error: function () {
					layer.closeAll('loading');
				}
			});
		});

		//画框
		function arawAreaFun(mapObj, isArea, num) {
			console.info(num);
			if (isArea) return false;
			mapObj.plugin(["AMap.MouseTool"], function () {
				fxudmouseTool = new AMap.MouseTool(mapObj);
				fxudmouseTool.polygon(udpolygonOption);   //使用鼠标工具绘制多边形
				AMap.event.addListener(fxudmouseTool, "draw", function (e) {
					var drawObj = e.obj;
					var pointsCount = e.obj.getPath().length;
					var a = e.obj.getPath();
					var zbs = "";
					var polygonArr1 = [];//多边形覆盖物节点坐标数组
					for (var i = 0; i < pointsCount; i++) {
						polygonArr1.push([a[i].lng, a[i].lat]);
					}
					polygonfk = fanwei(polygonArr1, num);
					polygonfk.setMap(mapObj);
					if (num == 1) polygonfks[0] = polygonfk;
					else polygonfks[1] = polygonfk;
					fxudmouseTool.close(true);
					fxudmouseTool = null;
					$('#clearMap').show();
				});
			});
			return true
		}

		// //轨迹 --- 跳转
		// findlsgj = function(obj){
		// 	console.log(zj[obj].vehi_no)
		// 	var li = $($(window.parent.document)).find('.ip-tabBarItem');
		// 	for(var i=0;i<li.length;i++){
		// 		if(li.get(i).getAttribute('data-name') == "gjhfgz"){
		// 			$($(window.parent.document)).find('.ip-tabItemRemove').get(i).click();
		// 		}
		// 	}
		// 	parent.$($($(window.parent.document)).find('#defaultVehi')).val(zj[obj].vehi_no);
		// 	parent.$($($(window.parent.document)).find('.ip-menuItem').get(3)).find('.ip-menuTitle').trigger("click");
		// }

		//范围坐标
		function fanwei(polygonArr1, num) {
			if (1 == num) {
				qd_jwd = "";
				for (var i = 0; i < polygonArr1.length; i++) {
					qd_jwd += polygonArr1[i] + ";";
					kt1.push(polygonArr1[i]);
				}
			}
			if (2 == num) {
				zd_jwd = "";
				for (var i = 0; i < polygonArr1.length; i++) {
					zd_jwd += polygonArr1[i] + ";";
					kt2.push(polygonArr1[i]);
				}
			}
			return new AMap.Polygon({
				path: polygonArr1,//设置多边形边界路径
				strokeColor: "#1791fc", //线颜色
				strokeOpacity: 1, //线透明度
				strokeWeight: 2,    //线宽
				fillColor: "#1791fc", //填充色
				fillOpacity: .5//填充透明度
			});
		}

		//开始时间
		function timestart(e, c) {
			var ddate = new Date(e);
			var result = new Date(ddate.getTime() - parseInt(c) * 60 * 1000);
			return setformatnewlc(result);
		}

		//结束时间
		function timeend(e, c) {
			var ddate = new Date(e);
			var result = new Date(ddate.getTime() + parseInt(c) * 60 * 1000);
			return setformatnewlc(result);
		}

		//截取时间
		function setformatnewlc(obj) {
			var y = (obj.getFullYear()).toString();
			var m = (obj.getMonth() + 1).toString();
			if (m.length == 1) {
				m = "0" + m;
			}
			var d = obj.getDate().toString();
			if (d.length == 1) {
				d = "0" + d;
			}
			var h = obj.getHours().toString();
			if (h.length == 1) {
				h = "0" + h;
			}
			var mi = obj.getMinutes().toString();
			if (mi.length == 1) {
				mi = "0" + mi;
			}
			var s = obj.getSeconds().toString();
			if (s.length == 1) {
				s = "0" + s;
			}
			var time = y + "-" + m + "-" + d + " " + h + ":" + mi + ":" + s;
			console.log(time)
			return time;
		}
	})
})(jQuery);
