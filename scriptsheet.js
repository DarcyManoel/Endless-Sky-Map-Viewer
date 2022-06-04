var isDragging;
var xCoordinate;
var yCoordinate;
//	Establish canvas structure
var canvas=document.getElementById(`canvas`);
canvas.height=screen.height;
canvas.width=screen.width;
var canvasContext=canvas.getContext(`2d`);
var img=document.getElementById(`galaxy`);
var interactable=document.getElementById(`interactable`);
interactable.height=screen.height;
interactable.width=screen.width;
var interactableContext=interactable.getContext(`2d`);
//	Map elements
var systemCount=0;
var systems=[];
//	Draw canvas on page load
function initialize(){
	canvasContext.scale(1/3,1/3);
	canvasContext.drawImage(img,400,100);
};
//	Coordinate tracking on mouse actions
function onMouseDown(event){
	isDragging=true;
	xCoordinate=event.offsetX;
	yCoordinate=event.offsetY;
};
function onMouseMove(event){
	if(!isDragging){
		return;
	};
	xCoordinate=event.offsetX;
	yCoordinate=event.offsetY;
};
function onMouseUp(event){
	isDragging=false;
	xCoordinate=event.offsetX;
	yCoordinate=event.offsetY;
};
//	Parses files to generate map display
function loadFiles(that){
	interactable.addEventListener(`mousedown`,onMouseDown);
	interactable.addEventListener(`mousemove`,onMouseMove);
	document.body.addEventListener(`mouseup`,onMouseUp);
	var files=event.target.files;
	for(i=0;i<files.length;i++){
		// Systems
		var systemsReader=new FileReader();
		systemsReader.readAsText(files[i]);
		systemsReader.onload=function(e){
			var output=e.target.result;
			var lines=output.split(`\n`);
			for(j=0;j<lines.length;j++){
				if(lines[j].startsWith(`system `)&&!lines[j].startsWith(`system "`)){
					systems.push([[`system`,lines[j].slice(7,lines[j].length-1)]]);
					var attributes=[];
					var links=[];
					for(h=j+1;h<lines.length;h++){
						if(lines[h].startsWith(`\tpos `)){
							systems[systemCount].push([`position`,lines[h].slice(6).split(` `)]);
						};
						if(lines[h].startsWith(`\tgovernment `)){
							systems[systemCount].push([`government`,lines[h].slice(12)]);
						};
						if(lines[h].startsWith(`\tattributes `)){
							attributes=lines[h].slice(13,-1).split(`" "`);
						};
						if(lines[h].startsWith(`\tlink `)){
							links.push(lines[h].slice(7,-1));
						};
						if(lines[h].startsWith(`\t\t`)){
							break;
						};
					};
					systems[systemCount].push([`attributes`,attributes]);
					systems[systemCount].push([`links`,links]);
					systemCount++;
				}else if(lines[j].startsWith(`system "`)){
					systems.push([[`system`,lines[j].slice(8,lines[j].length-1)]]);
					var attributes=[];
					var links=[];
					for(h=j+1;h<lines.length;h++){
						if(lines[h].startsWith(`\tpos `)){
							systems[systemCount].push([`position`,lines[h].slice(6).split(` `)]);
						};
						if(lines[h].startsWith(`\tgovernment `)){
							systems[systemCount].push([`government`,lines[h].slice(12)]);
						};
						if(lines[h].startsWith(`\tattributes `)){
							attributes=lines[h].slice(13,-1).split(`" "`);
						};
						if(lines[h].startsWith(`\tlink `)){
							links.push(lines[h].slice(7,-1));
						};
						if(lines[h].startsWith(`\t\t`)){
							break;
						};
					};
					systems[systemCount].push([`attributes`,attributes]);
					systems[systemCount].push([`links`,links]);
					systemCount++;
				};
			};
			if(systems.length>0){
				console.log(systems);
			};
		};
	};
};
//	Display style decider
function drawMap(){
    canvasContext.restore();
    canvasContext.save();
	canvasContext.drawImage(img,400,100);
};
//	Canvas pre-defined actions
function drawArc(x,y,radius,start,end,colour){
	canvasContext.beginPath();
	canvasContext.arc(x,y,radius,start,end);
	canvasContext.lineWidth=3.6;
	canvasContext.setLineDash([]);
	canvasContext.strokeStyle=colour;
	canvasContext.stroke();
};
function drawLine(target,startX,startY,endX,endY,lineDash,width,colour){
	target.beginPath();
	target.moveTo(startX,startY);
	target.lineTo(endX,endY);
	target.setLineDash(lineDash);
	target.lineWidth=width;
	target.strokeStyle=colour;
	target.stroke();
};