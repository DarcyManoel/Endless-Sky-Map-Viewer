var canvas=document.getElementById(`canvas`);
canvas.height=screen.height;
canvas.width=screen.width;
var canvasContext=canvas.getContext(`2d`);
var headsUp=document.getElementById(`headsUp`);
headsUp.height=screen.height;
headsUp.width=screen.width;
var HUDContext=headsUp.getContext(`2d`);
var galaxy=document.getElementById(`galaxy`);
var galaxies=document.getElementById(`galaxies`);
var system=document.getElementById(`system`);
var planet=document.getElementById(`planet`);
var trade=document.getElementById(`trade`);
function initialize(){
	canvasContext.scale((1/3)/scale,(1/3)/scale);
	HUDContext.scale((1/3)/scale,(1/3)/scale);
	canvasContext.drawImage(galaxy,400,100);
	};