// Creates global variables to be called to and overwritten
var canvas=document.getElementById(`canvas`);
canvas.height=screen.height;
canvas.width=screen.width;
var context=canvas.getContext(`2d`);
var governmentsColours=[];
var governmentsFinal;
var governmentsUnique=[];
var links;
var positions;
var systems=[];
var zoom=2.5;

// Runs on page load, creates the initial canvas
function initialize(){
	document.getElementById(`spreadsheets`).addEventListener("click",switchToSpreadsheets);
	var img=document.getElementById(`galaxy`);
	context.scale(1/zoom,1/zoom);
	context.drawImage(img,0,0);
};

// Switches page content between map viewer and spreadsheets
function switchToMapViewer(){
	navAnimation();
	document.getElementById(`navMenu`).style.backgroundImage=`url("assets/map viewer.png")`;
	document.getElementById(`mapViewer`).style.color=`#ccc`;
	document.getElementById(`mapViewer`).removeEventListener("click",switchToMapViewer);
	document.getElementById(`spreadsheets`).addEventListener("click",switchToSpreadsheets);
	document.getElementById(`spreadsheets`).style.color=`#aaa`;
};
function switchToSpreadsheets(){
	navAnimation();
	document.getElementById(`navMenu`).style.backgroundImage=`url("assets/spreadsheets.png")`;
	document.getElementById(`mapViewer`).style.color=`#aaa`;
	document.getElementById(`mapViewer`).addEventListener("click",switchToMapViewer);
	document.getElementById(`spreadsheets`).removeEventListener("click",switchToSpreadsheets);
	document.getElementById(`spreadsheets`).style.color=`#ccc`;
};
function navAnimation(){
	document.getElementById(`mapViewerContent`).classList.toggle(`hiddenRight`);
	document.getElementById(`spreadsheetsContent`).classList.toggle(`hiddenLeft`);
	document.getElementById(`mapViewerContent`).classList.toggle(`active`);
	document.getElementById(`spreadsheetsContent`).classList.toggle(`active`);
};

// Slides the sidebar out to cover more of the screen
function slide(){
	document.getElementById(`mapViewerSidebar`).classList.toggle(`side`);
	document.getElementById(`mapViewerSidebar`).classList.toggle(`slide`);
	document.getElementById(`spreadsheetsSidebar`).classList.toggle(`side`);
	document.getElementById(`spreadsheetsSidebar`).classList.toggle(`slide`);
};

// Displays the upload file menu for government files
function toggleMapDialog(){
	document.getElementById(`dialogMapScreen`).classList.toggle(`hidden`);
};

// Displays the upload file menu for governments files
function toggleGovernmentDialog(){
	document.getElementById(`dialogGovernmentScreen`).classList.toggle(`hidden`);
};

// Displays the upload file menu for ships files
function toggleDataDialog(){
	document.getElementById(`dialogDataScreen`).classList.toggle(`hidden`);
};

