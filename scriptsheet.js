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
//		Systems
var systemCount=0;
var systems=[];
//		Governments
var governmentCount=0;
var governments=[];
//		Wormholes
var globalObjects=[];
var wormholes=[];
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
				//	Systems
				if(lines[j].startsWith(`system "`)){
					systems.push([[`system`,lines[j].slice(7)]]);
					var attributes=[];
					var links=[];
					var objects=[];
					for(k=j+1;k<lines.length;k++){
						//	List system position
						if(lines[k].startsWith(`\tpos `)){
							systems[systemCount].push([`position`,lines[k].replace(`	pos `,``).split(` `)]);
						};
						//	List system government
						if(lines[k].startsWith(`\tgovernment "`)){
							systems[systemCount].push([`government`,lines[k].slice(13,-1)]);
						}else if(lines[k].startsWith(`\tgovernment `)){
							systems[systemCount].push([`government`,lines[k].slice(12)]);
						};
						//	List system attributes
						if(lines[k].startsWith(`\tattributes `)){
							attributes=lines[k].slice(13,-1).split(`" "`);
						};
						//	List system links
						if(lines[k].startsWith(`\tlink `)){
							links.push(lines[k].slice(6));
						};
						//	List system objects
						if(lines[k].startsWith(`\tobject `)){
							objects.push(lines[k].slice(8));
						};
						if(lines[k].startsWith(`\t\tobject `)){
							objects.push(lines[k].slice(9));
						};
						//	End the loop prematurely
						if(lines[k].startsWith(`\t`)&&!lines[k+1].startsWith(`\t`)){
							break;
						};
					};
					systems[systemCount].push([`attributes`,attributes]);
					systems[systemCount].push([`links`,links]);
					systems[systemCount].push([`objects`,objects]);
					for(k=0;k<objects.length;k++){
						globalObjects.push([objects[k],systems[systemCount][1][1][0],systems[systemCount][1][1][1]]);
					};
					systemCount++;
				}else if(lines[j].startsWith(`system `)){
					systems.push([[`system`,lines[j].slice(7)]]);
					var attributes=[];
					var links=[];
					var objects=[];
					for(k=j+1;k<lines.length;k++){
						//	List system position
						if(lines[k].startsWith(`\tpos `)){
							systems[systemCount].push([`position`,lines[k].replace(`	pos `,``).split(` `)]);
						};
						//	List system government
						if(lines[k].startsWith(`\tgovernment "`)){
							systems[systemCount].push([`government`,lines[k].slice(13,-1)]);
						}else if(lines[k].startsWith(`\tgovernment `)){
							systems[systemCount].push([`government`,lines[k].slice(12)]);
						};
						//	List system attributes
						if(lines[k].startsWith(`\tattributes `)){
							attributes=lines[k].slice(13,-1).split(`" "`);
						};
						//	List system links
						if(lines[k].startsWith(`\tlink `)){
							links.push(lines[k].slice(6));
						};
						//	List system objects
						if(lines[k].startsWith(`\tobject `)){
							objects.push(lines[k].slice(8));
						};
						if(lines[k].startsWith(`\t\tobject `)){
							objects.push(lines[k].slice(9));
						};
						//	End the loop prematurely
						if(lines[k].startsWith(`\t`)&&!lines[k+1].startsWith(`\t`)){
							break;
						};
					};
					systems[systemCount].push([`attributes`,attributes]);
					systems[systemCount].push([`links`,links]);
					systems[systemCount].push([`objects`,objects]);
					for(k=0;k<objects.length;k++){
						globalObjects.push([objects[k],systems[systemCount][1][1][0],systems[systemCount][1][1][1]]);
					};
					systemCount++;
				};
				//	Governments
				if(lines[j].startsWith(`government "`)){
					governments.push([lines[j].slice(12,-1)]);
					for(h=j+1;h<lines.length;h++){
						if(lines[h].startsWith(`\tcolor `)){
							governments[governmentCount].push([`color`,lines[h].replace(`	color `,``).split(` `)]);
						};
						if(lines[h].startsWith(`government `)){
							break;
						};
					};
					governmentCount++;
				};
			};
			if(systems.length>0){
				console.log(systems);
				console.log(governments);
				console.log(globalObjects);
			};
		};
	};
	setTimeout(drawMap,1000);
};
//	Map drawing
function drawMap(){
	canvasContext.restore();
	canvasContext.save();
	canvasContext.drawImage(img,400,100);
	//	Links
	for(i=0;i<systems.length;i++){
		for(j=0;j<systems[i][4][1].length;j++){
			//	Find system link endpoint
			var linkTarget=``;
			for(k=0;k<systems.length;k++){
				if(systems[k][0][1]==systems[i][4][1][j]){
					linkTarget=k;
				};
			};
			drawLine(canvasContext,2150+ +systems[i][1][1][0],1350+ +systems[i][1][1][1],2150+ +systems[linkTarget][1][1][0],1350+ +systems[linkTarget][1][1][1],[],1,`rgb(102,102,102)`);
		};
	};
	//	Systems
	//		Clip regions for layering
	canvasContext.beginPath();
	for(i=0;i<systems.length;i++){
		canvasContext.moveTo(2150+ +systems[i][1][1][0],1350+ +systems[i][1][1][1]);
		canvasContext.arc(2150+ +systems[i][1][1][0],1350+ +systems[i][1][1][1],16,0,2*Math.PI);
	};
	canvasContext.clip();
	canvasContext.drawImage(img,400,100);
	//		Draw systems
	for(i=0;i<systems.length;i++){
		//	Find government color
		var governmentTarget=``;
		for(j=0;j<governments.length;j++){
			if(governments[j][0]==systems[i][2][1]){
				governmentTarget=j;
			};
		};
		//	Visible blips
		if(systems[i][5][1].length>0){
			drawArc(canvasContext,2150+ +systems[i][1][1][0],1350+ +systems[i][1][1][1],9,0,0,2*Math.PI,`rgb(`+governments[governmentTarget][1][1][0]*255+`,`+governments[governmentTarget][1][1][1]*255+`,`+governments[governmentTarget][1][1][2]*255+`)`);
		}else{
			drawArc(canvasContext,2150+ +systems[i][1][1][0],1350+ +systems[i][1][1][1],9,0,0,2*Math.PI,`rgb(102,102,102)`);
		};
	};
	canvasContext.restore();
	//	Wormholes
	//		Draw wormholes
	for(i=0;i<globalObjects.length;i++){
		for(j=i+1;j<globalObjects.length;j++){
			if(globalObjects[i][0]==globalObjects[j][0]){
				drawLine(canvasContext,2150+ +globalObjects[i][1],1350+ +globalObjects[i][2],2150+ +globalObjects[j][1],1350+ +globalObjects[j][2],[],1,`rgb(128,51,230)`);
				break;
			};
		};
	};
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