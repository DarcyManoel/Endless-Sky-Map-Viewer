function drawMap(){
	headsUp.addEventListener(`mousedown`,mouseDown)
	headsUp.addEventListener(`mousemove`,mouseMove)
	canvasContext.clearRect(0,0,100000,100000)
	canvasContext.drawImage(galaxy,400+(2150*scale-2150)-galaxyPosition[0],100+(1350*scale-1350)-galaxyPosition[1])
	document.getElementById(`galaxyDisplay`).innerHTML=elements[2][galaxySelected][0]
	//	Links
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[0][i1][3].length;i2++){
			for(i3=0;i3<elements[0].length;i3++){
				if(elements[0][i1][3][i2]==elements[0][i3][0]){
					switch(mapStyle){
						case `original`:
							drawLink(elements[0][i1][1][0],elements[0][i1][1][1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/2),elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/2))
							break
						case `modern`:
							for(i4=0;i4<elements[1].length;i4++){
								if(elements[0][i1][2]==elements[1][i4][0]){
									if(elements[0][i1][4].length>0||systemOwnership==`claimed`){
										drawLinkColour(elements[0][i1][1][0],elements[0][i1][1][1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/1.8),elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/1.8),elements[1][i4][1])
									}else{
										drawLink(elements[0][i1][1][0],elements[0][i1][1][1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/1.8),elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/1.8))
									}
									break
								}
							}
							break
					}
				}
			}
		}
	}
	//	Systems
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[1].length;i2++){
			if(elements[0][i1][2]==elements[1][i2][0]){
				switch(mapStyle){
					case `original`:
						if(elements[0][i1][4].length>0||systemOwnership==`claimed`){
							drawSystemColour(elements[0][i1][1][0],elements[0][i1][1][1],9,elements[1][i2][1])
						}else{
							drawSystem(elements[0][i1][1][0],elements[0][i1][1][1],9)
						}
						break
					case `modern`:
						if(elements[0][i1][4].length>0||systemOwnership==`claimed`){
							drawSystemColour(elements[0][i1][1][0],elements[0][i1][1][1],1,elements[1][i2][1])
						}else{
							drawSystem(elements[0][i1][1][0],elements[0][i1][1][1],1)
						}
						break
				}
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
	console.log(elements)
	drawHUD()
}
function drawHUD(){
	HUDContext.clearRect(0,0,100000,100000)
	for(i1=0;i1<systemsSelected.length;i1++){
		drawSelect(elements[0][systemsSelected[i1]][1][0],elements[0][systemsSelected[i1]][1][1])
	}
	if(createSystem==true){
		drawRestricted(xCoordinate,yCoordinate)
		for(i1=0;i1<systemsSelected.length;i1++){
			drawFakeLink(elements[0][systemsSelected[i1]][1][0],elements[0][systemsSelected[i1]][1][1],xCoordinate,yCoordinate)
		}
	}else{
		if(oldTarget!==target&&distance<=100){
			drawRange(elements[0][target][1][0],elements[0][target][1][1])
		}
	}
}
function printOutput(){
	elements[3]=[[],[]]
	document.getElementById(`output`).innerHTML=``
	for(i1=0;i1<elements[0].length;i1++){
		if(elements[0][i1][0].startsWith(`placeholder`)){
			document.getElementById(`output`).innerHTML+=`\nsystem "`+elements[0][i1][0]+`"\n\tpos `+elements[0][i1][1][0]+` `+elements[0][i1][1][1]+`\n\tgovernment "`+elements[0][i1][2]+`"\n\tlink "`+elements[0][i1][3].join(`"\n\tlink "`)+`"`
		}
	}
}
