function drawArc(target,x,y,radius,width,colour){
	target.beginPath();
	target.arc(x,y,radius,0,2*Math.PI);
	target.lineWidth=width;
	target.setLineDash([]);
	target.strokeStyle=colour;
	target.stroke();
	};
function drawLine(target,startX,startY,endX,endY,lineDash,width,colour){
	target.beginPath();
	target.moveTo(startX,startY);
	target.lineTo(endX,endY);
	target.setLineDash(lineDash);
	target.lineWidth=width;
	target.strokeStyle=colour;
	target.stroke();
	};
//	Calculate distance between two unaligned points
Math.dist=function(x1,y1,x2,y2){ 
	if(!x2)x2=0; 
	if(!y2)y2=0;
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	};