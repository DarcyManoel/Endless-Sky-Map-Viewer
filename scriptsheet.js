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
var governmentCount=0;
var governments=[];
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
				if(lines[j].startsWith(`system `)&&!lines[j].startsWith(`system "`)){
					systems.push([[`system`,lines[j].slice(7)]]);
					var attributes=[];
					var links=[];
					for(h=j+1;h<lines.length;h++){
						if(lines[h].startsWith(`\tpos `)){
							systems[systemCount].push([`position`,lines[h].replace(`	pos `,``).split(` `)]);
						};
						if(lines[h].startsWith(`\tgovernment "`)){
							systems[systemCount].push([`government`,lines[h].slice(13,-1)]);
						}else if(lines[h].startsWith(`\tgovernment `)){
							systems[systemCount].push([`government`,lines[h].slice(12)]);
						};
						if(lines[h].startsWith(`\tattributes `)){
							attributes=lines[h].slice(13,-1).split(`" "`);
						};
						if(lines[h].startsWith(`\tlink `)){
							links.push(lines[h].slice(6));
						};
						if(lines[h].startsWith(`\t\t`)){
							break;
						};
					};
					systems[systemCount].push([`attributes`,attributes]);
					systems[systemCount].push([`links`,links]);
					systemCount++;
				}else if(lines[j].startsWith(`system "`)){
					systems.push([[`system`,lines[j].slice(7)]]);
					var attributes=[];
					var links=[];
					for(h=j+1;h<lines.length;h++){
						if(lines[h].startsWith(`\tpos `)){
							systems[systemCount].push([`position`,lines[h].replace(`	pos `,``).split(` `)]);
						};
						if(lines[h].startsWith(`\tgovernment "`)){
							systems[systemCount].push([`government`,lines[h].slice(13,-1)]);
						}else if(lines[h].startsWith(`\tgovernment `)){
							systems[systemCount].push([`government`,lines[h].slice(12)]);
						};
						if(lines[h].startsWith(`\tattributes `)){
							attributes=lines[h].slice(12).split(`" "`);
						};
						if(lines[h].startsWith(`\tlink `)){
							links.push(lines[h].slice(6));
						};
						if(lines[h].startsWith(`\t\t`)){
							break;
						};
					};
					systems[systemCount].push([`attributes`,attributes]);
					systems[systemCount].push([`links`,links]);
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
	//	Secondary elements
	for(i=0;i<systems.length;i++){
		//	Links
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
	canvasContext.beginPath();
	for(i=0;i<systems.length;i++){
		canvasContext.moveTo(2150+ +systems[i][1][1][0],1350+ +systems[i][1][1][1]);
		canvasContext.arc(2150+ +systems[i][1][1][0],1350+ +systems[i][1][1][1],18,0,2*Math.PI);
	};
	canvasContext.clip();
	canvasContext.drawImage(img,400,100);
	for(i=0;i<systems.length;i++){
		//	Find government color
		var governmentTarget=``;
		for(j=0;j<governments.length;j++){
			if(governments[j][0]==systems[i][2][1]){
				governmentTarget=j;
			};
		};
		//	Visible blips
		drawArc(canvasContext,2150+ +systems[i][1][1][0],1350+ +systems[i][1][1][1],9,0,0,2*Math.PI,`rgb(`+governments[governmentTarget][1][1][0]*255+`,`+governments[governmentTarget][1][1][1]*255+`,`+governments[governmentTarget][1][1][2]*255+`)`);
		console.log(`drawn`);
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