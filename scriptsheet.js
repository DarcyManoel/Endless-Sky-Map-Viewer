//	Page load
	var canvas=document.getElementById(`canvas`);
	canvas.height=screen.height;
	canvas.width=screen.width;
	var canvasContext=canvas.getContext(`2d`);
	var headsUp=document.getElementById(`headsUp`);
	headsUp.height=screen.height;
	headsUp.width=screen.width;
	var HUDContext=headsUp.getContext(`2d`);
	var galaxy=document.getElementById(`galaxy`);
	var system=document.getElementById(`system`);
	var planet=document.getElementById(`planet`);
	var trade=document.getElementById(`trade`);
function initialize(){
	canvasContext.scale((1/3)/scale,(1/3)/scale);
	HUDContext.scale((1/3)/scale,(1/3)/scale);
	canvasContext.drawImage(galaxy,400,100);
	};
//	Processing
	var elements=[[],[],[],[]];
	var tradeCompendium;
	var tradeAverage;
function loadFiles(that){
	console.time(`Processing`);
	var files=event.target.files;
	for(i1=0;i1<files.length;i1++){
		var systemsReader=new FileReader();
		systemsReader.readAsText(files[i1]);
		systemsReader.onload=function(e){
			var output=e.target.result;
			lines=output.split(`\n`);
			for(i2=0;i2<lines.length;i2++){
				parseLine:{
					//	Systems
					if(lines[i2].startsWith(`system `)){
						//	Override
						for(i3=0;i3<elements[0].length;i3++){
							if(lines[i2].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``)==elements[0][i3][0]){
								for(i4=i2+1;i4<lines.length;i4++){
									if(!lines[i4].startsWith(`\t`))break;
									overrideSystem();
								};
								break parseLine;
							};
						};
						//	Define
						elements[0].push([lines[i2].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``),[],[`Uninhabited`],[],[],[[],[]]]);
						for(i3=i2+1;i3<lines.length;i3++){
							if(!lines[i3].startsWith(`\t`))break;
							defineSystem();
						};
						break parseLine;
					//	Governments
					}else if(lines[i2].startsWith(`government `)){
						//	Override
						for(i3=0;i3<elements[1].length;i3++){
							if(lines[i2].slice(11).replaceAll(`"`,``).replaceAll(`\r`,``)==elements[1][i3][0]){
								for(i4=i2+1;i4<lines.length;i4++){
									if(!lines[i4].startsWith(`\t`))break;
									overrideGovernment();
								};
								break parseLine;
							};
						};
						//	Define
						elements[1].push([lines[i2].slice(11).replaceAll(`"`,``).replaceAll(`\r`,``),[]]);
						for(i3=i2+1;i3<lines.length;i3++){
							if(!lines[i3].startsWith(`\t`))break;
							defineGovernment();
						};
						break parseLine;
					//	Galaxies
					}else if(lines[i2].startsWith(`galaxy `)){
						//	Define
						elements[2].push([lines[i2].slice(7).replaceAll(` `,``).replaceAll(`"`,``).replaceAll(`\r`,``),[]]);
						for(i3=i2+1;i3<lines.length;i3++){
							if(!lines[i3].startsWith(`\t`))break;
							defineGalaxy();
						};
						break parseLine;
					//	Planets
					}else if(lines[i2].startsWith(`planet `)){
						//	Define
						elements[3].push([lines[i2].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``),``,0,0,0]);
						for(i3=i2+1;i3<lines.length;i3++){
							if(!lines[i3].startsWith(`\t`))break;
							definePlanet();
						};
						break parseLine;
					};
				};
			};
		};
	};
	setTimeout(tradeAverages,1000);
	setTimeout(drawMap,1000);
	console.timeEnd(`Processing`);
	};
function overrideSystem(){
	if(lines[i4].startsWith(`\tpos `))elements[0][i3][1]=lines[i4].slice(5).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
	else if(lines[i4].startsWith(`\tgovernment `))elements[0][i3][2]=lines[i4].slice(12).replaceAll(`"`,``).replaceAll(`\r`,``);
	else if(lines[i4].startsWith(`\tadd link `))elements[0][i3][3].push(lines[i4].slice(10).replaceAll(`"`,``).replaceAll(`\r`,``));
	else if(lines[i4].startsWith(`\tadd object `)){
		var segmented=0;
		for(i5=0;i5<elements[0][i3][4].length;i5++){
			if(elements[0][i3][4][i5]==lines[i4].slice(12).replaceAll(`"`,``).replaceAll(`\r`,``))segmented=1;
		};
		if(segmented==0)elements[0][i3][4].push(lines[i4].slice(12).replaceAll(`"`,``).replaceAll(`\r`,``));
	};
	};
