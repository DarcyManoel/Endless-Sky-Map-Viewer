//	Draw a link on the map
function drawLink(startX,startY,endX,endY){
	canvasContext.beginPath()
	canvasContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(2150*scale+ +endX-galaxyPosition[0],1350*scale+ +endY-galaxyPosition[1])
	canvasContext.setLineDash([])
	if(style==`original`){
		canvasContext.setLineDash([0,15,1000])
	}
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(102,102,102)`
	canvasContext.stroke()
}
//	Draw a coloured link on the map
function drawLinkColour(startX,startY,endX,endY,systemGovernment){
	canvasContext.beginPath()
	canvasContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(2150*scale+ +endX-galaxyPosition[0],1350*scale+ +endY-galaxyPosition[1])
	canvasContext.setLineDash([])
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(`+systemGovernment[0]*255+`,`+systemGovernment[1]*255+`,`+systemGovernment[2]*255+`)`
	canvasContext.stroke()
}
//	Draw jump range on the overlay
function drawRange(x,y){
	HUDContext.beginPath()
	HUDContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],100,0,2*Math.PI)
	HUDContext.setLineDash([])
	HUDContext.lineWidth=2
	HUDContext.strokeStyle=`rgb(102,102,102)`
	HUDContext.stroke()
}
//	Draw a system on the map
function drawSystem(x,y,radius){
	canvasContext.beginPath()
	canvasContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],radius,0,2*Math.PI)
	canvasContext.setLineDash([])
	canvasContext.lineWidth=3.6
	canvasContext.strokeStyle=`rgb(102,102,102)`
	canvasContext.stroke()
}
//	Draw a coloured system on the map
function drawSystemColour(x,y,radius,systemGovernment){
	canvasContext.beginPath()
	canvasContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],radius,0,2*Math.PI)
	canvasContext.setLineDash([])
	canvasContext.lineWidth=3.6
	canvasContext.strokeStyle=`rgb(`+systemGovernment[0]*255+`,`+systemGovernment[1]*255+`,`+systemGovernment[2]*255+`)`
	canvasContext.stroke()
}
//	Draw a wormhole on the map
function drawWormhole(startX,startY,endX,endY){
	canvasContext.beginPath()
	canvasContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(2150*scale+ +endX-galaxyPosition[0],1350*scale+ +endY-galaxyPosition[1])
	canvasContext.setLineDash([0,15,1000])
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(128,51,230)`
	canvasContext.stroke()
}
//	Calculate distance between two unaligned points
Math.dist=function(x1,y1,x2,y2){ 
	if(!x2){
		x2=0
	}
	if(!y2){
		y2=0
	}
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
}
