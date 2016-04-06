var seriesArr = [4.0720, 4.0660, 4.0610, 4.0370, 4.0110, 4.0360, 4.0290];//数据集合
var chartTitle = "七日年化收益率";
var xAxisData = ["12.05","12.06","12.07","12.08","12.09","12.10","12.11"];
var yMin = 3.9;
var yMax = 4.2;

var charType = '';// 1:单线 取 七日 2:单线 取 百元净值波动 3:双线 取 百元净值波动
var charType_tabId = 0;// 0:万份收益（百元净值） 1:七日年化（累计净值）
var _dateType = 3;//用于比较的时间【4,近一周;3,近一月;2,近一年;1,全部】

var zoushi_weekList = null;
var zoushi_monthList = null;
var zoushi_yearList = null;
var zoushi_allList = null;




var shareBoo = false;

window.onload = function (){
		zoushi_weekList = JzzsDataObj.oneWeekNavList.reverse();
		zoushi_monthList = JzzsDataObj.oneMonthNavList.reverse();
		zoushi_yearList = JzzsDataObj.oneYearNavList.reverse();
		zoushi_allList = JzzsDataObj.allNavList.reverse();
    loadJjhbChart(_dateType);
    
    $("#info1 .tabs .tabs_btns li").click(info1TabsClcik);
    $("#info3 .tabs .tabs_btns li").click(info3TabsClcik);
    $("#info1_btns li").click(info1BtnClcik);
    
    $(".jzzsChartDiv_layer").click(function(){
    		$(".jzzsChartDiv_layer").hide();
    });

    $("#headerBarPic").click(function(){
        if(shareBoo){
            shareBoo = false;
            $("#share").css("display","none");
            $(this).attr("src","../../img/icon/share.png");
        }else{
            shareBoo = true;
            $("#share").css("display","block");
            $(this).attr("src","../../img/icon/share1.png");
        }
    });

    $("#share_info li").click(function (){
        var ID = $(this).index();
        if(ID == 0){
            shareMicroBlog("sina", shareText, shareUrl, sharePic, shareTitle);
        }else if(ID == 1){
            shareMicroBlog("tencent", shareText, shareUrl, sharePic, shareTitle);
        }else if(ID == 2){
            shareMicroBlog("qzone", shareText, shareUrl, sharePic, shareTitle);
        }else if(ID == 3){
            shareMicroBlog("renren", shareText, shareUrl, sharePic, shareTitle);
        }else{
            shareMicroBlog("kaixin", shareText, shareUrl, sharePic, shareTitle);
        }
    });

   var stress = $(".stressTxt em").text();

    if(stress.substr(0, 1) == "-"){
        $(".stressTxt em").css("color","#2C9835")
    }else{
        $(".stressTxt em").css("color","#bb322e")
    }
}

function info1TabsClcik(){
    var tabsId = $(this).index();
		charType_tabId = tabsId;
   
    $("#info1 #tabs_" + (tabsId + 1)).show();
    $(this).siblings().children("p").removeClass("tabs_btn_curr");
    $(this).children("p").addClass("tabs_btn_curr");
    	
    loadJjhbChart(_dateType);

}
function info1BtnClcik(){
    var id = $(this).index();
    _dateType = id+1;

    $(this).siblings().removeClass("info1_btn_curr");
    $(this).addClass("info1_btn_curr");

    loadJjhbChart(_dateType);
}

