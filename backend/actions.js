var scale=1
var style=`original`
var systemAllocation=`inhabited`
var galaxySelected=0
var galaxyPosition=[0,0]
function switchGalaxy(id){
	galaxySelected++
	if(galaxySelected==elements[2].length){
		galaxySelected=0
	}
	galaxyPosition=elements[2][galaxySelected][1]
	drawMap()
}
function switchStyle(){
	if(style==`original`){
		style=`modern`
	}
	else if(style==`modern`){
		style=`original`
	}
	drawMap()
}
function switchAllocation(){
	if(systemAllocation==`inhabited`){
		systemAllocation=`claimed`
	}
	else if(systemAllocation==`claimed`){
		systemAllocation=`inhabited`
	}
	drawMap()
}
function zoomOut(){
	canvasContext.scale(3*scale,3*scale)
	HUDContext.scale(3*scale,3*scale)
	if(scale==1){
		scale=1.5
	}
	else if(scale==1.5){
		scale=2.5
	}
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	HUDContext.scale((1/3)/scale,(1/3)/scale)
	drawMap()
}
function zoomIn(){
	canvasContext.scale(3*scale,3*scale)
	HUDContext.scale(3*scale,3*scale)
	if(scale==2.5){
		scale=1.5
	}
	else if(scale==1.5){
		scale=1
	}
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	HUDContext.scale((1/3)/scale,(1/3)/scale)
	drawMap()
}
