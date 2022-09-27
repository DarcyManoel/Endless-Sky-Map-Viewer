var canvas=document.getElementById(`canvas`)
canvas.height=screen.height
canvas.width=screen.width
var canvasContext=canvas.getContext(`2d`)
var headsUp=document.getElementById(`headsUp`)
headsUp.height=screen.height
headsUp.width=screen.width
var HUDContext=headsUp.getContext(`2d`)
var galaxy=document.getElementById(`galaxy`)
function initialize(){
	if(localStorage.getItem(`mapStyle`)==`modern`){
		document.getElementById(`original`).classList.add(`dark`)
		document.getElementById(`modern`).classList.remove(`dark`)
		mapStyle=localStorage.getItem(`mapStyle`)
	}
	if(localStorage.getItem(`systemOwnership`)==`claimed`){
		document.getElementById(`claimed`).classList.remove(`dark`)
		document.getElementById(`inhabited`).classList.add(`dark`)
		systemOwnership=localStorage.getItem(`systemOwnership`)
	}
	if(localStorage.getItem(`systemBuffer`)==`false`){
		document.getElementById(`bufferOff`).classList.remove(`dark`)
		document.getElementById(`bufferOn`).classList.add(`dark`)
		systemBuffer=localStorage.getItem(`systemBuffer`)
	}
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	HUDContext.scale((1/3)/scale,(1/3)/scale)
	canvasContext.drawImage(galaxy,400,100)
}
