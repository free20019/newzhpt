var czsbcx = (function($) {
	var all = 0,re;
	$(function () {
		$(".select2").select2({  
		  	language: "zh-CN",  //设置 提示语言
	        tags:true,  
	        createTag:function (decorated, params) {  
	            return null;  
	        },  
	    });
		
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
					data[i].id=data[i].PLATE_NUMBER;
					data[i].text=data[i].PLATE_NUMBER;
				}
				var qb={};
				qb.id='0';
				qb.text='全部';
				data.unshift(qb);
				$('#czsbcx_cph').select2({
					data: data,
					allowClear: true,
					language:'zh-CN',
                    minimumInputLength: 3,
					placeholder:"车牌号"
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
				$('#czsbcx_yh').select2({
					data: data,
					allowClear: true,
					placeholder:"业户名称"
				});
				
			}
		});
		
		//初始化
		init();

		//图表
		function init(){
			$('#czsbcxTable').jsGrid({
				width: '100%',
				height: 'calc(100% - 55px)',
				autoload: true,
				paging: true,
				pageLoading: true,
				pageSize: 15,
				pageIndex: 1,
				controller: {
                    loadData: function(filter) {
                    	var d = $.Deferred();
                    	var a = res(filter, function(item){
                    		d.resolve(item);
                    	})
                    	return d.promise();
                    }
                },
                fields: [
                    {name: 'ID', title: '序号', width: 60, align: 'center'},
        			{name: 'BA_NAME', title: '业户名称', width: 300, align: 'center'},
//        			{name: 'COMP_NAME', title: '分公司名', width: 200, align: 'center'},
        			{name: 'VEHI_NUM', title: '车辆编号', width: 100, align: 'center'},
        			{name: 'VEHI_NO', title: '车牌号', width: 100, align: 'center'},
        			{name: 'MDT_SUB_TYPE', title: '终端类型', width: 100, align: 'center'},
        			{name: 'MDT_NO', title: '终端编号', width: 120, align: 'center'},
        			{name: 'MT_NAME', title: '终端型号', width: 100, align: 'center'},
        			{name: 'SIM_NUM', title: 'SIM卡号', width: 160, align: 'center'},
        			{name: 'OWN_NAME', title: '车主姓名', width: 100, align: 'center'},
        			{name: 'OWN_TEL', title: '车主电话', width: 120, align: 'center'},
        			{name: 'HOME_TEL', title: '白班电话', width: 120, align: 'center'},
        			{name: 'VC_NAME', title: '车辆颜色', width: 100, align: 'center'},
        			{name: 'INST_TIME', title: '初装时间', width: 100, align: 'center'},
//        			{name: 'NOTE', title: '备注', width: 300, align: 'center'}
        		],
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

		function res(filter, callback){		
			//跳转赋值  ---- step 1
			var name =  $($($(window.parent.document)).find('#zl_mac')).val();
			console.log("name:"+name)
	        if(name != ""){
	         	$("#czsbcx_zdlx").val(name);
	         	$($($(window.parent.document)).find('#zl_mac')).val("");
	        }
			
//			console.log(filter)
            var startIndex = (filter.pageIndex - 1) * filter.pageSize;
            jqxhr=$.ajax({
     	        url:"../../tjfx/czsbcx",
     	        data:{
	     	       	"cph" : $("#czsbcx_cph option:selected").html()||"全部",
	 				"yh" : $("#czsbcx_yh option:selected").html()||"全部",
     				"zdlx" : $("#czsbcx_zdlx").val(),
     				"zdbh" : $("#czsbcx_zdbh").val(),
     				"pageIndex":filter.pageIndex,
     				"pageSize":filter.pageSize
     	        },
     	        dataType: 'json'
            }).done(function(json) {
            		var czsbcxData = [];
            		all = json.data[0].count;
     				re = json.data[0].datas;
         			if(json.code == 0){
         				for(var i = 0; i< re.length ;i++){
         					var rs={};
         					rs.ID = startIndex+i+1;
         					rs.BA_NAME =  re[i].BA_NAME;
           					rs.COMP_NAME =  re[i].COMP_NAME;
         					rs.VEHI_NUM =  re[i].VEHI_NUM;
         					rs.VEHI_NO =  re[i].VEHI_NO;
         					rs.MDT_NO =  re[i].MDT_NO;
         					rs.MT_NAME =  re[i].MT_NAME;
         					
         					rs.SIM_NUM =  re[i].SIM_NUM;
           					rs.OWN_NAME =  re[i].OWN_NAME;
         					rs.OWN_TEL =  re[i].OWN_TEL;
         					rs.HOME_TEL =  re[i].HOME_TEL;
         					rs.VC_NAME =  re[i].VC_NAME;
         					rs.INST_TIME=  formatYYYYMMDDHHMISS(re[i].INST_TIME)
         					rs.MDT_SUB_TYPE =  re[i].MDT_SUB_TYPE;
         					
         					czsbcxData.push(rs);
         				}
         				return callback({
                            data: czsbcxData,
                            itemsCount: all
                        });
         			}else{
        			}
            }).fail(function() {
//        			alert("数据异常");
            });
		}

		//查询
		$("#czsbcx_cx").on('click',function(){
			init();
		});

		//导出
		$("#czsbcx_dc").on('click',function(){
			var data = {
					"cph" : $("#czsbcx_cph option:selected").html()||"全部",
     				"yh" : $("#czsbcx_yh option:selected").html()||"全部",
     				"zdlx" : $("#czsbcx_zdlx").val(),
     				"zdbh" : $("#czsbcx_zdbh").val()
				};
				url = "../../tjfx/czsbcxxlsx?data=" + JSON.stringify(data) , window.open(url)
		});
	});
})(jQuery);