function defineSystem(){
	if(lines[i3].startsWith(`\tpos `))elements[0][elements[0].length-1][1]=lines[i3].slice(5).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
	else if(lines[i3].startsWith(`\tgovernment `))elements[0][elements[0].length-1][2]=lines[i3].slice(12).replaceAll(`"`,``).replaceAll(`\r`,``);
	else if(lines[i3].startsWith(`\tlink `))elements[0][elements[0].length-1][3].push(lines[i3].slice(6).replaceAll(`"`,``).replaceAll(`\r`,``));
	else if(lines[i3].startsWith(`\tobject `)){
		var segmented=0;
		for(i4=0;i4<elements[0][elements[0].length-1][4].length;i4++){
			if(elements[0][elements[0].length-1][4][i4]==lines[i3].slice(8).replaceAll(`"`,``).replaceAll(`\r`,``))segmented=1;
		};
		if(segmented==0)elements[0][elements[0].length-1][4].push(lines[i3].slice(8).replaceAll(`"`,``).replaceAll(`\r`,``));
	}else if(lines[i3].startsWith(`\t\tobject `)){
		var segmented=0;
		for(i4=0;i4<elements[0][elements[0].length-1][4].length;i4++){
			if(elements[0][elements[0].length-1][4][i4]==lines[i3].slice(9).replaceAll(`"`,``).replaceAll(`\r`,``))segmented=1;
		};
		if(segmented==0)elements[0][elements[0].length-1][4].push(lines[i3].slice(9).replaceAll(`"`,``).replaceAll(`\r`,``));
	}else if(lines[i3].startsWith(`\ttrade `)){
		elements[0][elements[0].length-1][5][0].push(lines[i3].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``).match(/[a-zA-Z]+/g).join(` `));
		elements[0][elements[0].length-1][5][1].push(parseInt(lines[i3].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``).match(/\d+/g).join(` `)));
	};
	};
function overrideGovernment(){
	if(lines[i3].startsWith(`\tcolor `))elements[1][elements[1].length-1][1]=lines[i3].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
	};
function defineGovernment(){
	if(lines[i3].startsWith(`\tcolor `))elements[1][elements[1].length-1][1]=lines[i3].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
	};
function defineGalaxy(){
	if(lines[i3].startsWith(`\tpos `))elements[2][elements[2].length-1][1]=lines[i3].slice(5).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
	};
function definePlanet(){
	if(lines[i3].startsWith(`\tattributes `))elements[3][elements[3].length-1][1]=lines[i3].slice(12).replaceAll(`\r`,``);
	else if(lines[i3].startsWith(`\tspaceport `))elements[3][elements[3].length-1][2]=true;
	else if(lines[i3].startsWith(`\tshipyard `))elements[3][elements[3].length-1][3]=true;
	else if(lines[i3].startsWith(`\toutfitter `))elements[3][elements[3].length-1][4]=true;
	};
function tradeAverages(){
	tradeCompendium=[];
	tradeAverage=[[],[]];
	for(i1=0;i1<10;i1++){
		tradeCompendium.push([]);
		tradeAverage[0].push([]);
		tradeAverage[1].push([0]);
		if(systemsSelected.length){
			for(i2=0;i2<systemsSelected.length;i2++){
				if(elements[0][systemsSelected[i2]][5][1][i1]){
					tradeCompendium[i1].push(elements[0][systemsSelected[i2]][5][1][i1]);
					tradeAverage[0][i1]=elements[0][systemsSelected[i2]][5][0][i1];
				};
			};
		}else{
			for(i2=0;i2<elements[0].length;i2++){
				if(elements[0][i2][5][1][i1]){
					tradeCompendium[i1].push(elements[0][i2][5][1][i1]);
					tradeAverage[0][i1]=elements[0][i2][5][0][i1];
				};
			};
		};
		for(i2=0;i2<tradeCompendium[i1].length;i2++)tradeAverage[1][i1]=tradeCompendium[i1][i2]+ +tradeAverage[1][i1];
		tradeAverage[1][i1]=Math.round(tradeAverage[1][i1]/tradeCompendium[i1].length);
	};
	};