// Runs on uploading an ships file; parses ship names, and stats
function loadData(that){
	var output=document.getElementById("spreadsheetsMain");
	var files=event.target.files;
	console.log(files);
	for(i=0;i<files.length;i++){

		// Parsing systems to generate the map image
		var systemsReader=new FileReader();
		systemsReader.readAsText(files[i]);
		systemsReader.onload=function(e){
			var output=e.target.result;
			var lines=output.split(`\n`);
			systems=lines.filter(/./.test,/^system/).join(`|`).replace(/system /g,``).split(`|`);
			positions=lines.join(`|`).split(`sys`).filter(/./.test,/^tem/).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	pos/).join(`|`).replace(/	pos /g,``).split(`|`);
			for(i=0;i<positions.length;i++){
				positions[i]=positions[i].split(` `);
			};
			links=output.split(`\nsystem`);
			links.shift();
			for(i=0;i<links.length;i++){
				links[i]=links[i].split(`\n`).filter(/./.test,/^	link /).join(`|`).replace(/	link /g,``).split(`|`).filter(Boolean);
				for(j=0;j<links[i].length;j++){
					var pos=systems.indexOf(links[i][j]);
					var xDifference=(positions[i][0]-positions[pos][0])*0.18;
					var yDifference=(positions[i][1]-positions[pos][1])*0.18;
					context.beginPath();
					context.moveTo((1750+ +positions[i][0])-xDifference,(1250+ +positions[i][1])-yDifference);
					context.lineTo((1750+ +positions[pos][0])+xDifference,(1250+ +positions[pos][1])+yDifference);
					context.lineWidth=1.7;
					context.strokeStyle=`rgb(102,102,102)`;
					context.stroke();
//					console.log(systems[i]+` -> `+systems[pos]);	|Write to console links between systems
				};
			};
			governmentsFinal=lines.join(`|`).split(`sys`).filter(/./.test,/^tem /).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	government/).join(`|`).replace(/	government /g,``).split(`|`);
			var governmentsDifference=(governmentsFinal.length-systems.length);
			if(systems.length<governmentsFinal.length){
				governmentsFinal.splice(governmentsFinal.length-governmentsDifference,governmentsDifference);
			};
			for(i=0;i<systems.length;i++){
				drawSystem(systems[i],governmentsFinal[i],positions[i][0],positions[i][1]);
			};
			console.log(systems);
		};
		
		// Parsing governments to generate the map image
		var governmentsReader=new FileReader();
		governmentsReader.readAsText(files[i]);
		governmentsReader.onload=function(e){
			var output=e.target.result;
			var lines=output.split(`\n`);
			var governmentsSeperated=output.split(/\ngovern/).filter((government)=>government.includes(`	color`)).join(``).split(/\n/);
			var governmentsUniqueHolding=governmentsSeperated.filter(/./.test,/^ment/).join(`|`).replace(/ment /g,``).replace(/"/g,``).split(`|`);
			for(i=0;i<governmentsUniqueHolding.length;i++){
				if(governmentsUniqueHolding[i].indexOf(` `)>=0){
					governmentsUniqueHolding[i]=`"`+governmentsUniqueHolding[i]+`"`;
				};
			};
			if(governmentsUniqueHolding!==""){
				governmentsUnique.push(...governmentsUniqueHolding);
			};
			var coloursSpread=governmentsSeperated.filter(/./.test,/^	color/).join(`|`).replace(/	color /g,``).split(`|`).join(` `).split(` `);
			coloursSpread.unshift(``);
			for(i=0;i<coloursSpread.length;i++){
				coloursSpread[i]=Math.round(coloursSpread[i]*255);
			};
			var governmentsColoursHolding=[];
			for(i=0;i<((coloursSpread.length-1)/3);i++){
				governmentsColoursHolding[i]=`rgb(`+coloursSpread[(i+1)*3-2]+`,`+coloursSpread[(i+1)*3-1]+`,`+coloursSpread[(i+1)*3]+`)`;
			};
			governmentsColours.push(...governmentsColoursHolding);
//			console.log(governmentsUnique);
			for(i=0;i<systems.length;i++){
				colourSystem(systems[i],governmentsFinal[i],positions[i][0],positions[i][1]);
			};
		};

		// Parsing ships to display on spreadsheet
		var shipsReader=new FileReader();
		shipsReader.onload=function(e){
			var shipsSeperated=e.target.result.split(/\nsh/).join(``).split(/\n/);
			var shipsUniqueHolding=shipsSeperated.filter(/./.test,/^ip /).join(`|#`).replace(/#ip |^ip /g,``).replace(/"/g,``).split(`|`);
//			if(shipsUniqueHolding[0]!==``){
//				console.log(shipsUniqueHolding);
//			};
			for(j=0;j<shipsUniqueHolding.length;j++){
				var item=document.createElement("div");
				item.innerHTML=shipsUniqueHolding[j];
				if(shipsUniqueHolding[j]!==``){
					output.appendChild(item);
				};
			};
		};
		shipsReader.readAsText(that.files[i]);

		// Parsing outfits to display on spreadsheet
		var outfitsReader=new FileReader();
		outfitsReader.onload=function(e){
			var outfitsSeperated=e.target.result.split(/\noutf/).join(``).split(/\n/);
			var outfitsUniqueHolding=outfitsSeperated.filter(/./.test,/^it /).join(`|#`).replace(/#it |^it /g,``).replace(/"/g,``).split(`|`);
//			if(outfitsUniqueHolding[0]!==``){
//				console.log(outfitsUniqueHolding);
//			};
			for(j=0;j<outfitsUniqueHolding.length;j++){
				var item=document.createElement("div");
				item.innerHTML=outfitsUniqueHolding[j];
				if(outfitsUniqueHolding[j]!==``){
					output.appendChild(item);
				};
			};
		};
		outfitsReader.readAsText(that.files[i]);
	};
};

// Runs upon uploading a map file; parses system names, links, and system positions
function drawSystems(that){
	var systemsReader=new FileReader();
	systemsReader.onload=function(e){
		var output=e.target.result;
		var lines=output.split(`\n`);
		systems=lines.filter(/./.test,/^system/).join(`|`).replace(/system /g,``).split(`|`);
		positions=lines.join(`|`).split(`sys`).filter(/./.test,/^tem/).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	pos/).join(`|`).replace(/	pos /g,``).split(`|`);
		for(i=0;i<positions.length;i++){
			positions[i]=positions[i].split(` `);
		};
		links=output.split(`\nsystem`);
		links.shift();
		for(i=0;i<links.length;i++){
			links[i]=links[i].split(`\n`).filter(/./.test,/^	link /).join(`|`).replace(/	link /g,``).split(`|`).filter(Boolean);
			for(j=0;j<links[i].length;j++){
				var pos=systems.indexOf(links[i][j]);
				context.beginPath();
				context.moveTo(1750+ +positions[i][0],1250+ +positions[i][1]);
				context.lineTo(1750+ +positions[pos][0],1250+ +positions[pos][1]);
				context.strokeStyle=`rgb(102,102,102)`;
				context.stroke();
//				console.log(systems[i]+` -> `+systems[pos]);	|Write to console links between systems
			};
		};
		governmentsFinal=lines.join(`|`).split(`sys`).filter(/./.test,/^tem/).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	government/).join(`|`).replace(/	government /g,``).split(`|`);
		var governmentsDifference=(governmentsFinal.length-systems.length);
		if(systems.length<governmentsFinal.length){
			governmentsFinal.splice(governmentsFinal.length-governmentsDifference,governmentsDifference);
		};
		for(i=0;i<systems.length;i++){
			drawSystem(systems[i],governmentsFinal[i],positions[i][0],positions[i][1]);
		};
		console.log(`Systems: `+systems.length);
	};
	systemsReader.readAsText(that.files[0]);
};

