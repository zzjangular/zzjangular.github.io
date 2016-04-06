var zoushi_sevenDayList = null;


window.onload = function () {
    zoushi_sevenDayList = SevenDataObj.sevenDayNavList.reverse();
    loadJjhbChart();

    //解决iphone 5s 的兼容
    var oBtn2=document.getElementsByClassName('btn2')[0];
    var oBtn3=document.getElementsByClassName('btn3')[0];
    oBtn2.style.position='fixed';
    oBtn2.style.bottom='2%';
    oBtn2.style.left='0';

    oBtn3.style.position='fixed';
    oBtn3.style.bottom='2%';
    oBtn3.style.left='50%';

}

var clientWidth=document.documentElement.clientWidth-80;

function loadJjhbChart() {
    var colorType = {
        col:['#AA604C','#000000']
    };//['#3C5777', '#AA604C', '#919191']
    var seriesType = [
        {
            data: []
        }
    ];



    var options = {
        chart: {
            renderTo: 'jzzsChartDiv',
            type: 'area',  //areaspline
            height: 200,
            marginLeft: 50,
            width:clientWidth,
            events:{
                click:function(){
                   // window.location.href="http://www.baidu.com";
                }
            },
        },

        title: {
            align: 'left',
            text: '七日年化收益率%'
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
            enable: false
        },

        xAxis: {
            type: 'datetime',
            tickPixelInterval: 40,
           //tickInterval:1,
           // min: 0,
           // max: 6,



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
        yAxis: {
            title: {
                text: null
            },
            max:ymax,
            min:ymin,


            allowDecimals: true,
            labels: {
                formatter: function () {
                    return this.value + '%';
                },
                align: 'right',
                x: -5,
                y: 0

            },

            startOnTick: true,
            lineColor: '#c0d0e0',
            lineWidth: 1
        },
        //series:{
        //    colors:'rgb(170,96,76)',
        //    fillColor:{
        //        linearGradient : {
        //            x1: 0,
        //            y1: 0,
        //            x2: 0,
        //            y2: 1
        //        },
        //        stops:[
        //            [0,'rgb(170,96,76)'],
        //            [1,'rgba(170,96,76,0)']
        //        ]
        //    }
        //},


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



                cursor: 'pointer',
                shadow: false,
                states: {    /*状态*/
                    hover: {    /*(鼠标)悬浮状态*/
                        lineWidth: 1    /*曲线宽*/
                    }
                },
                fillColor : {
                    linearGradient : {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops : [
                         [0,'rgb(170,96,76)'],
                         [1,'rgba(170,96,76,0.3)']
                            // [0, Highcharts.getOptions().colors[0]],
                        // [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
            }

        },

        credits: {    /*版权图标显示*/
            enabled: false,
            text: '',
            href: 'http://m.chinaamc.com'

        },
        series: seriesType,

        threshold:null
    };


    var data0 = [];
    var n=0;
    jQuery.each(zoushi_sevenDayList, function (i, line) {

            var items = line.split(/\,/g);
            var myDate = new Date(Date.parse(items[0]));
            var _time = Date.UTC(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());//items[0];Date.UTC(2014,2,4)

            data0.push([_time, parseFloat(items[1])]);



    });



    options.series[0].data = data0;





    var chart = new Highcharts.StockChart(options);

};
























