var loop=0;
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
//	Elements
var elements=[[],[]];
//	Positional variables
var isDragging;
var xCoordinate;
var yCoordinate;
//	Map options
var systemAllocation;
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
	for(i=0;i<files.length;i++,loop++){
		// Systems
		var systemsReader=new FileReader();
		systemsReader.readAsText(files[i]);
		systemsReader.onload=function(e){
			var output=e.target.result;
			var lines=output.split(`\n`);
			for(j=0;j<lines.length;j++,loop++){
				if(lines[j].startsWith(`system `)){
					elements[0].push([lines[j].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``),[],[`Uninhabited`],[],[]]);
					for(k=j+1;k<lines.length;k++,loop++){
						if(lines[k].startsWith(`\tpos `)){
							elements[0][elements[0].length-1][1]=lines[k].slice(5).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
						}else if(lines[k].startsWith(`\tgovernment `)){
							elements[0][elements[0].length-1][2]=lines[k].slice(12).replaceAll(`"`,``).replaceAll(`\r`,``);
						}else if(lines[k].startsWith(`\tlink `)){
							elements[0][elements[0].length-1][3].push(lines[k].slice(6).replaceAll(`"`,``).replaceAll(`\r`,``));
						}else if(lines[k].startsWith(`\tobject `)){
							elements[0][elements[0].length-1][4].push(lines[k].slice(8).replaceAll(`"`,``).replaceAll(`\r`,``));
						}else if(!lines[k].startsWith(`\t`)){
							break;
						};
					};
				}else if(lines[j].startsWith(`government `)){
					elements[1].push([lines[j].slice(11).replaceAll(`"`,``).replaceAll(`\r`,``),[]]);
					for(k=j+1;k<lines.length;k++,loop++){
						if(lines[k].startsWith(`\tcolor `)){
							elements[1][elements[1].length-1][1]=lines[k].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
						}else if(!lines[k].startsWith(`\t`)){
							break;
						};
					};
				};
			};
		};
	};
	setTimeout(drawMap,1000);
};
//	Map drawing
function drawMap(){
	console.log(elements);
	canvasContext.restore();
	canvasContext.save();
	canvasContext.drawImage(img,400,100);
	//	Links
	for(i=0;i<elements[0].length;i++,loop++){
		for(j=0;j<elements[0][i][3].length;j++,loop++){
			for(k=0;k<elements[0].length;k++){
				if(elements[0][i][3][j]==elements[0][k][0]){
					drawLine(canvasContext,2150+ +elements[0][i][1][0],1350+ +elements[0][i][1][1],2150+ +elements[0][k][1][0],1350+ +elements[0][k][1][1],[],2,`rgb(102,102,102)`);
				};
			};
		};
	};
	//	Systems
	canvasContext.beginPath();
	for(i=0;i<elements[0].length;i++,loop++){
		canvasContext.moveTo(2150+ +elements[0][i][1][0],1350+ +elements[0][i][1][1]);
		canvasContext.arc(2150+ +elements[0][i][1][0],1350+ +elements[0][i][1][1],16,0,2*Math.PI);
	};
	canvasContext.clip();
	canvasContext.drawImage(img,400,100);
	canvasContext.restore();
	for(i=0;i<elements[0].length;i++,loop++){
		for(j=0;j<elements[1].length;j++,loop++){
			if(elements[0][i][2]==elements[1][j][0]){
				if(elements[0][i][4].length>0||systemAllocation){
					drawArc(canvasContext,2150+ +elements[0][i][1][0],1350+ +elements[0][i][1][1],9,0,0,2*Math.PI,`rgb(`+elements[1][j][1][0]*255+`,`+elements[1][j][1][1]*255+`,`+elements[1][j][1][2]*255+`)`);
				}else{
					drawArc(canvasContext,2150+ +elements[0][i][1][0],1350+ +elements[0][i][1][1],9,0,0,2*Math.PI,`rgb(102,102,102)`);
				};
			};
		};
	};
	//	Wormholes
	var wormholes=[];
	for(i=0;i<elements[0].length;i++,loop++){
		for(j=0;j<elements[0][i][4].length;j++,loop++){
			wormholes.push([elements[0][i][4][j],elements[0][i][1][0],elements[0][i][1][1]]);
		};
	};
	for(i=0;i<wormholes.length;i++,loop++){
		for(j=i+1;j<wormholes.length;j++,loop++){
			if(wormholes[i][0]==wormholes[j][0]){
				drawLine(canvasContext,2150+ +wormholes[i][1],1350+ +wormholes[i][2],2150+ +wormholes[j][1],1350+ +wormholes[j][2],[],2,`rgb(128,51,230)`);
				break;
			};
		};
	};
	console.log(loop);
};
//	Map Options
function switchAllocation(){
	if(systemAllocation){
		systemAllocation=0;
		document.getElementById(`inhabited`).classList.toggle(`hidden`);
		document.getElementById(`claimed`).classList.toggle(`hidden`);
	}else{
		systemAllocation=1;
		document.getElementById(`inhabited`).classList.toggle(`hidden`);
		document.getElementById(`claimed`).classList.toggle(`hidden`);
	};
	drawMap();
};
//	Pre-defined canvas actions
function drawArc(target,x,y,radius,fill,start,end,colour){
	target.beginPath();
	target.arc(x,y,radius,start,end);
	target.lineWidth=3.6;
	target.setLineDash([]);
	target.strokeStyle=colour;
	target.stroke();
	if(fill==1){
		target.fill();
	};
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