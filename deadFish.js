
function DeadFish(type){
	this.type=type;
	this.x=0;
	this.y=0;
	this.rotate=0;
	this.cur=0;
	this.move();
}
DeadFish.prototype.draw=function(gd){
	var w=FISH_SIZE[this.type].w;
	var h=FISH_SIZE[this.type].h;
	
	gd.save();
	
	gd.translate(this.x,this.y);
	gd.rotate(d2a(this.rotate));
	
	if(this.rotate>90 && this.rotate<270){
		gd.scale(1,-1);
	}
	
	gd.drawImage(
		JSON['fish'+this.type],
		0,h*4+this.cur*h,w,h,
		-w/2,-h/2,w,h
	);
	
	gd.restore();
};
DeadFish.prototype.move=function(){
	var _this=this;
	
	setInterval(function(){
		_this.cur++;
		if(_this.cur==4)_this.cur=0;
	},30);	
};