var help=false
var mapStyle=`original`
var systemOwnership=`inhabited`
var systemBuffer=true
var galaxySelected=0
var galaxyPosition=[0,0]
var scale=1
function toggleHelp(){
	switch(help){
		case true:
			document.getElementById(`helpToggle`).innerHTML=`Help Me!`
			document.getElementById(`help`).classList.add(`hidden`)
			document.getElementById(`style`).style=``
			document.getElementById(`ownership`).style=``
			document.getElementById(`buffer`).style=``
			help=false
			break
		case false:
			document.getElementById(`helpToggle`).innerHTML=`Don't Help Me!`
			document.getElementById(`help`).classList.remove(`hidden`)
			document.getElementById(`style`).style=`border-right:1px solid #fff`
			document.getElementById(`ownership`).style=`border-right:1px solid #fff`
			document.getElementById(`buffer`).style=`border-right:1px solid #fff`
			if(elements[0].length){
				document.getElementById(`tips`).classList.remove(`hidden`)
			}
			help=true
			break
	}
	localStorage.setItem(`help`,help)
	drawHUD()
}
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
	localStorage.setItem(`systemBuffer`,systemBuffer)
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
