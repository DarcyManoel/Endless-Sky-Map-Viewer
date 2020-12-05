// Creates global variables to be called to and overwritten
var canvas=document.getElementById(`canvas`);
canvas.height=screen.height;
canvas.width=screen.width;
var context=canvas.getContext(`2d`);
var governmentsColours=[];
var governmentColourWormhole=`rgba(128,51,230,1)`;
var governmentsUnique=[];
var img=document.getElementById(`galaxy`);
var links=[];
var mapStyle=1;
var planets=[];
var planetsUnique=[];
var positions=[];
var systemGovernments=[];
var systems=[];
var wormholeNames=[];
var wormholes=[];
var wormholesHoldingSingle=[];
var zoom=3;

// Runs on page load, creates the initial canvas
function initialize(){
	context.scale(1/zoom,1/zoom);
	context.drawImage(img,400,100);
};

function chosenFiles(){
	document.getElementById(`loadFiles`).innerHTML=`Load Map`;
	document.getElementById(`loadFiles`).removeAttribute(`for`);
};

// Runs on uploading an ships file; parses ship names, and stats
function loadFiles(that){
	var files=event.target.files;
//	console.log(files);
	for(i=0;i<files.length;i++){

		// Parsing governments to generate the map image
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
//				console.log(governmentsUnique);
//				console.log(governmentsUniqueHolding);
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

		// Parsing systems to generate the map image
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
//					console.log(systemsHolding[j]+` `+systemGovernmentsHolding[j]+` `+positionsHolding[j].join(` `));
				};
			};
		};
	};
};

// Toggle function between classic and modern map views, handles canvas rendering for both styles
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

// Decides which style to draw the map in, acts as a passthrough decider function
function drawMap(){
	document.getElementById(`loadFiles`).setAttribute(`onclick`,`drawMap(),document.getElementById('loadFiles').classList.add('hidden'),document.getElementById('canvas').classList.remove('blurred')`);
	if(mapStyle==1){
		drawClassicMap();
	}else if(mapStyle==2){
		drawModernMap();
	};
};

function drawClassicMap(){
    context.restore();
    context.save();
	context.drawImage(img,400,100);
	mapStyle=1;
	document.getElementById(`mapStyle`).innerHTML=`Classic Map View`;
	document.getElementById(`mapStyle`).classList.remove(`hidden`);
	wormholes=[];
	for(i=0;i<links.length;i++){
		for(j=0;j<links[i].length;j++){
			var pos=systems.indexOf(links[i][j]);
			drawLine(2150+ +positions[i][0],1350+ +positions[i][1],2150+ +positions[pos][0],1350+ +positions[pos][1],[],2.7,`rgb(102,102,102)`)
//			console.log(systems[i]+` -> `+systems[pos]);	//Write to console links between systems
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
				drawLine(2150+ +wormholes[i][j][0],1350+ +wormholes[i][j][1],2150+ +wormholes[i][j+1][0],1350+ +wormholes[i][j+1][1],[],2.7,governmentColourWormhole);
			}else if(wormholes[i].length>2){
				drawLine(2150+ +wormholes[i][j][0],1350+ +wormholes[i][j][1],2150+ +wormholes[i][0][0],1350+ +wormholes[i][0][1],[],2.7,governmentColourWormhole);
			};
		};
	};
	context.beginPath();
	for(i=0;i<links.length;i++){
		context.moveTo(2150+ +positions[i][0]+20,1350+ +positions[i][1]);
		context.arc(2150+ +positions[i][0],1350+ +positions[i][1],18,0,2*Math.PI);
	};
	context.clip();
	context.drawImage(img,400,100);
	context.strokeStyle=`rgba(0,0,0,0)`;
	context.stroke();
	for(i=0;i<links.length;i++){
		drawArc(2150+ +positions[i][0],1350+ +positions[i][1],9,0,2*Math.PI,governmentsColours[governmentsUnique.indexOf(systemGovernments[i].trim())])
	};
};

function drawModernMap(){
    context.restore();
    context.save();
	context.drawImage(img,400,100);
	mapStyle=2;
	document.getElementById(`mapStyle`).innerHTML=`Modern Map View`;
	document.getElementById(`mapStyle`).classList.remove(`hidden`);
//	console.log(planets);
	for(i=0;i<links.length;i++){
		drawArc(2150+ +positions[i][0],1350+ +positions[i][1],2,0,2*Math.PI,governmentsColours[governmentsUnique.indexOf(systemGovernments[i].trim())]);
		var linkColour=governmentsColours[governmentsUnique.indexOf(systemGovernments[i].trim())];
		for(j=0;j<links[i].length;j++){
			var pos=systems.indexOf(links[i][j]);
			drawLine(2150+ +positions[i][0],1350+ +positions[i][1],(2150+ +positions[pos][0])+((positions[i][0]-positions[pos][0])/2),(1350+ +positions[pos][1])+((positions[i][1]-positions[pos][1])/2),[],1.7,linkColour)
//			console.log(systems[i]+` -> `+systems[pos]);	//Write to console links between systems
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
				drawLine(2150+ +wormholes[i][j][0],1350+ +wormholes[i][j][1],2150+ +wormholes[i][j+1][0],1350+ +wormholes[i][j+1][1],[24,6,6],2.7,governmentColourWormhole)
			}else{
				drawLine(2150+ +wormholes[i][j][0],1350+ +wormholes[i][j][1],2150+ +wormholes[i][0][0],1350+ +wormholes[i][0][1],[24,6,6],2.7,governmentColourWormhole)
			};
		};
	};
};

// Call-to functions, pre-defined functions that cut down individual processing
function drawArc(x,y,radius,start,end,colour){
		context.beginPath();
		context.arc(x,y,radius,start,end);
		context.lineWidth=3.6;
		context.strokeStyle=colour;
		context.stroke();
};
function drawLine(startX,startY,endX,endY,lineDash,width,colour){
		context.beginPath();
		context.moveTo(startX,startY);
		context.lineTo(endX,endY);
		context.setLineDash(lineDash);
		context.lineWidth=width;
		context.strokeStyle=colour;
		context.stroke();
};