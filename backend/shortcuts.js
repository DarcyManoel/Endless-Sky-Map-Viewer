//	Draw objects on map
function drawLink(startX,startY,endX,endY){
	canvasContext.beginPath()
	canvasContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(2150*scale+ +endX-galaxyPosition[0],1350*scale+ +endY-galaxyPosition[1])
	canvasContext.setLineDash([])
	switch(mapStyle){
		case `original`:
			canvasContext.setLineDash([0,15,10000])
			break
	}
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(102,102,102)`
	canvasContext.stroke()
}
function drawLinkColour(startX,startY,endX,endY,systemGovernment){
	canvasContext.beginPath()
	canvasContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(2150*scale+ +endX-galaxyPosition[0],1350*scale+ +endY-galaxyPosition[1])
	canvasContext.setLineDash([])
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(`+systemGovernment[0]*255+`,`+systemGovernment[1]*255+`,`+systemGovernment[2]*255+`)`
	canvasContext.stroke()
}
function drawSystem(x,y,radius){
	canvasContext.beginPath()
	canvasContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],radius,0,2*Math.PI)
	canvasContext.setLineDash([])
	canvasContext.lineWidth=3.6
	canvasContext.strokeStyle=`rgb(102,102,102)`
	canvasContext.stroke()
}
function drawSystemColour(x,y,radius,systemGovernment){
	canvasContext.beginPath()
	canvasContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],radius,0,2*Math.PI)
	canvasContext.setLineDash([])
	canvasContext.lineWidth=3.6
	canvasContext.strokeStyle=`rgb(`+systemGovernment[0]*255+`,`+systemGovernment[1]*255+`,`+systemGovernment[2]*255+`)`
	canvasContext.stroke()
}
function drawWormhole(startX,startY,endX,endY){
	canvasContext.beginPath()
	canvasContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(2150*scale+ +endX-galaxyPosition[0],1350*scale+ +endY-galaxyPosition[1])
	canvasContext.setLineDash([0,15,10000])
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(128,51,230)`
	canvasContext.stroke()
}
//	Draw HUD elements
function drawFakeLink(startX,startY,endX,endY){
	HUDContext.beginPath()
	HUDContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	HUDContext.lineTo(2150*scale+ +endX,1350*scale+ +endY)
	HUDContext.setLineDash([0,15,0])
	HUDContext.lineWidth=2
	HUDContext.strokeStyle=`rgb(102,102,102)`
	HUDContext.stroke()
}
function drawGrid(){
	for(i1=100;i1<screen.width*3*scale;i1+=100){
		HUDContext.beginPath()
		HUDContext.moveTo(i1,0)
		HUDContext.lineTo(i1,screen.height*3*scale)
		HUDContext.setLineDash([])
		HUDContext.lineWidth=1
		HUDContext.strokeStyle=`rgba(102,102,102,.4)`
		HUDContext.stroke()
	}
	for(i1=100;i1<screen.height*3*scale;i1+=100){
		HUDContext.beginPath()
		HUDContext.moveTo(0,i1)
		HUDContext.lineTo(screen.width*3*scale,i1)
		HUDContext.setLineDash([])
		HUDContext.lineWidth=1
		HUDContext.strokeStyle=`rgba(102,102,102,.4)`
		HUDContext.stroke()
	}
}
function drawRange(x,y){
	HUDContext.beginPath()
	HUDContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],100,0,2*Math.PI)
	HUDContext.setLineDash([])
	HUDContext.lineWidth=2
	HUDContext.strokeStyle=`rgb(102,102,102)`
	HUDContext.stroke()
}
function drawRestricted(x,y){
	if(buffer==true){
		HUDContext.beginPath()
		HUDContext.arc(2150*scale+ +x,1350*scale+ +y,50,0,2*Math.PI)
		HUDContext.setLineDash([])
		HUDContext.lineWidth=2
		if(distance>50){
			HUDContext.fillStyle=`rgba(102,255,102,.2)`
		}else{
			HUDContext.fillStyle=`rgba(255,102,102,.2)`
		}
		HUDContext.fill()
	}
	HUDContext.beginPath()
	HUDContext.arc(2150*scale+ +x,1350*scale+ +y,100,0,2*Math.PI)
	HUDContext.setLineDash([])
	HUDContext.lineWidth=2
	HUDContext.strokeStyle=`rgb(102,102,102)`
	HUDContext.stroke()
}
function drawSelect(x,y){
	HUDContext.beginPath()
	switch(mapStyle){
		case `original`:
			HUDContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],18,0,2*Math.PI)
			break
		case `modern`:
			HUDContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],4,0,2*Math.PI)
			break
	}
	HUDContext.setLineDash([])
	HUDContext.lineWidth=2
	HUDContext.strokeStyle=`rgb(255,255,255)`
	HUDContext.stroke()
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
