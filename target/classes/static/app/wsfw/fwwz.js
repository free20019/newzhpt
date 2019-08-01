var fwwz = (function($) {
	var all = 0,re;
	$(function () {
		
		var fwwzFields = [
            {name: 'gridId', title: '序号', width: 60, align: 'center'},
		      			{name: 'SJNAME', title: '司机姓名', width: 120},
		      			{name: 'CPHAO', title: '车牌号', width: 120},
		      			{name: 'WZSJ', title: '违章时间', width: 150},
		      			{name: 'WZDD', title: '违章地点', width: 250},
		      			{name: 'WZNR', title: '违章内容', width: 250},
		      			{name: 'WZXZ', title: '违章性质', width: 120},
		      			{name: 'KFQK', title: '扣分情况', width: 120},
		      			{name: 'CJSJ', title: '创建时间', width: 150},
		      			{name: 'FK', title: '罚款', width: 120},
		      			{name: 'caozuo', title: '操作',
		      				itemTemplate: function (_,item) {
		      				var style = {marginRight: '4px'};
		      					return [
		      						$('<a>').addClass('btn btn-primary btn-xs').text('详情').css(style).on('click', function () {
		      							$('#fwwz-dialog').modal('show');
		      							$('#fwwz-dialog .modal-title').text('详情');
		      							$('#fwwz-dialog-form').addClass('ip-type-text').removeClass('ip-type-input');
		      							$('#fwwz-dialog-save').hide();
		      							/* 详情 */
		      							$('#fwwz_sjxm').text(item.SJNAME);
		      							$('#fwwz_cphm').text(item.CPHAO);
		      							$('#fwwz_wzsj').text(item.WZSJ);
		      							$('#fwwz_wzdd').text(item.WZDD);
		      							$('#fwwz_wznr').text(item.WZNR);
		      							$('#fwwz_wzxz').text(item.WZXZ);
		      							$('#fwwz_kfqk').text(item.KFQK);
		      							$('#fwwz_cjsj').text(item.CJSJ);
		      							$('#fwwz_cf').text(item.FK);
		      							
		      						
		      						}),
		      						$('<a>').addClass('btn btn-primary btn-xs').text('修改').css(style).on('click', function () {
		      							$('#fwwz-dialog').modal('show');
		      							$('#fwwz-dialog .modal-title').text('修改');
		      							$('#fwwz-dialog-form').addClass('ip-type-input').removeClass('ip-type-text');
		      							$('#fwwz-dialog-save').show();
		      							$('#fwwz-dialog-wzsj input.form-control, #fwwz-dialog-cjsj input.form-control').datetimepicker(dateDefaultOption);
		      							/* 修改的 */
		      							$('#fwwz_sjxm1').val(item.SJNAME);
		      							$('#fwwz_cphm1').val(item.CPHAO);
		      							$('#fwwz_wzsj1').val(item.WZSJ);
		      							$('#fwwz_wzdd1').val(item.WZDD);
		      							$('#fwwz_wznr1').val(item.WZNR);
		      							$('#fwwz_wzxz1').val(item.WZXZ).trigger('change');
		      							$('#fwwz_kfqk1').val(item.KFQK);
		      							$('#fwwz_cjsj1').val(item.CJSJ);
		      							$('#fwwz_cf1').val(item.FK);
		      							
		      							
		      							$("#fwwz-dialog-save").off('click').on('click',function(){
		      								jqxhr=$.ajax({
		      									url: basePath + "getUpdateKfuwz",
		      									type: 'post',
		      									dataType: 'json',
		      									timeout: 180000,
		      									data:{
		      										"bid":item.BID,
		      										"sjxm":$('#fwwz_sjxm1').val(),
		      										"cphm":$('#fwwz_cphm1').val(),
		      										"wzsj":$('#fwwz_wzsj1').val(),
		      										"wzdd":$('#fwwz_wzdd1').val(),
		      										"wznr":$('#fwwz_wznr1').val(),
		      										"wzxz":$('#fwwz_wzxz1 option:selected').html(),
		      										"kfqk":$('#fwwz_kfqk1').val(),
		      										"cjsj":$('#fwwz_cjsj1').val(),
		      										"fk":$('#fwwz_cf1').val(),
		      									},
		      									success:function(data){
		      										if(data>0){
		      											$('#fwwz-dialog').modal('hide');
		      											layer.msg('修改成功',{icon: 1});
		      											FindUser();
		      										}
		      									}
		      								});
		      								
		      							});
		      							
		      						}),
		      						$('<a>').addClass('btn btn-danger btn-xs').text('删除').on('click', function () {
		      							layer.confirm('确认删除吗 ？',{btn:['确认','取消']
		      							},function(){
		      								
		      								jqxhr=$.ajax({
			      								url: basePath + "getDeleteKfuw",
			      								type:'post',
			      								dataType:'json',
			      								data:{"bid":item.BID},
			      								success:function(data){
			      									if(data>0){
			      										layer.msg('删除成功',{icon: 1});
			      										FindUser();
			      									}else{
			      										layer.msg('删除失败',{icon: 1});
			      									}
			      								}
			      							});
		      								
		      							},function(){
		      								layer.msg('已取消删除',{icon: 2});
		      							})

		      						})
		      					];
		      				}, width: 135}
		      		];
		      	/* 	var fwwzData = [
		      			{sjxm: '司机姓名1', cphm: '车牌号1', wzsj: '违章时间1', wzdd: '违章地点1', wznr: '违章内容1', wzxz: '违章性质1', kfqk: '扣分情况1', cjsj: '创建时间1', faku: '罚款1'},
		      			{sjxm: '司机姓名2', cphm: '车牌号2', wzsj: '违章时间2', wzdd: '违章地点2', wznr: '违章内容2', wzxz: '违章性质2', kfqk: '扣分情况2', cjsj: '创建时间2', faku: '罚款2'},
		      			{sjxm: '司机姓名3', cphm: '车牌号3', wzsj: '违章时间3', wzdd: '违章地点3', wznr: '违章内容3', wzxz: '违章性质3', kfqk: '扣分情况3', cjsj: '创建时间3', faku: '罚款3'},
		      			{sjxm: '司机姓名4', cphm: '车牌号4', wzsj: '违章时间4', wzdd: '违章地点4', wznr: '违章内容4', wzxz: '违章性质4', kfqk: '扣分情况4', cjsj: '创建时间4', faku: '罚款4'},
		      			{sjxm: '司机姓名5', cphm: '车牌号5', wzsj: '违章时间5', wzdd: '违章地点5', wznr: '违章内容5', wzxz: '违章性质5', kfqk: '扣分情况5', cjsj: '创建时间5', faku: '罚款5'}
		      		]; */
//		      		var resetQueryConditions = function (e) {
//		      			$('#fwwz-siji').val('');
//		      			$('#fwwz-cph').select2('val','0');
//		      			$('#fwwz-wzxz').val(null).trigger('change');
//		      		};
		      		
		      		var addFwwz = function (e) {
		      			$('#fwwz-dialog').modal('show');
		      			$('#fwwz-dialog .modal-title').text('添加');
		      			$('#fwwz-dialog-form').addClass('ip-type-input').removeClass('ip-type-text');
		      			$('#fwwz-dialog-save').show();
		      			$('#fwwz-dialog-wzsj input.form-control, #fwwz-dialog-cjsj input.form-control').datetimepicker(dateDefaultOption);
		      			
		      			$("#fwwz-dialog-save").off('click').on('click',function(){
		      				jqxhr=$.ajax({
		      					url : basePath + 'getInsertKfuwz',
		      					type : 'post',
		      					dataType : 'json',
		      					data:{
		      						"sjxm":$('#fwwz_sjxm1').val(),
		      						"cphm":$('#fwwz_cphm1').val(),
		      						"wzsj":$('#fwwz_wzsj1').val(),
		      						"wzdd":$('#fwwz_wzdd1').val(),
		      						"wznr":$('#fwwz_wznr1').val(),
		      						"wzxz":$('#fwwz_wzxz1 option:selected').html(),
		      						"kfqk":$('#fwwz_kfqk1').val(),
		      						"cjsj":$('#fwwz_cjsj1').val(),
		      						"fk":$('#fwwz_cf1').val(),},
		      					
		      					timeout:180000,
		      					success:function(data){
		      						if(data>0){
		      							layer.msg('添加成功',{icon:1})
                                        $('#fwwz-dialog').modal('hide');
                                        FindUser();
                                    }else{
                                        layer.msg('添加失败',{icon:2})
									}
		      					}
		      				});
		      			});
		      			
		      			
		      		};
		      		
		      		//fwwz-wzxz
		      		/*function FindUser(){
		      			layer.msg('正在努力加载',{
		      				icon: 16,
		      				shade: 0.01,
		      				time:6000
		      			});
		      			
		      			var url= basePath;
		      			var data={};
		      			var carcph=$("#fwwz-carNumber").val();
		      			var siji=$("#fwwz-siji").val();
		      			var wzxzz=$("#fwwz-wzxz").val();
		      			
		      			if(!carcph && !siji && !wzxzz){
		      				url+="getFind";
		      			}else{
		      				url+="getSelectNameKfuw";
		      				data.cph=carcph;
		      				data.sj=siji;
		      				data.wzxz=wzxzz;
		      			}
		      			
		      		    jqxhr=$.ajax({
		      				url : url,
		      				type : 'post',
		      				data:data,
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
//		       					    pageFirstText: "首页",
//		       					    pageLastText: "尾页",
//		       					    data: datas,
//		       						fields: yhglFields
//		       					});
		      					$('#fwwzTable').jsGrid({
		      						width: 'calc(100% - 2px)',
		      						height: 'calc(100% - 2px)',
		      						editing: true,
		      						sorting: true,
		      						paging: false,
		      						autoload: true,
		      						data: datas,
		      						fields: fwwzFields
		      					});
		      				},
		      				error:function(data){
		      				}
		      			});
		      		};*/
		      		
		      		
		      		function FindUser(){
		    			$('#fwwzTable').jsGrid({
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
		         	        url:"../../getfwwzFind",
		         	        data:{
		         	        	"cph" : $("#fwwz-cph").val(),
		         				"xm" : $("#fwwz-siji").val(),
		         				"wzxz" : $("#fwwz-wzxz").val(),
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
                                iterm.gridId=i+1;
                            }
		             			if(json.code == 0){
		             			/*	for(var i = 0; i< re.length ;i++){
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
		      		
		      		$("#select_fwwz").click(function(){
		      			FindUser();
		      		})
		      		
		      		$("#Export").off('click').on('click',function(){
		      			layer.confirm('确认导出吗',{btn:['确认','取消']
		     			},function () {
		                    layer.msg('导出成功',{icon:1})
			      			window.open(basePath +"getFwwzExportAll?cph="+$("#fwwz-cph").val()+"&sjxm="+$("#fwwz-siji").val()+"&wzxz="+$("#fwwz-wzxz option:selected").html())
		                },function () {
		                    layer.msg('已取消导出',{icon:2})
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
		      			$('#fwwz-dialog-wzxz select.form-control').select2({
			      			language: 'zh-CN',
			      			width: '168',
			      			minimumResultsForSearch: -1,
			      			data:
			      			 [
			      				{id: '违章性质1', text: '违章性质1'},
			      				{id: '违章性质2', text: '违章性质2'},
			      				{id: '违章性质3', text: '违章性质3'}
			      				]
			      		});
//		      			$('#fwwz-reset').on('click', resetQueryConditions);
		      			$('#fwwz-add').on('click', addFwwz);
		      			$('#fwwz-dialog').on('hidden.bs.modal', function (e) {
		      				$(this).find('input[type=text].form-control, textarea.form-control').val('');
		      				$(this).find('select.form-control').val('').trigger('change');
		      				$(this).find('div.form-control').text('');
		      			});
                        jqxhr=$.ajax({
                            type: "POST",
                            url: basePath + "getSelectKfuwName",
                            data:{"cph":$("#fwwz-cph").val()},

                            dataType: 'json',
                            timeout : 3600000,
                            success:function(json) {
                                var data = json.data;
                                for (var i = 0; i < data.length; i++) {
                                    data[i].id = data[i].CPHAO;
                                    data[i].text = data[i].CPHAO;
                                }
                                var qb={};
                                qb.id='null';
                                qb.text='全部';
                                data.unshift(qb);
                                $("#fwwz-cph").select2({
                                    language: 'zh-CN',
                                    width: '160',
                                    minimumInputLength: 3,
                                    allowClear: true,
                                    data: data
                                    // 	ajax:{
                                    // 		url:basePath + "getSelectKfuwName",
                                    // 		data :function (params) {
                                    // 			var query={ cph:params.term };
                                    // 			return query;
                                    // 		},
                                    //
                                    // 		processResults : function (res) {
                                    // 			var data =_.map(res.data,function (item) {
                                    // 				dats={id:item.CPHAO, text:item.CPHAO}
                                    // 				return dats
                                    // 			})
                                    // 			return{
                                    // 				results:data
                                    // 			}
                                    //
                                    // 		}
                                    //
                                    //
                                    // });
                                });
                            }
						});

		      			$('#fwwzTable').jsGrid({
		      				width: 'calc(100% - 2px)',
		      				height: 'calc(100% - 2px)',
		      				editing: true,
		      				sorting: true,
		      				paging: false,
		      				autoload: true,
		      				data: [],
		      				fields: fwwzFields
		      			});
		      			$('.scrollbar-macosx').scrollbar();
		      			FindUser();
		      		});
	});
})(jQuery);