//	Execution
function drawMap(){
	console.time(`Execution`);
	headsUp.addEventListener(`mousedown`,onMouseDown);
	headsUp.addEventListener(`mousemove`,onMouseMove);
	canvasContext.restore();
	canvasContext.save();
	canvasContext.clearRect(0,0,100000,100000);
	canvasContext.drawImage(galaxy,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1]);
	if(elements[0].length){
		document.getElementById(`switchGalaxy`).classList.remove(`hidden`);
		document.getElementById(`switchScale`).classList.remove(`hidden`);
	};
	for(i1=0;i1<elements[2].length;i1++){
		document.getElementById(`switchGalaxy`).innerHTML+=`
			<label id="`+elements[2][i1][0]+`"class="galaxyViewed idleSelection" onclick="switchGalaxy(this.id);" style="top:`+parseInt(35+(20*i1))+`px;">`+elements[2][i1][0]+`</label>
			`;
	};
	//	Links
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[0][i1][3].length;i2++){
			for(i3=0;i3<elements[0].length;i3++){
				if(elements[0][i1][3][i2]==elements[0][i3][0]){
					if(style==`Original`)drawLine(canvasContext,2150*scale+ +elements[0][i1][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i1][1][1]-galaxyPosition[1],2150*scale+ +elements[0][i3][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i3][1][1]-galaxyPosition[1],[],2,`rgb(102,102,102)`);
					else if(style==`Modern`){
						for(i4=0;i4<elements[1].length;i4++){
							if(elements[0][i1][2]==elements[1][i4][0]){
								if(elements[0][i1][4].length>0||systemAllocation)drawLine(canvasContext,2150*scale+ +elements[0][i1][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i1][1][1]-galaxyPosition[1],2150*scale+ +elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/1.8)-galaxyPosition[0],1350*scale+ +elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/1.8)-galaxyPosition[1],[],2,`rgb(`+elements[1][i4][1][0]*255+`,`+elements[1][i4][1][1]*255+`,`+elements[1][i4][1][2]*255+`)`);
								else drawLine(canvasContext,2150*scale+ +elements[0][i1][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i1][1][1]-galaxyPosition[1],2150*scale+ +elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/1.8)-galaxyPosition[0],1350*scale+ +elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/1.8)-galaxyPosition[1],[],2,`rgb(102,102,102)`);
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
		for(i1=0;i1<elements[0].length;i1++){
			canvasContext.moveTo(2150*scale+ +elements[0][i1][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i1][1][1]-galaxyPosition[1]);
			canvasContext.arc(2150*scale+ +elements[0][i1][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i1][1][1]-galaxyPosition[1],16,0,2*Math.PI);
		};
		canvasContext.clip();
		canvasContext.drawImage(galaxy,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1]);
	};
	canvasContext.restore();
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[1].length;i2++){
			if(elements[0][i1][2]==elements[1][i2][0]){
				if(style==`Original`){
					if(elements[0][i1][4].length>0||systemAllocation)drawArc(canvasContext,2150*scale+ +elements[0][i1][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i1][1][1]-galaxyPosition[1],9,3.6,`rgb(`+elements[1][i2][1][0]*255+`,`+elements[1][i2][1][1]*255+`,`+elements[1][i2][1][2]*255+`)`);
					else drawArc(canvasContext,2150*scale+ +elements[0][i1][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i1][1][1]-galaxyPosition[1],9,3.6,`rgb(102,102,102)`);
				}else if(style==`Modern`){
					if(elements[0][i1][4].length>0||systemAllocation)drawArc(canvasContext,2150*scale+ +elements[0][i1][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i1][1][1]-galaxyPosition[1],1,3.6,`rgb(`+elements[1][i2][1][0]*255+`,`+elements[1][i2][1][1]*255+`,`+elements[1][i2][1][2]*255+`)`);
					else drawArc(canvasContext,2150*scale+ +elements[0][i1][1][0]-galaxyPosition[0],1350*scale+ +elements[0][i1][1][1]-galaxyPosition[1],1,3.6,`rgb(102,102,102)`);
				};
				break;
			};
		};
	};
	//	Wormholes
	var wormholes=[];
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[0][i1][4].length;i2++){
			wormholes.push([elements[0][i1][4][i2],elements[0][i1][1][0],elements[0][i1][1][1]]);
		};
	};
	for(i1=0;i1<wormholes.length;i1++){
		for(i2=i1+1;i2<wormholes.length;i2++){
			if(wormholes[i1][0]==wormholes[i2][0]){
				drawLine(canvasContext,2150*scale+ +wormholes[i1][1]-galaxyPosition[0],1350*scale+ +wormholes[i1][2]-galaxyPosition[1],2150*scale+ +wormholes[i2][1]-galaxyPosition[0],1350*scale+ +wormholes[i2][2]-galaxyPosition[1],[],2,`rgb(128,51,230)`);
				break;
			};
		};
	};
	HUDContext.clearRect(0,0,100000,100000);
	HUDContext.drawImage(system,0,0,556*scale,250*scale);
	document.getElementById(`systemDisplay`).innerHTML=`- system -`;
	document.getElementById(`governmentDisplay`).innerHTML=`- government -`;
	HUDContext.drawImage(trade,0,250*scale,556*scale,639*scale);
	document.getElementById(`tradeContainer`).innerHTML=``;
	document.getElementById(`tradeContainer`).innerHTML+=`<label onClick="resetSelected()" style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+99+`px;width:100px;">`+tradeAverage[0].join(`<br>`)+`</label>`;
	document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+99+`px;width:30px;">`+tradeAverage[1].join(`<br>`)+`</label>`;
	console.timeEnd(`Execution`);
	console.log(elements);
	};
