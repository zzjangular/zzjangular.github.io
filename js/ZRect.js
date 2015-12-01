function ZRect(left, top, width, height)
{
	ZObject.call(this);
	
	this.left=left;
	this.top=top;
	this.width=width;
	this.height=height;
	
	//样式
	this.background='black';
	this.borderColor='black';
	this.borderWidth=0;
}

ext(ZObject, ZRect);

ZRect.prototype.draw=function (gd)
{
	gd.save();
	
	gd.lineWidth=this.borderWidth;
	gd.strokeStyle=this.borderColor;
	gd.fillStyle=this.background;
	
	gd.translate(this.left+this.width/2, this.top+this.height/2);
	//gd.rotate(d2a());
	
	gd.fillRect(-this.width/2, -this.height/2, this.width, this.height);
	if(this.borderWidth>0)
		gd.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
	
	gd.restore();
	
	//绘制子级
	gd.save();
	
	gd.translate(this.left, this.top);
	
	this._draw(gd);
	
	gd.restore();
};

ZRect.prototype.pointIn=function (x, y)
{
	if(this.left<=x && x<=this.left+this.width && this.top<=y && y<=this.top+this.height)
	{
		return true;
	}
	else
	{
		return false;
	}
};

ZRect.prototype.checkMouse=function (evType, x, y)
{
	//先检查子级有没有事件
	var bChildClicked=false;
	for(var i=0;i<this.children.length;i++)		//小问题
	{
		this.children[i].checkMouse(x-this.left, y-this.top);
		/*if(this.children[i].pointIn(x-this.left, y-this.top))	//在检测子级的位置的时候，需要先减掉父级的位置
		{
			if(this.children[i].onclick)
			{
				this.children[i].onclick.call(this.children[i], x-this.left, y-this.top);
			}
			bChildClicked=true;
			break;
		}*/
	}
	
	//再检查父级
	if(bChildClicked || this.pointIn(x, y))
	{
		if(this[evType])
		{
			this[evType].call(this, x, y);
		}
	}
};



