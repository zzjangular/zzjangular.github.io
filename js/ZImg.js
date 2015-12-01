function ZImg(left, top, width, height, src)
{
	var _this=this;
	
	ZRect.call(this, left, top, width, height);
	
	this.src=src;
	this.img=null;	//存储读进来的图片
	
	//背景图位置
	this.backgroundPosX=0;
	this.backgroundPosY=0;
	this.backgroundPosW=0;
	this.backgroundPosH=0;
	
	//加载
	var oImg=new Image();
	
	oImg.onload=function ()
	{
		if(!_this.backgroundPosW)
		{
			_this.backgroundPosW=this.width;
			_this.backgroundPosH=this.height;
		}
		
		_this.width=_this.backgroundPosW;
		_this.height=_this.backgroundPosH;
		
		_this.img=this;		//读取完成之后，this.img就不是null了
	};
	
	oImg.src=src;
}

ext(ZRect, ZImg);

ZImg.prototype.draw=function (gd)
{
	if(!this.img)return;	//还没加载进来
	
	gd.save();
	
	gd.fillStyle=this.background;
	
	gd.translate(this.left+this.width/2, this.top+this.height/2);
	
	//gd.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
	gd.drawImage(this.img,
		this.backgroundPosX, this.backgroundPosY, this.backgroundPosW, this.backgroundPosH,
		-this.width/2, -this.height/2, this.width, this.height
	);
	
	gd.restore();
	
	//绘制子级
	gd.save();
	
	gd.translate(this.left, this.top);
	
	this._draw(gd);
	
	gd.restore();
};