//	Preferences
	var scale=1;
	var style=`Original`;
	var systemAllocation=0;
	var galaxyPosition=[0,0];
function switchStyle(){
	if(style==`Original`)style=`Modern`;
	else if(style==`Modern`)style=`Original`;
	drawMap();
	};
function switchAllocation(){
	if(systemAllocation)systemAllocation=0;
	else systemAllocation=1;
	drawMap();
	};
function switchScale(){
	canvasContext.scale(3*scale,3*scale);
	HUDContext.scale(3*scale,3*scale);
	if(document.getElementById(`scaleActive`).innerHTML==1)scale=1.5;
	else if(document.getElementById(`scaleActive`).innerHTML==1.5)scale=2.5;
	else if(document.getElementById(`scaleActive`).innerHTML==2.5)scale=1;
	document.getElementById(`scaleActive`).innerHTML=scale;
	canvasContext.scale((1/3)/scale,(1/3)/scale);
	HUDContext.scale((1/3)/scale,(1/3)/scale);
	drawMap();
	};
function switchGalaxy(id){
	for(i1=0;i1<elements[2].length;i1++){
		if(id==elements[2][i1][0]){
			galaxyPosition=elements[2][i1][1];
			break;
		};
	};
	drawMap();
	};
//	Mouse events
	var xCoordinate;
	var yCoordinate;
	var oldTarget=0;
	var target=0;
	var distance;
	var systemsSelected=[];
