
//鱼
var FISH_SIZE=[
	null,
	{w: 55, h: 37, collR: 17},
	{w: 78, h: 64, collR: 24},
	{w: 72, h: 56, collR: 20},
	{w: 77, h: 59, collR: 22},
	{w: 107, h: 122, collR: 29}
];
function Fish(type){
	this.type=type;
	this.x=0;
	this.y=0;
	
	this.cur=0;
	this.move();
	
	this.rotate=0;
	
	this.speed=1;
	
	this.timer=null;
	this.timer2=null;
	
	this.collR=FISH_SIZE[this.type].collR;
}
Fish.prototype.draw=function(gd){
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
		0,this.cur*h,w,h,
		-w/2,-h/2,w,h
	);
	
	gd.restore();
};
Fish.prototype.move=function(){
	var _this=this;
	//摇尾巴
	this.timer=setInterval(function(){
		_this.cur++;
		if(_this.cur==4)_this.cur=0;
	},150);
	
	//鱼走
	this.timer2=setInterval(function(){
		var speedX=_this.speed*Math.cos(d2a(_this.rotate));
		var speeeY=_this.speed*Math.sin(d2a(_this.rotate))
		
		_this.x+=speedX;
		_this.y+=speeeY;
	},30);	
};
Fish.prototype.close=function(){
	clearInterval(this.timer);	
	clearInterval(this.timer2);	
};
Fish.prototype.isIn=function(x,y){
	var a=this.x-x;
	var b=this.y-y;
	
	var c=Math.sqrt(a*a+b*b);
	
	if(c<this.collR){
		return true;	
	}else{
		return false;	
	}
};
















