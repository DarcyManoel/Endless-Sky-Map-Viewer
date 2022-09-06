//	Draw a line on the map in the style of a system link with colour
function drawLink(startX,startY,endX,endY){
	canvasContext.beginPath();
	canvasContext.moveTo(2150*scale+ +startX,1350*scale+ +startY);
	canvasContext.lineTo(2150*scale+ +endX,1350*scale+ +endY);
	canvasContext.lineWidth=2;
	canvasContext.strokeStyle=`rgb(102,102,102)`;
	canvasContext.stroke();
}
//	Draw a line on the map in the style of a system link with colour
function drawLinkColour(startX,startY,endX,endY,systemGovernment){
	canvasContext.beginPath();
	canvasContext.moveTo(2150*scale+ +startX,1350*scale+ +startY);
	canvasContext.lineTo(2150*scale+ +endX,1350*scale+ +endY);
	canvasContext.lineWidth=2;
	canvasContext.strokeStyle=`rgb(`+systemGovernment[0]*255+`,`+systemGovernment[1]*255+`,`+systemGovernment[2]*255+`)`;
	canvasContext.stroke();
}
//	Draw an arc on the map in the style of a system
function drawSystem(x,y,radius){
	canvasContext.beginPath();
	canvasContext.arc(2150*scale+ +x,1350*scale+ +y,radius,0,2*Math.PI);
	canvasContext.lineWidth=3.6;
	canvasContext.strokeStyle=`rgb(102,102,102)`;
	canvasContext.stroke();
}
//	Draw an arc on the map in the style of a system with colour
function drawSystemColour(x,y,radius,systemGovernment){
	canvasContext.beginPath();
	canvasContext.arc(2150*scale+ +x,1350*scale+ +y,radius,0,2*Math.PI);
	canvasContext.lineWidth=3.6;
	canvasContext.strokeStyle=`rgb(`+systemGovernment[0]*255+`,`+systemGovernment[1]*255+`,`+systemGovernment[2]*255+`)`;
	canvasContext.stroke();
}
//	Draw a line on the map in the style of a wormhole
function drawWormhole(startX,startY,endX,endY){
	canvasContext.beginPath();
	canvasContext.moveTo(2150*scale+ +startX,1350*scale+ +startY);
	canvasContext.lineTo(2150*scale+ +endX,1350*scale+ +endY);
	canvasContext.lineWidth=2;
	canvasContext.strokeStyle=`rgb(128,51,230)`;
	canvasContext.stroke();
}
//	Calculate distance between two unaligned points
Math.dist=function(x1,y1,x2,y2){ 
	if(!x2){
		x2=0;
	}
	if(!y2){
		y2=0;
	}
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}