var coordinates=[];
var governmentColourWormhole=`rgba(128,51,230,1)`;
var governmentsColours=[];
var governmentsUnique=[];
var img=document.getElementById(`galaxy`);
var interactMode=1;
var isDragging;
var links=[];
var mapStyle=1;
var planets=[];
var planetsUnique=[];
var positions=[];
var systemCount=0;
var systemGovernments=[];
var systems=[];
var wormholeNames=[];
var wormholes=[];
var wormholesHoldingSingle=[];
var xCoordinate;
var yCoordinate;
var zoom=3;
//	Establish canvas structure
var canvas=document.getElementById(`canvas`);
canvas.height=screen.height;
canvas.width=screen.width;
var canvasContext=canvas.getContext(`2d`);
var interactable=document.getElementById(`interactable`);
interactable.height=screen.height;
interactable.width=screen.width;
var interactableContext=interactable.getContext(`2d`);
//	Draw canvas on page load
function initialize(){
	canvasContext.scale(1/zoom,1/zoom);
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
//	Initial file upload
function chosenFilesInitial(){
	document.getElementById(`loadFilesInitial`).innerHTML=`Load Map`;
	document.getElementById(`loadFilesInitial`).removeAttribute(`for`);
};
//	Additional file upload
function chosenFiles(){
	document.getElementById(`loadFilesInitial`).innerHTML=`Load Map`;
	document.getElementById(`loadFilesInitial`).removeAttribute(`for`);
	document.getElementById('loadFilesInitial').classList.remove('hidden');
	document.getElementById('canvas').classList.add('blurred');
	document.getElementById('loadFiles').classList.add('greyOut');
	document.getElementById('loadFiles').classList.remove('highlight');
};
//	Parses files to generate map display
function loadFiles(that){
	interactable.addEventListener(`mousedown`,onMouseDown);
	interactable.addEventListener(`mousemove`,onMouseMove);
	document.body.addEventListener(`mouseup`,onMouseUp);
	var files=event.target.files;
	for(i=0;i<files.length;i++){
		//	Governments
		var governmentsReader=new FileReader();
		governmentsReader.readAsText(files[i]);
		governmentsReader.onload=function(e){
			var output=e.target.result;
			var lines=output.split(`\n`);
			var governmentsSeperated=output.split(/gover/).filter((government)=>government.includes(`	color`)).join(``).split(/\n/);
			var governmentsUniqueHolding=governmentsSeperated.filter(/./.test,/nment/).join(`|`).replace(/nment /g,``).replace(/"/g,``).split(`|`);
			for(j=0;j<governmentsUniqueHolding.length;j++){
				if(governmentsUniqueHolding[j].indexOf(` `)>=0){
					governmentsUniqueHolding[j]=`"`+governmentsUniqueHolding[j]+`"`;
				};
			};
			if(governmentsUniqueHolding[0].length>0){
				governmentsUnique.push(...governmentsUniqueHolding);
			};
			var coloursSpread=governmentsSeperated.filter(/./.test,/^	color/).join(`|`).replace(/	color /g,``).split(`|`).join(` `).split(` `);
			coloursSpread.unshift(``);
			for(j=0;j<coloursSpread.length;j++){
				coloursSpread[j]=Math.round(coloursSpread[j]*255);
			};
			var governmentsColoursHolding=[];
			for(j=0;j<((coloursSpread.length-1)/3);j++){
				governmentsColoursHolding[j]=`rgb(`+coloursSpread[(j+1)*3-2]+`,`+coloursSpread[(j+1)*3-1]+`,`+coloursSpread[(j+1)*3]+`)`;
			};
			if(governmentsUniqueHolding[0].length>1){
				governmentsColours.push(...governmentsColoursHolding);
			};
		};
		// Systems
		var systemsReader=new FileReader();
		systemsReader.readAsText(files[i]);
		systemsReader.onload=function(e){
			var output=e.target.result;
			var lines=output.split(`\n`);
			var systemsHolding=lines.filter(/./.test,/^system/).join(`|`).replace(/system /g,``).split(`|`);
			var systemGovernmentsHolding=lines.join(`|`).split(`sys`).filter(/./.test,/tem /).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	government/).join(`|`).replace(/	government /g,``).split(`|`);
			var positionsHolding=lines.join(`|`).split(`sys`).filter(/./.test,/tem/).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	pos/).join(`|`).replace(/	pos /g,``).split(`|`);
			for(j=0;j<positionsHolding.length;j++){
				positionsHolding[j]=positionsHolding[j].split(` `);
			};
			var linksHolding=`\n`+output;
			var linksHolding=linksHolding.split(`\nsystem`);
			linksHolding.shift();
			for(j=0;j<linksHolding.length;j++){
				linksHolding[j]=linksHolding[j].split(`\n`).filter(/./.test,/^	link /).join(`|`).replace(/	link /g,``).split(`|`).filter(Boolean);
			};
			var planetsHolding=`\n`+output;
			var planetsHolding=planetsHolding.split(`\nsystem`);
			planetsHolding.shift();
			for(j=0;j<planetsHolding.length;j++){
				planetsHolding[j]=planetsHolding[j].split(`\n`).filter(/./.test,/^	object /).join(`|`).replace(/	object /g,``).split(`|`).filter(Boolean);
			};
			if(positionsHolding.length<systemsHolding.length){
				systemsHolding.splice(systemsHolding.length-(systemsHolding.length-positionsHolding.length),systemsHolding.length-positionsHolding.length);
			};
			if(positionsHolding.length<systemGovernmentsHolding.length){
				systemGovernmentsHolding.splice(systemGovernmentsHolding.length-(systemGovernmentsHolding.length-positionsHolding.length),systemGovernmentsHolding.length-positionsHolding.length);
			};
			if(positionsHolding.length<linksHolding.length){
				linksHolding.splice(linksHolding.length-(linksHolding.length-positionsHolding.length),linksHolding.length-positionsHolding.length);
			};
			if(positionsHolding.length<planetsHolding.length){
				planetsHolding.splice(planetsHolding.length-(planetsHolding.length-positionsHolding.length),planetsHolding.length-positionsHolding.length);
			};
			if(systemsHolding[0].length>0){
				systems.push(...systemsHolding);
				systemGovernments.push(...systemGovernmentsHolding);
				positions.push(...positionsHolding);
				links.push(...linksHolding);
				planets.push(...planetsHolding);
				for(j=0;j<systemsHolding.length;j++){
					console.log(systemsHolding[j]+` `+systemGovernmentsHolding[j]+` `+positionsHolding[j].join(` `));
				};
			};
		};
	};
};
//	Display style toggle
function toggleMapStyle(){
	if(mapStyle<2){
		mapStyle++;
	}else{
		mapStyle=1;
	};
	if(mapStyle==1){
		document.getElementById(`mapStyle`).innerHTML=`Classic Map View`;
		drawClassicMap();
	}else if(mapStyle==2){
		document.getElementById(`mapStyle`).innerHTML=`Modern Map View`;
		drawModernMap();
	};
};
//	Display style decider
function drawMap(){
	document.getElementById(`loadFilesInitial`).setAttribute(
		`onclick`,`
		drawMap()
		document.getElementById('loadFilesInitial').classList.add('hidden')
		document.getElementById('canvas').classList.remove('blurred')
		document.getElementById('loadFiles').classList.remove('greyOut')
		document.getElementById('loadFiles').classList.add('highlight')`
	);
	if(mapStyle==1){
		drawClassicMap();
	}else if(mapStyle==2){
		drawModernMap();
	};
};
//	Classic display
function drawClassicMap(){
    canvasContext.restore();
    canvasContext.save();
	canvasContext.drawImage(img,400,100);
	mapStyle=1;
	document.getElementById(`mapStyle`).innerHTML=`Classic Map View`;
	document.getElementById(`mapStyle`).classList.remove(`hidden`);
	wormholes=[];
	for(i=0;i<links.length;i++){
		for(j=0;j<links[i].length;j++){
			var pos=systems.indexOf(links[i][j]);
			drawLine(canvasContext,2150+ +positions[i][0],1350+ +positions[i][1],2150+ +positions[pos][0],1350+ +positions[pos][1],[],2.7,`rgb(102,102,102)`)
		};
		for(j=0;j<planets[i].length;j++){
			if(planetsUnique.indexOf(planets[i][j])==-1){
				planetsUnique.push(planets[i][j]);
			};
		};
	};
	wormholeNames=[];
	wormholes=[];
	wormholesHoldingSingle=[];
	for(i=0;i<planetsUnique.length;i++){
		var wormholesHolding=[];
		for(j=0;j<links.length;j++){
			for(k=0;k<planets[j].length;k++){
				if(planets[j][k]==planetsUnique[i]){
					wormholesHolding.push(planets[j][k]);
				};
			};
		};
		wormholesHoldingSingle.push(wormholesHolding);
	};
	for(i=0;i<wormholesHoldingSingle.length;i++){
		if(wormholesHoldingSingle[i].length>1){
			wormholeNames.push(wormholesHoldingSingle[i]);
		};
	};
	for(i=0;i<wormholeNames.length;i++){
		var wormholePositionsHolding=[];
		for(j=0;j<planets.length;j++){
			for(k=0;k<planets[j].length;k++){
				if(planets[j][k]===wormholeNames[i][0]){
					wormholePositionsHolding.push(positions[j]);
				};
			};
		};
		wormholes.push(wormholePositionsHolding);
	};
	for(i=0;i<wormholes.length;i++){
		for(j=0;j<wormholes[i].length;j++){
			if((j+1)!==wormholes[i].length){
				drawLine(canvasContext,2150+ +wormholes[i][j][0],1350+ +wormholes[i][j][1],2150+ +wormholes[i][j+1][0],1350+ +wormholes[i][j+1][1],[24,6,6],2.7,governmentColourWormhole);
			}else if(wormholes[i].length>2){
				drawLine(canvasContext,2150+ +wormholes[i][j][0],1350+ +wormholes[i][j][1],2150+ +wormholes[i][0][0],1350+ +wormholes[i][0][1],[24,6,6],2.7,governmentColourWormhole);
			};
		};
	};
	canvasContext.beginPath();
	for(i=0;i<links.length;i++){
		canvasContext.moveTo(2150+ +positions[i][0]+20,1350+ +positions[i][1]);
		canvasContext.arc(2150+ +positions[i][0],1350+ +positions[i][1],18,0,2*Math.PI);
	};
	canvasContext.clip();
	canvasContext.drawImage(img,400,100);
	canvasContext.strokeStyle=`rgba(0,0,0,0)`;
	canvasContext.stroke();
	for(i=0;i<links.length;i++){
		drawArc(2150+ +positions[i][0],1350+ +positions[i][1],9,0,2*Math.PI,governmentsColours[governmentsUnique.indexOf(systemGovernments[i].trim())])
	};
};
//	Modern display
function drawModernMap(){
    canvasContext.restore();
    canvasContext.save();
	canvasContext.drawImage(img,400,100);
	mapStyle=2;
	document.getElementById(`mapStyle`).innerHTML=`Modern Map View`;
	document.getElementById(`mapStyle`).classList.remove(`hidden`);
	for(i=0;i<links.length;i++){
		drawArc(2150+ +positions[i][0],1350+ +positions[i][1],4,0,2*Math.PI,governmentsColours[governmentsUnique.indexOf(systemGovernments[i].trim())]);
		var linkColour=governmentsColours[governmentsUnique.indexOf(systemGovernments[i].trim())];
		for(j=0;j<links[i].length;j++){
			var pos=systems.indexOf(links[i][j]);
			drawLine(canvasContext,2150+ +positions[i][0],1350+ +positions[i][1],(2150+ +positions[pos][0])+((positions[i][0]-positions[pos][0])/2),(1350+ +positions[pos][1])+((positions[i][1]-positions[pos][1])/2),[],1.7,linkColour)
		};
		for(j=0;j<planets[i].length;j++){
			if(planetsUnique.indexOf(planets[i][j])==-1){
				planetsUnique.push(planets[i][j]);
			};
		};
	};
	wormholeNames=[];
	wormholes=[];
	wormholesHoldingSingle=[];
	for(i=0;i<planetsUnique.length;i++){
		var wormholesHolding=[];
		for(j=0;j<links.length;j++){
			for(k=0;k<planets[j].length;k++){
				if(planets[j][k]==planetsUnique[i]){
					wormholesHolding.push(planets[j][k]);
				};
			};
		};
		wormholesHoldingSingle.push(wormholesHolding);
	};
	for(i=0;i<wormholesHoldingSingle.length;i++){
		if(wormholesHoldingSingle[i].length>1){
			wormholeNames.push(wormholesHoldingSingle[i]);
		};
	};
	for(i=0;i<wormholeNames.length;i++){
		var wormholePositionsHolding=[];
		for(j=0;j<planets.length;j++){
			for(k=0;k<planets[j].length;k++){
				if(planets[j][k]===wormholeNames[i][0]){
					wormholePositionsHolding.push(positions[j]);
				};
			};
		};
		wormholes.push(wormholePositionsHolding);
	};
	for(i=0;i<wormholes.length;i++){
		for(j=0;j<wormholes[i].length;j++){
			if((j+1)!==wormholes[i].length){
				drawLine(canvasContext,2150+ +wormholes[i][j][0],1350+ +wormholes[i][j][1],2150+ +wormholes[i][j+1][0],1350+ +wormholes[i][j+1][1],[24,6,6],2.7,governmentColourWormhole)
			}else if(wormholes[i].length>2){
				drawLine(canvasContext,2150+ +wormholes[i][j][0],1350+ +wormholes[i][j][1],2150+ +wormholes[i][0][0],1350+ +wormholes[i][0][1],[24,6,6],2.7,governmentColourWormhole)
			};
		};
	};
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