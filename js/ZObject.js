function ZObject()
{
	//位置、大小
	this.left=0;
	this.top=0;
	this.width=0;
	this.height=0;
	
	//层级关系
	this.children=[];
	this.parentNode=null;
}

ZObject.prototype._draw=function (gd)	//绘制当前图形的子节点
{
	for(var i=0;i<this.children.length;i++)
	{
		this.children[i].draw(gd);
	}
};

ZObject.prototype.appendChild=function (obj)
{
	//从原有的父级下删掉
	if(obj.parentNode)
	{
		obj.parentNode.removeChild(obj);
	}
	
	//把节点加入到父级
	this.children.push(obj);
	obj.parentNode=this;
};

ZObject.prototype.removeChild=function (obj)
{
	for(var i=0;i<this.children.length;i++)
	{
		if(this.children[i]==obj)
		{
			this.children.splice(i, 1);
			return;
		}
	}
};



