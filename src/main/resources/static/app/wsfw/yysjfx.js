var yysjfx = (function($) {
	$(function () {
//		function getMyDate(str) {
//			    var oDate = new Date(str),
//			    oYear = oDate.getFullYear(),
//			    oMonth = oDate.getMonth()+1,
//			    oDay = oDate.getDate(),
//			    oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay);
//			    return oTime;
//			}
//		function addZero(num){
//		    if(parseInt(num) < 10){
//		        num = '0'+num;
//		    }
//		    return num;
//		}
		function issh(str1,str2){
			if(str1==''||str2==''){
				return 0;
			}else{				
				if(str1.substring(5,7)==str2.substring(5,7)){
					return 0;
				}else{
					
					return 1;
				}
			}
		}
		var yysjfxFields = [
            {name: 'gridId', title: '序号', width: 120, align: 'center'},
      			{name: 'TIME', title: '日期', width: 70, align: 'center'},
      			{name: 'JIN', title: '单车平均营运收益(元)', width: 140, align: 'center'},
      			{name: 'ZL', title: '单车平均载客里程(公里)', width: 140, align: 'center'},
      			{name: 'KS', title: '单车平均空驶里程(公里)', width: 140, align: 'center'},
      			{name: 'TJ', title: '单车平均营运次数', width: 140, align: 'center'},
      			{name: 'SJ', title: '单车平均载客时间(分钟)', width: 140, align: 'center'},
      			{name: 'DH', title: '单车平均载客等候时间(分钟)', width: 160, align: 'center'}
      		];
		$('#yysjfx-datetimeStart').datetimepicker(dateDefaultOption);
		$('#yysjfx-datetimeEnd').datetimepicker(dateDefaultOption);
//		$('#yysjfx-datetimeStart').val(getMyDate(parseInt(new Date().getTime()-1*24*3600*1000)));
//		$('#yysjfx-datetimeEnd').val(getMyDate(parseInt(new Date().getTime()-1*24*3600*1000)));
		$('.addTimePeriod, .period').on('click', function () {
			if ($(this).hasClass('addTimePeriod')) $(this).addClass('period').removeClass('addTimePeriod');
			else if ($(this).hasClass('period')) $(this).addClass('addTimePeriod').removeClass('period');
		});
		          		
		          		
  		function hxx(){
  			var str1=$('#yysjfx-datetimeStart').val();
  			var str2=$('#yysjfx-datetimeEnd').val();
  			if(issh(str1,str2)=='1'){
  				layer.msg('不支持跨越查询',{icon:2});
  				return false;
  			}
  			var all = 0;
			$('#yysjfxTable').jsGrid({
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
                fields: yysjfxFields,
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
     	        url:"../../yysjfx/getFindAllYysjf",
     	        data:{
     	        	"start" : $("#yysjfx-datetimeStart").val(),
     				"stop" : $("#yysjfx-datetimeEnd").val(),
     				"pageIndex":filter.pageIndex,
     				"pageSize":filter.pageSize
     	        },
     	       timeout : 180000,
     	       dataType: 'json',
            }).done(function(data) {
            	if(data.code==500100){
            		layer.msg('数据不存在',{icon:2});
            		return callback();
            	}
 				all = data[0].count;
        		var xxfbData = [];
        		if(data.length>0){
					for(var i=0;i<data[0].datas.length;i++){
						var rs={};
						var obj=data[0].datas[i];
						rs.gridId=startIndex+i+1;							
						rs.TIME=(obj.TIME==null?"":(new Date(obj.TIME)).Format("yyyy-MM-dd"));
						rs.JIN=obj.JIN;
						rs.ZL=obj.ZL;
						rs.KS=obj.KS;
						rs.TJ=obj.TJ;
						rs.SJ=obj.SJ;
						rs.DH=obj.DH;
						xxfbData.push(rs);
					}
					return callback({
                        data: xxfbData,
                        itemsCount: all
                    });
                }else{
    			}
            }).fail(function() {
//        			alert("数据异常");
            });
		}
		hxx();
  		//导出
  		
  		$("#daochu_yysjfx").off('click').on('click',function(){
  			var str1=$('#yysjfx-datetimeStart').val();
  			var str2=$('#yysjfx-datetimeEnd').val();
  			if(issh(str1,str2)=='1'){
  				layer.msg('不支持跨越查询',{icon:2});
  				return false;
  			}
            layer.confirm('确认导出吗',{btn:['确认','取消']
            },function () {
                layer.msg('导出成功',{icon:1});
                window.open(basePath+"yysjfx/ExportFind?start="+$("#yysjfx-datetimeStart").val()+"&stop="+$("#yysjfx-datetimeEnd").val());
            },function () {
                layer.msg('已取消导出',{icon:2});
            })

  		});

  		$("#select_yysjfx").off('click').on('click',function(){
  			hxx();
  		});	
	});
})(jQuery);