// Looped function, runs per system listed and draws systems on canvas
function drawSystem(system,faction,xPos,yPos){
	context.beginPath();
	context.arc(1750+ +xPos,1250+ +yPos,9,0,2*Math.PI);
	context.lineWidth=3.8;
	context.strokeStyle=`rgb(88,88,88)`;
	context.stroke();
};

// Runs on uploading a government file; parses government names, and colour values
function loadGovernments(that){
	var governmentsReader=new FileReader();
	governmentsReader.onload=function(e){
		var governmentsSeperated=e.target.result.split(/govern/).filter((government)=>government.includes(`color`)).join(``).split(/\n/);
		var governmentsUniqueHolding=governmentsSeperated.filter(/./.test,/^ment/).join(`|`).replace(/ment /g,``).replace(/"/g,``).split(`|`);
		for(i=0;i<governmentsUniqueHolding.length;i++){
			if(governmentsUniqueHolding[i].indexOf(` `)>=0){
				governmentsUniqueHolding[i]=`"`+governmentsUniqueHolding[i]+`"`;
			};
		};
		if(governmentsUniqueHolding!==``){
			governmentsUnique.push(...governmentsUniqueHolding);
		};
		var coloursSpread=governmentsSeperated.filter(/./.test,/^	color/).join(`|`).replace(/	color /g,``).split(`|`).join(` `).split(` `);
		coloursSpread.unshift(``);
		for(i=0;i<coloursSpread.length;i++){
			coloursSpread[i]=Math.round(coloursSpread[i]*255);
		};
		var governmentsColoursHolding=[];
		for(i=0;i<((coloursSpread.length-1)/3);i++){
			governmentsColoursHolding[i]=`rgb(`+coloursSpread[(i+1)*3-2]+`,`+coloursSpread[(i+1)*3-1]+`,`+coloursSpread[(i+1)*3]+`)`;
		};
		governmentsColours.push(...governmentsColoursHolding);
		console.log(`Governments: `+governmentsUnique.length);
		for(i=0;i<systems.length;i++){
			colourSystem(systems[i],governmentsFinal[i],positions[i][0],positions[i][1]);
		};
	};
	governmentsReader.readAsText(that.files[0]);
};

// Looped function, runs per system listed and draws systems with aligned governments colours on canvas
function colourSystem(system,faction,xPos,yPos){
	var factionHolding=faction.replace(/"/g,``);
	if(factionHolding.indexOf(` `)>=0){
		factionHolding=`"`+factionHolding+`"`;
	};
	var factionIndex=governmentsUnique.indexOf(factionHolding);
	context.beginPath();
	context.arc(1750+ +xPos,1250+ +yPos,9,0,2*Math.PI);
	context.lineWidth=3.8;
	context.strokeStyle=governmentsColours[factionIndex];
	context.stroke();
	console.log(system,factionHolding,factionIndex,xPos,yPos);	//|Write to console general information of all systems drawn onto canvas
};