
function Web(){
	this.x=0;
	this.y=0;
	this.scale=0.5;	
}
Web.prototype.draw=function(gd){
	gd.save();
	
	gd.translate(this.x,this.y);
	gd.scale(this.scale,this.scale);
	gd.drawImage(
		JSON.web,
		14,414,110,108,
		-55,-54,110,108
	);
	
	gd.restore();
};