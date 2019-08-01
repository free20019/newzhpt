var wmcl = (function($) {
	var all = 0,re;
	$(function () {
		var wmclFields = [
            {name: 'gridId', title: '序号', width: 60, align: 'center'},
		      			//{name: 'BID', title: '编号', width: 120},
		      			{name: 'CPH', title: '车牌号', width: 120},
		      			{name: 'PDRQ', title: '判定日期', width: 120},
		      			{name: 'NF', title: '年份', width: 150},
		      			{name: 'RYMC', title: '荣誉名称', width: 250},
		      			{name: 'XJQK', title: '星级情况', width: 120},
		      			{name: 'BZ', title: '备注', width: 120},
		      			{name: 'caozuo', title: '操作',
		      				itemTemplate: function (_,item) {
		      					var style = {marginRight: '4px'};
		      					return [
		      						$('<a>').addClass('btn btn-primary btn-xs').text('详情').css(style).on('click', function () {
		      							$('#wmcl-dialog').modal('show');
		      							$('#wmcl-dialog .modal-title').text('详情');
		      							$('#wmcl-dialog-form').addClass('ip-type-text').removeClass('ip-type-input');
		      							$('#wmcl-dialog-save').hide();
		      							$("#wmcl_cphm").text(item.CPH);
		      							$("#wmcl_pdrq").text(item.PDRQ);
		      							$("#wmcl_nf").text(item.NF);
		      							$("#wmcl_rymc").text(item.RYMC);
		      							$("#wmcl_xjqk").text(item.XJQK);
		      							$("#wmcl_bz").text(item.BZ);
		      						}),
		      						$('<a>').addClass('btn btn-primary btn-xs').text('修改').css(style).on('click', function () {
		      							$('#wmcl-dialog').modal('show');
		      							$('#wmcl-dialog .modal-title').text('修改');
		      							$('#wmcl-dialog-form').addClass('ip-type-input').removeClass('ip-type-text');
		      							$('#wmcl-dialog-save').show();
		      							$('#wmcl-dialog-pdrq input.form-control').datetimepicker(dateDefaultOption);
		      							$("#wmcl_cphm1").val(item.CPH);
		      							$("#wmcl_pdrq1").val(item.PDRQ);
		      							$("#wmcl_nf1").val(item.NF);
		      							$("#wmcl_rymc1").val(item.RYMC);
		      							$("#wmcl_xjqk1").val(item.XJQK);
		      							$("#wmcl_bz1").val(item.BZ);
		      							
		      							
		      							$("#wmcl-dialog-save").off('click').on('click' ,function(){
		      								jqxhr=$.ajax({
		      									 url :basePath + "getUpdatewmcl",
		      										type : 'post',
		      										dataType: 'json',
		      									 data:{"bid":item.BID,"cph":$("#wmcl_cphm1").val(),"pdrq":$("#wmcl_pdrq1").val(),"nf":$("#wmcl_nf1").val(),
		      											"rymc":$("#wmcl_rymc1").val(),"xjqk":$("#wmcl_xjqk1").val(),"bz":$("#wmcl_bz1").val()},
		      										timeout : 180000,
		      										success:function(data){
		      											console.log(data);
		      											if(data>0){
		      												$('#wmcl-dialog').modal('hide');
		      												layer.msg('修改成功',{icon :1});
		      												hxx();
		      											}
		      										
		      										}
		      									 
		      								 });
		      							})
		      							
		      							
		      							
		      						}),
		      						$('<a>').addClass('btn btn-danger btn-xs').text('删除').on('click', function () {
		      							
		      							layer.confirm('确认删除吗？',{btn :['确认','取消']
		      							},function(){
		      								
		      								jqxhr=$.ajax({
			      								url: basePath + "getDeletewmc",
			      								type:'post',
			      								dataType:'json',
			      								data:{"bid":item.BID},
			      								success:function(data){
			      									if(data>0){
                                                        layer.msg('删除成功',{icon :1});
                                                        hxx();
			      									}else{


                                                        layer.msg('删除失败',{icon :1});
			      									}
			      								}
			      								
			      							});
		      								
		      							},function(){
		      								layer.msg('删除已取消',{icon :2});
		      							})
		      							
		      							
		      						
		      							
		      							
		      							
		      							
		      							
		      						})
		      						
		      					];
		      				}, width: 135}
		      		];
		      		/* var wmclData = [
		      			{cphm: '车牌号1', pdrq: '判定日期1', nife: '年份1', rymc: '荣誉名称1', xjqk: '星级情况1', beiz: '备注1'},
		      			{cphm: '车牌号2', pdrq: '判定日期2', nife: '年份2', rymc: '荣誉名称2', xjqk: '星级情况2', beiz: '备注2'},
		      			{cphm: '车牌号3', pdrq: '判定日期3', nife: '年份3', rymc: '荣誉名称3', xjqk: '星级情况3', beiz: '备注3'},
		      			{cphm: '车牌号4', pdrq: '判定日期4', nife: '年份4', rymc: '荣誉名称4', xjqk: '星级情况4', beiz: '备注4'},
		      			{cphm: '车牌号5', pdrq: '判定日期5', nife: '年份5', rymc: '荣誉名称5', xjqk: '星级情况5', beiz: '备注5'}
		      		]; */
		      		var resetQueryConditions = function (e) {
		      			$('.panel-queryBar .form-control').val('');
		      			$("#wmcl-cphm").select2('val','0')
		      		};
		      		var addwmcl = function (e) {
		      			$('#wmcl-dialog').modal('show');
		      			$('#wmcl-dialog .modal-title').text('添加');
		      			$('#wmcl-dialog-form').addClass('ip-type-input').removeClass('ip-type-text');
		      			$('#wmcl-dialog-save').show();
		      			$('#wmcl-dialog-pdrq input.form-control').datetimepicker(dateDefaultOption);
		      			$('#wmcl-dialog-nife input.form-control').datetimepicker(dateYearDefaultOption);
		      			
		      			
		      			//添加
		      			$("#wmcl-dialog-save").off('click').on('click',function(){
		      				var cph=$("#wmcl_cphm1").val();
		      				var pdrq=$("#wmcl_pdrq1").val();
		      				var nf=$("#wmcl_nf1").val();
		      				var rymc=$("#wmcl_rymc1").val();
		      				var xjqk=$("#wmcl_xjqk1").val();
		      				var bz=$("#wmcl_bz1").val();
		      				
		      				jqxhr=$.ajax({
		      					url : basePath + "getInsertwmcl",
		      					type : 'post',
		      					dataType : 'json',
		      					data:{"cph":cph,"pdrq":pdrq,"nf":nf,"rymc":rymc,"xjqk":xjqk,"bz":bz},
		      					timeout:180000,
		      					success:function(data){
		      						if(data>0){
		      							layer.msg('添加成功',{icon:1});
                                        $('#wmcl-dialog').modal('hide');
                                        hxx();
									}else{
                                        layer.msg('添加失败',{icon:1});
									}
		      					}
		      				});
		      			});
		      			
		      		};
		      		
		      	/*	function hxx(){
		      			var index =layer.msg('小妹正在努力加载',{
		      				icon: 16
		      				,shade: 0.01,
		      				time: 6000
		      			});
		      			
		      			//查询
		      			
		      			 var url = basePath;
		      			    var data = {};
		      			    var cphh = $("#wmcl-cphm").val();
		      			    var rymcc = $("#wmcl-rymc").val();
		      		    	console.info('hxx:', cphh, rymcc)
		      			    if (!cphh && !rymcc) {
		      			        url += 'getwmcl';
		      	            } else {
		      			        url += 'getSelectName';
		      			        data.cph=cphh;
		      			        data.rymc=rymcc;
		      	            }
		      			
		      		    jqxhr=$.ajax({
		      				url : url,
		      				type : 'post',
		      				data : data,
		      				dataType: 'json',
		      				timeout : 180000,
		      				success:function(data){
		      					var datas = data.data;
		      					for(var i=0; i<datas.length; i++){
		      						var item = datas[i];
		      						item.gridId=i+1;
		      					}
//		       					$('#yhglTable').jsGrid({
//		       						width: '100%',
//		       						height: 'calc(100% - 45px)',
//		       						editing: true,
//		       						sorting: true,
//		       						paging: true,
//		       						autoload: true,
//		       						pageIndex: 1,
//		       					    pageSize: 20,
//		       					    pageButtonCount: 15,
//		       					    pagerFormat: "{first} {prev} {pages} {next} {last}    {pageIndex} / {pageCount}",
//		       					    pagePrevText: "上一页",
//		       					    pageNextText: "下一页",
//		       					    pageFirstText: "第一页",
//		       					    pageLastText: "尾页",
//		       					    data: datas,
//		       						fields: yhglFields
//		       					});
		      					$('#wmclTable').jsGrid({
		      						width: 'calc(100% - 2px)',
		      						height: 'calc(100% - 2px)',
		      						editing: true,
		      						sorting: true,
		      						paging: false,
		      						autoload: true,
		      						data: datas,
		      						fields: wmclFields
		      					});
		      				},
		      				error:function(data){
		      				}
		      			});
		      		};*/
		      		
		      		
		      		
		      		function hxx(){
		    			$('#wmclTable').jsGrid({
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
		    			console.log(filter)
		                var startIndex = (filter.pageIndex - 1) * filter.pageSize;
		                jqxhr=$.ajax({
		         	        url:"../../getwmclFindAll",
		         	        data:{
		         	        	"cph" : $("#wmcl-cphm").val(),
		         				"rymc" : $("#wmcl-rymc").val(),
		         				"pageIndex":filter.pageIndex,
		         				"pageSize":filter.pageSize
		         	        },
		         	        dataType: 'json'
		                }).done(function(json) {
		                		var xxfbData = [];
		         				console.log(json)
		                		all = json.data[0].count;
		         				re = json.data[0].datas;
		         				//console.log(all)
                            for (var i = 0; i < re.length; i++) {
                                var iterm = re[i];
                                iterm.gridId=i+1;}
							if(json.code == 0){
		             				/*for(var i = 0; i< re.length ;i++){
		             					var rs={};
		             					rs.title =  re[i].BT;
		             					rs.content =  re[i].NR;
		               					rs.datetime =  re[i].FBRQ;
		             					rs.type =  re[i].LB;
		             					xxfbData.push(rs);
		             				}*/
		             				return callback({
		                                data: re,
		                                itemsCount: all
		                            });
		             			}else{
		            			}
		                }).fail(function() {
//		            			alert("数据异常");
		                });
		    		}
		      		
		      		$("#wmcl_select").click(function(){
		      			hxx();
		      		});
		      		
		      		
		      		$("#wmcl-Export").off('click').on('click',function(){
		      			layer.confirm('确认导出吗？',{btn:['确认','取消']
		      			},function () {
                            layer.msg('导出成功',{icon:1});
                            window.open(basePath + "getwmclExport?cph="+$("#wmcl-cphm").val()+"&rymc="+$("#wmcl-rymc").val())
                        },function () {
                            layer.msg('已取消导出',{icon:1});
                        })

		      		})
		      		
		      		
		      		$(function () {
		      			$(".select2").select2({  
	        			  	language: "zh-CN",  //设置 提示语言
	        		        tags:true,  
	        		        createTag:function (decorated, params) {  
	        		            return null;  
	        		        },  
	        		    });
		      			$('.addTimePeriod, .period').on('click', function () {
		      				if ($(this).hasClass('addTimePeriod')) $(this).addClass('period').removeClass('addTimePeriod');
		      				else if ($(this).hasClass('period')) $(this).addClass('addTimePeriod').removeClass('period');
		      			});



		      			jqxhr=$.ajax({
                            type:'post',
                            url:basePath + "getSelectName",
                            data:{"cph":$("#wmcl-cphm").val()},
                            dataType:'json',
                            timeout:3600000,
							success:function (data) {
                            	var datas=data.data;

                            	for(var i=0;i<datas.length;i++){

                                    datas[i].id=datas[i].CPH;
                                    datas[i].text=datas[i].CPH;
								}
								var fh={};
                            	fh.id="filter";
                            	fh.text="全部";
                            	datas.unshift(fh);
                            	$("#wmcl-cphm").select2({
                                    language: 'zh-CN',
                                    width: '160',
                                    minimumInputLength: 3,
									allowClear:true,
									data:datas
								})

                            }


						})

		      		/*	$('#wmcl-cphm').select2({
		      				language: 'zh-CN',
		      				width: '160',
                            ajax: {
                                url: basePath + "getSelectName",
                                dataType: 'json',
                                data: function (params) {
                                    var query = {cph: params.term };
                                    return query;
                                },
                                processResults:function (res) {
                                    var data=_.map(res.data,function (item) {
                                        return {id:item.CPH,text:item.CPH}
                                    });
                                    return{
                                        results:data
                                    };
                                }
                            },
						});*/
		      			$('#wmcl-reset').on('click', resetQueryConditions);
		      			$('#wmcl-add').on('click', addwmcl);
		      			$('#wmcl-dialog').on('hidden.bs.modal', function (e) {
		      				$(this).find('input[type=text].form-control, textarea.form-control').val('');
		      				$(this).find('select.form-control').val('').trigger('change');
		      				$(this).find('div.form-control').text('');
		      			});
		      			$('#wmclTable').jsGrid({
		      				width: 'calc(100% - 2px)',
		      				height: 'calc(100% - 2px)',
		      				editing: true,
		      				sorting: true,
		      				paging: false,
		      				autoload: true,
		      				data: [],
		      				fields: wmclFields
		      			});
		      			$('.scrollbar-macosx').scrollbar();
		      			hxx();
		      		})
	
	});
})(jQuery);
