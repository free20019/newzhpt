(function ($) {
	var serverMenu = [
		{name: 'xxfwygl', title: '信息服务', icon: 'icon-xxfwgl', menuList: 'xxfwMenu', displayState: true},
		{name: 'zhtjyfx', title: '综合统计', icon: 'icon-zhtjfx', menuList: 'zhtjMenu'},
		{name: 'wsfw', title: '网上服务', icon: 'icon-wlfw', menuList: 'wsfwMenu'},
		{name: 'czgzyfx', title: '抓拍数据', icon: 'icon-czsbfx', menuList: 'czgzMenu'},
		{name: 'czsbwx', title: '设备维修', icon: 'icon-czsbwx', menuList: 'czwxMenu'},
		{name: 'yjzhcz', title: '应急处置', icon: 'icon-czsbwx', menuList: 'yjzhMenu'},
		{name: 'dzddfw', title: '电召调度', icon: 'icon-czsbwx', menuList: 'dzddfwMenu'},
		{name: 'jyxx', title: '交易总览', icon: 'icon-czsbwx', menuList: 'jyxxMenu'},
		{name: 'zcsj', title: '专车数据', icon: 'icon-czsbwx', menuList: 'zcsjMenu'},
		{name: 'xxgxybs', title: '共享报送', icon: 'icon-czsbwx', menuList: 'xxgxybsMenu'},
		{name: 'qxgl', title: '权限管理', icon: 'icon-czsbwx', menuList: 'qxglMenu'}
	];
	
	var menus;
	$.ajax({
		url : "/zhpt/common/menu",
		type : 'post',
		data : {
		},
		dataType : 'json',
		success : function(data) {
			console.log(data)
			if (data.code == 0) {
				//menu
				menus = data.data[0];
				setTimeout(function(){ init() }, 300);
			} else {
				alert("该用户无权限访问系统功能!!!");
				setTimeout(function(){ window.location.href="./login.html" }, 1000);
			}
		},
		error : function(data) {
			window.location.href="./login.html";
		}
	})
	
//	var menus = {
//		xxfwMenu: [
//			{name: 'hyzl', title: '行业总览', icon: 'icon-hyzl', href: 'app/xxfwgl/hyzl.html', active: true},
//			{name: 'clfb', title: '车辆分布', icon: 'icon-clfb', href: 'app/xxfwgl/clfb.html'},
//			{name: 'yyts', title: '营运态势', icon: 'icon-qushi', href: 'app/xxfwgl/yyts.html'},
//			{name: 'cljkgz', title: '车辆监控跟踪', icon: 'icon-cljkgz', href: 'app/xxfwgl/cljkgz.html'},
//			{name: 'gjhfgz', title: '轨迹回放改造', icon: 'icon-gjhf', href: 'app/xxfwgl/gjhfgz.html'},
//			{name: 'dcjk', title: '多车监控', icon: 'icon-dcjk', href: 'app/xxfwgl/dcjk.html'},
//			{name: 'zdgzcl', title: '重点关注车辆', icon: 'icon-attention', href: 'app/xxfwgl/zdgzcl.html'},
//			{name: 'zlclcx', title: '滞留车辆查询', icon: 'icon-zlclcx', href: 'app/xxfwgl/zlcljk.html'},
//			{name: 'qyyjzl', title: '区域应急指令', icon: 'icon-qyyjzl', href: 'app/xxfwgl/qyyjzl.html'},
//			{name: 'tsclcx', title: '目标车辆查找', icon: 'icon-tsclcz', href: 'app/xxfwgl/tsclcx.html'}
//		],
//		zhtjMenu: [
//			{name: 'czcyxq', title: '出租乘运需求分析', icon: 'icon-czcyxq', displayState: true, children:[
//					{name: 'dcrdfx', title: '打车热点分析', icon: 'icon-car', href: 'app/zhtjfx/dcrdfx.html', active: true},
//					{name: 'cklxfx', title: '乘客流向分析', icon: 'icon-car', href: 'app/zhtjfx/czckfx.html'}]},
//			{name: 'yyycfx', title: '营运异常分析', icon: 'icon-yyycfx',children:[
//					{name: 'ysrlfx', title: '疑似绕路分析', icon: 'icon-ysrlcx', href: 'app/yyycfx/ysrlfx.html'},
//					{name: 'yjycfx', title: '异常营运分析', icon: 'icon-yjyccx', href: 'app/yyycfx/ycyyfx.html'},
//					{name: 'lcycfx', title: '营运里程异常分析', icon: 'icon-car', href: 'app/yyycfx/yylcycfx.html'},
//					{name: 'cxycfx', title: '营运单次异常分析', icon: 'icon-car', href: 'app/yyycfx/yydcycfx.html'}
//				]},
//			{name: 'clyyqk', title: '车辆营运情况分析', icon: 'icon-clyyfx', children:[
//					{name: 'wljcfx', title: '营运围栏禁出分析', icon: 'icon-car', href: 'app/zhtjfx/yywljcfx.html'},
//					{name: 'ryzbfx', title: '车辆燃油类型占比分析', icon: 'icon-car', href: 'app/zhtjfx/clrylxfx.html'}
//				]},
//			{name: 'zhcx', title: '综合查询', icon: 'icon-car', children:[{name: 'jsycx', title: '驾驶员查询', icon: 'icon-car', href: 'app/zhcx/jsycx.html'},{name: 'clcx', title: '车辆查询', icon: 'icon-car', href: 'app/zhcx/clcx.html'},{name: 'qycx', title: '业户查询', icon: 'icon-car', href: 'app/zhcx/qycx.html'},{name: 'czsbcx', title: '车载设备查询', icon: 'icon-car', href: 'app/zhcx/czsbcx.html'},{name: 'wzcx', title: '违章查询', icon: 'icon-car', href: 'app/zhcx/wzcx.html'},{name: 'tscx', title: '投诉查询', icon: 'icon-car', href: 'app/zhcx/tscx.html'},{name: 'fwzlzhpd', title: '服务质量综合评定', icon: 'icon-car', href: 'app/zhcx/fwzlzhpd.html'},{name: 'zfjcxx', title: '执法稽查信息', icon: 'icon-car', href: 'app/zhcx/zfjcxx.html'}]},
//			{name: 'gzcx', title: '故障查询统计', icon: 'icon-car', children:[
//					{name: 'spgl', title: '视频管理', icon: 'icon-spgl', href: 'app/xxfwgl/spgl.html'},
//					{name: 'bjgl', title: '报警管理', icon: 'icon-bjgl', href: 'app/xxfwgl/bjgl.html'},
//					{name: 'czsbgzcx', title: '故障查询', icon: 'icon-car', href: 'app/czsbgzfx/czsbgzcx.html'},
//					{name: 'czsbgztj', title: '故障统计', icon: 'icon-car', href: 'app/czsbgzfx/czsbgztj.html'},
//					{name: 'sbgzcstj', title: '故障次数统计', icon: 'icon-car', href: 'app/czsbgzfx/sbgzcstj.html'}
//				]}
//		],
//		wsfwMenu: [
//			{name: 'yyywsjtj', title: '营运业务数据统计', icon: 'icon-car', displayState: true, children: [{name: 'yysjcx', title: '营运数据查询', icon: 'icon-car', href: 'app/wsfw/yysjcx.html', active: true},{name: 'yysjfx', title: '日平均营运数据分析', icon: 'icon-car', href: 'app/wsfw/yysjfx.html'},{name: 'clyysjtj', title: '日营运数据分析', icon: 'icon-car', href: 'app/wsfw/clyysjtj.html'},{name: 'sjyysjfx', title: '出租车日营运数据分析', icon: 'icon-car', href: 'app/wsfw/sjyysjfx.html'},{name: 'qyyysjfx', title: '企业营运数据分析', icon: 'icon-car', href: 'app/wsfw/qyyysjfx.html'},{name: 'yybg', title: '营运报告', icon: 'icon-car', href: 'app/wsfw/yybg.html'},{name: 'dcsdqylctj', title: '单车速度曲线及里程统计', icon: 'icon-car', href: 'app/wsfw/dcsdqylctj.html'},{name: 'fgslctj', title: '分公司里程统计', icon: 'icon-car', href: 'app/wsfw/fgslctj.html'},{name: 'clzxcx', title: '未上线车辆查询', icon: 'icon-car', href: 'app/wsfw/clzxcx.html'},{name: 'ycclcx', title: '未营运车辆查询', icon: 'icon-car', href: 'app/wsfw/ycclcx.html'}]},
//			{name: 'czqcfwxt', title: '出租汽车服务系统', icon: 'icon-car', children:[
//					{name: 'fwzlxxcx', title: '服务质量信息查询', icon: 'icon-car', children:[
//							{name: 'khxx', title: '考核信息', icon: 'icon-car', href: 'app/wsfw/khxx.html'},
//							{name: 'fwwz', title: '服务违章', icon: 'icon-car', href: 'app/czsbgzfx/tswzwcl.html'},
//							{name: 'fwts', title: '服务投诉', icon: 'icon-car', href: 'app/wsfw/fwwz.html'},
//							{name: 'hrhs', title: '好人好事', icon: 'icon-car', href: 'app/wsfw/hrhs.html'},
//							{name: 'rygl', title: '荣誉管理', icon: 'icon-car', href: 'app/wsfw/rygl.html'},
//							{name: 'wmcl', title: '文明车辆', icon: 'icon-car', href: 'app/wsfw/wmcl.html'},
//							{name: 'bljl', title: '不良记录', icon: 'icon-car', href: 'app/wsfw/bljl.html'}
//						]},
//					{name: 'aqxccx', title: '安全行车查询', icon: 'icon-car', children:[
//							{name: 'jtwf', title: '交通违法', icon: 'icon-car', href: 'app/wsfw/jtwf.html'},
//							{name: 'xcgs', title: '行车事故', icon: 'icon-car', href: 'app/wsfw/xcgs.html'}
//						]},
//					{name: 'swdj', title: '失物登记', icon: 'icon-car', children:[
//							{name: 'swsj', title: '失物上交', icon: 'icon-car', href: 'app/wsfw/swsj.html'},
//							{name: 'szzw', title: '失主找失物', icon: 'icon-car', href: 'app/wsfw/szzw.html'}
//						]},
//					{name: 'sjzp', title: '司机招聘', icon: 'icon-car', href: 'app/wsfw/sjzp.html'},
//					{name: 'xxfb', title: '信息发布', icon: 'icon-car', href: 'app/wsfw/xxfb.html'}
//				]},
//			{name: 'yyqktjfx', title: '运营情况统计分析', icon: 'icon-car', children:[
//					{name: 'zdqyclfx', title: '重点区域车辆数量分析', icon: 'icon-car', href: 'app/wsfw/zdqyclfx.html'},
//					{name: 'zdqyclmx', title: '重点区域车辆数量明细', icon: 'icon-car', href: 'app/wsfw/zdqyclmx.html'},
//					{name: 'zdqysxlfx', title: '重点区域上线率分析', icon: 'icon-car', href: 'app/wsfw/zdqysxlfx.html'},
//					{name: 'zclfx', title: '重车率分析', icon: 'icon-car', href: 'app/wsfw/zclfx.html'},
//				]},
//			{name: 'yyxytjfx', title: '运营效益统计分析', icon: 'icon-car', children:[
//					{name: 'dcpjyysyfx', title: '单车平均运营收益分析', icon: 'icon-car', href: 'app/wsfw_yyxytjfx/dcpjyysyfx.html'},
//					{name: 'dcpjzklcfx', title: '单车平均载客里程分析', icon: 'icon-car', href: 'app/wsfw_yyxytjfx/dcpjzklcfx.html'},
//					{name: 'dcpjkslcfx', title: '单车平均空驶里程分析', icon: 'icon-car', href: 'app/wsfw_yyxytjfx/dcpjkslcfx.html'},
//					{name: 'dcpjxszlcfx', title: '单车平均行驶总里程分析', icon: 'icon-car', href: 'app/wsfw_yyxytjfx/dcpjxszlcfx.html'},
//					{name: 'dcpjyycsfx', title: '单车平均营运次数分析', icon: 'icon-car', href: 'app/wsfw_yyxytjfx/dcpjyycsfx.html'},
//					{name: 'dcpjzksjfx', title: '单车平均载客时间分析', icon: 'icon-car', href: 'app/wsfw_yyxytjfx/dcpjzksjfx.html'},
//					{name: 'dcpjzkdhsjfx', title: '单车平均载客等候时间分析', icon: 'icon-car', href: 'app/wsfw_yyxytjfx/dcpjzkdhsjfx.html'}
//				]},
//			{name: 'czbyltj', title: '出租保有量统计', icon: 'icon-car', href:'app/wsfw/czbyltj.html'}
//		],
//		czgzMenu: [
//			{name: 'cpsbgz', title: '抓拍设备故障', icon: 'icon-car', children:[{name: 'sbycwwx', title: '设备异常未维修', icon: 'icon-car', href: 'app/czsbgzfx/sbycwwx.html', active: true},{name: 'yshc', title: '疑似黑车', icon: 'icon-car', href: 'app/czsbgzfx/yshc.html'},{name: 'ystp', title: '疑似套牌', icon: 'icon-car', href: 'app/czsbgzfx/ystp.html'}]},
//			{name: 'zpsj', title: '抓拍数据', icon: 'icon-car', children:[
//					{name: 'zpsjcx', title: '抓拍数据查询', icon: 'icon-car', href: 'app/czsbgzfx/zpsjcx.html'},
//					{name: 'czlltj', title: '场站流量统计', icon: 'icon-car', href: 'app/czsbgzfx/czlltj.html'},
//					{name: 'rlltj', title: '日流量统计', icon: 'icon-car', href: 'app/czsbgzfx/rlltj.html'},
//					{name: 'fdlltj', title: '分段流量统计', icon: 'icon-car', href: 'app/czsbgzfx/fdlltj.html'},
//				]}
//		],
//		czwxMenu: [
//			{name: 'wxcljk', title: '维修车辆监控', icon: 'icon-car', href: 'app/czsbwx/wxcljk.html', active: true},
//			{name: 'wxclyj', title: '维修车辆预警', icon: 'icon-car', href: 'app/czsbwx/wxclyj.html'},
//			{ name: 'zpjk', title: '抓拍监控', icon: 'icon-car', href: 'app/czsbwx/zpjk.html' },
//			{name: 'zhtjcx', title: '综合统计与查询', icon: 'icon-car', children:[
//					{name: 'wxclcx', title: '维修记录查询', icon: 'icon-car', href: 'app/czsbwx/wxjdcx.html'},
//					{name: 'wxcltj', title: '维修车辆查询', icon: 'icon-car', href: 'app/czsbwx/wxcltj.html'}
//				]},
//			// {name: 'wxxxjr', title: '维修信息接入', icon: 'icon-car', children:[
//			// 		{name: 'djxxjr', title: '登记信息接入', icon: 'icon-car', href: 'app/czsbwx/djxxjr.html'},
//			// 		{name: 'jdxxjr', title: '进度信息接入', icon: 'icon-car', href: 'app/czsbwx/jdxxjr.html'}
//			// 	]},
//			// {name: 'wxglcx', title: '维修管理移动查询', icon: 'icon-car', children:[
//			// 		{name: 'sjydcx', title: '司机移动端查询', icon: 'icon-car', href: ''},
//			// 		{name: 'qydadcx', title: '企业移动端查询', icon: 'icon-car', href: ''},
//			// 		{name: 'yddjk', title: '移动端监控', icon: 'icon-car', href: ''}
//			// 	]}
//		],
//		yjzhMenu: [
//			{name: 'yjjr', title: '应急接入', icon: 'icon-car', children:[
//					{name: 'zb', title: '值班', icon: 'icon-car', href: 'app/yjzhcz/zb.html', active: true},
//					{name: 'jr', title: '接入', icon: 'icon-car', href: 'app/yjzhcz/access.html'}
//				]},
//			// {name: 'yjxy', title: '应急响应', icon: 'icon-car', children:[
//			{name: 'qdbs', title: '启动报送', icon: 'icon-car', href: 'app/yjzhcz/startReport.html'},
//			// ]},
//			{name: 'sjcl', title: '事件处理', icon: 'icon-car', children:[
//					{name: 'zhdd', title: '指挥调度', icon: 'icon-car', href: 'app/yjzhcz/comAControl.html'},
//					{name: 'czlc', title: '处置流程', icon: 'icon-car', href: 'app/yjzhcz/czlc.html'}
//				]},
//			{name: 'xxfb2', title: '信息发布', icon: 'icon-car', children:[
//					{name: 'xxsc', title: '信息生成', icon: 'icon-car', href: 'app/yjzhcz/xxsc.html'},
//					{name: 'xxfb3', title: '信息发布', icon: 'icon-car', href: 'app/yjzhcz/xxfb.html'}
//				]},
//			// {name: 'pgfx', title: '评估分析', icon: 'icon-car', children:[
//			{name: 'cxytj', title: '查询与统计', icon: 'icon-car', href: 'app/yjzhcz/queryStats.html'},
//			// ]},
//			{name: 'zyk', title: '资源库', icon: 'icon-car', children:[
//					{name: 'yjya', title: '应急预案', icon: 'icon-car', href: 'app/yjzhcz/emergencyPlan.html'},
//					{name: 'yjzyk', title: '应急资源库', icon: 'icon-car', children:[
//							{name: 'flfg', title: '法律法规', icon: 'icon-car', href: 'app/yjzhcz/flfg.html'},
//							{name: 'alk', title: '案例库', icon: 'icon-car', href: 'app/yjzhcz/alk.html'},
//						]}
//				]}
//		],
//		dzddfwMenu: [
//			{name: 'dzzl', title: '电召总览', icon: 'icon-car',  href: 'app/dzddfw/dzzl.html', active: true},
//			{name: 'clddfw', title: '车辆调度服务', icon: 'icon-car', children:[
//					{name: 'cldd', title: '车辆调度', icon: 'icon-car', href: 'app/dzddfw/cldd.html'},
//					{name: 'xxxf', title: '消息下发', icon: 'icon-car', href: 'app/dzddfw/xxxf.html'}
//				]},
//			{name: 'znyzfw', title: '智能扬招服务', icon: 'icon-car', children:[{name: 'sjyz', title: '手机扬招', icon: 'icon-car', href: 'app/dzddfw/sjyz.html'},{name: 'pbyz', title: '平板扬招', icon: 'icon-car', href: 'app/dzddfw/pbyz.html'}]},
//			{name: 'qyxzgl', title: '企业在线管理', icon: 'icon-car', children:[
//					{name: 'cljk', title: '车辆监控', icon: 'icon-car', href: 'app/dzddfw/cljk.html'},
//					{name: 'xxfb4', title: '消息发布', icon: 'icon-car', href: 'app/dzddfw/xxfb.html'},
//					{name: 'clyytj', title: '车辆营运统计', icon: 'icon-car', href: 'app/dzddfw/clyytj.html'},
//					{name: 'yhyytj', title: '业户营运统计', icon: 'icon-car', href: 'app/dzddfw/yhyytj.html'},
//					{name: 'yyrb', title: '营运日报', icon: 'icon-car', href: 'app/dzddfw/yyrb.html'},
//					{name: 'yyyb', title: '营运月报', icon: 'icon-car', href: 'app/dzddfw/yyyb.html'},
//					{name: 'yynb', title: '营运年报', icon: 'icon-car', href: 'app/dzddfw/yynb.html'}
//				]},
//			{name: 'gzxxfw', title: '公众信息服务', icon: 'icon-car', children:[
//					{name: 'ckcxfw', title: '乘客出行服务', icon: 'icon-car', href: 'app/dzddfw/ckcxfw.html'},
//					{name: 'sslk', title: '实时路况', icon: 'icon-car', href: 'app/dzddfw/sslk.html'},
//					{name: 'sjlk', title: '司机路况', icon: 'icon-car', href: 'app/dzddfw/sjlk.html'},
//					{name: 'xxfw', title: '信息服务', icon: 'icon-car', href: 'app/dzddfw/xxfw.html'},
//					{name: 'aqfw', title: '安全服务', icon: 'icon-car', href: 'app/dzddfw/aqfw.html'},
//					{name: 'txzy', title: '提醒注意', icon: 'icon-car', href: 'app/dzddfw/txzy.html'}
//				]},
//			{name: 'dzddfw', title: '电召调度服务', icon: 'icon-car', children:[
//					{name: 'dzfw', title: '电召服务', icon: 'icon-car', href: 'app/dzddfw/dzfw.html'},
//					{name: 'yyyc', title: '预约用车', icon: 'icon-car', href: 'app/dzddfw/yyyc.html'},
//					{name: 'swcz', title: '失物查找', icon: 'icon-car', href: 'app/dzddfw/swcz.html'},
//					{name: 'lxgh', title: '路线规划', icon: 'icon-car', href: 'app/dzddfw/lxgh.html'},
//					{name: 'lkcz', title: '路况查找', icon: 'icon-car', href: 'app/dzddfw/lkcz.html'},
//					{name: 'wyfy', title: '外语翻译', icon: 'icon-car', href: 'app/dzddfw/wyfy.html'}
//				]}
//		],
//		jyxxMenu: [
//			{name: 'jyxx', title: '交易信息总览', icon: 'icon-car', children:[
//					{name: 'jyxx', title: '交易信息总览', icon: 'icon-car', href: 'app/jyxx/jyxx.html', active: true},
//					{name: 'zfbjy', title: '支付宝交易', icon: 'icon-car', href: 'app/jyxx/zfbjy.html'},
//					{name: 'wxjy', title: '微信交易', icon: 'icon-car', href: 'app/jyxx/wxjy.html'},
//					{name: 'yljy', title: '银联交易', icon: 'icon-car', href: 'app/jyxx/yljy.html'}
//				]}
//		],
//		zcsjMenu: [
//			{name: 'zcsj', title: '专车数据总览', icon: 'icon-car', children:[
//					{name: 'zcyy', title: '专车数据总览', icon: 'icon-car', href: 'app/zcsj/zcyy.html', active: true},
//					{name: 'dddc', title: '滴滴', icon: 'icon-car', href: 'app/zcsj/dddc.html'},
//					{name: 'ybdc', title: '优步', icon: 'icon-car', href: 'app/zcsj/ybdc.html'},
//					{name: 'ccdc', title: '曹操', icon: 'icon-car', href: 'app/zcsj/ccdc.html'},
//					{name: 'sqdc', title: '首汽', icon: 'icon-car', href: 'app/zcsj/sqdc.html'},
//					{name: 'szdc', title: '神州', icon: 'icon-car', href: 'app/zcsj/szdc.html'},
//					{name: 'yddc', title: '易到', icon: 'icon-car', href: 'app/zcsj/yddc.html'}
//				]}
//		],
//		xxgxybsMenu: [
//			{name: 'xxgxybs', title: '信息共享与报送系统', icon: 'icon-car', children:[{name: 'sjgxcx', title: '信息共享与报送', icon: 'icon-car', href: 'app/xxgxybs/sjgxcx.html', active: true},{name: 'hzsjtxxj', title: '杭州市交通运输局', icon: 'icon-car', href: 'app/xxgxybs/hzsjtxxj.html'},{name: 'zjsjtxxzx', title: '浙江省交通运输厅', icon: 'icon-car', href: 'app/xxgxybs/zjsjtxxzx.html'},{name: 'jtysb', title: '交通运输部', icon: 'icon-car', href: 'app/xxgxybs/jtysb.html'}]}
//		],
//		qxglMenu:[
//		          	{name: 'qx', title: '权限管理', icon: 'icon-car', href: 'app/xxgxybs/qxgl.html'},	
//		          ]
//	};
	function initMentList(options){
		$('#menuListBar').empty().MenuList(options, {
			resetMenuTitleClick: function (item) {
				$('#titleName').text(item.title)
			}
		});
	}
//	$(function () {
	function init(){
		$('.scrollbar-macosx').scrollbar();
		$('.ip-logoBox').on('click', function () {
			console.info('aaaa:', $('.ip-header').attr('state'))
			if ('title' === $('.ip-header').attr('state')) {
				$('.ip-header').attr('state', 'menu');
				setTimeout(function () {
					$('.ip-header .title').css({display: 'none'});
					$('.ip-header .ip-menu').css({display: 'block'});
				}, 400);
			} else {
				$('.ip-header').attr('state', 'title');
				setTimeout(function () {
					$('.ip-header .title').css({display: 'block'});
					$('.ip-header .ip-menu').css({display: 'none'});
				}, 400);
			}
		});
		console.log("menus:",menus)
		$('#serverMenu').MenuList({menu: serverMenu, displayType: 'horizontal', offClickEvent: true, icon: 'iconText', resetHtml: false}, {
			resetMenuClick: function (item) {
				var fMenu = $('.ip-logoBox');
				_.each(fMenu.attr('class').split(' '), function (classItem, index) {
					if (classItem.indexOf('icon-') >= 0) {
						fMenu.removeClass(classItem);
						fMenu.addClass(item.icon)
					}
				});
				// $('#tabWrapper').empty();
				initMentList({
					menu: menus[item.menuList],
					icon: 'icon',
					tabWrapper: '#tabWrapper',
					isTabBarDisplay: false
				});
				// $('#menuListBar').empty().MenuList({menu: menus[item.menuList], icon: 'icon', tabWrapper: '#tabWrapper', isTabBarDisplay: false}, {resetMenuClick: function (item) {console.info('click2222:', item)}});
			}
		});
		
		initMentList({menu: menus.xxfwMenu, icon: 'icon', tabWrapper: '#tabWrapper', isTabBarDisplay: false});
		// $('#menuListBar').MenuList({menu: menus.xxfwMenu, icon: 'icon', tabWrapper: '#tabWrapper', isTabBarDisplay: false});

		$('.icon-poweroff').on('click',function(){
			window.location.href = "http://"+self.location.host+"/zhpt/login.html";
		});
		
		 window.addEventListener("mousewheel", (e) => {
		   if (e.deltaY === 1) {
		     e.preventDefault();
		   }
		 })
	}
})(jQuery);
