function drawMap(){
	headsUp.addEventListener(`mousedown`,onMouseDown)
	headsUp.addEventListener(`mousemove`,onMouseMove)
	canvasContext.clearRect(0,0,100000,100000)
	canvasContext.drawImage(galaxy,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1])
	document.getElementById(`galaxyDisplay`).innerHTML=elements[2][galaxySelected][0]
	document.getElementById(`zoomContainer`).classList.remove(`hidden`)
	//	Links
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[0][i1][3].length;i2++){
			for(i3=0;i3<elements[0].length;i3++){
				if(elements[0][i1][3][i2]==elements[0][i3][0]){
					if(style==`original`){
						drawLink(elements[0][i1][1][0],elements[0][i1][1][1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/2),elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/2))
					}
					else if(style==`modern`){
						for(i4=0;i4<elements[1].length;i4++){
							if(elements[0][i1][2]==elements[1][i4][0]){
								if(elements[0][i1][4].length>0||systemAllocation==`claimed`){
									drawLinkColour(elements[0][i1][1][0],elements[0][i1][1][1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/1.8),elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/1.8),elements[1][i4][1])
								}
								else{
									drawLink(elements[0][i1][1][0],elements[0][i1][1][1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/1.8),elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/1.8))
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
						drawSystemColour(elements[0][i1][1][0],elements[0][i1][1][1],9,elements[1][i2][1])
					}
					else{
						drawSystem(elements[0][i1][1][0],elements[0][i1][1][1],9)
					}
				}else if(style==`modern`){
					if(elements[0][i1][4].length>0||systemAllocation==`claimed`){
						drawSystemColour(elements[0][i1][1][0],elements[0][i1][1][1],1,elements[1][i2][1])
					}
					else{
						drawSystem(elements[0][i1][1][0],elements[0][i1][1][1],1)
					}
				}
				break
			}
		}
	}
	//	Wormholes
	var wormholes=[]
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[0][i1][4].length;i2++){
			wormholes.push([elements[0][i1][4][i2],elements[0][i1][1][0],elements[0][i1][1][1]])
		}
	}
	for(i1=0;i1<wormholes.length;i1++){
		for(i2=i1+1;i2<wormholes.length;i2++){
			if(wormholes[i1][0]==wormholes[i2][0]){
				drawWormhole(wormholes[i1][1],wormholes[i1][2],wormholes[i2][1]-((wormholes[i2][1]-wormholes[i1][1])/2),wormholes[i2][2]-((wormholes[i2][2]-wormholes[i1][2])/2))
				drawWormhole(wormholes[i2][1],wormholes[i2][2],wormholes[i1][1]-((wormholes[i1][1]-wormholes[i2][1])/2),wormholes[i1][2]-((wormholes[i1][2]-wormholes[i2][2])/2))
				break
			}
		}
	}
	drawHUD()
	console.log(elements)
}
function drawHUD(){
	if(oldTarget!==target&&distance<=100){
		HUDContext.clearRect(0,0,100000,100000)
		HUDContext.drawImage(galaxies,canvas.width*scale*2.52,0,galaxies.width*1.4*scale,galaxies.height*1.4*scale)
		HUDContext.drawImage(system,0,0,system.width*1.4*scale,system.height*1.4*scale)
		document.getElementById(`systemDisplay`).innerHTML=elements[0][target][0]
		document.getElementById(`systemDisplay`).style.color=``
		document.getElementById(`governmentDisplay`).innerHTML=elements[0][target][2]
		document.getElementById(`governmentDisplay`).style.color=``
		document.getElementById(`planetsContainer`).innerHTML=``
		accessiblePlanets=0
		if(elements[0][target][4].length){
			for(i2=0;i2<elements[0][target][4].length;i2++){
				for(i3=0;i3<elements[3].length;i3++){
					if(elements[0][target][4][i2]==elements[3][i3][0]){
						if(!elements[3][i3][1].includes(`requires: inaccessible`)){
							HUDContext.drawImage(planet,0,planet.height*1.299*scale*accessiblePlanets+system.height*1.4*scale,planet.width*1.4*scale,planet.height*1.4*scale)
							document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(112,112,112);font-size:13px;height:15px;left:29px;overflow:hidden;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.4)+`px;width:150px;">`+elements[0][target][4][i2]+`</label>`
							if(elements[3][i3][3]){
								document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.475)+`px;width:150px;">Shipyard</label>`
							}
							else{
								document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.475)+`px;width:150px;">Shipyard</label>`
							}
							if(elements[3][i3][4]){
								document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.55)+`px;width:150px;">Outfitter</label>`
							}
							else{
								document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.55)+`px;width:150px;">Outfitter</label>`
							}
							accessiblePlanets++
						}
					}
				}
			}
		}
		HUDContext.drawImage(trade,0,planet.height*1.299*scale*accessiblePlanets+system.height*1.4*scale,trade.width*1.4*scale,trade.height*1.4*scale)
		document.getElementById(`tradeContainer`).innerHTML=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+parseInt(99+(121*accessiblePlanets))+`px;">`+elements[0][target][5][0].join(`<br>`)+`</label>`
		if(systemSelected){
			for(i2=0;i2<elements[0][target][5][0].length;i2++){
				if(elements[0][target][5][1][i2]>elements[0][systemSelected][5][1][i2]){
					document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(88,166,88);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(121*accessiblePlanets)+(18*i2))+`px;width:30px;">+`+eval(elements[0][target][5][1][i2]-elements[0][systemSelected][5][1][i2])+`</label>`
				}
				else if(elements[0][target][5][1][i2]<elements[0][systemSelected][5][1][i2]){
					document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(166,88,88);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(121*accessiblePlanets)+(18*i2))+`px;width:30px;">`+eval(elements[0][target][5][1][i2]-elements[0][systemSelected][5][1][i2])+`</label>`
				}
				else if(elements[0][target][5][1][i2]==elements[0][systemSelected][5][1][i2]){
					document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(121*accessiblePlanets)+(18*i2))+`px;width:30px;">`+elements[0][target][5][1][i2]+`</label>`
				}
			}
		}
		else{
			document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(121*accessiblePlanets))+`px;width:30px;">`+elements[0][target][5][1].join(`<br>`)+`</label>`
		}
		HUDContext.drawImage(zoom,canvas.width*scale*2.8,canvas.height*scale*1.6,zoom.width*1.4*scale,zoom.height*1.4*scale)
		drawSelect(elements[0][target][1][0]-galaxyPosition[0],elements[0][target][1][1]-galaxyPosition[1])
		if(systemSelected!==target&&systemSelected){
			drawSelect(elements[0][systemSelected][1][0]-galaxyPosition[0],elements[0][systemSelected][1][1]-galaxyPosition[1])
		}
	}
	else{
		HUDContext.clearRect(0,0,100000,100000)
		HUDContext.drawImage(galaxies,canvas.width*scale*2.52,0,galaxies.width*1.4*scale,galaxies.height*1.4*scale)
		HUDContext.drawImage(system,0,0,system.width*1.4*scale,system.height*1.4*scale)
		document.getElementById(`systemDisplay`).innerHTML=`- system -`
		document.getElementById(`systemDisplay`).style.color=`rgb(102,102,102)`
		document.getElementById(`governmentDisplay`).innerHTML=`- government -`
		document.getElementById(`governmentDisplay`).style.color=`rgb(102,102,102)`
		document.getElementById(`planetsContainer`).innerHTML=``
		accessiblePlanets=0
		if(systemSelected){
			if(elements[0][systemSelected][4].length){
				for(i2=0;i2<elements[0][systemSelected][4].length;i2++){
					for(i3=0;i3<elements[3].length;i3++){
						if(elements[0][systemSelected][4][i2]==elements[3][i3][0]){
							if(!elements[3][i3][1].includes(`requires: inaccessible`)){
								HUDContext.drawImage(planet,0,planet.height*1.299*scale*accessiblePlanets+system.height*1.4*scale,planet.width*1.4*scale,planet.height*1.4*scale)
								document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(112,112,112);font-size:13px;height:15px;left:29px;overflow:hidden;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.4)+`px;width:150px;">`+elements[0][systemSelected][4][i2]+`</label>`
								if(elements[3][i3][3]){
									document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.475)+`px;width:150px;">Shipyard</label>`
								}
								else{
									document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.475)+`px;width:150px;">Shipyard</label>`
								}
								if(elements[3][i3][4]){
									document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.55)+`px;width:150px;">Outfitter</label>`
								}
								else{
									document.getElementById(`planetsContainer`).innerHTML+=`<label style="animation:none;color:rgb(70,70,70);font-size:13px;left:38px;position:absolute;top:`+parseInt(planet.height*1.299*scale*accessiblePlanets/3+system.height*1.4*scale*.55)+`px;width:150px;">Outfitter</label>`
								}
								accessiblePlanets++
							}
						}
					}
				}
			}
		}
		HUDContext.drawImage(trade,0,planet.height*1.299*scale*accessiblePlanets+system.height*1.4*scale,trade.width*1.4*scale,trade.height*1.4*scale)
		document.getElementById(`tradeContainer`).innerHTML=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+99+`px;width:100px;">`+elements[0][target][5][0].join(`<br>`)+`</label>`
		if(systemSelected){
			document.getElementById(`tradeContainer`).innerHTML=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:10px;line-height:140%;position:absolute;top:`+parseInt(99+(121*accessiblePlanets))+`px;">`+elements[0][systemSelected][5][0].join(`<br>`)+`</label>`
			document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+parseInt(99+(121*accessiblePlanets))+`px;width:30px;">`+elements[0][systemSelected][5][1].join(`<br>`)+`</label>`
		}
		else{
			document.getElementById(`tradeContainer`).innerHTML+=`<label style="animation:none;color:rgb(102,102,102);font-size:13px;left:110px;line-height:140%;position:absolute;text-align:right;top:`+99+`px;width:30px;">-<br>-<br>-<br>-<br>-<br>-<br>-<br>-<br>-<br>-</label>`
		}
		HUDContext.drawImage(zoom,canvas.width*scale*2.8,canvas.height*scale*1.6,zoom.width*1.4*scale,zoom.height*1.4*scale)
		if(systemSelected){
			drawSelect(elements[0][systemSelected][1][0]-galaxyPosition[0],elements[0][systemSelected][1][1]-galaxyPosition[1])
		}
	}
}
