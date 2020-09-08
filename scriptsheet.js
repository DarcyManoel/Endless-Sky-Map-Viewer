// Creates global variables to be called to and overwritten
var canvas=document.getElementById(`canvas`);
canvas.height=screen.height;
canvas.width=screen.width;
var context=canvas.getContext(`2d`);
var governmentsColours=[];
var governmentsUnique=[];
var links=[];
var positions=[];
var systemGovernments=[];
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
	document.getElementById(`navMenuMajor`).style.backgroundImage=`url("assets/map viewer.png")`;
	document.getElementById(`mapViewer`).style.color=`#ccc`;
	document.getElementById(`mapViewer`).removeEventListener("click",switchToMapViewer);
	document.getElementById(`spreadsheets`).addEventListener("click",switchToSpreadsheets);
	document.getElementById(`spreadsheets`).style.color=`#aaa`;
};
function switchToSpreadsheets(){
	navAnimation();
	document.getElementById(`navMenuMajor`).style.backgroundImage=`url("assets/spreadsheets.png")`;
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

// Switches spreadsheet content between ships and outfits
function switchToOutfits(){
	document.getElementById(`spreadsheetOutfits`).style.backgroundImage=`url("assets/spreadsheets active.png")`;
	document.getElementById(`spreadsheetShips`).style.backgroundImage=`url("assets/spreadsheets inactive.png")`;
	var outfits=document.getElementsByClassName(`outfit`);
	for(i=0;i<outfits.length;i++){
		outfits[i].style.display=`inline-block`;
	};
	var ships=document.getElementsByClassName(`ship`);
	for(i=0;i<ships.length;i++){
		ships[i].style.display=`none`;
	};
};
function switchToShips(){
	document.getElementById(`spreadsheetOutfits`).style.backgroundImage=`url("assets/spreadsheets inactive.png")`;
	document.getElementById(`spreadsheetShips`).style.backgroundImage=`url("assets/spreadsheets active.png")`;
	var outfits=document.getElementsByClassName(`outfit`);
	for(i=0;i<outfits.length;i++){
		outfits[i].style.display=`none`;
	};
	var ships=document.getElementsByClassName(`ship`);
	for(i=0;i<ships.length;i++){
		ships[i].style.display=`inline-block`;
	};
};

// Slides the sidebar out to cover more of the screen
function slide(){
	document.getElementById(`mapViewerSidebar`).classList.toggle(`side`);
	document.getElementById(`mapViewerSidebar`).classList.toggle(`slide`);
	document.getElementById(`spreadsheetsSidebar`).classList.toggle(`side`);
	document.getElementById(`spreadsheetsSidebar`).classList.toggle(`slide`);
};

// Displays the upload file menu for ships files
function toggleDataDialog(){
	document.getElementById(`dialogDataScreen`).classList.toggle(`hidden`);
};

// Runs on uploading an ships file; parses ship names, and stats
function loadData(that){
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
			for(i=0;i<governmentsUniqueHolding.length;i++){
				if(governmentsUniqueHolding[i].indexOf(` `)>=0){
					governmentsUniqueHolding[i]=`"`+governmentsUniqueHolding[i]+`"`;
				};
			};
			if(governmentsUniqueHolding[0].length>0){
				governmentsUnique.push(...governmentsUniqueHolding);
//				console.log(governmentsUnique);
//				console.log(governmentsUniqueHolding);

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
			var positionsHolding=lines.join(`|`).split(`sys`).filter(/./.test,/tem/).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	pos/).join(`|`).replace(/	pos /g,``).split(`|`);
			for(i=0;i<positionsHolding.length;i++){
				positionsHolding[i]=positionsHolding[i].split(` `);
			};
			var linksHolding=`\n`+output;
			var linksHolding=linksHolding.split(`\nsystem`);
			linksHolding.shift();
			var systemGovernmentsHolding=lines.join(`|`).split(`sys`).filter(/./.test,/tem /).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	government/).join(`|`).replace(/	government /g,``).split(`|`);
			var governmentsDifference=(systemGovernmentsHolding.length-systemsHolding.length);
			if(systemsHolding.length<systemGovernmentsHolding.length){
				systemGovernmentsHolding.splice(systemGovernmentsHolding.length-governmentsDifference,governmentsDifference);
			};
			if(systemsHolding[0].length>0){
				systems.push(...systemsHolding);
				positions.push(...positionsHolding);
				links.push(...linksHolding);
				systemGovernments.push(...systemGovernmentsHolding);
				for(i=0;i<systemsHolding.length;i++){
//					console.log(systemsHolding[i]+` `+systemGovernmentsHolding[i]+` `+positionsHolding[i].join(` `));
				};
			};
		};
		
		// Parsing ships to display on spreadsheet
		var shipsReader=new FileReader();
		shipsReader.onload=function(e){
			var shipsSeperated=e.target.result.split(/\nsh/).join(``).split(/\n/);
			var shipsUniqueHolding=shipsSeperated.filter(/./.test,/^ip /).join(`|#`).replace(/#ip |^ip /g,``).split(`|`);
			if(shipsUniqueHolding[0].length>0){
//					console.log(shipsUniqueHolding);
			};
			for(i=0;i<shipsUniqueHolding.length;i++){
				addShipOrOutfit(shipsUniqueHolding[i],`ship`);
			};
		};
		shipsReader.readAsText(that.files[i]);

		// Parsing outfits to display on spreadsheet
		var outfitsReader=new FileReader();
		outfitsReader.onload=function(e){
			var outfitsSeperated=e.target.result.split(/\noutf/).join(``).split(/\n/);
			var outfitsUniqueHolding=outfitsSeperated.filter(/./.test,/^it /).join(`|#`).replace(/#it |^it /g,``).replace(/"/g,``).split(`|`);
			if(outfitsUniqueHolding[0].length>0){
//					console.log(outfitsUniqueHolding);
			};
			for(i=0;i<outfitsUniqueHolding.length;i++){
				addShipOrOutfit(outfitsUniqueHolding[i],`outfit`);
			};
			var outfits=document.getElementsByClassName(`outfit`);
			for(i=0;i<outfits.length;i++){
				outfits[i].style.display=`none`;
			};
		};
		outfitsReader.readAsText(that.files[i]);

	};
};

