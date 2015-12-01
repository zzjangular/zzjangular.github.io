//版权 北京智能社©, 保留所有权利

window.onload=function ()
{
	var oC=document.getElementById('c1');
	var canvas=new ZCanvas(oC);
	
	var score=0;
	
	//自己的
	var oPlayer=new ZImg(0,0,0,0,'res.png');
	
	oPlayer.backgroundPosX=160;
	oPlayer.backgroundPosY=55;
	oPlayer.backgroundPosW=15;
	oPlayer.backgroundPosH=16;
	
	oPlayer.top=280;
	oPlayer.left=190;
	
	canvas.appendChild(oPlayer);
	
	//事件
	(function (){
		var lastFireTime=0;
		
		var bLeft=false;
		var bRight=false;
		var bFire=false;
		document.onkeydown=function (ev)
		{
			switch(ev.keyCode)
			{
				case 37:
					bLeft=true;
					break;
				case 39:
					bRight=true;
					break;
				case 32:
					bFire=true;
					break;
			}
		};
		document.onkeyup=function (ev)
		{
			switch(ev.keyCode)
			{
				case 37:
					bLeft=false;
					break;
				case 39:
					bRight=false;
					break;
				case 32:
					bFire=false;
					break;
			}
		};
		
		setInterval(function (){
			if(bLeft)oPlayer.left-=3;
			if(bRight)oPlayer.left+=3;
			if(bFire)
			{
				var oDate=new Date();
				
				if(oDate.getTime()-lastFireTime<500)return;
				
				var oBullet=new ZImg(0,0,0,0,'res.png');
				
				oBullet.left=oPlayer.left+6;
				oBullet.top=oPlayer.top-8;
				
				oBullet.backgroundPosX=365;
				oBullet.backgroundPosY=219;
				oBullet.backgroundPosW=3;
				oBullet.backgroundPosH=8;
				
				canvas.appendChild(oBullet);
				lastFireTime=oDate.getTime();
				
				var timer=setInterval(function (){
					oBullet.top-=5;
					
					//碰撞检测
					for(var i=0;i<aEm.length;i++)
					{
						for(var j=0;j<aEm[i].length;j++)
						{
							if(aEm[i][j]==null)continue;
							
							var l=aEm[i][j].left+oContainer.left;
							var t=aEm[i][j].top+oContainer.top;
							var r=l+aEm[i][j].width;
							var b=t+aEm[i][j].height;
							
							if(l<=oBullet.left && oBullet.left<=r && t<=oBullet.top && oBullet.top<=b)
							{
								//alert('a');
								
								//1.子弹消失
								clearInterval(timer);
								canvas.removeChild(oBullet);
								
								//2.螃蟹爆炸
								oContainer.removeChild(aEm[i][j]);
								aEm[i][j]=null;
								
								score+=100;
								document.getElementById('s1').innerHTML=score+'分';
								break;
							}
						}
					}
				}, 30);
			}
		}, 30);
	})();
	
	//敌人
	var oContainer=canvas.createElement('rect');
	var aEm=[];
	
	var R=5;
	var C=10;
	
	var w=16;
	var s=6;
	
	oContainer.width=w*C+(C-1)*s;
	oContainer.left=(oC.width-oContainer.width)/2;
	oContainer.top=20;
	
	for(var i=0;i<R;i++)
	{
		aEm[i]=[];
		for(var j=0;j<C;j++)
		{
			aEm[i][j]=new ZImg(0,0,0,0, 'res.png');
			
			aEm[i][j].backgroundPosX=160;
			aEm[i][j].backgroundPosY=103;
			aEm[i][j].backgroundPosW=15;
			aEm[i][j].backgroundPosH=16;
			
			aEm[i][j].top=i*20;
			aEm[i][j].left=oContainer.width/2-(C/2-j)*(s+w);
			
			oContainer.appendChild(aEm[i][j]);
			//canvas.appendChild(aEm[i][j]);
		}
	}
	oContainer.background='none';
	canvas.appendChild(oContainer);
	
	//爪子动
	setInterval(function (){
		for(var i=0;i<aEm.length;i++)
		{
			for(var j=0;j<aEm[i].length;j++)
			{
				if(aEm[i][j]==null)continue;
				if(Math.random()<0.02)
				{
					if(aEm[i][j].backgroundPosX==160)
					{
						aEm[i][j].backgroundPosX=185;
					}
					else
					{
						aEm[i][j].backgroundPosX=160;
					}
				}
			}
		}
	}, 100);
	
	//螃蟹动起来
	var goLeft=true;
	setInterval(function (){
		if(goLeft)
			oContainer.left-=2;
		else
			oContainer.left+=2;
		
		if(oContainer.left<=0)
		{
			goLeft=false;	//变成向右走
			oContainer.top+=10;
		}
		else if(oContainer.left>=oC.width-oContainer.width)
		{
			goLeft=true;
			oContainer.top+=10;
		}
	}, 100);
};
