
function Coin(type){
	this.type=type;
	this.x=0;
	this.y=0;
	
	this.cur=0;
	this.move();
}
Coin.prototype.draw=function(gd){
	gd.save();
	
	gd.translate(this.x,this.y);
	switch(this.type){
		case 1:
		case 2:
		case 3:
			gd.drawImage(
				JSON.coinAni1,
				0,60*this.cur,60,60,
				-30,-30,60,60
			);
			break;
		case 4:
		case 5:
			gd.drawImage(
				JSON.coinAni2,
				0,60*this.cur,60,60,
				-30,-30,60,60
			);
			break;
	}
	
	gd.restore();
};
Coin.prototype.move=function(){
	var _this=this;
	
	//钱转
	setInterval(function(){
		_this.cur++;
		if(_this.cur==10)_this.cur=0;
	},30);
	//收钱
	setInterval(function(){
		_this.x+=(0-_this.x)/5;
		_this.y+=(650-_this.y)/5;
	},30);	
};