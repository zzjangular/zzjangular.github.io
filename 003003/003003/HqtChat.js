var zoushi_sevenDayList = null;
var clientWidth;

window.onload = function () {
    zoushi_sevenDayList = SevenDataObj.sevenDayNavList.reverse();
    clientWidth=document.documentElement.clientWidth-80;
    loadJjhbChart();
    $(".jzzsChartDiv_layer").click(function(){
        window.location.href="amcfm://fund/netvalueDetail?fundCode=003003&fundType=4&fundName=活期通(华夏现金增利货币A)";
    });
}



function loadJjhbChart() {
    var colorType = {
        col:['#e83e28','#fff']
    };
    var seriesType =[
        {
            data : [

            ]
        }
    ];



    var options = {
        chart: {
            renderTo: 'jzzsChartDiv',
            type: 'area',  //areaspline
            height: 250,
            marginLeft:25,
            marginRight:25
        },

        title: {
            align: 'left',
            text: '七日年化收益率(%)',
            style:{"color":"#999", "fontSize":"14px","font-family":"PingFangSC,微软雅黑" },
            margin:20,
			x:-10
        },
        navigator: {    /*查询搜索条*/
            enabled: false,
            height: 15
        },

        scrollbar: {
            enabled: false
        },

        rangeSelector: {
            enabled: false,
            selected: 0.1
        },

        colors: colorType.col,


        legend: {
            enabled: false
        },
        tooltip: {
            enabled: true,
	    crosshairs:false,
            formatter: function() {
                return this.y;
            }
        },

        xAxis: {
            type: 'datetime',
           startOnTick: false,
            endOnTick: true,
           tickInterval:24 * 3600 * 1000,
            tickLength: 5,
            tickWidth: 1,
            tickColor:'#999',
            tickPosition: 'inside',
            lineColor: '#999',
            lineWidth: 1,

            dateTimeLabelFormats: {
                millisecond: '%m-%d',
                second: '%m-%d',
                minute: '%m-%d',
                hour: '%m-%d',
                day: '%m-%d',
                week: '%y-%m-%d',
                month: '%Y-%m',
                year: '%Y'
            },
            labels: {
                step:1,  //这个可以设置X轴显示几个点。
                style:{
                    fontSize:'10px'
                }
            }

        },
        yAxis: {
            title: {
                text: null
            },
            max:ymax,
            min:ymin,
			tickInterval:0.05,
			


            allowDecimals: true,
            labels: {
                enable:true,
                formatter: function () {
                    return this.value;
                },
                style:{
                    fontSize:'10px'
                },
                align: 'left',
                y:0,
                x:-25

            },

            startOnTick: true,
            lineColor: '#999',
            lineWidth:1,
            tickColor:'#999',
            tickWidth:0,
            gridLineColor:'#efefef',
            gridLineWidth:1
			
        },



        plotOptions: {
            area: {
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
		
//                allowPointSelect:false,
                shadow: false,

                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops : [
                         [0,'rgb(232,62,40)'],
                         [1,'rgba(255,255,255,0.1)']
                    ]
                }
            },
            series: {
                allowPointSelect:false,
                enableMouseTracking: false,
                cursor: 'pointer',
                marker: {
                    enabled: true,
					fillColor:'#CC3040', 	
                    symbol:"circle",
                    radius:4,
                    lineColor:null,
                    lineWidth:1
                }
            }

        },

        credits: {    /*版权图标显示*/
            enabled: false,
            text: '',
            href: 'http://m.chinaamc.com'

        },
        series: seriesType
    };


    var data0 = [];
    var temdata={};
    jQuery.each(zoushi_sevenDayList, function (i, line) {

            var items = line.split(/\,/g);
            var myDate = new Date(Date.parse(items[0]));
            var _time = Date.UTC(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());//items[0];Date.UTC(2014,2,4);

        if(i!=6){
            data0.push(
                {
                    x:_time,
                    y:parseFloat(items[1]),
                    marker:{enabled:false}
                });
        }else{
            data0.push({x:_time,y:parseFloat(items[1]),
                marker:{
                    enabled:true,
                    radius:4,
                    lineWidth:2
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        fontSize: '14px',
                        color:'#CC3040'
                    },
                    formatter:function(){
                        return this.y;
                    }
                }});
        }


    });

    options.series[0].data = data0;

    var chart = new Highcharts.StockChart(options);

};
























