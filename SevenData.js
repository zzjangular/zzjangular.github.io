
var SevenDataObj = { sevenDayNavList:
    ['2016-01-12,3.079','2016-01-11,3.060','2016-01-10,3.037','2016-01-09,3.019','2016-01-08,3.001','2016-01-07,2.987','2016-01-06,2.963']
};

//数据处理
var arr=SevenDataObj.sevenDayNavList;
var arr2=[];
for(var i=0;i<arr.length;i++)
{
    var Num=findInArr(arr[i],',');
    arr2.push(arr[i].substring(Num+1));
}
var arr3=arr2.toString().split(',').sort();
var ymax=parseFloat(arr3.pop())+0.05; //最大值
var ymin=parseFloat(arr3.shift())-0.05;//最小值


function findInArr(arr, value)
{
    for (var i=0; i<arr.length; i++)
    {
        // 'a' == 'name'
        if (arr[i] == value)
        {
            return i;
        }
    }
    return -1;
}