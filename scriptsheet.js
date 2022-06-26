var loadLoop=0
var drawLoop=0;
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
var scale=1;
var style=`Original`
//	Elements
var elements=[[],[],[]];
var galaxyPosition=[0,0];
//	Positional variables
var isDragging;
var xCoordinate;
var yCoordinate;
//	Map options
var systemAllocation;
//	Draw canvas on page load
function initialize(){
	canvasContext.scale((1/3)/scale,(1/3)/scale);
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
	loadLoop=0
	interactable.addEventListener(`mousedown`,onMouseDown);
	interactable.addEventListener(`mousemove`,onMouseMove);
	document.body.addEventListener(`mouseup`,onMouseUp);
	var files=event.target.files;
	for(i=0;i<files.length;i++,loadLoop++){
		// Systems
		var systemsReader=new FileReader();
		systemsReader.readAsText(files[i]);
		systemsReader.onload=function(e){
			var output=e.target.result;
			var lines=output.split(`\n`);
			for(j=0;j<lines.length;j++,loadLoop++){
				if(lines[j].startsWith(`system `)){
					elements[0].push([lines[j].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``),[],[`Uninhabited`],[],[]]);
					for(k=j+1;k<lines.length;k++,loadLoop++){
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
					for(k=j+1;k<lines.length;k++,loadLoop++){
						if(lines[k].startsWith(`\tcolor `)){
							elements[1][elements[1].length-1][1]=lines[k].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
							break;
						}else if(!lines[k].startsWith(`\t`)){
							break;
						};
					};
				}else if(lines[j].startsWith(`galaxy `)){
					elements[2].push([lines[j].slice(7).replaceAll(` `,``).replaceAll(`"`,``).replaceAll(`\r`,``),[]]);
					for(k=j+1;k<lines.length;k++,loadLoop++){
						if(lines[k].startsWith(`\tpos `)){
							elements[2][elements[2].length-1][1]=lines[k].slice(5).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
							break;
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
	drawLoop=0;
	console.log(elements);
	canvasContext.restore();
	canvasContext.save();
	canvasContext.clearRect(0,0,100000,100000);
	canvasContext.drawImage(img,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1]);
	if(elements[0].length){
		document.getElementById(`switchGalaxy`).classList.remove(`hidden`);
	};
	for(i=0;i<elements[2].length;i++,drawLoop++){
		document.getElementById(`switchGalaxy`).innerHTML+=`
			<label id="`+elements[2][i][0]+`"class="galaxyViewed idleSelection" onclick="switchGalaxy(this.id);" style="top:`+parseInt(160+(20*i))+`px;">`+elements[2][i][0]+`</label>
			`;
	};
	//	Links
	for(i=0;i<elements[0].length;i++,drawLoop++){
		for(j=0;j<elements[0][i][3].length;j++,drawLoop++){
			for(k=0;k<elements[0].length;k++,drawLoop++){
				if(elements[0][i][3][j]==elements[0][k][0]){
					if(style==`Original`){
						drawLine(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],2150*scale+ +elements[0][k][1][0]-galaxyPosition[0],1350*scale+ +elements[0][k][1][1]-galaxyPosition[1],[],2,`rgb(102,102,102)`);
					}else if(style==`Modern`){
						for(l=0;l<elements[1].length;l++,drawLoop++){
							if(elements[0][i][2]==elements[1][l][0]){
								if(elements[0][i][4].length>0||systemAllocation){
									drawLine(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],2150*scale+ +elements[0][k][1][0]-((elements[0][k][1][0]-elements[0][i][1][0])/1.8)-galaxyPosition[0],1350*scale+ +elements[0][k][1][1]-((elements[0][k][1][1]-elements[0][i][1][1])/1.8)-galaxyPosition[1],[],2,`rgb(`+elements[1][l][1][0]*255+`,`+elements[1][l][1][1]*255+`,`+elements[1][l][1][2]*255+`)`);
								}else{
									drawLine(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],2150*scale+ +elements[0][k][1][0]-((elements[0][k][1][0]-elements[0][i][1][0])/1.8)-galaxyPosition[0],1350*scale+ +elements[0][k][1][1]-((elements[0][k][1][1]-elements[0][i][1][1])/1.8)-galaxyPosition[1],[],2,`rgb(102,102,102)`);
								};
								break;
							};
						};
					};
				};
			};
		};
	};
	//	Systems
	if(style==`Original`){
		canvasContext.beginPath();
		for(i=0;i<elements[0].length;i++,drawLoop++){
			canvasContext.moveTo(2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1]);
			canvasContext.arc(2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],16,0,2*Math.PI);
		};
		canvasContext.clip();
		canvasContext.drawImage(img,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1]);
	};
	canvasContext.restore();
	for(i=0;i<elements[0].length;i++,drawLoop++){
		for(j=0;j<elements[1].length;j++,drawLoop++){
			if(elements[0][i][2]==elements[1][j][0]){
				if(style==`Original`){
					if(elements[0][i][4].length>0||systemAllocation){
						drawArc(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],9,0,2*Math.PI,`rgb(`+elements[1][j][1][0]*255+`,`+elements[1][j][1][1]*255+`,`+elements[1][j][1][2]*255+`)`);
					}else{
						drawArc(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],9,0,2*Math.PI,`rgb(102,102,102)`);
					};
				}else if(style==`Modern`){
					if(elements[0][i][4].length>0||systemAllocation){
						drawArc(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],1,0,2*Math.PI,`rgb(`+elements[1][j][1][0]*255+`,`+elements[1][j][1][1]*255+`,`+elements[1][j][1][2]*255+`)`);
					}else{
						drawArc(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],1,0,2*Math.PI,`rgb(102,102,102)`);
					};
				};
				break;
			};
		};
	};
	//	Wormholes
	var wormholes=[];
	for(i=0;i<elements[0].length;i++,drawLoop++){
		for(j=0;j<elements[0][i][4].length;j++,drawLoop++){
			wormholes.push([elements[0][i][4][j],elements[0][i][1][0],elements[0][i][1][1]]);
		};
	};
	for(i=0;i<wormholes.length;i++,drawLoop++){
		for(j=i+1;j<wormholes.length;j++,drawLoop++){
			if(wormholes[i][0]==wormholes[j][0]){
				drawLine(canvasContext,2150*scale+ +wormholes[i][1]-galaxyPosition[0],1350*scale+ +wormholes[i][2]-galaxyPosition[1],2150*scale+ +wormholes[j][1]-galaxyPosition[0],1350*scale+ +wormholes[j][2]-galaxyPosition[1],[],2,`rgb(128,51,230)`);
				break;
			};
		};
	};
	console.log(loadLoop);
	console.log(drawLoop);
};
//	Map Options
function switchScale(){
	canvasContext.scale(3*scale,3*scale);
	if(document.getElementById(`scaleActive`).innerHTML==1){
		scale=1.5;
	}else if(document.getElementById(`scaleActive`).innerHTML==1.5){
		scale=2.5;
	}else if(document.getElementById(`scaleActive`).innerHTML==2.5){
		scale=1;
	};
	document.getElementById(`scaleActive`).innerHTML=scale;
	canvasContext.scale((1/3)/scale,(1/3)/scale);
	drawMap();
};
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
function switchStyle(){
	if(document.getElementById(`styleActive`).innerHTML==`Original`){
		style=`Modern`;
	}else if(document.getElementById(`styleActive`).innerHTML==`Modern`){
		style=`Original`;
	}
	document.getElementById(`styleActive`).innerHTML=style;
	drawMap();
};
function switchGalaxy(id){
	for(i=0;i<elements[2].length;i++){
		if(id==elements[2][i][0]){
			galaxyPosition=elements[2][i][1];
			break;
		};
	};
	drawMap();
};
//	Pre-defined canvas actions
function drawArc(target,x,y,radius,start,end,colour){
	target.beginPath();
	target.arc(x,y,radius,start,end);
	target.lineWidth=3.6;
	target.setLineDash([]);
	target.strokeStyle=colour;
	target.stroke();
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