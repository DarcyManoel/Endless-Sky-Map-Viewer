var elements=[[`systems`],[`governments`],[`galaxies`],[`translated systems`],[`wormholes`],[`colors`]]
const canvas=document.getElementById(`canvas`)
	canvas.height=screen.height
	canvas.width=screen.width
const canvasContext=canvas.getContext(`2d`)
const overlay=document.getElementById(`overlay`)
	overlay.height=screen.height
	overlay.width=screen.width
const overlayContext=overlay.getContext(`2d`)
const galaxy=document.getElementById(`background`)
const galaxyCentre=[galaxy.width/2*-1,galaxy.height/2*-1]
var display=`original`
var ownership=`inhabited`

var loaded=0
var block=0
var distance
var galaxyPosition=[112,22]
var galaxySelected=0
var isDragging=0
var oldTarget=0
var rangeCheck=0
var scale=1
var systemsSelected=[]
var target=0
var xCoordinate
var yCoordinate
function initialize(){
	elements=[[],[],[],[],[],[]]
	if(localStorage.getItem(`display`)==`modern`){
		display=localStorage.getItem(`display`)
	}
	if(localStorage.getItem(`ownership`)==`claimed`){
		ownership=localStorage.getItem(`ownership`)
	}
	document.getElementById(`display`).innerHTML=display[0].toUpperCase()+display.slice(1)
	document.getElementById(`ownership`).innerHTML=ownership[0].toUpperCase()+ownership.slice(1)
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	overlayContext.scale((1/3)/scale,(1/3)/scale)
	drawGalaxy()
}
//	Load
function uploadFiles(that){
	document.querySelectorAll('.blocked').forEach((element)=>{
		element.classList.remove('blocked')
	})
	var files=event.target.files
	for(i1=0;i1<files.length;i1++){
		var systemsReader=new FileReader()
		systemsReader.readAsText(files[i1])
		systemsReader.onload=function(e){
			var output=e.target.result
			lines=output.split(`\n`)
			for(i2=0;i2<lines.length;i2++){
				parseLine:{
					//	Systems
					if(lines[i2].startsWith(`system `)){
						//	Override
						for(i3=0;i3<elements[0].length;i3++){
							if(lines[i2].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``)==elements[0][i3][0]){
								for(i4=i2+1;i4<lines.length;i4++){
									if(!lines[i4].startsWith(`\t`)){
										break
									}
									defineSystem(1)
								}
								break parseLine
							}
						}
						//	Define
						elements[0].push([lines[i2].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``),[],[`Uninhabited`],[],[],[100]])
						for(i3=i2+1;i3<lines.length;i3++){
							if(!lines[i3].startsWith(`\t`)){
								break
							}
							defineSystem(0)
						}
						break parseLine
					//	Governments
					}else if(lines[i2].startsWith(`government `)){
						//	Override
						for(i3=0;i3<elements[1].length;i3++){
							if(lines[i2].slice(11).replaceAll(`"`,``).replaceAll(`\r`,``)==elements[1][i3][0]){
								for(i4=i2+1;i4<lines.length;i4++){
									if(!lines[i4].startsWith(`\t`)){
										break
									}
									defineGovernment()
								}
								break parseLine
							}
						}
						//	Define
						elements[1].push([lines[i2].slice(11).replaceAll(`"`,``).replaceAll(`\r`,``),[]])
						for(i3=i2+1;i3<lines.length;i3++){
							if(!lines[i3].startsWith(`\t`)){
								break
							}
							defineGovernment()
						}
						break parseLine
					//	Galaxies
					}else if(lines[i2].startsWith(`galaxy `)){
						//	Define
						elements[2].push([lines[i2].slice(7).replaceAll(` `,``).replaceAll(`"`,``).replaceAll(`\r`,``),[]])
						for(i3=i2+1;i3<lines.length;i3++){
							if(!lines[i3].startsWith(`\t`)){
								break
							}
							defineGalaxy()
						}
						break parseLine
					//	Wormholes
					}else if(lines[i2].startsWith(`wormhole `)){
						//	Define
						elements[4].push([lines[i2].slice(9).replaceAll(`\r`,``),0,[],[]])
						for(i3=i2+1;i3<lines.length;i3++){
							if(!lines[i3].startsWith(`\t`)){
								break
							}
							defineWormhole()
						}
						break parseLine
					//	Colors
					}else if(lines[i2].startsWith(`color `)){
						//	Define
						elements[5].push(lines[i2].slice(7).replaceAll(`\r`,``).split(`" `))
						break parseLine
					}
				}
			}
		}
	}
	setTimeout(drawMap,500)
}
//	Map Manipulation
function cycleDisplay(){
	if(display==`original`){
		display=`modern`
	}else if(display==`modern`){
		display=`original`
	}
	document.getElementById(`display`).innerHTML=display[0].toUpperCase()+display.slice(1)
	localStorage.setItem(`display`,display)
	drawMap()
}
function cycleOwnership(){
	if(ownership==`inhabited`){
		ownership=`claimed`
	}else if(ownership==`claimed`){
		ownership=`inhabited`
	}
	document.getElementById(`ownership`).innerHTML=ownership[0].toUpperCase()+ownership.slice(1)
	localStorage.setItem(`ownership`,ownership)
	drawMap()
}
function cycleGalaxy(){
	galaxySelected++
	if(galaxySelected==elements[2].length){
		galaxySelected=0
	}
	galaxyPosition=elements[2][galaxySelected][1]
	drawMap()
}
//	Interaction
function mouseMove(event){
	xCoordinate=Math.round((event.offsetX*3-canvas.width*1.5)*scale)
	yCoordinate=Math.round((event.offsetY*3-canvas.height*1.5)*scale)
	distance=100000
	for(i1=0;i1<elements[0].length;i1++){
		if(Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)<distance){
			target=i1
			distance=Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)
		}
	}
	drawOverlay()
}
function mouseDown(){
	isDragging=1
	if(distance<=100){
		var spliced=0
		for(i1=0;i1<systemsSelected.length;i1++){
			if(systemsSelected[i1]==target){
				systemsSelected.splice(i1,1)
				spliced=1
				break
			}
		}
		if(!spliced){
			systemsSelected.push(target)
		}
	}
	var canExpand=0
	if(systemsSelected.length){
		for(i1=0;i1<systemsSelected.length;i1++){
			for(i2=0;i2<elements[0][systemsSelected[i1]][3].length;i2++){
				for(i3=0;i3<elements[0].length;i3++){
					if(elements[0][i3][0]==elements[0][systemsSelected[i1]][3][i2]){
						if(!systemsSelected.includes(i3)){
							canExpand=1
						}
					}
				}
			}
		}
	}
	if(systemsSelected.length){
		if(canExpand){
			document.getElementById(`systemSelection`).classList.remove(`activeMode`)
			document.getElementById(`systemSelectionDescriptor`).innerHTML=`Expand selection to all connected systems`
		}else{
			document.getElementById(`systemSelection`).classList.add(`activeMode`)
			document.getElementById(`systemSelectionDescriptor`).innerHTML=`Clear system selection`
		}
	}else{
		document.getElementById(`systemSelection`).classList.remove(`activeMode`)
		document.getElementById(`systemSelectionDescriptor`).innerHTML=`Select all systems`
	}
	drawMap()
}
function mouseUp(){
	isDragging=0
	drawMap()
}
function keyDown(event){
	if(loaded){
		if(!block){
			//	S - Select
			if(event.keyCode==83){
				expandSystemSelection()
			}
			//	J
			if(event.keyCode==74){
				toggleRangeCheck()
			}
			//	-
			if(event.keyCode==189){
				zoomOut()
			}
			//	+
			if(event.keyCode==187){
				zoomIn()
			}
		}
		if(event.keyCode){
			block=1
		}
	}
}
function keyUp(event){
	if(event.keyCode){
		block=0
	}
}
function expandSystemSelection(){
	var expanded=0
	if(systemsSelected.length){
		for(i1=0;i1<systemsSelected.length;i1++){
			for(i2=0;i2<elements[0][systemsSelected[i1]][3].length;i2++){
				for(i3=0;i3<elements[0].length;i3++){
					if(elements[0][i3][0]==elements[0][systemsSelected[i1]][3][i2]){
						if(!systemsSelected.includes(i3)){
							expanded=1
							systemsSelected.push(i3)
						}
					}
				}
			}
		}
	}
	else{
		for(i1=0;i1<elements[0].length;i1++){
			expanded=1
			systemsSelected.push(i1)
		}
	}
	if(systemsSelected.length){
		if(!expanded){
			systemsSelected=[]
			document.getElementById(`systemSelection`).classList.remove(`activeMode`)
			document.getElementById(`systemSelectionDescriptor`).innerHTML=`Select all systems`
		}else{
			document.getElementById(`systemSelection`).classList.add(`activeMode`)
			document.getElementById(`systemSelectionDescriptor`).innerHTML=`Clear system selection`
		}
	}
	drawMap()
}
function toggleRangeCheck(){
	rangeCheck=!rangeCheck
	document.getElementById(`rangeCheck`).classList.toggle(`activeMode`)
	if(rangeCheck){
		document.getElementById(`rangeCheckDescriptor`).innerHTML=`Disable jump targets visualiser`
	}else{
		document.getElementById(`rangeCheckDescriptor`).innerHTML=`Enable jump targets visualiser`
	}
	drawMap()
}
function zoomOut(){
	canvasContext.scale(3*scale,3*scale)
	overlayContext.scale(3*scale,3*scale)
	if(scale==1){
		scale=1.5
	}else if(scale==1.5){
		scale=2.5
	}
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	overlayContext.scale((1/3)/scale,(1/3)/scale)
	drawMap()
}
function zoomIn(){
	canvasContext.scale(3*scale,3*scale)
	overlayContext.scale(3*scale,3*scale)
	if(scale==2.5){
		scale=1.5
	}else if(scale==1.5){
		scale=1
	}
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	overlayContext.scale((1/3)/scale,(1/3)/scale)
	drawMap()
}
//	Parse Data
function defineGalaxy(){
	if(lines[i3].startsWith(`\tpos `)){
		elements[2][elements[2].length-1][1]=lines[i3].slice(5).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `)
	}
}
function defineSystem(override){
	if(override){
		if(lines[i4].startsWith(`\tpos `)){
			elements[0][i3][1]=lines[i4].slice(5).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `)
		}else if(lines[i4].startsWith(`\tgovernment `)){
			elements[0][i3][2]=lines[i4].slice(12).replaceAll(`"`,``).replaceAll(`\r`,``)
		}else if(lines[i4].startsWith(`\tadd link `)){
			elements[0][i3][3].push(lines[i4].slice(10).replaceAll(`"`,``).replaceAll(`\r`,``))
		}else if(lines[i4].startsWith(`\tadd object `)){
			var segmented=0
			for(i5=0;i5<elements[0][i3][4].length;i5++){
				if(elements[0][i3][4][i5]==lines[i4].slice(12).replaceAll(`"`,``).replaceAll(`\r`,``)){
					segmented=1
				}
			}
			if(!segmented){
				elements[0][i3][4].push(lines[i4].slice(12).replaceAll(`"`,``).replaceAll(`\r`,``))
			}
		}else if(lines[i4].startsWith(`\t"jump range" `)){
			elements[0][i3][5]=lines[i4].slice(14).replaceAll(`"`,``).replaceAll(`\r`,``)
		}
	}else{
		if(lines[i3].startsWith(`\tpos `)){
			elements[0][elements[0].length-1][1]=lines[i3].slice(5).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `)
		}else if(lines[i3].startsWith(`\tgovernment `)){
			elements[0][elements[0].length-1][2]=lines[i3].slice(12).replaceAll(`"`,``).replaceAll(`\r`,``)
		}else if(lines[i3].startsWith(`\tlink `)){
			elements[0][elements[0].length-1][3].push(lines[i3].slice(6).replaceAll(`"`,``).replaceAll(`\r`,``))
		}else if(lines[i3].startsWith(`\tobject `)){
			var segmented=0
			for(i4=0;i4<elements[0][elements[0].length-1][4].length;i4++){
				if(elements[0][elements[0].length-1][4][i4]==lines[i3].slice(8).replaceAll(`"`,``).replaceAll(`\r`,``)){
					segmented=1
				}
			}
			if(!segmented){
				elements[0][elements[0].length-1][4].push(lines[i3].slice(8).replaceAll(`"`,``).replaceAll(`\r`,``))
			}
		}else if(lines[i3].startsWith(`\t\tobject `)){
			var segmented=0
			for(i4=0;i4<elements[0][elements[0].length-1][4].length;i4++){
				if(elements[0][elements[0].length-1][4][i4]==lines[i3].slice(9).replaceAll(`"`,``).replaceAll(`\r`,``)){
					segmented=1
				}
			}
			if(!segmented){
				elements[0][elements[0].length-1][4].push(lines[i3].slice(9).replaceAll(`"`,``).replaceAll(`\r`,``))
			}
		}else if(lines[i3].startsWith(`\t"jump range" `)){
			elements[0][elements[0].length-1][5]=lines[i3].slice(14).replaceAll(`"`,``).replaceAll(`\r`,``)
		}
	}
}
function defineWormhole(){
	if(lines[i3].startsWith(`\tmappable`)){
		elements[4][elements[4].length-1][1]=1
	}else if(lines[i3].startsWith(`\tlink `)){
		if(lines[i3].includes(`" `)){
			elements[4][elements[4].length-1][2].push(lines[i3].slice(6).split(`" `))
			elements[4][elements[4].length-1][2][elements[4][elements[4].length-1][2].length-1][0]=elements[4][elements[4].length-1][2][elements[4][elements[4].length-1][2].length-1][0].replaceAll(`"`,``)
			elements[4][elements[4].length-1][2][elements[4][elements[4].length-1][2].length-1][1]=elements[4][elements[4].length-1][2][elements[4][elements[4].length-1][2].length-1][1].replaceAll(`"`,``)
		}else if(lines[i3].includes(` "`)){
			elements[4][elements[4].length-1][2].push(lines[i3].slice(6).split(` "`))
			elements[4][elements[4].length-1][2][elements[4][elements[4].length-1][2].length-1][0]=elements[4][elements[4].length-1][2][elements[4][elements[4].length-1][2].length-1][0].replaceAll(`"`,``)
			elements[4][elements[4].length-1][2][elements[4][elements[4].length-1][2].length-1][1]=elements[4][elements[4].length-1][2][elements[4][elements[4].length-1][2].length-1][1].replaceAll(`"`,``)
		}else{
			elements[4][elements[4].length-1][2].push(lines[i3].slice(6).split(` `))
		}
	}else if(lines[i3].startsWith(`\tcolor `)){
		elements[4][elements[4].length-1][3]=lines[i3].slice(7)
	}
}
function defineGovernment(){
	if(lines[i3].startsWith(`\tcolor `)){
		if(lines[i3].includes(`governments:`)){
			for(i5=0;i5<lines.length;i5++){
				if(lines[i5].startsWith(`color "governments: `+lines[i3].slice(21,-1)+`"`)){
					var sliceLength=22+lines[i3].slice(21,-1).length
					elements[1][elements[1].length-1][1]=lines[i5].slice(sliceLength).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `)
				}
			}
		}
		else{
			elements[1][elements[1].length-1][1]=lines[i3].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `)
		}
	}
}
//	Display Map
function drawMap(){
	loaded=1
	document.getElementById(`galaxy`).innerHTML=elements[2][galaxySelected][0]
	document.getElementById(`systemSelection`).classList.remove(`hidden`)
	document.getElementById(`rangeCheck`).classList.remove(`hidden`)
	document.getElementById(`zoomOut`).classList.remove(`hidden`)
	document.getElementById(`zoomIn`).classList.remove(`hidden`)
	overlay.addEventListener(`mousedown`,mouseDown)
	overlay.addEventListener(`mousemove`,mouseMove)
	overlay.addEventListener(`mouseup`,mouseUp)
	drawGalaxy()
	//	Links
	for(i1=0;i1<elements[0].length;i1++){
		for(i2=0;i2<elements[0][i1][3].length;i2++){
			for(i3=0;i3<elements[0].length;i3++){
				if(elements[0][i1][3][i2]==elements[0][i3][0]){
					switch(display){
						case `original`:
							drawLink(elements[0][i1][1][0],elements[0][i1][1][1],elements[0][i3][1][0]-((elements[0][i3][1][0]-elements[0][i1][1][0])/2),elements[0][i3][1][1]-((elements[0][i3][1][1]-elements[0][i1][1][1])/2))
							break
						case `modern`:
							for(i4=0;i4<elements[1].length;i4++){
								if(elements[0][i1][2]==elements[1][i4][0]){
									if(elements[0][i1][4].length>0||ownership==`claimed`){
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
				switch(display){
					case `original`:
						if(elements[0][i1][4].length>0||ownership==`claimed`){
							drawSystemColour(elements[0][i1][1][0],elements[0][i1][1][1],9,elements[1][i2][1])
						}else{
							drawSystem(elements[0][i1][1][0],elements[0][i1][1][1],9)
						}
						break
					case `modern`:
						if(elements[0][i1][4].length>0||ownership==`claimed`){
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
	var wormholeStart=[[],[]]
	var wormholeEnd=[[],[]]
	for(i1=0;i1<elements[4].length;i1++){
		if(elements[4][i1][1]){
			for(i2=0;i2<elements[4][i1][2].length;i2++){
				for(i3=0;i3<elements[0].length;i3++){
					if(elements[0][i3][0]==elements[4][i1][2][i2][0]){
						wormholeStart=elements[0][i3][1]
					}else if(elements[0][i3][0]==elements[4][i1][2][i2][1]){
						wormholeEnd=elements[0][i3][1]
					}
				}
				var wormholeColor=0
				for(i3=0;i3<elements[5].length;i3++){
					if(elements[4][i1][3].includes(elements[5][i3][0])){
						drawWormhole(wormholeStart[0],wormholeStart[1],wormholeEnd[0],wormholeEnd[1],elements[5][i3][1])
						wormholeColor=1
						break
					}
				}
				if(!wormholeColor){
					drawWormhole(wormholeStart[0],wormholeStart[1],wormholeEnd[0],wormholeEnd[1])
				}
			}
		}
	}
	console.log(elements)
	drawOverlay()
}
function drawOverlay(){
	overlayContext.clearRect(0,0,100000,100000)
	if(rangeCheck){
		if(distance<=100){
			for(i1=0;i1<elements[0].length;i1++){
				if(Math.dist(elements[0][target][1][0],elements[0][target][1][1],elements[0][i1][1][0],elements[0][i1][1][1])<=elements[0][target][5]){
					drawRangeCheck(elements[0][target][1][0],elements[0][target][1][1],elements[0][i1][1][0],elements[0][i1][1][1],1)
				}
			}
			for(i1=0;i1<elements[0][target][3].length;i1++){
				for(i2=0;i2<elements[0].length;i2++){
					if(elements[0][i2][0]==elements[0][target][3][i1]){
						drawRangeCheck(elements[0][target][1][0],elements[0][target][1][1],elements[0][i2][1][0],elements[0][i2][1][1],1)
					}
				}
			}
		}
		for(i1=0;i1<systemsSelected.length;i1++){
			for(i2=0;i2<elements[0].length;i2++){
				if(Math.dist(elements[0][systemsSelected[i1]][1][0],elements[0][systemsSelected[i1]][1][1],elements[0][i2][1][0],elements[0][i2][1][1])<=elements[0][systemsSelected[i1]][5]){
					drawRangeCheck(elements[0][systemsSelected[i1]][1][0],elements[0][systemsSelected[i1]][1][1],elements[0][i2][1][0],elements[0][i2][1][1],1)
				}
			}
			for(i2=0;i2<elements[0][systemsSelected[i1]][3].length;i2++){
				for(i3=0;i3<elements[0].length;i3++){
					if(elements[0][i3][0]==elements[0][systemsSelected[i1]][3][i2]){
						drawRangeCheck(elements[0][systemsSelected[i1]][1][0],elements[0][systemsSelected[i1]][1][1],elements[0][i3][1][0],elements[0][i3][1][1],1)
					}
				}
			}
		}
	}
	drawLinkLengthCore()
	for(i1=0;i1<systemsSelected.length;i1++){
		for(i2=0;i2<elements[0][systemsSelected[i1]][3].length;i2++){
			for(i3=0;i3<elements[0].length;i3++){
				if(elements[0][i3][0]==elements[0][systemsSelected[i1]][3][i2]){
					for(i4=0;i4<elements[1].length;i4++){
						if(elements[0][i3][2]==elements[1][i4][0]){
							drawLinkLengthCheck(elements[0][systemsSelected[i1]][1][0],elements[0][systemsSelected[i1]][1][1],elements[0][i3][1][0],elements[0][i3][1][1],elements[1][i4][1])
						}
					}
				}
			}
		}
	}
	document.getElementById(`systemName`).innerHTML=``
	document.getElementById(`systemPosition`).innerHTML=``
	document.getElementById(`selectedHabitation`).innerHTML=``
	if(!rangeCheck){
		for(i1=0;i1<systemsSelected.length;i1++){
			drawSelect(elements[0][systemsSelected[i1]][1][0],elements[0][systemsSelected[i1]][1][1])
		}
		if(!systemsSelected.length){
			if(distance<=100){
				document.getElementById(`systemName`).classList.add(`dark`)
				document.getElementById(`systemPosition`).classList.add(`dark`)
				document.getElementById(`systemName`).innerHTML=elements[0][target][0]
				document.getElementById(`systemPosition`).innerHTML=elements[0][target][1][0]+` `+elements[0][target][1][1]
			}
		}
		if(distance<=100){
			drawRange(elements[0][target][1][0],elements[0][target][1][1],elements[0][target][5])
		}
		for(i1=0;i1<systemsSelected.length;i1++){
			drawRange(elements[0][systemsSelected[i1]][1][0],elements[0][systemsSelected[i1]][1][1],elements[0][systemsSelected[i1]][5])
		}
	}
	if(systemsSelected.length){
		document.getElementById(`systemName`).classList.remove(`dark`)
		document.getElementById(`systemPosition`).classList.remove(`dark`)
		document.getElementById(`selectedHabitation`).classList.remove(`dark`)
		if(systemsSelected.length>1){
			document.getElementById(`systemName`).innerHTML=systemsSelected.length+` systems selected`
			var selectedHabitation=0
			for(i1=0;i1<systemsSelected.length;i1++){
				var wormholeBlock=0
				for(i2=0;i2<elements[4].length;i2++){
					if(elements[4][i2][0].includes(elements[0][systemsSelected[i1]][4][0])){
						wormholeBlock=1
					}
				}
				if(elements[0][systemsSelected[i1]][4].length&&!wormholeBlock){
					selectedHabitation++
				}
			}
			document.getElementById(`selectedHabitation`).innerHTML=Math.round(selectedHabitation*100/systemsSelected.length*100)/100+`% Habitation`
		}else{
			document.getElementById(`systemName`).innerHTML=elements[0][systemsSelected[0]][0]
			document.getElementById(`systemPosition`).innerHTML=elements[0][systemsSelected[0]][1][0]+` `+elements[0][systemsSelected[0]][1][1]
			document.getElementById(`selectedHabitation`).innerHTML=``
		}
	}
}
function drawGalaxy(){
	canvasContext.clearRect(0,0,100000,100000)
	canvasContext.drawImage(galaxy,galaxyCentre[0]-parseInt(galaxyPosition[0])+canvas.width*1.5*scale+112,galaxyCentre[1]-parseInt(galaxyPosition[1])+canvas.height*1.5*scale+22)
}
function drawSelect(x,y){
	overlayContext.beginPath()
	switch(display){
		case `original`:
			overlayContext.arc(canvas.width*1.5*scale+ +x-galaxyPosition[0],canvas.height*1.5*scale+ +y-galaxyPosition[1],16,0,2*Math.PI)
			break
		case `modern`:
			overlayContext.arc(canvas.width*1.5*scale+ +x-galaxyPosition[0],canvas.height*1.5*scale+ +y-galaxyPosition[1],4,0,2*Math.PI)
			break
	}
	overlayContext.setLineDash([])
	overlayContext.lineWidth=2
	overlayContext.strokeStyle=`rgb(255,255,255)`
	overlayContext.stroke()
}
function drawRange(x,y,range){
	overlayContext.beginPath()
	overlayContext.arc(canvas.width*1.5*scale+ +x-galaxyPosition[0],canvas.height*1.5*scale+ +y-galaxyPosition[1],range,0,2*Math.PI)
	overlayContext.setLineDash([])
	overlayContext.lineWidth=1
	overlayContext.strokeStyle=`rgb(102,102,102)`
	overlayContext.stroke()
}
function drawSystem(x,y,radius){
	canvasContext.beginPath()
	canvasContext.arc(canvas.width*1.5*scale+ +x-galaxyPosition[0],canvas.height*1.5*scale+ +y-galaxyPosition[1],radius,0,2*Math.PI)
	canvasContext.setLineDash([])
	canvasContext.lineWidth=3.6
	canvasContext.strokeStyle=`rgb(102,102,102)`
	canvasContext.stroke()
}
function drawSystemColour(x,y,radius,systemGovernment){
	canvasContext.beginPath()
	canvasContext.arc(canvas.width*1.5*scale+ +x-galaxyPosition[0],canvas.height*1.5*scale+ +y-galaxyPosition[1],radius,0,2*Math.PI)
	canvasContext.setLineDash([])
	canvasContext.lineWidth=3.6
	canvasContext.strokeStyle=`rgb(`+systemGovernment[0]*255+`,`+systemGovernment[1]*255+`,`+systemGovernment[2]*255+`)`
	canvasContext.stroke()
}
function drawLink(startX,startY,endX,endY){
	canvasContext.beginPath()
	canvasContext.moveTo(canvas.width*1.5*scale+ +startX-galaxyPosition[0],canvas.height*1.5*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(canvas.width*1.5*scale+ +endX-galaxyPosition[0],canvas.height*1.5*scale+ +endY-galaxyPosition[1])
	if(display==`modern`){
		canvasContext.setLineDash([])
	}else{
		canvasContext.setLineDash([0,15,10000])
	}
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(102,102,102)`
	canvasContext.stroke()
}
function drawLinkColour(startX,startY,endX,endY,systemGovernment){
	canvasContext.beginPath()
	canvasContext.moveTo(canvas.width*1.5*scale+ +startX-galaxyPosition[0],canvas.height*1.5*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(canvas.width*1.5*scale+ +endX-galaxyPosition[0],canvas.height*1.5*scale+ +endY-galaxyPosition[1])
	canvasContext.setLineDash([])
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(`+systemGovernment[0]*255+`,`+systemGovernment[1]*255+`,`+systemGovernment[2]*255+`)`
	canvasContext.stroke()
}
function drawWormhole(startX,startY,endX,endY,color){
	canvasContext.beginPath()
	canvasContext.moveTo(canvas.width*1.5*scale+ +startX-galaxyPosition[0],canvas.height*1.5*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(canvas.width*1.5*scale+ +endX-galaxyPosition[0],canvas.height*1.5*scale+ +endY-galaxyPosition[1])
	if(display==`original`){
		canvasContext.setLineDash([0,15,10000])
		canvasContext.lineWidth=1
	}else{
		canvasContext.setLineDash([])
		canvasContext.lineWidth=2
	}
	if(color){
		canvasContext.strokeStyle=`rgba(`+color.split(` `)[0]*255+`,`+color.split(` `)[1]*255+`,`+color.split(` `)[2]*255+`,.5)`
	}else{
		canvasContext.strokeStyle=`rgba(128,51,230,.5)`
	}
	canvasContext.stroke()
	if(display==`original`){
		canvasContext.beginPath()
		canvasContext.moveTo(canvas.width*1.5*scale+ +startX-galaxyPosition[0],canvas.height*1.5*scale+ +startY-galaxyPosition[1])
		canvasContext.lineTo(canvas.width*1.5*scale+ +endX-galaxyPosition[0],canvas.height*1.5*scale+ +endY-galaxyPosition[1])
		canvasContext.setLineDash([0,15,25,10000])
		canvasContext.lineWidth=4
		if(color){
			canvasContext.strokeStyle=`rgb(`+color.split(` `)[0]*255+`,`+color.split(` `)[1]*255+`,`+color.split(` `)[2]*255+`)`
		}else{
			canvasContext.strokeStyle=`rgb(128,51,230)`
		}
		canvasContext.stroke()
	}
}
function drawLinkLengthCore(){
	overlayContext.beginPath()
	overlayContext.arc(4100*scale,200*scale,9*scale,0,2*Math.PI)
	overlayContext.setLineDash([])
	overlayContext.lineWidth=3.6*scale
	overlayContext.strokeStyle=`rgb(102,102,102)`
	overlayContext.stroke()
	overlayContext.beginPath()
	overlayContext.arc(4100*scale,200*scale,100*scale,0,2*Math.PI)
	overlayContext.setLineDash([])
	overlayContext.lineWidth=1*scale
	overlayContext.strokeStyle=`rgb(102,102,102)`
	overlayContext.stroke()
}
function drawLinkLengthCheck(startX,startY,endX,endY,systemGovernment){
	overlayContext.beginPath()
	overlayContext.arc((endX-startX+4100)*scale,(endY-startY+200)*scale,1*scale,0,2*Math.PI)
	overlayContext.setLineDash([])
	overlayContext.lineWidth=3.6*scale
	overlayContext.strokeStyle=`rgb(`+systemGovernment[0]*255+`,`+systemGovernment[1]*255+`,`+systemGovernment[2]*255+`)`
	overlayContext.stroke()
}
function drawRangeCheck(startX,startY,endX,endY,lineWidth){
	overlayContext.beginPath()
	overlayContext.moveTo(canvas.width*1.5*scale+ +startX-galaxyPosition[0],canvas.height*1.5*scale+ +startY-galaxyPosition[1])
	overlayContext.lineTo(canvas.width*1.5*scale+ +endX-galaxyPosition[0],canvas.height*1.5*scale+ +endY-galaxyPosition[1])
	overlayContext.setLineDash([])
	if(lineWidth){
		overlayContext.lineWidth=lineWidth
	}else{
		overlayContext.lineWidth=.5
	}
	overlayContext.strokeStyle=`rgb(0,255,0)`
	overlayContext.stroke()
}
//	Shortcuts
Math.dist=function(x1,y1,x2,y2){ 
	if(!x2){
		x2=0
	}
	if(!y2){
		y2=0
	}
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
}
