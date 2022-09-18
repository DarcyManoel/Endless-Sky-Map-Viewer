var mapStyle=`original`
var systemAllocation=`inhabited`
var systemBuffer=true
var galaxySelected=0
var galaxyPosition=[0,0]
var scale=1
function switchStyle(id){
	switch(id){
		case `original`:
			document.getElementById(`original`).classList.remove(`dark`)
			document.getElementById(`modern`).classList.add(`dark`)
			mapStyle=`original`
			break
		case `modern`:
			document.getElementById(`original`).classList.add(`dark`)
			document.getElementById(`modern`).classList.remove(`dark`)
			mapStyle=`modern`
			break
	}
	drawMap()
}
function switchAllocation(id){
	switch(id){
		case `inhabited`:
			document.getElementById(`claimed`).classList.add(`dark`)
			document.getElementById(`inhabited`).classList.remove(`dark`)
			systemAllocation=`inhabited`
			break
		case `claimed`:
			document.getElementById(`claimed`).classList.remove(`dark`)
			document.getElementById(`inhabited`).classList.add(`dark`)
			systemAllocation=`claimed`
			break
	}
	drawMap()
}
function toggleBuffer(id){
	switch(id){
		case `bufferOn`:
			document.getElementById(`bufferOff`).classList.add(`dark`)
			document.getElementById(`bufferOn`).classList.remove(`dark`)
			systemBuffer=true
			break
		case `bufferOff`:
			document.getElementById(`bufferOff`).classList.remove(`dark`)
			document.getElementById(`bufferOn`).classList.add(`dark`)
			systemBuffer=false
			break
	}
}
function switchGalaxy(){
	galaxySelected++
	if(galaxySelected==elements[2].length){
		galaxySelected=0
	}
	galaxyPosition=elements[2][galaxySelected][1]
	drawMap()
	console.log(galaxyPosition)
}
function zoomOut(){
	canvasContext.scale(3*scale,3*scale)
	HUDContext.scale(3*scale,3*scale)
	if(scale==1){
		scale=1.5
	}else if(scale==1.5){
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
	}else if(scale==1.5){
		scale=1
	}
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	HUDContext.scale((1/3)/scale,(1/3)/scale)
	drawMap()
}