function onMouseMove(event){
	xCoordinate=Math.round((event.offsetX*3-2150)*scale);
	yCoordinate=Math.round((event.offsetY*3-1350)*scale);
	distance=100000;
	for(i1=0;i1<elements[0].length;i1++){
		if(Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)<distance){
			target=i1;
			distance=Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate);
		};
	};
	if(oldTarget!==target&&distance<100){
		for(i1=0;i1<elements[1].length;i1++){
			if(elements[0][target][2]==elements[1][i1][0]){
				oldTarget=target;
				HUDContext.clearRect(0,0,100000,100000);
				HUDContext.drawImage(system,0,0,556*scale,250*scale);
				document.getElementById(`systemDisplay`).innerHTML=elements[0][target][0];
				document.getElementById(`governmentDisplay`).innerHTML=elements[0][target][2];
				document.getElementById(`planetsContainer`).innerHTML=``;
				var accessiblePlanets=0;
				if(elements[0][target][4].length){
					for(i2=0;i2<elements[0][target][4].length;i2++){
						for(i3=0;i3<elements[3].length;i3++){
							if(elements[0][target][4][i2]==elements[3][i3][0]){
								if(!elements[3][i3][1].includes(`requires: inaccessible`)){
									HUDContext.drawImage(planet,0,(250+361*accessiblePlanets)*scale,556*scale,389*scale);
									document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(112,112,112);font-size:13px;height:15px;left:29px;overflow:hidden;position:absolute;top:`+parseInt(101+(120*accessiblePlanets))+`px;width:150px;">`+elements[0][target][4][i2]+`</label>`
									if(elements[3][i3][3])document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(120+(120*accessiblePlanets))+`px;width:150px;">Shipyard</label>`
									else document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(120+(120*accessiblePlanets))+`px;width:150px;">Shipyard</label>`
									if(elements[3][i3][4])document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(138+(120*accessiblePlanets))+`px;width:150px;">Outfitter</label>`
									else document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(138+(120*accessiblePlanets))+`px;width:150px;">Outfitter</label>`
									accessiblePlanets++;
								};
							};
						};
					};
				};
				HUDContext.drawImage(trade,0,(250+361*accessiblePlanets)*scale,556*scale,639*scale);
				document.getElementById(`tradeContainer`).innerHTML=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+parseInt(99+(120*accessiblePlanets))+`px;">`+elements[0][target][5][0].join(`<br>`)+`</label>`
				for(i2=0;i2<tradeAverage[1].length;i2++){
					if(elements[0][target][5][1][i2]>tradeAverage[1][i2])document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(88,166,88);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*i2))+`px;width:30px;">+`+eval(elements[0][target][5][1][i2]-tradeAverage[1][i2])+`</label>`
					else if(elements[0][target][5][1][i2]<tradeAverage[1][i2])document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(166,88,88);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*i2))+`px;width:30px;">`+eval(elements[0][target][5][1][i2]-tradeAverage[1][i2])+`</label>`
					else if(elements[0][target][5][1][i2]==tradeAverage[1][i2])document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*i2))+`px;width:30px;">`+elements[0][target][5][1][i2]+`</label>`
				};
				if(style==`Original`)drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],18,1.5,`rgb(255,255,255)`);
				drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],100,1,`rgb(102,102,102)`);
			};
		};
		drawSelected();
	}else if(distance>=100){
		oldTarget=0;
		HUDContext.clearRect(0,0,100000,100000);
		HUDContext.drawImage(system,0,0,556*scale,250*scale);
		document.getElementById(`systemDisplay`).innerHTML=`- system -`;
		document.getElementById(`governmentDisplay`).innerHTML=`- government -`;
		document.getElementById(`planetsContainer`).innerHTML=``;
		HUDContext.drawImage(trade,0,250*scale,556*scale,639*scale);
		document.getElementById(`tradeContainer`).innerHTML=``;
		document.getElementById(`tradeContainer`).innerHTML+=`<label onClick="resetSelected()" style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+99+`px;width:100px;">`+tradeAverage[0].join(`<br>`)+`</label>`;
		document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+99+`px;width:30px;">`+tradeAverage[1].join(`<br>`)+`</label>`;
		drawSelected();
	};
	};
function onMouseDown(){
	if(distance<100){
		var spliced=0;
		for(i1=0;i1<systemsSelected.length;i1++){
			if(systemsSelected[i1]==target){
				systemsSelected.splice(i1,1);
				spliced=1;
				break;
			};
		};
		if(!spliced)systemsSelected.push(target);
	};
	tradeAverages();
	};
function drawSelected(){
	for(i1=0;i1<systemsSelected.length;i1++){
		if(style==`Original`)drawArc(HUDContext,2150*scale+ +elements[0][systemsSelected[i1]][1][0]-galaxyPosition[0],1350*scale+ +elements[0][systemsSelected[i1]][1][1]-galaxyPosition[1],18,1.5,`rgb(255,255,255)`);
		drawArc(HUDContext,2150*scale+ +elements[0][systemsSelected[i1]][1][0]-galaxyPosition[0],1350*scale+ +elements[0][systemsSelected[i1]][1][1]-galaxyPosition[1],100,1,`rgb(102,102,102)`);
	};
	};
function resetSelected(){
	systemsSelected=[];
	};
//	Canvas operations
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
//	Calculate distance between two unaligned points
Math.dist=function(x1,y1,x2,y2){ 
	if(!x2)x2=0; 
	if(!y2)y2=0;
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	};