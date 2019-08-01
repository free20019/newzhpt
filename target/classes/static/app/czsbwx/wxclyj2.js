(function (Vue, _, jQuery) {
		var vm = new Vue({
			el: '#root',
			data: function () {
				return {
					ydwwyyList: [],
					yyywdwList: [],
					yzpwdwwyyList: [],
					sevenwdwwyyList: [],
					wkcwbhList: [],
					dggzList: [],
					excelList: [],
					indexList: [],
					geocoder:null,
					address:'',
					type: 1,
					queryLicensePlate: '',
//					queryTimeoutStart: '',
					queryTimeoutEnd: '',
					queryButtonChange: 0,
					currentPage: 0,
					visibleLength: 0,
					vehicleList: [],
//					tableFields: [
//						{name: 'cphm', title: '车牌号码', width: 140, align: 'center'},
//						{name: 'cplx', title: '车牌类型', width: 80, align: 'center'},
//						{name: 'ztai', title: '状态', width: 80, align: 'center'},
//						{name: 'kozc', title: '空重车', width: 80, align: 'center'},
//						{name: 'gzlx', title: '故障类型', width: 80, align: 'center'},
//						{name: 'gzsj', title: '故障时间', width: 80, align: 'center'}
//					],
					tableFields: [
					    {name: 'gId', title: '序号', width: 60, align: 'center'},
						{name: 'cphm', title: '车牌号码', width: 140, align: 'center'},
						{name: 'cplx', title: '车牌类型', width: 80, align: 'center'},
						{name: 'cz', title: '车主', width: 80, align: 'center'},
						{name: 'sim', title: 'SIM卡', width: 80, align: 'center'},
						{name: 'lxdh', title: '联系电话', width: 80, align: 'center'},
//									{name: 'ztai', title: '状态', width: 80, align: 'center'},
//									{name: 'kozc', title: '空重车', width: 80, align: 'center'},
						{name: 'gzlx', title: '故障类型', width: 80, align: 'center'},
						{name: 'gzsj', title: '故障时间', width: 80, align: 'center'}
					],
					map: null,
					day:9,
					//高德地图海量点ui
					PointSimplifier:null,
					pointSimplifierIns:null,
					groupStyleMap:{},
					realTimeMonitorMapLoading:false,
					Ydqcount:0,
					Jjdqcount:0,
				}
			},
			mounted: function () {
				$('#errorTime').text("(更新时间："+new Date(new Date()-1000 * 60 * 60 * 24).Format('yyyy年MM月dd日')+")");
				var _this = this;
				this.$nextTick(function () {
					$('.scrollbar-macosx').scrollbar();
					titlePanelScaling('#root', {width: 530});
					$('#wxclyjTable').jsGrid({
						width: '100%',
						height: 'calc(100% - 47px)',
						editing: true,
						sorting: true,
						paging: false,
						autoload: true,
						rowClick:this.handleJumpVehicleClick,
						fields: _this.tableFields
					});
//					var datetime_s = $('#wxclyj-datetimeStart');
					var datetime_e = $('#wxclyj-datetimeEnd');
//					datetime_s.datetimepicker(dateDefaultOption).on('changeDate', function (event) {
//						_this.queryTimeoutStart = event.date;
//					});
					datetime_e.datetimepicker(dateDefaultOption).on('changeDate', function (event) {
						_this.queryTimeoutEnd = event.date;
					});
					$('#wxclyj-datetimeEnd').val(new Date().Format('yyyy-MM-dd'));
					var position = new AMap.LngLat(120.16378, 30.25840);//创建中心点坐标
					_this.map = new AMap.Map('wxclyjMap', {
						center : position,
						level : 15,
						resizeEnable : true
					});
					_this.vehicleListVisibleLength();
					_this.getVehicleList();
				});
			},
			computed: {
				/* 查询车辆 */
//				findVehile: function () {
//					var _this=this;
//					var type = _this.type;
//					var input = _this.queryLicensePlate;
////					var timeoutStart = _this.queryTimeoutStart;
//					var timeoutEnd = _this.queryTimeoutEnd;
//					if (_this.queryButtonChange) {/*此处不做任何操作，作用是点击查询按钮时触发这个方法*/}
//					if (input.length < 3) return false;
//					return _.filter(_this.vehicleList, function (item) {
//						if (!item || !input || item.VEHICLE_NO.indexOf(input) === -1 /*|| type !== item['到期类型']*/) return false;
//						if (timeoutEnd) {
//							var date = type === 1 ? new Date(item.DB_TIME) : new Date(item.DB_TIME);
//							if (timeoutEnd <= date) return false
//						}
//						return true
//					});
//				},
				/* 总页数 */
				vehicleListPage: function () {
					return Math.ceil(this.findVehile.length / this.visibleLength)
				},
				/* 可显示的页数 */
				currentDisplayPages: function () {
					return this.currentPage * this.visibleLength - 1;
				},
				/* 判断加载按钮是否启用 */
				hasDisabledLoadMoreButton: function () {
					var allPage = this.vehicleListPage;
					if (!allPage) return true;
					return (this.currentPage >= this.vehicleListPage);
				}
			},
			methods: {
				findVehile: function () {
					var _this=this;
					var input = _this.queryLicensePlate;
					if (input.length < 1) {
						_this.getVehicleDetails(_this.indexList);
					}else{					
						_this.excelList=_.filter(_this.indexList, function (item) {
							if (item && input && item.VEHI_NO.indexOf(input) > -1) 
								return true
						});
						_this.getVehicleDetails(_this.excelList);
					}
				},
				regeoCode: function (lnglat) {
					var _this=this;
					_this.address='';
			        if(!_this.geocoder){
			        	_this.geocoder = new AMap.Geocoder({
			                city: "010", //城市设为北京，默认：“全国”
			                radius: 1000 //范围，默认：500
			            });
			        }
			        _this.geocoder.getAddress(lnglat, function(status, result) {
			            if (status === 'complete'&&result.regeocode) {
			            	_this.address = result.regeocode.formattedAddress;
			            	document.getElementById('aaa').innerText=_this.address; 
			            }else{
//			            	alert(JSON.stringify(result))   	
			            }
			        });
			    },
				/* 一页可现实多少条内容 */
				vehicleListVisibleLength: function () {
					var _this = this;
					var vehicleListHeight = $(_this.$refs.scrollbar).height();
					this.visibleLength = Math.floor(vehicleListHeight / 30);
				},
				getVehicleList: function () {
					var _this = this;
					var type=_this.type;
					_this.realTimeMonitorMapLoading=true;
					_this.jqxhr=$.ajax('../../sbwx/findclbj',{
						type: 'GET',
						data:{
			 	        	"etime" : $('#wxclyj-datetimeEnd').val(),
			 	        	"day" : _this.day,
			 	        	"type" :type
			 	        },
						dataType: 'json'
					}).then(function (res) {
						_this.vehicleList = res;
						_this.getVehicleDetails(_this.vehicleList);
						_this.indexList=_this.vehicleList;
						if(""==res){
							_this.$message.error('无数据！');
							_this.realTimeMonitorMapLoading=false;
//							return false;
						}
//						_this.resetFaultStatistics();
						var ydwwyyArr= new Array();
						var yyywdwArr= new Array();
						var yzpwdwwyyArr= new Array();
						var sevenwdwwyyArr= new Array();
						var wkcwbhArr= new Array();
						var dggzArr= new Array();
						var arr= new Array();
						_.each(res, function (item, index) {
							var s = {};
							var flag = 0;
		 					if(item.hasOwnProperty('PX')&&item.hasOwnProperty('PY')){	
		 						s.lnglat = [item.PX,item.PY];
								s.name = item.VEHI_NO;
								//有定位无营运
								if (_this.hasYdwwyy(item)) {
									flag++;
									s.groupId = 1;
									ydwwyyArr.push(s);
								}
								//有营运无定位
								if (_this.hasYyywdw(item)) {
									flag++;
									s.groupId = 2;
									yyywdwArr.push(s);
								}
								//有抓拍无定位无营运
								if (_this.hasYzpwdwwyy(item)) {
									flag++;
									s.groupId = 3;
									yzpwdwwyyArr.push(s);
								}
								//7天无定位无营运
								if (_this.hasSevenwdwwyy(item)) {
									flag++;
									s.groupId = 4;
									sevenwdwwyyArr.push(s);
								}
								//空重车无变化
								if (_this.hasWkcwbh(item)) {
									flag++;
									s.groupId = 5;
									wkcwbhArr.push(s);
								}
								// 多车故障
								if(flag >= 1){									
									arr.push(s);
									if(flag > 1) {
										s.groupId = 10;
										dggzArr.push(s);
									}
								}
		 					}
						});
						if(type==1){
							_this.Ydqcount=arr.length;
							_this.Jjdqcount=0;
						}else if(type==2){
							_this.Jjdqcount=arr.length;
							_this.Ydqcount=0
						}
//						_this.faultStatistics.total = res.length;
						_this.markvehi(arr);						
						_this.realTimeMonitorMapLoading=false;
					});
				},
				/* 将故障车辆信息显示在左侧栏 */
				getVehicleDetails: function(list){
					var _this=this;
					$("#wxclyjTable").jsGrid({
						data: []
					})
					if(list.length>0){
						var data = _.map(list, function (item, index) {
								var gz = '';
								//有定位无营运
								if (_this.hasYdwwyy(item)){
									gz +='有定位无营运;'
								}
								//有营运无定位
								if (_this.hasYyywdw(item)) {
									gz +='有营运无定位;'
								}
								//有抓拍无定位无营运
								if (_this.hasYzpwdwwyy(item)) {
									gz +='有抓拍无定位无营运;'
								}
								//7天无定位无营运
								if (_this.hasSevenwdwwyy(item)) {
									gz +='7天无定位无营运;'
								}
								//空重车无变化
								if (_this.hasWkcwbh(item)) {
									gz +='空重车无变化;'
								}
								item.gId = index + 1;
								item.cphm=item.VEHI_NO;
								item.cplx=item.VT_NAME;
								item.cz=item.OWN_NAME;
								item.sim=item.SIM_NUM;
								item.lxdh=item.OWN_TEL;
								item.gzlx=gz;
								item.gzsj=item.DB_TIME==null?"":(new Date(item.DB_TIME)).Format("yyyy-MM-dd hh:mm:ss");								
								return item;
							});
						_this.excelList=data;
						$("#wxclyjTable").jsGrid({
							data: data
						})
					}
				},
				//导出
				handleVehicleExcel: function(){
					var _this = this;
					layer.confirm('你确定要导出数据', {
						btn: ['确定', '取消'],
						offset: '100px'
					}, function (layerIndex) {
						var newWin = window.open(),formStr = '';
						//设置样式为隐藏，打开新标签再跳转页面前，如果有可现实的表单选项，用户会看到表单内容数据
				        formStr = '<form style="visibility:hidden;" method="POST" action="' + basePath+"sbwx/vehicleexcel" + '">' +
				          "<input type='hidden' name='params' value='"+JSON.stringify(_this.excelList)+"' />" +
				          '</form>'; 
				        newWin.document.body.innerHTML = formStr;
					    newWin.document.forms[0].submit();
					    layer.close(layerIndex);
					    setTimeout(function(){ newWin.close() },1000);
					}, function (layerIndex) {
						layer.close(layerIndex);
					});
				},
				//打印
				markvehi: function (obj){
					var _this = this;
					if(_this.pointSimplifierIns){
						_this.pointSimplifierIns.setData(null);
					}
					AMapUI.load(['ui/misc/PointSimplifier', 'lib/$'], function(PointSimplifier, $) {
				        if (!PointSimplifier.supportCanvas) {
				            alert('当前环境不支持 Canvas！');
				            return;
				        }
				        for (var i = 1; i <= 10; i++) {
				        	_this.groupStyleMap[i] = {
								    pointStyle: {
								        content: PointSimplifier.Render.Canvas.getImageContent("../../resources/images/"+(i+400)+".png"),
								        width: 16,
								        height: 16,
								        offset: ['-50%', '-50%'],
								        fillStyle: null
								    }
								};
						}
				        _this.pointSimplifierIns = new PointSimplifier({
				            zIndex: 40,
				            map: _this.map, // 所属的地图实例
				            getPosition: function(item) {
			            		return item.lnglat;
				            },
				            getHoverTitle: function(dataItem, idx) {
				                return '车牌: ' + dataItem.name;
				            },
				            // 使用GroupStyleRender
				            renderConstructor: PointSimplifier.Render.Canvas.GroupStyleRender,
				            renderOptions: {
				            	pointStyle: {
				            		width: 5,
				                    height: 5,
							        fillStyle: null
				                },
				                //鼠标hover时的title信息
				                hoverTitleStyle: {
				                	
				                },
				                getGroupId: function(item, idx) {
				                	return item.groupId;
				                },
				                groupStyleOptions: function(gid) {
				                	return _this.groupStyleMap[gid];
				                }
				            }
				        });
				    	//监听事件
				        _this.pointSimplifierIns.on('pointClick', function(e, record) {
				        	_this.vehicleMarker(record.data.name);
				        });
				        _this.pointSimplifierIns.setData(obj);
				        _this.map.setZoomAndCenter(13,[120.209561,30.245278])
				    });
								
				},
				/* 将单个车辆的位置信息显示在地图上 */
				addMapMarker: function(item) {
					var _this = this;
					if(!(item.hasOwnProperty('PX')&&item.hasOwnProperty('PY'))){	
						_this.$message.error('该车辆无定位！');
						return false;
					}
					//逆地理编码
//					var lnglat=[];
//					lnglat.push(item.PX);
//					lnglat.push(item.PY);
//					_this.regeoCode(lnglat);
					
					if(this.mapMarker) this.mapMarker.setMap(null);
					var markerContent = document.createElement('div');
					markerContent.className = 'txtstyle';
					//点标记中的图标
					var markerImg = document.createElement('img');
					markerImg.className = 'markerlnglat';
					var count = 0;
					var gz = '';
					//有定位无营运
					if (this.hasYdwwyy(item)){
						count++;
						gz +='有定位无营运;'
						markerImg.src='../../resources/images/401.png';
					}
					//有营运无定位
					if (this.hasYyywdw(item)) {
						count++;
						gz +='有营运无定位;'
						markerImg.src = '../../resources/images/402.png';
					}
					//有抓拍无定位无营运
					if (this.hasYzpwdwwyy(item)) {
						count++;
						gz +='有抓拍无定位无营运;'
						markerImg.src = '../../resources/images/403.png';
					}
					//7天无定位无营运
					if (this.hasSevenwdwwyy(item)) {
						count++;
						gz +='7天无定位无营运;'
						markerImg.src = '../../resources/images/404.png';
					}
					//空重车无变化
					if (this.hasWkcwbh(item)) {
						count++;
						gz +='空重车无变化;'
						markerImg.src = '../../resources/images/405.png';
					}
					if(count>1) markerImg.src='../../resources/images/410.png';
					markerContent.appendChild(markerImg);
					this.mapMarker = new AMap.Marker({
						map: this.map,
						position: new AMap.LngLat(item.PX, item.PY),
						offset: new AMap.Pixel(-7,-10), //相对于基点的偏移位置
						draggable: false,  //是否可拖动
						content: markerContent   //自定义点标记覆盖物内容
					});
					this.map.setCenter(new AMap.LngLat(item.PX,item.PY));
					var txt = "<table><tr><td><b style='color:#3399FF'>"+item.VEHI_NO+"</b></td>" +
						"<td></td></tr><tr><td><b>[所属业户]</b>："+item.COMP_NAME+"</td></tr>" +
						"<tr><td><b>[车辆商标]</b>："+item.VT_NAME+"</td></tr>" +
						"<tr><td><b>[车辆颜色]</b>："+item.VC_NAME+"</td></tr>" +
						"<tr><td><b>[SIM卡]</b>："+item.SIM_NUM+"</td></tr>" +
						"<tr><td><b>[车辆所属人]</b>："+(item.OWN_NAME==null?"":item.OWN_NAME)+"</td></tr>" +
						"<tr><td><b>[联系电话]</b>："+(item.OWN_TEL==null?"":item.OWN_TEL)+"</td></tr>" +
						"<tr><td><b>[经度]</b>："+item.PX+"</td></tr><tr><td><b>[纬度]</b>："+item.PY+"</td></tr>" +
						"<tr><td><b>[故障类型]</b>："+gz+"</td></tr>" +
						"<tr><td><b>[故障上传时间]</b>："+(item.DB_TIME==null?"":(new Date(item.DB_TIME)).Format("yyyy-MM-dd hh:mm:ss"))+"</td></tr>" +
//						"<tr><td><b>[故障地点]</b>：<span id='aaa'></td></tr>" +
						"<tr><td><b>[故障地点]</b>："+(item.ADDRESS==null?"":item.ADDRESS)+"</td></tr>" +
						//			"<tr><td><b>[维修人员]</b>："+(item.WXRY==null?"":item.WXRY)+"</td></tr>" +
						//			"<tr><td><b>[维修地点]</b>："+(item.RA_ADDR==null?"":item.RA_ADDR)+"</td></tr>" +
						//			"<tr><td><b>[维修类型]</b>："+(item.RT_TYPE==null?"":item.RT_TYPE)+"</td></tr>" +
						"<tr><td><b>[经纬度上传时间]</b>："+(item.STIME==null?"":(new Date(item.STIME)).Format("yyyy-MM-dd hh:mm:ss"))+"</td></tr>" +
						//			"<tr><td><b>[维修完成时间]</b>："+(item.RR_TIME_END==null?"":(new Date(item.RR_TIME_END)).Format("yyyy-MM-dd hh:mm:ss"))+"</td></tr>" +
						"";
					if(item.OWN_TEL!=null){
						txt +="<tr><td><a href='javascript:void(0);' onclick='findjgtz(\""+item.OWN_TEL+"\");'>警告通知</a></td></tr>";
					}
					var info = [];
					info.push(txt);
					var inforWindowone = new AMap.InfoWindow({
						offset: new AMap.Pixel(3, 0),
						content: info.join("</table>")
					});
					inforWindowone.open(this.map, this.mapMarker.getPosition());
					AMap.event.addListener(this.mapMarker, "click", function (e) {
						inforWindowone.open(_this.map, _this.mapMarker.getPosition());
					});
				},
				/* 点击车辆图标,在地图上显示该车辆的当前信息 */
				vehicleMarker: function (vehicle) {
					var _this = this;
					jqxhr=$.ajax({
						type: 'POST',
						url: '../../sbwx/vhicmarker2',
						data: {
							vehi_no: vehicle
						},
						dataType: 'json',
						timeout: 180000,
						success: function (res) {
							_.each(res, function (item) {
								_this.addMapMarker(item)
							});
						},
						error: function () {
						}
					});
				},
				handleYdqiClick: function() {
					this.type = 1;
				},
				handleJjdqClick: function() {
					this.type = 2;
				},
				handleQueryClick: function () {
					this.getVehicleList();
				},
				/* 故障车辆-跳转对应地图的车辆位置 */
				handleJumpVehicleClick: function (item) {
					this.addMapMarker(item.item);
				},
				/* 故障车辆-加载更多按钮 */
				handleVehicleLoadMoreClick: function() {
					this.currentPage++;
				},
				hasYdwwyy: function(item) {
					return parseInt(item.NO_GPS) === 1
				},
				hasYyywdw: function (item) {
					return parseInt(item.NO_JJQ) === 1
				},
				hasYzpwdwwyy: function (item) {
					return parseInt(item.NO_GPS_JJQ) === 1
				},
				hasSevenwdwwyy: function (item) {
					return parseInt(item.SEVEN_GPS_JJQ) === 1
				},
				hasWkcwbh: function(item) {
					return parseInt(item.EMPTY_HEAVY) === 1
				}
			},
			watch: {
				queryLicensePlate: function () {
					this.currentPage = 1
				}
			}
		})
	})(Vue, _, jQuery);