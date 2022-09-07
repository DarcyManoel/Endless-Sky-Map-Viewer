function drawMap(){
	console.time(`Execution`);
	headsUp.addEventListener(`mousedown`,onMouseDown);
	headsUp.addEventListener(`mousemove`,onMouseMove);
	canvasContext.restore();
	canvasContext.save();
	canvasContext.clearRect(0,0,100000,100000);
	canvasContext.drawImage(galaxy,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1]);
	document.getElementById(`galaxyDisplay`).innerHTML=elements[2][galaxySelected][0];
	if(elements[0].length){
		document.getElementById(`switchScale`).classList.remove(`hidden`);
	}
	//	Links
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[0][i1][3].length;i2++){
			for(i3=0;i3<elements[0].length;i3++){
				if(elements[0][i1][3][i2]==elements[0][i3][0]){
					if(style==`original`){
						drawLink(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/2)-galaxyPosition[0],elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/2)-galaxyPosition[1]);
					}
					else if(style==`modern`){
						for(i4=0;i4<elements[1].length;i4++){
							if(elements[0][i1][2]==elements[1][i4][0]){
								if(elements[0][i1][4].length>0||systemAllocation==`claimed`){
									drawLinkColour(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/1.8)-galaxyPosition[0],elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/1.8)-galaxyPosition[1],elements[1][i4][1]);
								}
								else{
									drawLink(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/1.8)-galaxyPosition[0],elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/1.8)-galaxyPosition[1]);
								}
								break
							}
						}
					}
				}
			}
		}
	}
	//	Systems
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[1].length;i2++){
			if(elements[0][i1][2]==elements[1][i2][0]){
				if(style==`original`){
					if(elements[0][i1][4].length>0||systemAllocation==`claimed`){
						drawSystemColour(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],9,elements[1][i2][1]);
					}
					else{
						drawSystem(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],9);
					}
				}else if(style==`modern`){
					if(elements[0][i1][4].length>0||systemAllocation==`claimed`){
						drawSystemColour(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],1,elements[1][i2][1]);
					}
					else{
						drawSystem(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],1);
					}
				}
				break
			}
		}
	}
	//	Wormholes
	var wormholes=[];
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[0][i1][4].length;i2++){
			wormholes.push([elements[0][i1][4][i2],elements[0][i1][1][0],elements[0][i1][1][1]]);
		}
	}
	for(i1=0;i1<wormholes.length;i1++){
		for(i2=i1+1;i2<wormholes.length;i2++){
			if(wormholes[i1][0]==wormholes[i2][0]){
				drawWormhole(wormholes[i1][1]-galaxyPosition[0],wormholes[i1][2]-galaxyPosition[1],wormholes[i2][1]-((wormholes[i2][1]-wormholes[i1][1])/2)-galaxyPosition[0],wormholes[i2][2]-((wormholes[i2][2]-wormholes[i1][2])/2)-galaxyPosition[1]);
				drawWormhole(wormholes[i2][1]-galaxyPosition[0],wormholes[i2][2]-galaxyPosition[1],wormholes[i1][1]-((wormholes[i1][1]-wormholes[i2][1])/2)-galaxyPosition[0],wormholes[i1][2]-((wormholes[i1][2]-wormholes[i2][2])/2)-galaxyPosition[1]);
				break
			}
		}
	}
	//	User Interface
	HUDContext.clearRect(0,0,100000,100000);
	HUDContext.drawImage(galaxies,canvas.width*scale*2.52,0,galaxies.width*1.4*scale,galaxies.height*1.4*scale);
	HUDContext.drawImage(system,0,0,system.width*1.4*scale,system.height*1.4*scale);
	document.getElementById(`systemDisplay`).innerHTML=`- system -`;
	document.getElementById(`systemDisplay`).style.color=`rgb(102,102,102)`;
	document.getElementById(`governmentDisplay`).innerHTML=`- government -`;
	document.getElementById(`governmentDisplay`).style.color=`rgb(102,102,102)`;
	HUDContext.drawImage(trade,0,planet.height*1.299*scale*accessiblePlanets+system.height*1.4*scale,trade.width*1.4*scale,trade.height*1.4*scale);
	document.getElementById(`tradeContainer`).innerHTML=``;
	document.getElementById(`tradeContainer`).innerHTML+=`<label onClick="resetSelected()" style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+99+`px;width:100px;">`+tradeAverage[0].join(`<br>`)+`</label>`;
	document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+99+`px;width:30px;">`+tradeAverage[1].join(`<br>`)+`</label>`;
	console.timeEnd(`Execution`);
	console.log(elements);
}
