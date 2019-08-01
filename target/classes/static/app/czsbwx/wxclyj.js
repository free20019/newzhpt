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
					queryTimeoutEnd: '',
					queryButtonChange: 0,
					currentPage: 0,
					visibleLength: 0,
					vehicleList: [],
					tableFields: [
					    {name: 'gId', title: '序号', width: 40, align: 'center'},
						{name: 'cphm', title: '车牌号码', width: 60, align: 'center'},
						{name: 'gpssj', title: 'GPS时间', width: 80, align: 'center'},
						{name: 'zt', title: '状态', width: 80, align: 'center'},
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
//				$('#errorTime').text("(更新时间："+new Date(new Date()-1000 * 60 * 60 * 24).Format('yyyy年MM月dd日')+")");
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
					
					if (input.length < 3) {
						_this.getVehicleDetails(_this.vehicleList);
					}else{					
						_this.excelList=_.filter(_this.vehicleList, function (item) {
							if (item && input && item.VEHI_NO.indexOf(input) > -1) 
								return true
						});
						_this.getVehicleDetails(_this.excelList);
					}
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
					_this.jqxhr=$.ajax('../../sbwx/faultMonitor',{
						type: 'GET',
						data:{},
						dataType: 'json'
					}).then(function (res) {
						_this.vehicleList = res;
						_this.getVehicleDetails(_this.vehicleList);
//						_this.indexList=_this.vehicleList;
						if(""==res){
							_this.$message.error('无数据！');
							_this.realTimeMonitorMapLoading=false;
						}
						var arr= new Array();
						_.each(res, function (item, index) {
							var s = {};
		 					if(item.hasOwnProperty('PX')&&item.hasOwnProperty('PY')){	
		 						s.lnglat = [item.PX,item.PY];
								s.name = item.VEHI_NO;
								//在线
								if (item.STATUS==='在线') {
									s.groupId = 21;
									arr.push(s);
								}
								//不在线
								if (item.STATUS==='不在线') {
									s.groupId = 22;
									arr.push(s);
								}
		 					}
						});
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
								item.gId = index + 1;
								item.cphm=item.VEHI_NO;
								item.gpssj=item.STIME==null?"":(new Date(item.STIME)).Format("yyyy-MM-dd hh:mm:ss");
								item.zt=item.STATUS;
								return item;
							});
						_this.excelList=data;
						$("#wxclyjTable").jsGrid({
							data: data
						})
					}
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
				        for (var i = 21; i <= 22; i++) {
				        	_this.groupStyleMap[i] = {
								    pointStyle: {
								        content: PointSimplifier.Render.Canvas.getImageContent("../../resources/images/"+(i+400)+".png"),
								        width: 22,
								        height: 22,
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
					
					if(this.mapMarker) this.mapMarker.setMap(null);
					//点标记中的图标
					var markerImg = '';
					//在线
					if (item.STATUS==='在线') {
						markerImg = '../../resources/images/421.png';
					}
					//不在线
					if (item.STATUS==='不在线') {
						markerImg = '../../resources/images/422.png';
					}
					this.mapMarker = new AMap.Marker({
						map: this.map,
						position: new AMap.LngLat(item.PX, item.PY),
						offset: new AMap.Pixel(-10,-10), //相对于基点的偏移位置
						draggable: false,  //是否可拖动
//						content: markerContent,   //自定义点标记覆盖物内容
					  	icon: new AMap.Icon({            
				            image: markerImg,
				            size: new AMap.Size(22, 22),  //图标大小
				            imageSize: new AMap.Size(22,22)
				        })
					});
					var gz = "";
					if(_this.hasDetails(item.ONE_ROAD_ONE,item.TWO_ROAD_ONE,item.CHOOSE)!=="正常"){						
						gz +="1路"+_this.hasDetails(item.ONE_ROAD_ONE,item.TWO_ROAD_ONE,item.CHOOSE)+",";
					}
					if(_this.hasDetails(item.ONE_ROAD_TWO,item.TWO_ROAD_TWO,item.CHOOSE)!=="正常"){
						gz +="2路"+_this.hasDetails(item.ONE_ROAD_TWO,item.TWO_ROAD_TWO,item.CHOOSE)+",";
					}
					if(_this.hasDetails(item.ONE_ROAD_THREE,item.TWO_ROAD_THREE,item.CHOOSE)!=="正常"){
						gz +="3路"+_this.hasDetails(item.ONE_ROAD_THREE,item.TWO_ROAD_THREE,item.CHOOSE)+",";
					}
					if(_this.hasDetails(item.ONE_ROAD_FOUR,item.TWO_ROAD_FOUR,item.CHOOSE)!=="正常"){						
						gz +="4路"+_this.hasDetails(item.ONE_ROAD_FOUR,item.TWO_ROAD_FOUR,item.CHOOSE)+",";
					}
					this.map.setCenter(new AMap.LngLat(item.PX,item.PY));
					var txt = "<table><tr><td><b style='color:#3399FF'>"+item.VEHI_NO+"</b></td>" +
						"<tr><td><b>[GPS时间]</b>："+(item.STIME==null?"":(new Date(item.STIME)).Format("yyyy-MM-dd hh:mm:ss"))+"</td></tr>" +
						"<tr><td><b>[速度]</b>："+item.SPEED+"KM/H</td></tr>" +
						"<tr><td><b>[故障状态]</b>："+gz+"</td></tr>" +
						"<tr><td><b>[所属业户]</b>："+item.COMP_NAME+"</td></tr>" +				
						"<tr><td><b>[联系电话]</b>："+(item.OWN_TEL==null?"":item.OWN_TEL)+"</td></tr>" +
						"<tr><td><b>[交接班时间]</b>："+(item.HANDOVER_TIME==null?"":item.HANDOVER_TIME)+"</td></tr>" +
						"";
					if(item.VEHI_NO!=null){
						txt +="<tr><td><a href='javascript:void(0);' onclick='findjgtz(\""+item.VEHI_NO+"\");'>轨迹回放</a></td></tr>";
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
				findjgtz: function(obj) {
					alert(obj);
					var _parent = parent.$(window.parent.document);					
					_parent.find('.ip-menuItem [data-skip="xxfwygl"]').trigger("click");
					_parent.find('.ip-menuItem [data-skip="gjhfgz"]').trigger("click");
				},
				/* 点击车辆图标,在地图上显示该车辆的当前信息 */
				vehicleMarker: function (vehicle) {
					var _this = this;
					var item=_.filter(_this.vehicleList, function (item) {
						if (item.VEHI_NO.indexOf(vehicle) > -1) return true;
					});
					_this.addMapMarker(item[0]);
				},
				/* 故障车辆-跳转对应地图的车辆位置 */
				handleJumpVehicleClick: function (item) {
					this.addMapMarker(item.item);
				},
				hasDetails: function(itemone, itemtwo, choose) {
					if(parseInt(choose) === 1){
						if(parseInt(itemone) === 0){
							return "正常";
						}else if(parseInt(itemone) === 1){
							return "偏移";
						}else if(parseInt(itemone) === 2){
							return "黑屏";
						}
					}else{
						if(parseInt(itemtwo) === 0){
							return "正常";
						}else if(parseInt(itemtwo) === 1){
							return "偏移";
						}else if(parseInt(itemtwo) === 2){
							return "黑屏";
						}
					}
					
					
				},

			},
			watch: {
				queryLicensePlate: function () {
					this.currentPage = 1
				}
			}
		})
	})(Vue, _, jQuery);
//轨迹回放
function findjgtz(obj) {
	var _parent = parent.$(window.parent.document);
	_parent.find('#defaultVehi').val(obj);
	_parent.find('.ip-menuItem [data-skip="xxfwygl"]').trigger("click");
	_parent.find('.ip-menuItem [data-skip="gjhfgz"]').trigger("click");
};