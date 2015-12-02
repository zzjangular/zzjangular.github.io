var JSON={};

function d2a(n){
	return n*Math.PI/180;
}
function a2d(n){
	return n*180/Math.PI;
}
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}


function loadImg(arr,fnSucc,fnLoading){
	var count=0;
	for(var i=0; i<arr.length; i++){
		var oImg=new Image();
		
		(function(index){
			oImg.onload=function(){
				var name=arr[index].split('.')[0];
				JSON[name]=this;
				
				count++;
				fnLoading && fnLoading(count,arr.length);
				
				if(count==arr.length){
					fnSucc && fnSucc();
				}	
			}
		})(i);
		
		oImg.src='img/'+arr[i];
	}
}