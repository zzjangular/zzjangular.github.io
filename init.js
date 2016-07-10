
window.onload=function(){
	var oC=document.getElementById('c1');	
	
	var gd=oC.getContext('2d');
	
	var out=20;
	var dir=[-out,oC.width+out];
	
	//导入素材
	loadImg(sourceArr,function(){
		//存子弹
		var arrBullet=[];
		//存鱼
		var arrFish=[];
		//存金币
		var arrCoin=[];
		//存网
		var arrWeb=[];
		//存死鱼
		var arrDeadFish=[];
		
		//画炮
		var c=new Cannon(7);
		
		//一切画动作
		setInterval(function(){
			gd.clearRect(0,0,oC.width,oC.height);
			
			//鱼出场
			if(Math.random()<0.01){  //鱼出来算法
				var f=new Fish(rnd(1,6));
				f.y=rnd(100,oC.height-100);
				
				dir.sort(function(){
					return Math.random()-0.5;	
				});
				
				if(dir[0]>0){
					f.x=oC.width;
					f.rotate=rnd(135,225);
				}else{
					f.x=0;
				f.rotate=rnd(-45,45);	
				}
				
				arrFish.push(f);
			}
			//画鱼
			for(var i=0; i<arrFish.length; i++){
				arrFish[i].draw(gd);
			}
			//画金币
			for(var i=0; i<arrCoin.length; i++){
				arrCoin[i].draw(gd);
			}
			//画渔网
			for(var i=0; i<arrWeb.length; i++){
				arrWeb[i].scale+=0.05;
				arrWeb[i].draw(gd);
				
				if(arrWeb[i].scale>1.2){
					arrWeb.splice(i,1);
					i--;	
				}
			}
			//画死鱼
			for(var i=0; i<arrDeadFish.length; i++){
				arrDeadFish[i].draw(gd);
			}
			
			//画炮台
			gd.drawImage(
				JSON.bottom,
				0,0,765,70,
				0,532,765,70
			);
			
			//画子弹
			for(var i=0; i<arrBullet.length; i++){
				arrBullet[i].draw(gd);
			}
			//判断子弹出界
			for(var i=0; i<arrBullet.length; i++){
				if(arrBullet[i].x<-out || arrBullet[i].x>oC.width+out || arrBullet[i].y<-out || arrBullet[i].y>oC.height+out){
					//子弹应该删除
					arrBullet[i].close();
					arrBullet.splice(i,1);
					i--;
				}
			}
			//判断鱼出界
			for(var i=0; i<arrFish.length; i++){
				if(arrFish[i].x<-out || arrFish[i].x>oC.width+out || arrFish[i].y<-out || arrFish[i].y>oC.height+out){
					//子弹应该删除
					arrFish[i].close();
					arrFish.splice(i,1);
					i--;
				}
			}
			
			c.draw(gd);
			
			//检测子弹跟鱼碰撞
			for(var i=0; i<arrFish.length; i++){
				for(var j=0; j<arrBullet.length; j++){
					if(arrFish[i].isIn(arrBullet[j].x,arrBullet[j].y)){
						var type=arrFish[i].type;
						var x=arrFish[i].x;
						var y=arrFish[i].y;
						var rotate=arrFish[i].rotate;
						
						//鱼死
						arrFish[i].close();
						arrFish.splice(i,1);
						i--;
							
						//子弹消失
						arrBullet[j].close();
						arrBullet.splice(j,1);
						j--;
						
						//生成金币
						var coin=new Coin(type);
						coin.x=x;
						coin.y=y;
						arrCoin.push(coin);
						
						//出渔网
						var w=new Web();
						w.x=x;
						w.y=y;
						arrWeb.push(w);
						
						//死鱼
						var dF=new DeadFish(type);
						dF.x=x;
						dF.y=y;
						dF.rotate=rotate;
						arrDeadFish.push(dF);
						
						//死鱼消失
						(function(dF){
							setTimeout(function(){
								for(var i=0; i<arrDeadFish.length; i++){
									if(arrDeadFish[i]==dF){
										arrDeadFish.splice(i,1);
										i--;	
									}
									
								}
							},300)
						})(dF);
						
						//收钱声音
						var oA=new Audio();
						oA.src='snd/coin.wav';
						oA.play();
					}
				}
			}
		},16);
		
		//点击
		oC.onclick=function(ev){
			//子弹声音
			var oA=new Audio();
			oA.src='snd/cannon.mp3';
			oA.play();
			
			var a=c.x-(ev.clientX-oC.offsetLeft);
			var b=c.y-(ev.clientY-oC.offsetTop);
			
			var d=a2d(Math.atan2(b,a))-90;
			
			//alert(d);	
			c.rotate=d;
			
			//子弹
			var b=new Bullet(c.type);
			b.x=c.x;
			b.y=c.y;
			b.rotate=c.rotate;
			arrBullet.push(b);
		};
	});
};
