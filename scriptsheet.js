//	Initialize
	var canvas=document.getElementById(`canvas`);
	canvas.height=screen.height;
	canvas.width=screen.width;
	var canvasContext=canvas.getContext(`2d`);
	var galaxy=document.getElementById(`galaxy`);
	var system=document.getElementById(`system`);
	var planet=document.getElementById(`planet`);
	var trade=document.getElementById(`trade`);
	var HUDisplay=document.getElementById(`HUDisplay`);
	HUDisplay.height=screen.height;
	HUDisplay.width=screen.width;
	var HUDContext=HUDisplay.getContext(`2d`);
	function initialize(){
		canvasContext.scale((1/3)/scale,(1/3)/scale);
		HUDContext.scale((1/3)/scale,(1/3)/scale);
		canvasContext.drawImage(galaxy,400,100);};
//	Parsing
	var elements=[[],[],[],[]];
	var galaxyPosition=[0,0];
	function loadFiles(that){
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
						elements[0].push([lines[j].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``),[],[`Uninhabited`],[],[],[[],[]]]);
						for(k=j+1;k<lines.length;k++){
							if(lines[k].startsWith(`\tpos `)){
								elements[0][elements[0].length-1][1]=lines[k].slice(5).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
							}else if(lines[k].startsWith(`\tgovernment `)){
								elements[0][elements[0].length-1][2]=lines[k].slice(12).replaceAll(`"`,``).replaceAll(`\r`,``);
							}else if(lines[k].startsWith(`\tlink `)){
								elements[0][elements[0].length-1][3].push(lines[k].slice(6).replaceAll(`"`,``).replaceAll(`\r`,``));
							}else if(lines[k].startsWith(`\tobject `)){
								var segmented=0;
								for(l=0;l<elements[0][elements[0].length-1][4].length;l++){
									if(elements[0][elements[0].length-1][4][l]==lines[k].slice(8).replaceAll(`"`,``).replaceAll(`\r`,``)){
										segmented=1;
									};
								};
								if(segmented==0){
									elements[0][elements[0].length-1][4].push(lines[k].slice(8).replaceAll(`"`,``).replaceAll(`\r`,``));
								};
							}else if(lines[k].startsWith(`\t\tobject `)){
								var segmented=0;
								for(l=0;l<elements[0][elements[0].length-1][4].length;l++){
									if(elements[0][elements[0].length-1][4][l]==lines[k].slice(9).replaceAll(`"`,``).replaceAll(`\r`,``)){
										segmented=1;
									};
								};
								if(segmented==0){
									elements[0][elements[0].length-1][4].push(lines[k].slice(9).replaceAll(`"`,``).replaceAll(`\r`,``));
								};
							}else if(lines[k].startsWith(`\ttrade `)){
								elements[0][elements[0].length-1][5][0].push(lines[k].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``).match(/[a-zA-Z]+/g).join(` `));
								elements[0][elements[0].length-1][5][1].push(parseInt(lines[k].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``).match(/\d+/g).join(` `)));
							}else if(!lines[k].startsWith(`\t`)){
								break;
							};
						};
					}else if(lines[j].startsWith(`government `)){
						elements[1].push([lines[j].slice(11).replaceAll(`"`,``).replaceAll(`\r`,``),[]]);
						for(k=j+1;k<lines.length;k++){
							if(lines[k].startsWith(`\tcolor `)){
								elements[1][elements[1].length-1][1]=lines[k].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
							}else if(!lines[k].startsWith(`\t`)){
								break;
							};
						};
					}else if(lines[j].startsWith(`galaxy `)){
						elements[2].push([lines[j].slice(7).replaceAll(` `,``).replaceAll(`"`,``).replaceAll(`\r`,``),[]]);
						for(k=j+1;k<lines.length;k++){
							if(lines[k].startsWith(`\tpos `)){
								elements[2][elements[2].length-1][1]=lines[k].slice(5).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `);
							}else if(!lines[k].startsWith(`\t`)){
								break;
							};
						};
					}else if(lines[j].startsWith(`planet `)){
						elements[3].push([lines[j].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``),``,0,0,0]);
						for(k=j+1;k<lines.length;k++){
							if(lines[k].startsWith(`\tattributes `)){
								elements[3][elements[3].length-1][1]=lines[k].slice(12).replaceAll(`\r`,``);
							}else if(lines[k].startsWith(`\tspaceport `)){
								elements[3][elements[3].length-1][2]=true;
							}else if(lines[k].startsWith(`\tshipyard `)){
								elements[3][elements[3].length-1][3]=true;
							}else if(lines[k].startsWith(`\toutfitter `)){
								elements[3][elements[3].length-1][4]=true;
							}else if(!lines[k].startsWith(`\t`)){
								break;
							};
						};
					};
				};
			};
		};
		setTimeout(tradeAverages,1000);
		setTimeout(drawMap,1000);};
	var tradeCompendium;
	var tradeAverage;
	function tradeAverages(){
		tradeCompendium=[];
		tradeAverage=[[],[]];
		for(i=0;i<10;i++){
			tradeCompendium.push([]);
			tradeAverage[0].push([]);
			tradeAverage[1].push([0]);
			if(systemsSelected.length){
				for(j=0;j<systemsSelected.length;j++){
					if(elements[0][systemsSelected[j]][5][1][i]){
						tradeCompendium[i].push(elements[0][systemsSelected[j]][5][1][i]);
						tradeAverage[0][i]=elements[0][systemsSelected[j]][5][0][i];
					};
				};
			}else{
				for(j=0;j<elements[0].length;j++){
					if(elements[0][j][5][1][i]){
						tradeCompendium[i].push(elements[0][j][5][1][i]);
						tradeAverage[0][i]=elements[0][j][5][0][i];
					};
				};
			};
			for(j=0;j<tradeCompendium[i].length;j++){
				tradeAverage[1][i]=tradeCompendium[i][j]+ +tradeAverage[1][i];
			};
			tradeAverage[1][i]=Math.round(tradeAverage[1][i]/tradeCompendium[i].length);
		};
		console.log(`systemsSelected`);
		console.log(systemsSelected);
		console.log(`tradeCompendium`);
		console.log(tradeCompendium);
		console.log(`tradeAverage`);
		console.log(tradeAverage);};
//	Mouse Events
	var xCoordinate;
	var yCoordinate;
	var oldTarget=0;
	var target=0;
	var distance;
	function onMouseMove(event){
		xCoordinate=Math.round((event.offsetX*3-2150)*scale);
		yCoordinate=Math.round((event.offsetY*3-1350)*scale);
		distance=100000;
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
					HUDContext.drawImage(system,0,0,556*scale,250*scale);
					document.getElementById(`systemDisplay`).innerHTML=elements[0][target][0];
					document.getElementById(`governmentDisplay`).innerHTML=elements[0][target][2];
					document.getElementById(`planetsContainer`).innerHTML=``;
					var accessiblePlanets=0;
					if(elements[0][target][4].length){
						for(j=0;j<elements[0][target][4].length;j++){
							for(k=0;k<elements[3].length;k++){
								if(elements[0][target][4][j]==elements[3][k][0]){
									if(!elements[3][k][1].includes(`requires: inaccessible`)){
										HUDContext.drawImage(planet,0,250+(361*accessiblePlanets),556*scale,389*scale);
										document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(112,112,112);font-size:13px;height:15px;left:29px;overflow:hidden;position:absolute;top:`+parseInt(101+(120*accessiblePlanets))+`px;width:150px;">`+elements[0][target][4][j]+`</label>`
										if(elements[3][k][3]){
											document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(120+(120*accessiblePlanets))+`px;width:150px;">Shipyard</label>`
										}else{
											document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(120+(120*accessiblePlanets))+`px;width:150px;">Shipyard</label>`
										};
										if(elements[3][k][4]){
											document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(138+(120*accessiblePlanets))+`px;width:150px;">Outfitter</label>`
										}else{
											document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(138+(120*accessiblePlanets))+`px;width:150px;">Outfitter</label>`
										};
										accessiblePlanets++;
									};
								};
							};
						};
					};
					HUDContext.drawImage(trade,0,250+361*accessiblePlanets,556*scale,639*scale);
					document.getElementById(`tradeContainer`).innerHTML=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+parseInt(99+(120*accessiblePlanets))+`px;">`+elements[0][target][5][0].join(`<br>`)+`</label>`
					for(j=0;j<tradeAverage[1].length;j++){
						if(elements[0][target][5][1][j]>tradeAverage[1][j]){
							document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(88,166,88);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*j))+`px;width:30px;">+`+eval(elements[0][target][5][1][j]-tradeAverage[1][j])+`</label>`
						}else if(elements[0][target][5][1][j]<tradeAverage[1][j]){
							document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(166,88,88);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*j))+`px;width:30px;">`+eval(elements[0][target][5][1][j]-tradeAverage[1][j])+`</label>`
						}else if(elements[0][target][5][1][j]==tradeAverage[1][j]){
							document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(120*accessiblePlanets)+(18*j))+`px;width:30px;">`+elements[0][target][5][1][j]+`</label>`
						};
					};
					if(style==`Original`){
						drawArc(HUDContext,2150*scale+ +elements[0][target][1][0]-galaxyPosition[0],1350*scale+ +elements[0][target][1][1]-galaxyPosition[1],18,1.5,`rgb(255,255,255)`);
					};
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
			document.getElementById(`tradeContainer`).innerHTML=``;
			HUDContext.drawImage(trade,0,250,556*scale,639*scale);
			document.getElementById(`tradeContainer`).innerHTML+=`<label onClick="resetSelected()" style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+99+`px;width:100px;">`+tradeAverage[0].join(`<br>`)+`</label>`
			document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+99+`px;width:30px;">`+tradeAverage[1].join(`<br>`)+`</label>`
			drawSelected();
		};};
	var systemsSelected=[];
	function onMouseDown(){
		if(distance<100){
			var spliced=0;
			for(i=0;i<systemsSelected.length;i++){
				if(systemsSelected[i]==target){
					systemsSelected.splice(i,1);
					spliced=1;
					break;
				};
			};
			if(!spliced){
				systemsSelected.push(target);
			};
		};
		tradeAverages();};
	function resetSelected(){
		systemsSelected=[];};
	function drawSelected(){
		for(i=0;i<systemsSelected.length;i++){
			if(style==`Original`){
				drawArc(HUDContext,2150*scale+ +elements[0][systemsSelected[i]][1][0]-galaxyPosition[0],1350*scale+ +elements[0][systemsSelected[i]][1][1]-galaxyPosition[1],18,1.5,`rgb(255,255,255)`);
			};
			drawArc(HUDContext,2150*scale+ +elements[0][systemsSelected[i]][1][0]-galaxyPosition[0],1350*scale+ +elements[0][systemsSelected[i]][1][1]-galaxyPosition[1],100,1,`rgb(102,102,102)`);
		};};
