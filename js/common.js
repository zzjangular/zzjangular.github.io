function d2a(n)
{
	return n*Math.PI/180;
}

function ext(parent, child)
{
	for(var i in parent.prototype)
	{
		child.prototype[i]=parent.prototype[i];
	}
}