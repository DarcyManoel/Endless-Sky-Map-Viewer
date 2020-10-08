// Creates global variables to be called to and overwritten
var canvas=document.getElementById(`canvas`);
canvas.height=screen.height;
canvas.width=screen.width;
var context=canvas.getContext(`2d`);
var governmentsColours=[];
var governmentsUnique=[];
var img=document.getElementById(`galaxy`);
var links=[];
var mapView=1;
var positions=[];
var systemGovernments=[];
var systems=[];
var zoom=3;

// Runs on page load, creates the initial canvas
function initialize(){
	context.scale(1/zoom,1/zoom);
	context.drawImage(img,800,100);
};

// Slides the sidebar out to cover more of the screen
function slide(){
	document.getElementById(`mapViewerSidebar`).classList.toggle(`side`);
	document.getElementById(`mapViewerSidebar`).classList.toggle(`slide`);
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
			for(i=0;i<linksHolding.length;i++){
				linksHolding[i]=linksHolding[i].split(`\n`).filter(/./.test,/^	link /).join(`|`).replace(/	link /g,``).split(`|`).filter(Boolean);
			};
			var systemGovernmentsHolding=lines.join(`|`).split(`sys`).filter(/./.test,/tem /).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	government/).join(`|`).replace(/	government /g,``).split(`|`);
			if(positionsHolding.length<systemsHolding.length){
				systemsHolding.splice(systemsHolding.length-(systemsHolding.length-positionsHolding.length),systemsHolding.length-positionsHolding.length);
			};
			if(positionsHolding.length<linksHolding.length){
				linksHolding.splice(linksHolding.length-(linksHolding.length-positionsHolding.length),linksHolding.length-positionsHolding.length);
			};
			if(systemsHolding.length<systemGovernmentsHolding.length){
				systemGovernmentsHolding.splice(systemGovernmentsHolding.length-(systemGovernmentsHolding.length-systemsHolding.length),systemGovernmentsHolding.length-systemsHolding.length);
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
	};
};

function toggleMapView(){
	if(mapView<2){
		mapView++;
	}else{
		mapView=1;
	};
	if(mapView==1){
		document.getElementById(`mapView`).innerHTML=`Classic Map View`;
		context.drawImage(img,800,100);
		drawClassicMap();
		document.getElementById(`confirm`).setAttribute(`onClick`,`toggleDataDialog(),drawClassicMap()`);
	}else if(mapView==2){
		document.getElementById(`mapView`).innerHTML=`Modern Map View`;
		context.drawImage(img,800,100);
		drawModernMap();
		document.getElementById(`confirm`).setAttribute(`onClick`,`toggleDataDialog(),drawModernMap()`);
	};
};

function drawClassicMap(){
	context.drawImage(img,800,100);
	mapView=1;
	document.getElementById(`mapView`).innerHTML=`Classic Map View`;
	document.getElementById(`mapView`).classList.remove(`hidden`);
//	console.log(`systems `+systems.length);
//	console.log(`positions `+positions.length);
//	console.log(`links `+links.length);
	for(i=0;i<links.length;i++){
		context.beginPath();
		context.arc(2550+ +positions[i][0],1350+ +positions[i][1],9,0,2*Math.PI);
		context.lineWidth=3.6;
		context.strokeStyle=governmentsColours[governmentsUnique.indexOf(systemGovernments[i].trim())];
		context.stroke();
		for(j=0;j<links[i].length;j++){
			var pos=systems.indexOf(links[i][j]);
			var xDifference=(positions[i][0]-positions[pos][0])*0.18;
			var yDifference=(positions[i][1]-positions[pos][1])*0.18;
			context.beginPath();
			context.moveTo((2550+ +positions[i][0])-xDifference,(1350+ +positions[i][1])-yDifference);
			context.lineTo((2550+ +positions[pos][0])+((positions[i][0]-positions[pos][0])/2),(1350+ +positions[pos][1])+((positions[i][1]-positions[pos][1])/2));
			context.lineWidth=2.7;
			context.strokeStyle=`rgb(102,102,102)`;
			context.stroke();
//			console.log(systems[i]+` -> `+systems[pos]);	//Write to console links between systems
		};
	};
};

function drawModernMap(){
	context.drawImage(img,800,100);
	mapView=2;
	document.getElementById(`mapView`).innerHTML=`Modern Map View`;
	document.getElementById(`mapView`).classList.remove(`hidden`);
//	console.log(`systems `+systems.length);
//	console.log(`positions `+positions.length);
//	console.log(`links `+links.length);
	for(i=0;i<links.length;i++){
		var factionIndex=governmentsUnique.indexOf(systemGovernments[i].trim());
		context.beginPath();
		context.arc(2550+ +positions[i][0],1350+ +positions[i][1],2,0,2*Math.PI);
		context.lineWidth=3.6;
		context.strokeStyle=governmentsColours[factionIndex];
		context.stroke();
		var linkColour=governmentsColours[governmentsUnique.indexOf(systemGovernments[i].trim())];
		for(j=0;j<links[i].length;j++){
			var pos=systems.indexOf(links[i][j]);
			context.beginPath();
			context.moveTo(2550+ +positions[i][0],1350+ +positions[i][1]);
			context.lineTo((2550+ +positions[pos][0])+((positions[i][0]-positions[pos][0])/2),(1350+ +positions[pos][1])+((positions[i][1]-positions[pos][1])/2));
			context.lineWidth=1.7;
			context.strokeStyle=linkColour;
			context.stroke();
//			console.log(systems[i]+` -> `+systems[pos]);	//Write to console links between systems
		};
	};
};