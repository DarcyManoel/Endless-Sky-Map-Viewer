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
function switchScale(){
	canvasContext.scale(3*scale,3*scale)
	HUDContext.scale(3*scale,3*scale)
	if(document.getElementById(`scaleActive`).innerHTML==1){
		scale=1.5
	}
	else if(document.getElementById(`scaleActive`).innerHTML==1.5){
		scale=2.5
	}
	else if(document.getElementById(`scaleActive`).innerHTML==2.5){
		scale=1
	}
	document.getElementById(`scaleActive`).innerHTML=scale
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	HUDContext.scale((1/3)/scale,(1/3)/scale)
	drawMap()
}