function info3TabsClcik(){
    var tabsId = $(this).index();
    var tabsNum = $("#info3 .tabs .tabs_btns li").length;

    var i ;
    for(i = 0; i < tabsNum; i++){
        $("#info3 #tabs_" + (i + 1)).hide();
    }

    $("#info3 #tabs_" + (tabsId + 1)).show();
    $(this).siblings().children("p").removeClass("tabs_btn_curr");
    $(this).children("p").addClass("tabs_btn_curr");
}
            
     /**
			 * //用于比较的时间【4,近一周;3,近一月;2,近一年1,全部】
			 * _target 图表具体显示的位置
			 */
			function loadJjhbChart(_dateType){
				if(_dateType == 0 || _dateType == '0' || _dateType == null || _dateType == '' || isNaN(_dateType)) {
					_dateType = 3;
				}
				
				charType = $("#charType").val();// 1:单线 取 七日 2:单线 取 百元净值波动 3:双线 取 百元净值波动
				if(charType == null || charType == ""){
						charType = 1;
				}
				
				var colorType = {col:['#AA604C']};//['#3C5777', '#AA604C', '#919191']
				var seriesType = [{name : '',data : []}];
				if(charType == 3 && charType_tabId == 0){
					colorType = {col:['#AA604C','#3C5777']};//['#3C5777', '#AA604C', '#919191']
					seriesType = [{name : '',data : []},{name : '',data : []}];
				}else{
					colorType = {col:['#AA604C']};//['#3C5777', '#AA604C', '#919191']
					seriesType = [{name : '',data : []}];
				}
				
				var options = {
					chart : {
						renderTo : 'jzzsChartDiv',
						type:'line',
						//width:420,
						height:200,
						marginLeft:0
					},
					navigator : {	/*查询搜索条*/
						enabled: false,
						 height: 15						
					},

					scrollbar: {
						enabled: false
					},

					rangeSelector : {
						enabled: false,
						selected : 4
					},
					title : {
						text : ''
					},
					colors: colorType.col,
					legend: {
	                    enabled: true,                    
	                    layout: 'horizontal',
	                    //itemWidth: 80,
	                    backgroundColor: '#FFFFFF',	                    
	                    align: 'center',
	                    borderColor:'' ,
	                    borderWidth: 0,
	                    padding:0,	                    
	                    //itemMarginBottom: -10 
			            itemMarginTop: 0,
			            y: 0                 
                    },
					tooltip: {
						formatter: function() {
							var s = '<b>'+ Highcharts.dateFormat('%Y-%m-%d', this.x) +'</b><br/>';
							var __jzrq = Highcharts.dateFormat('%Y%m%d', this.x);
							var __jjzz = '';
							if(navArrStr && navArrStr != '') {
								var __idx = navArrStr.indexOf(__jzrq+":");
								if(__idx >= 0) {
									var __tstr = navArrStr.substring(__idx + __jzrq.length + 1);
									__jjzz = __tstr.substring(0,__tstr.indexOf("|"));
								}
							}
							var __nJz = '';
							if(__jjzz != '') {
								__nJz = Highcharts.numberFormat(parseFloat(__jjzz),4) + '';
							}
							//s += '<span style="color:black">基金净值</span>: <b>'+__nJz+'</b><br/>';
							$.each(this.points, function(i, point) {
								if(charType == 1){
									if(charType_tabId == 0){
										s += '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+Highcharts.numberFormat(point.y,3)+'%</b><br/>';
									}else{
										s += '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+Highcharts.numberFormat(point.y,4)+'</b><br/>';
									}
								}else{
									if(charType_tabId == 0){
										s += '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+Highcharts.numberFormat(point.y,2)+'</b><br/>';
									}else{
										s += '<span style="color:'+this.series.color+'">'+this.series.name+'</span>: <b>'+Highcharts.numberFormat(point.y,3)+'</b><br/>';
									}
								}
							});
							return s;
						}
					},
					xAxis: {
						type: 'datetime',
						dateTimeLabelFormats: {
						    millisecond: '%m-%d',
							second: '%m-%d',
							minute: '%m-%d',
							hour: '%m-%d',
							day: '%d',
							week: '%y-%m-%d',
							month: '%Y-%m',
							year: '%Y'
						}
					},
					yAxis : {
						title : {
							text : ''
						},
						labels: {							
							formatter: function() {
								if(charType == 1 && charType_tabId == 0){
									return this.value + '%';
								}
								return this.value;// + '%';
							}

						}
					},
					plotOptions:{
						line:{
							dataGrouping: {
								enabled: false,
								dateTimeLabelFormats: {
									millisecond: ['%Y-%m-%d', '%Y-%m-%d', ''],
								    second: ['%Y-%m-%d', '%Y-%m-%d', ''],
								    minute: ['%Y-%m-%d', '%Y-%m-%d', ''],
								    hour: ['%Y-%m-%d', '%Y-%m-%d', ''],
									day: ['%Y-%m-%d', '%Y-%m-%d', ''],
									week: ['%Y-%m-%d', '%Y-%m-%d', ''],
									month: ['%Y-%m', '%Y-%m', ''],
									year: ['%Y', '%Y', '-%Y']
								}

							},
							cursor:'pointer',
							shadow:false,
							states: {	/*状态*/
								hover: {	/*(鼠标)悬浮状态*/
									lineWidth: 1	/*曲线宽*/
								}
							}
						}
					},
					credits: {	/*版权图标显示*/
						enabled: false,
						text: '',
						href: 'http://m.chinaamc.com'
						
					},
					series : seriesType
				};

				//if(JzzsDataObj.cats.length == 3) {
				//	options.series[0].name = JzzsDataObj.cats[0];
				//	options.series[1].name = JzzsDataObj.cats[1];
				//	options.series[2].name = JzzsDataObj.cats[2];
				//}
				//else {
				//	options.series[0].name = "净值回报";
				//	options.series[1].name = "沪深300";
				//	options.series[2].name = "同类回报";
				//}
				if(charType == 3 && charType_tabId == 0){
					options.series[0].name = JzzsDataObj.cats[0];
					options.series[1].name = JzzsDataObj.cats[2];
				}else{
					options.series[0].name = JzzsDataObj.cats[charType_tabId];
				}

				var data0 = [];	/*基金数据*/
				var	data1 = [];	/*基准*/
				var navArrStr = '';		/*净值组字符串*/
				if(_dateType == 4) {	/*7天*/
					jQuery.each(zoushi_weekList, function(i, line) {
						var items = line.split(/\,/g);
						if(items.length >= 4) {
							//var _time = Date.UTC(parseInt(items[0]),parseInt(items[1]),parseInt(items[2]));
							//data0.push([_time,parseFloat(items[3])]);
							//data1.push([_time,parseFloat(items[4])]);
							//data2.push([_time,parseFloat(items[5])]);
							//if(navArrStr == '') {
							//	navArrStr = Highcharts.dateFormat('%Y%m%d', _time) + ":" + items[6]+"|";
							//}
							//else {
							//	navArrStr += Highcharts.dateFormat('%Y%m%d', _time) + ":" + items[6] + "|";
							//}
							var myDate = new Date(Date.parse(items[0]));
								//myDate.getYear();        //获取当前年份(2位)
								//myDate.getFullYear();    //获取完整的年份(4位,1970-????)
								//myDate.getMonth();       //获取当前月份(0-11,0代表1月)
								//myDate.getDate();        //获取当前日(1-31)
							var _time = Date.UTC(myDate.getFullYear(),myDate.getMonth(),myDate.getDate());//items[0];Date.UTC(2014,2,4)
							if(charType == 3 && charType_tabId == 0){
								data0.push([_time,parseFloat(items[1])]);
								data1.push([_time,parseFloat(items[2])]);
							}else{
								data0.push([_time,parseFloat(items[parseInt(JzzsDataObj.hisNavCats[charType_tabId])])]);
							}
							//if(navArrStr == '') {
							//	navArrStr = Highcharts.dateFormat('%Y%m%d', _time) + ":" + items[6]+"|";
							//}
							//else {
							//	navArrStr += Highcharts.dateFormat('%Y%m%d', _time) + ":" + items[6] + "|";
							//}
						}
					});
				}
				else if(_dateType == 3) {	/*1个月*/
					jQuery.each(zoushi_monthList, function(i, line) {
						var items = line.split(/\,/g);
						if(items.length >= 4) {
							var myDate = new Date(Date.parse(items[0]));
							var _time = Date.UTC(myDate.getFullYear(),myDate.getMonth(),myDate.getDate());
							if(charType == 3 && charType_tabId == 0){
								data0.push([_time,parseFloat(items[1])]);
								data1.push([_time,parseFloat(items[2])]);
							}else{
								data0.push([_time,parseFloat(items[parseInt(JzzsDataObj.hisNavCats[charType_tabId])])]);
							}
						}
					});
				}
				else if(_dateType == 2) {	/*1年*/
					jQuery.each(zoushi_yearList, function(i, line) {
						var items = line.split(/\,/g);
						if(items.length >= 4) {
							var myDate = new Date(Date.parse(items[0]));
							var _time = Date.UTC(myDate.getFullYear(),myDate.getMonth(),myDate.getDate());
							if(charType == 3 && charType_tabId == 0){
								data0.push([_time,parseFloat(items[1])]);
								data1.push([_time,parseFloat(items[2])]);
							}else{
								data0.push([_time,parseFloat(items[parseInt(JzzsDataObj.hisNavCats[charType_tabId])])]);
							}
						}
					});
				}
				else if(_dateType == 1) {	/*最大范围*/
					jQuery.each(zoushi_allList, function(i, line) {
						var items = line.split(/\,/g);
						if(items.length >= 4) {
							var myDate = new Date(Date.parse(items[0]));
							var _time = Date.UTC(myDate.getFullYear(),myDate.getMonth(),myDate.getDate());
							if(charType == 3 && charType_tabId == 0){
								data0.push([_time,parseFloat(items[1])]);
								data1.push([_time,parseFloat(items[2])]);
							}else{
								data0.push([_time,parseFloat(items[parseInt(JzzsDataObj.hisNavCats[charType_tabId])])]);
							}
						}
					});
				}

			if(charType == 3 && charType_tabId == 0){
				options.series[0].data = data0;
				options.series[1].data = data1;
			}else{
				options.series[0].data = data0;
			}
			
			var chart = new Highcharts.StockChart(options);
			
		};





