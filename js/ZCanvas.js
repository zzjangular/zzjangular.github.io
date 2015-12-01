function ZCanvas(canvas)
{
	var _this=this;
	
	ZObject.call(this);
	
	this.canvas=canvas;
	this.gd=canvas.getContext('2d');
	
	//开始绘制
	this.start();
	
	//事件
	function addMouseEvent(evType)
	{
		_this.canvas[evType]=function (ev)
		{
			var x=ev.offsetX;
			var y=ev.offsetY;
			
			for(var i=0;i<_this.children.length;i++)
			{
				_this.children[i].checkMouse(evType, x, y);
			}
			
			if(_this[evType])_this[evType].call(_this, x, y);
		};
	}
	
	addMouseEvent('onclick');
	addMouseEvent('onmousedown');
	addMouseEvent('onmousemove');
	addMouseEvent('onmouseup');
}

ext(ZObject, ZCanvas);

ZCanvas.prototype.draw=function ()
{
	this.gd.clearRect(0,0,this.canvas.width, this.canvas.height);
	
	this._draw(this.gd);
};

ZCanvas.prototype.createElement=function (type)
{
	switch(type)
	{
		case 'rect':
			return new ZRect(0,0,100,100);
			break;
	}
};

ZCanvas.prototype.start=function ()
{
	var _this=this;
	
	this.timer=setInterval(function (){		//不适用
		_this.draw();
	}, 30);
};


