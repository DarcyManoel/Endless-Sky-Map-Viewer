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
	if(localStorage.getItem(`help`)==`true`){
		document.getElementById(`help`).innerHTML=`Don't Help Me!`
		document.getElementById(`helpUpload`).classList.remove(`hidden`)
		document.getElementById(`helpStyle`).classList.remove(`hidden`)
		document.getElementById(`helpAllocation`).classList.remove(`hidden`)
		document.getElementById(`helpBuffer`).classList.remove(`hidden`)
		document.getElementById(`helpGalaxy`).classList.remove(`hidden`)
		document.getElementById(`helpZoom`).classList.remove(`hidden`)
		help=true
	}
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	HUDContext.scale((1/3)/scale,(1/3)/scale)
	canvasContext.drawImage(galaxy,400,100)
}