//	Map Drawing
	function drawMap(){
		HUDisplay.addEventListener(`mousedown`,onMouseDown);
		HUDisplay.addEventListener(`mousemove`,onMouseMove);
		console.log(elements);
		canvasContext.restore();
		canvasContext.save();
		canvasContext.clearRect(0,0,100000,100000);
		canvasContext.drawImage(galaxy,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1]);
		if(elements[0].length){
			document.getElementById(`switchGalaxy`).classList.remove(`hidden`);
			document.getElementById(`switchScale`).classList.remove(`hidden`);
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
			canvasContext.drawImage(galaxy,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1]);
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
		HUDContext.clearRect(0,0,100000,100000);
		HUDContext.drawImage(system,0,0,556*scale,250*scale);
		document.getElementById(`systemDisplay`).innerHTML=`- system -`;
		document.getElementById(`governmentDisplay`).innerHTML=`- government -`;
		HUDContext.drawImage(trade,0,250,556*scale,639*scale);
		document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(122,122,122);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+99+`px;">`+tradeAverage[0].join(`<br>`)+`</label>`
		document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(122,122,122);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+99+`px;">`+tradeAverage[1].join(`<br>`)+`</label>`};
//	Map Options
	var scale=1;
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
		drawMap();};
	var style=`Original`;
	function switchStyle(){
		if(style==`Original`){
			style=`Modern`;
		}else if(style==`Modern`){
			style=`Original`;
		}
		drawMap();};
	var systemAllocation=0;
	function switchAllocation(){
		if(systemAllocation){
			systemAllocation=0;
		}else{
			systemAllocation=1;
		};
		drawMap();};
	function switchGalaxy(id){
		for(i=0;i<elements[2].length;i++){
			if(id==elements[2][i][0]){
				galaxyPosition=elements[2][i][1];
				break;
			};
		};
		drawMap();};
//	Pre-defined Canvas Actions
	function drawArc(target,x,y,radius,width,colour){
		target.beginPath();
		target.arc(x,y,radius,0,2*Math.PI);
		target.lineWidth=width;
		target.setLineDash([]);
		target.strokeStyle=colour;
		target.stroke();};
	function drawLine(target,startX,startY,endX,endY,lineDash,width,colour){
		target.beginPath();
		target.moveTo(startX,startY);
		target.lineTo(endX,endY);
		target.setLineDash(lineDash);
		target.lineWidth=width;
		target.strokeStyle=colour;
		target.stroke();};
	function drawText(target,x,y,text,size,colour){
		target.font=size*scale+`px Ubuntu`;
		target.fillStyle=colour;
		target.fillText(text,x,y);};
	Math.dist=function(x1,y1,x2,y2){ 
		if(!x2)x2=0; 
		if(!y2)y2=0;
		return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)); };