function finishedReading(){
	for(i=0;i<positions.length;i++){
		drawSystem(systems[i],systemGovernments[i],positions[i][0],positions[i][1]);
	};
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
//			console.log(systems[i]+` -> `+systems[pos]);	//Write to console links between systems
		};
		links[i]=links[i].join(`|`)
	};
//	console.log(governmentsUnique);
//	console.log(governmentsColours);
//	console.log(systems);
//	console.log(positions);
//	console.log(links);
};

// Looped function, runs per system listed and draws systems on canvas
function drawSystem(system,faction,xPos,yPos){
	var factionIndex=governmentsUnique.indexOf(faction.trim());
	context.beginPath();
	context.arc(1750+ +xPos,1250+ +yPos,9,0,2*Math.PI);
	context.lineWidth=3.8;
	context.strokeStyle=governmentsColours[factionIndex];
	context.stroke();
//	console.log(system,faction,factionIndex,xPos,yPos);	//Write to console general information of all systems drawn onto canvas
};

function addShipOrOutfit(name,type){
	var item=document.createElement(`div`);
	item.innerHTML=name;
	if(name!==``){
		if(type==`ship`){
			item.classList=`ship`;
			document.getElementById(`spreadsheetsMain`).appendChild(item);
//			console.log(name);
		};
		if(type==`outfit`){
			item.classList=`outfit`;
			document.getElementById(`spreadsheetsMain`).appendChild(item);
//			console.log(name);
		};
	};
};