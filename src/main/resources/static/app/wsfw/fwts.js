var fwts = (function($) {
	var all = 0,re;
	$(function () {
		
	
		var fwtsFields = [
            {name: 'gridId', title: '序号', width: 60, align: 'center'},
		      			{name: 'CPH', title: '车牌号', width: 120},
		      			{name: 'BSSJ', title: '被诉司机', width: 120},
		      			{name: 'CCSJ', title: '乘车时间', width: 150},
		      			{name: 'SLSJ', title: '受理时间', width: 150},
		      			{name: 'LXFS', title: '联系方式', width: 120},
		      			{name: 'TSR', title: '投诉人', width: 120},
		      			{name: 'DCQK', title: '调查情况', width: 120},
		      			{name: 'TSSY', title: '投诉事由', width: 250},
		      			{name: 'TSRYJ', title: '投诉人意见', width: 250},
		      			{name: 'CLJG', title: '处理结果', width: 180},
		      			{name: 'caozuo', title: '操作',
		      				itemTemplate: function (_,item) {
		      				var style = {marginRight: '4px'};
		      					return [
		      						$('<a>').addClass('btn btn-primary btn-xs').text('详情').css(style).on('click', function () {
		      							$('#fwts-dialog').modal('show');
		      							$('#fwts-dialog .modal-title').text('详情');
                                        $('#fwts-dialog-save').hide();
		      							$('#fwts-dialog-form').addClass('ip-type-text').removeClass('ip-type-input');
		      							/* 详情 */
		      							$('#fwts_cph').text(item.CPH);
		      							$('#fwts_bsjs').text(item.BSSJ);
		      							$('#fwts_ccsj').text(item.CCSJ);
		      							$('#fwts_slsj').text(item.SLSJ);
		      							$('#fwts_lxfs').text(item.LXFS);
		      							$('#fwts_tsr').text(item.TSR);
		      							$('#fwts_dcqk').text(item.DCQK);
		      							$('#fwts_tssy').text(item.TSSY);
		      							$('#fwts_tsyj').text(item.TSRYJ);
		      							$('#fwts_cljg').text(item.CLJG);
		      						
		      						}),
		      						$('<a>').addClass('btn btn-primary btn-xs').text('修改').css(style).on('click', function () {
		      							$('#fwts-dialog').modal('show');
		      							$('#fwts-dialog .modal-title').text('修改');
		      							$('#fwts-dialog-form').addClass('ip-type-input').removeClass('ip-type-text');
		      							$('#fwts-dialog-save').show();
		      							$('#fwts-dialog-ccsj input.form-control, #fwts-dialog-slsj input.form-control').datetimepicker(dateDefaultOption);
		      							/* 修改的
		      							
		      							
		      							*/
		      							$('#fwts_cph1').val(item.CPH);
		      							$('#fwts_bsjs1').val(item.BSSJ);
		      							$('#fwts_ccsj1').val(item.CCSJ);
		      							$('#fwts_slsj1').val(item.SLSJ);
		      							$('#fwts_lxfs1').val(item.LXFS);
		      							$('#fwts_tsr1').val(item.TSR);
		      							$('#fwts_dcqk1').val(item.DCQK);
		      							$('#fwts_tssy1').val(item.TSSY);
		      							$('#fwts_tsyj1').val(item.TSRYJ);
		      							$('#fwts_cljg1').val(item.CLJG);
		      							
		      							$("#fwts-dialog-save").off('click').on('click' ,function(){
		      							/* 	var cph=$('#fwts_cph1').val();
		      								alert(cph); */
		      								jqxhr=$.ajax({
		      									 url :basePath + "getUpdatefwts",
		      										type : 'post',
		      										dataType: 'json',
		      										data:{"bid":item.BID,
		      											"cph":$('#fwts_cph1').val(),
		      											"bsjs":$('#fwts_bsjs1').val(),
		      											"ccsj":$('#fwts_ccsj1').val(),
		      											"slsj":$('#fwts_slsj1').val(),
		      											"lxfs":$('#fwts_lxfs1').val(),
		      											"tsr":$('#fwts_tsr1').val(),
		      											"dcqk":$('#fwts_dcqk1').val(),
		      											"tssy":$('#fwts_tssy1').val(),
		      											"tsyj":$('#fwts_tsyj1').val(),
		      											"cljg":$('#fwts_cljg1').val()},
		      										timeout : 180000,
		      										success:function(data){
		      										if(data>0){
		      											$('#fwts-dialog').modal('hide');
		      											hxx();
		      										}
		      											
		      										}
		      									 
		      								 });
		      							})
		      							 
		      							
		      						}),
		      						$('<a>').addClass('btn btn-danger btn-xs').text('删除').on('click', function () {
		      							layer.confirm('确认删除吗 ？',{btn: ['确认','取消']
		      							},function(){
		      								
		      								jqxhr=$.ajax({
			      								url: basePath + "getDeletefwt",
			      								type:'post',
			      								dataType:'json',
			      								data:{"bid":item.BID},
			      								success:function(data){
			      									if(data>0){
                                                        layer.msg('删除成功',{icon: 1});
                                                        hxx();

			      									}else{

                                                        layer.msg('删除失败',{icon: 2});
			      									}
			      								}
			      							});
		      								
		      								
		      							},function(){
		      								layer.msg('已取消删除',{icon: 2});
		      							})
		      							
		      							/**/
		      							
		      							
		      						})
		      					];
		      				}, width: 135}
		      		];
		      	/* 	var fwtsData = [
		      			{sjxm: '司机姓名1', cphm: '车牌号1', ccsj: '乘车时间1', slsj: '受理时间1', lxfs: '联系方式1', tsre: '投诉人1', tcqk: '调查情况1', tssy: '投诉事由1', tsyj: '投诉人意见1', cljg: '处理结果1'},
		      			{sjxm: '司机姓名2', cphm: '车牌号2', ccsj: '乘车时间2', slsj: '受理时间2', lxfs: '联系方式2', tsre: '投诉人2', tcqk: '调查情况2', tssy: '投诉事由2', tsyj: '投诉人意见2', cljg: '处理结果2'},
		      			{sjxm: '司机姓名3', cphm: '车牌号3', ccsj: '乘车时间3', slsj: '受理时间3', lxfs: '联系方式3', tsre: '投诉人3', tcqk: '调查情况3', tssy: '投诉事由3', tsyj: '投诉人意见3', cljg: '处理结果3'},
		      			{sjxm: '司机姓名4', cphm: '车牌号4', ccsj: '乘车时间4', slsj: '受理时间4', lxfs: '联系方式4', tsre: '投诉人4', tcqk: '调查情况4', tssy: '投诉事由4', tsyj: '投诉人意见4', cljg: '处理结果4'},
		      			{sjxm: '司机姓名5', cphm: '车牌号5', ccsj: '乘车时间5', slsj: '受理时间5', lxfs: '联系方式5', tsre: '投诉人5', tcqk: '调查情况5', tssy: '投诉事由5', tsyj: '投诉人意见5', cljg: '处理结果5'}
		      		]; */
		      		var resetQueryConditions = function (e) {
		      			$(' #fwts-siji').val('');
		      			$("#fwts-carNumber").select2('val','0');
		      		};
		      		var addfwts = function (e) {
		      			$('#fwts-dialog').modal('show');
		      			$('#fwts-dialog .modal-title').text('添加');
		      			$('#fwts-dialog-form').addClass('ip-type-input').removeClass('ip-type-text');
		      			$('#fwts-dialog-save').show();
		      			$('#fwts-dialog-ccsj input.form-control, #fwts-dialog-slsj input.form-control').datetimepicker(dateDefaultOption);
		      			
		      			//添加
		      			$("#fwts-dialog-save").off('click').on('click',function(){
		      				
		      				jqxhr=$.ajax({
		      					url : basePath + "getInsertfwts",
		      					type : 'post',
		      					dataType : 'json',
		      					data : {
		      						"cph":$('#fwts_cph1').val(),
		      						"bsjs":$('#fwts_bsjs1').val(),
		      						"ccsj":$('#fwts_ccsj1').val(),
		      						"slsj":$('#fwts_slsj1').val(),
		      						"lxfs":$('#fwts_lxfs1').val(),
		      						"tsr":$('#fwts_tsr1').val(),
		      						"dcqk":$('#fwts_dcqk1').val(),
		      						"tssy":$('#fwts_tssy1').val(),
		      						"tsyj":$('#fwts_tsyj1').val(),
		      						"cljg":$('#fwts_cljg1').val()},
		      						
		      					   success:function(data){
		      						if(data>0){
		      							layer.msg('添加成功',{icon:1})
                                        $('#fwts-dialog').modal('hide');
                                        hxx();
									}else{
                                        layer.msg('添加失败',{icon:2})
									}
		      					}
		      				});
		      			});
		      		};
		      		
		      		
		      	/*	function hxx(){
		      			var index=layer.msg('正在努力加载',{
		      				icon: 16
		      				,shade: 0.01,
		      				time:6000
		      			});
		      			
		      		
		      		    var url=basePath;
		      			var data={};
		      			var carcph=$("#fwts-carNumber").val();
		      			var siji=$("#fwts-siji").val();
		      			
		      			if(!carcph && !siji){
		      				url+="getfwts";
		      				
		      			}else{
		      				url+="getSelectN";
		      				data.cph=carcph;
		      				data.sj=siji;
		      			}
		      			
		      			
		      		    jqxhr=$.ajax({
		      				url : url,
		      				type : 'post',
		      				data: data,
		      				dataType: 'json',
		      				timeout : 180000,
		      				success:function(data){
		      					var datas = data.data;
		      					for(var i=0; i<data.length; i++){
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
//		       					    pageFirstText: "首页",
//		       					    pageLastText: "尾页",
//		       					    data: datas,
//		       						fields: yhglFields
//		       					});
		      					$('#fwtsTable').jsGrid({
		      						width: 'calc(100% - 2px)',
		      						height: 'calc(100% - 2px)',
		      						editing: true,
		      						sorting: true,
		      						paging: false,
		      						autoload: true,
		      						data: datas,
		      						fields: fwtsFields
		      					});
		      				},
		      				error:function(data){
		      				}
		      			});
		      		};*/
		      		
		      		
		      		
		      		
		      		function hxx(){
		    			$('#fwtsTable').jsGrid({
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
		    			//console.log(filter)
		                var startIndex = (filter.pageIndex - 1) * filter.pageSize;
		                jqxhr=$.ajax({
		         	        url:"../../getfwtsFindAll",
		         	        data:{
		         	        	"cph" : $("#fwts-carNumber").val(),
		         				"xm" : $("#fwts-siji").val(),
		         				"pageIndex":filter.pageIndex,
		         				"pageSize":filter.pageSize
		         	        },
		         	        dataType: 'json'
		                }).done(function(json) {
		                		var xxfbData = [];
		                		all = json.data[0].count;
		         				re = json.data[0].datas;
                            for (var i = 0; i < re.length; i++) {
                                var iterm = re[i];
                                iterm.gridId=startIndex+i+1;
                            }

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
		      		
		      		
		      		
		      		
		      		$("#select_fwts").click(function(){
		      			hxx();
		      		});
		      		
		      		
		      		$("#fwts-Export").off('click').on('click',function(){
		      			window.open(basePath + "getAllExport?cph="+$("#fwts-carNumber").val()+"&xm="+$("#fwts-siji").val())
		      			
		      		})
		      		
		      		$(function () {
		      		

		      			jqxhr=$.ajax({
							type:"post",
							url:basePath + "getSelectNames",
							data:{cph:$("#fwts-carNumber").val()},
							dataType:'json',
							timeout:3600000,
							success:function (json) {
								var data=json.data;
								for(var i =0;i<data.length;i++){
									data[i].id=data[i].CPH;
									data[i].text=data[i].CPH;


								}
								var qb={};
								qb.id='filter';
								qb.text="全部";
                                data.unshift(qb);
                                $('#fwts-carNumber').select2({
                                    language: 'zh-CN',
                                    minimumInputLength: 3,
                                    width: '160',
                                    allowClear: true,
                                    data: data
								});


                            }
						})




		      			/*$('#fwts-carNumber').select2({
		      				language: 'zh-CN',
		      				width: '160',
							ajax:{
		      					url:basePath +"getSelectNames",
                                dataType: 'json',
								data:function (params) {
		      						return{cph :params.term};

                                },
                                processResults: function(res) {
                                    var data = _.map(res.data, function(item){
                                        return {id: item.CPH, text: item.CPH}
                                    });
                                    return {
                                        results: data
                                    };
                                }
							}
		      			});*/


		      			$('#fwts-reset').on('click', resetQueryConditions);
		      			$('#fwts-add').on('click', addfwts);
		      			$('#fwts-dialog').on('hidden.bs.modal', function (e) {
		      				$(this).find('input[type=text].form-control, textarea.form-control').val('');
		      				$(this).find('select.form-control').val('').trigger('change');
		      				$(this).find('div.form-control').text('');
		      			});
		      			$('#fwtsTable').jsGrid({
		      				width: 'calc(100% - 2px)',
		      				height: 'calc(100% - 2px)',
		      				editing: true,
		      				sorting: true,
		      				paging: false,
		      				autoload: true,
		      				data: [],
		      				fields: fwtsFields
		      			});
		      			$('.scrollbar-macosx').scrollbar();
		      			hxx();
		
		      		});
	});
})(jQuery);
