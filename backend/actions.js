var mapStyle=`original`
var systemOwnership=`inhabited`
var buffer=true
var grid=false
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
	localStorage.setItem(`mapStyle`,mapStyle)
	drawMap()
}
function switchOwnership(id){
	switch(id){
		case `inhabited`:
			document.getElementById(`claimed`).classList.add(`dark`)
			document.getElementById(`inhabited`).classList.remove(`dark`)
			systemOwnership=`inhabited`
			break
		case `claimed`:
			document.getElementById(`claimed`).classList.remove(`dark`)
			document.getElementById(`inhabited`).classList.add(`dark`)
			systemOwnership=`claimed`
			break
	}
	localStorage.setItem(`systemOwnership`,systemOwnership)
	drawMap()
}
function toggleBuffer(){
	switch(buffer){
		case true:
			document.getElementById(`buffer`).classList.add(`dark`)
			buffer=false
			break
		case false:
			document.getElementById(`buffer`).classList.remove(`dark`)
			buffer=true
			break
	}
	localStorage.setItem(`buffer`,buffer)
}
function toggleGrid(){
	switch(grid){
		case false:
			document.getElementById(`grid`).classList.remove(`dark`)
			grid=true
			break
		case true:
			document.getElementById(`grid`).classList.add(`dark`)
			grid=false
			break
	}
	localStorage.setItem(`grid`,grid)
	drawHUD()
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
function copyOutput(){
	navigator.clipboard.writeText(
		document.getElementById(`output`).innerHTML
	)
}
