//	Establish canvas structure
var canvas=document.getElementById(`canvas`);
canvas.height=screen.height;
canvas.width=screen.width;
var canvasContext=canvas.getContext(`2d`);
var img=document.getElementById(`galaxy`);
var HUDisplay=document.getElementById(`HUDisplay`);
HUDisplay.height=screen.height;
HUDisplay.width=screen.width;
var HUDContext=HUDisplay.getContext(`2d`);
var scale=1;
var style=`Original`
//	Elements
var elements=[[],[],[]];
var galaxyPosition=[0,0];
//	Positional variables
var oldTarget=0;
var target=0;
var xCoordinate;
var yCoordinate;
//	Map options
var systemAllocation;
//	Draw canvas on page load
function initialize(){
	canvasContext.scale((1/3)/scale,(1/3)/scale);
	HUDContext.scale((1/3)/scale,(1/3)/scale);
	canvasContext.drawImage(img,400,100);
};
//	Coordinate tracking on mouse actions
function onMouseMove(event){
	xCoordinate=Math.round((event.offsetX*3-2150)*scale);
	yCoordinate=Math.round((event.offsetY*3-1350)*scale);
	var distance=100000;
	for(i=0;i<elements[0].length;i++){
		if(Math.dist(elements[0][i][1][0]-galaxyPosition[0],elements[0][i][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)<distance){
			target=i;
			distance=Math.dist(elements[0][i][1][0]-galaxyPosition[0],elements[0][i][1][1]-galaxyPosition[1],xCoordinate,yCoordinate);
		};
	};
	if(oldTarget!==target&&distance<100){
		for(i=0;i<elements[1].length;i++){
			if(elements[0][target][2]==elements[1][i][0]){
				oldTarget=target;
				HUDContext.clearRect(0,0,100000,100000);
				if(style==`Original`){
					drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],18,1.5,`rgb(255,255,255)`);
					drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],100,1,`rgb(102,102,102)`);
				}else if(style==`Modern`){
					if(elements[0][target][4].length>0||systemAllocation){
						drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],1,3.6,`rgb(255,255,255)`);
						drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],4.6,3.6,`rgb(`+elements[1][i][1][0]*255+`,`+elements[1][i][1][1]*255+`,`+elements[1][i][1][2]*255+`)`);
						drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],100,.5,`rgb(255,255,255)`);
						drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],100,1,`rgb(`+elements[1][i][1][0]*255+`,`+elements[1][i][1][1]*255+`,`+elements[1][i][1][2]*255+`)`);
					}else{
						drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],1,3.6,`rgb(255,255,255)`);
						drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],4.6,3.6,`rgb(102,102,102)`);
						drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],100,.5,`rgb(255,255,255)`);
						drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],100,1,`rgb(102,102,102)`);
					};
					break;
				};
			};
		};
	}else if(distance>=100){
		oldTarget=0;
		HUDContext.clearRect(0,0,100000,100000);
	};
};
//	Parses files to generate map display
function loadFiles(that){
	HUDisplay.addEventListener(`mousemove`,onMouseMove);
	var files=event.target.files;
	for(i=0;i<files.length;i++){
		// Systems
		var systemsReader=new FileReader();
		systemsReader.readAsText(files[i]);
		systemsReader.onload=function(e){
			var output=e.target.result;
			var lines=output.split(`\n`);
			for(j=0;j<lines.length;j++){
				if(lines[j].startsWith(`system `)){
					elements[0].push([lines[j].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``),[],[`Uninhabited`],[],[]]);
					for(k=j+1;k<lines.length;k++){
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
					for(k=j+1;k<lines.length;k++){
						if(lines[k].startsWith(`\tcolor `)){
							elements[1][elements[1].length-1][1]=lines[k].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
							break;
						}else if(!lines[k].startsWith(`\t`)){
							break;
						};
					};
				}else if(lines[j].startsWith(`galaxy `)){
					elements[2].push([lines[j].slice(7).replaceAll(` `,``).replaceAll(`"`,``).replaceAll(`\r`,``),[]]);
					for(k=j+1;k<lines.length;k++){
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
	console.log(elements);
	canvasContext.restore();
	canvasContext.save();
	canvasContext.clearRect(0,0,100000,100000);
	canvasContext.drawImage(img,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1]);
	if(elements[0].length){
		document.getElementById(`switchGalaxy`).classList.remove(`hidden`);
	};
	for(i=0;i<elements[2].length;i++){
		document.getElementById(`switchGalaxy`).innerHTML+=`
			<label id="`+elements[2][i][0]+`"class="galaxyViewed idleSelection" onclick="switchGalaxy(this.id);" style="top:`+parseInt(35+(20*i))+`px;">`+elements[2][i][0]+`</label>
			`;
	};
	//	Links
	for(i=0;i<elements[0].length;i++){
		for(j=0;j<elements[0][i][3].length;j++){
			for(k=0;k<elements[0].length;k++){
				if(elements[0][i][3][j]==elements[0][k][0]){
					if(style==`Original`){
						drawLine(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],2150*scale+ +elements[0][k][1][0]-galaxyPosition[0],1350*scale+ +elements[0][k][1][1]-galaxyPosition[1],[],2,`rgb(102,102,102)`);
					}else if(style==`Modern`){
						for(l=0;l<elements[1].length;l++){
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
		for(i=0;i<elements[0].length;i++){
			canvasContext.moveTo(2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1]);
			canvasContext.arc(2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],16,0,2*Math.PI);
		};
		canvasContext.clip();
		canvasContext.drawImage(img,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1]);
	};
	canvasContext.restore();
	for(i=0;i<elements[0].length;i++){
		for(j=0;j<elements[1].length;j++){
			if(elements[0][i][2]==elements[1][j][0]){
				if(style==`Original`){
					if(elements[0][i][4].length>0||systemAllocation){
						drawArc(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],9,3.6,`rgb(`+elements[1][j][1][0]*255+`,`+elements[1][j][1][1]*255+`,`+elements[1][j][1][2]*255+`)`);
					}else{
						drawArc(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],9,3.6,`rgb(102,102,102)`);
					};
				}else if(style==`Modern`){
					if(elements[0][i][4].length>0||systemAllocation){
						drawArc(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],1,3.6,`rgb(`+elements[1][j][1][0]*255+`,`+elements[1][j][1][1]*255+`,`+elements[1][j][1][2]*255+`)`);
					}else{
						drawArc(canvasContext,2150*scale+ +elements[0][i][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i][1][1]-galaxyPosition[1],1,3.6,`rgb(102,102,102)`);
					};
				};
				break;
			};
		};
	};
	//	Wormholes
	var wormholes=[];
	for(i=0;i<elements[0].length;i++){
		for(j=0;j<elements[0][i][4].length;j++){
			wormholes.push([elements[0][i][4][j],elements[0][i][1][0],elements[0][i][1][1]]);
		};
	};
	for(i=0;i<wormholes.length;i++){
		for(j=i+1;j<wormholes.length;j++){
			if(wormholes[i][0]==wormholes[j][0]){
				drawLine(canvasContext,2150*scale+ +wormholes[i][1]-galaxyPosition[0],1350*scale+ +wormholes[i][2]-galaxyPosition[1],2150*scale+ +wormholes[j][1]-galaxyPosition[0],1350*scale+ +wormholes[j][2]-galaxyPosition[1],[],2,`rgb(128,51,230)`);
				break;
			};
		};
	};
};
//	Map Options
function switchScale(){
	canvasContext.scale(3*scale,3*scale);
	HUDContext.scale(3*scale,3*scale);
	if(document.getElementById(`scaleActive`).innerHTML==1){
		scale=1.5;
	}else if(document.getElementById(`scaleActive`).innerHTML==1.5){
		scale=2.5;
	}else if(document.getElementById(`scaleActive`).innerHTML==2.5){
		scale=1;
	};
	document.getElementById(`scaleActive`).innerHTML=scale;
	canvasContext.scale((1/3)/scale,(1/3)/scale);
	HUDContext.scale((1/3)/scale,(1/3)/scale);
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
function drawArc(target,x,y,radius,width,colour){
	target.beginPath();
	target.arc(x,y,radius,0,2*Math.PI);
	target.lineWidth=width;
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
function drawText(target,x,y,text,size,colour){
	target.font=size*scale+`px Ubuntu`;
	target.fillStyle=colour;
	target.fillText(text,x,y);
};
Math.dist=function(x1,y1,x2,y2){ 
	if(!x2)x2=0; 
	if(!y2)y2=0;
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)); 
};