var buffer=true
var canvas=document.getElementById(`canvas`)
	canvas.height=screen.height
	canvas.width=screen.width
var canvasContext=canvas.getContext(`2d`)
var createSystem=false
var distance
var elements=[[],[],[],[[],[]]]
var galaxy=document.getElementById(`galaxy`)
var galaxyPosition=[0,0]
var galaxySelected=0
var grid=false
var headsUp=document.getElementById(`headsUp`)
	headsUp.height=screen.height
	headsUp.width=screen.width
var HUDContext=headsUp.getContext(`2d`)
var mapStyle=`original`
var newSystems=0
var oldTarget=0
var scale=1
var systemOwnership=`inhabited`
var systemsSelected=[]
var target=0
var xCoordinate
var yCoordinate
function copyOutput(){
	navigator.clipboard.writeText(
		document.getElementById(`output`).innerHTML
	)
}
function defineGalaxy(){
	if(lines[i3].startsWith(`\tpos `)){
		elements[2][elements[2].length-1][1]=lines[i3].slice(5).replaceAll(`"`,``).replaceAll(`\r`,``).split(` `)
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
			if(segmented==0){
				elements[0][i3][4].push(lines[i4].slice(12).replaceAll(`"`,``).replaceAll(`\r`,``))
			}
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
			if(segmented==0){
				elements[0][elements[0].length-1][4].push(lines[i3].slice(8).replaceAll(`"`,``).replaceAll(`\r`,``))
			}
		}else if(lines[i3].startsWith(`\t\tobject `)){
			var segmented=0
			for(i4=0;i4<elements[0][elements[0].length-1][4].length;i4++){
				if(elements[0][elements[0].length-1][4][i4]==lines[i3].slice(9).replaceAll(`"`,``).replaceAll(`\r`,``)){
					segmented=1
				}
			}
			if(segmented==0){
				elements[0][elements[0].length-1][4].push(lines[i3].slice(9).replaceAll(`"`,``).replaceAll(`\r`,``))
			}
		}
	}
}
function drawFakeLink(startX,startY,endX,endY){
	HUDContext.beginPath()
	HUDContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	HUDContext.lineTo(2150*scale+ +endX,1350*scale+ +endY)
	HUDContext.setLineDash([0,15,0])
	HUDContext.lineWidth=2
	HUDContext.strokeStyle=`rgb(102,102,102)`
	HUDContext.stroke()
}
function drawGrid(){
	for(i1=100;i1<screen.width*3*scale;i1+=100){
		HUDContext.beginPath()
		HUDContext.moveTo(i1,0)
		HUDContext.lineTo(i1,screen.height*3*scale)
		HUDContext.setLineDash([])
		HUDContext.lineWidth=1
		HUDContext.strokeStyle=`rgba(102,102,102,.4)`
		HUDContext.stroke()
	}
	for(i1=100;i1<screen.height*3*scale;i1+=100){
		HUDContext.beginPath()
		HUDContext.moveTo(0,i1)
		HUDContext.lineTo(screen.width*3*scale,i1)
		HUDContext.setLineDash([])
		HUDContext.lineWidth=1
		HUDContext.strokeStyle=`rgba(102,102,102,.4)`
		HUDContext.stroke()
	}
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
	if(grid==true){
		drawGrid()
	}
}
function drawLink(startX,startY,endX,endY){
	canvasContext.beginPath()
	canvasContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(2150*scale+ +endX-galaxyPosition[0],1350*scale+ +endY-galaxyPosition[1])
	canvasContext.setLineDash([])
	switch(mapStyle){
		case `original`:
			canvasContext.setLineDash([0,15,10000])
			break
	}
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(102,102,102)`
	canvasContext.stroke()
}
function drawLinkColour(startX,startY,endX,endY,systemGovernment){
	canvasContext.beginPath()
	canvasContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(2150*scale+ +endX-galaxyPosition[0],1350*scale+ +endY-galaxyPosition[1])
	canvasContext.setLineDash([])
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(`+systemGovernment[0]*255+`,`+systemGovernment[1]*255+`,`+systemGovernment[2]*255+`)`
	canvasContext.stroke()
}
function drawRange(x,y){
	HUDContext.beginPath()
	HUDContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],100,0,2*Math.PI)
	HUDContext.setLineDash([])
	HUDContext.lineWidth=2
	HUDContext.strokeStyle=`rgb(102,102,102)`
	HUDContext.stroke()
}
function drawRestricted(x,y){
	if(buffer==true){
		HUDContext.beginPath()
		HUDContext.arc(2150*scale+ +x,1350*scale+ +y,50,0,2*Math.PI)
		HUDContext.setLineDash([])
		HUDContext.lineWidth=2
		if(distance>50){
			HUDContext.fillStyle=`rgba(102,255,102,.2)`
		}else{
			HUDContext.fillStyle=`rgba(255,102,102,.2)`
		}
		HUDContext.fill()
	}
	HUDContext.beginPath()
	HUDContext.arc(2150*scale+ +x,1350*scale+ +y,100,0,2*Math.PI)
	HUDContext.setLineDash([])
	HUDContext.lineWidth=2
	HUDContext.strokeStyle=`rgb(102,102,102)`
	HUDContext.stroke()
}
function drawSelect(x,y){
	HUDContext.beginPath()
	switch(mapStyle){
		case `original`:
			HUDContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],18,0,2*Math.PI)
			break
		case `modern`:
			HUDContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],4,0,2*Math.PI)
			break
	}
	HUDContext.setLineDash([])
	HUDContext.lineWidth=2
	HUDContext.strokeStyle=`rgb(255,255,255)`
	HUDContext.stroke()
}
function drawSystem(x,y,radius){
	canvasContext.beginPath()
	canvasContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],radius,0,2*Math.PI)
	canvasContext.setLineDash([])
	canvasContext.lineWidth=3.6
	canvasContext.strokeStyle=`rgb(102,102,102)`
	canvasContext.stroke()
}
function drawSystemColour(x,y,radius,systemGovernment){
	canvasContext.beginPath()
	canvasContext.arc(2150*scale+ +x-galaxyPosition[0],1350*scale+ +y-galaxyPosition[1],radius,0,2*Math.PI)
	canvasContext.setLineDash([])
	canvasContext.lineWidth=3.6
	canvasContext.strokeStyle=`rgb(`+systemGovernment[0]*255+`,`+systemGovernment[1]*255+`,`+systemGovernment[2]*255+`)`
	canvasContext.stroke()
}
function drawWormhole(startX,startY,endX,endY){
	canvasContext.beginPath()
	canvasContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(2150*scale+ +endX-galaxyPosition[0],1350*scale+ +endY-galaxyPosition[1])
	canvasContext.setLineDash([0,15,10000])
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(128,51,230)`
	canvasContext.stroke()
}
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
function initialize(){
	if(localStorage.getItem(`mapStyle`)==`modern`){
		document.getElementById(`original`).classList.add(`dark`)
		document.getElementById(`modern`).classList.remove(`dark`)
		mapStyle=localStorage.getItem(`mapStyle`)
	}
	if(localStorage.getItem(`systemOwnership`)==`claimed`){
		document.getElementById(`claimed`).classList.remove(`dark`)
		document.getElementById(`inhabited`).classList.add(`dark`)
		systemOwnership=localStorage.getItem(`systemOwnership`)
	}
	if(localStorage.getItem(`buffer`)==`false`){
		document.getElementById(`buffer`).classList.add(`dark`)
		buffer=false
	}
	if(localStorage.getItem(`grid`)==`true`){
		document.getElementById(`grid`).classList.remove(`dark`)
		grid=true
	}
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	HUDContext.scale((1/3)/scale,(1/3)/scale)
	canvasContext.drawImage(galaxy,400,100)
}
function keyDown(event){
	switch(event.keyCode){
		case 16:
			createSystem=true
			break
	}
	drawHUD()
}
function keyUp(event){
	switch(event.keyCode){
		case 16:
			createSystem=false
			break
	}
	drawHUD()
}
function loadFiles(that){
	document.getElementById(`style`).classList.remove(`blocked`)
	document.getElementById(`ownership`).classList.remove(`blocked`)
	document.getElementById(`modeActions`).classList.remove(`blocked`)
	document.getElementById(`galaxyDisplay`).classList.remove(`blocked`)
	document.getElementById(`zoomOut`).classList.remove(`blocked`)
	document.getElementById(`zoomIn`).classList.remove(`blocked`)
	document.getElementById(`copy`).classList.remove(`blocked`)
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
						elements[0].push([lines[i2].slice(7).replaceAll(`"`,``).replaceAll(`\r`,``),[],[`Uninhabited`],[],[]])
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
					}
				}
			}
		}
	}
	setTimeout(drawMap,500)
}
function mouseDown(){
	if(createSystem==false){
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
			drawHUD()
		}
	}else{
		if(distance>50||!buffer){
			newSystems++
			elements[0].push([`placeholder`+newSystems,[xCoordinate+parseInt(galaxyPosition[0]),yCoordinate+parseInt(galaxyPosition[1])],[`Uninhabited`],[],[]])
			for(i1=0;i1<systemsSelected.length;i1++){
				elements[0][elements[0].length-1][3].push(elements[0][systemsSelected[i1]][0])
				elements[0][systemsSelected[i1]][3].push(`placeholder`+newSystems)
			}
			drawMap()
			printOutput()
		}
	}
}
function mouseMove(event){
	xCoordinate=Math.round((event.offsetX*3-2150)*scale)
	yCoordinate=Math.round((event.offsetY*3-1350)*scale)
	distance=100000
	for(i1=0;i1<elements[0].length;i1++){
		if(Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)<distance){
			target=i1
			distance=Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)
		}
	}
	drawHUD()
}
function printOutput(){
	elements[3]=[[],[]]
	document.getElementById(`output`).innerHTML=``
	for(i1=0;i1<elements[0].length;i1++){
		if(elements[0][i1][0].startsWith(`placeholder`)){
			document.getElementById(`output`).innerHTML+=`\nsystem "`+elements[0][i1][0]+`"\n\tpos `+elements[0][i1][1][0]+` `+elements[0][i1][1][1]+`\n\tgovernment "`+elements[0][i1][2]+`"`
			if(elements[0][i1][3].length){
				document.getElementById(`output`).innerHTML+=`\n\tlink "`+elements[0][i1][3].join(`"\n\tlink "`)+`"`
			}
		}
	}
}
function switchGalaxy(){
	galaxySelected++
	if(galaxySelected==elements[2].length){
		galaxySelected=0
	}
	galaxyPosition=elements[2][galaxySelected][1]
	drawMap()
	console.log(galaxyPosition)
}
function switchOwnership(id){
	switch(id){
		case `inhabited`:
			document.getElementById(`claimed`).classList.add(`dark`)
			document.getElementById(`inhabited`).classList.remove(`dark`)
			systemOwnership=`inhabited`
			break
		case `claimed`:
			document.getElementById(`claimed`).classList.remove(`dark`)
			document.getElementById(`inhabited`).classList.add(`dark`)
			systemOwnership=`claimed`
			break
	}
	localStorage.setItem(`systemOwnership`,systemOwnership)
	drawMap()
}
function switchStyle(id){
	switch(id){
		case `original`:
			document.getElementById(`original`).classList.remove(`dark`)
			document.getElementById(`modern`).classList.add(`dark`)
			mapStyle=`original`
			break
		case `modern`:
			document.getElementById(`original`).classList.add(`dark`)
			document.getElementById(`modern`).classList.remove(`dark`)
			mapStyle=`modern`
			break
	}
	localStorage.setItem(`mapStyle`,mapStyle)
	drawMap()
}
function toggleBuffer(){
	switch(buffer){
		case true:
			document.getElementById(`buffer`).classList.add(`dark`)
			buffer=false
			break
		case false:
			document.getElementById(`buffer`).classList.remove(`dark`)
			buffer=true
			break
	}
	localStorage.setItem(`buffer`,buffer)
}
function toggleGrid(){
	switch(grid){
		case false:
			document.getElementById(`grid`).classList.remove(`dark`)
			grid=true
			break
		case true:
			document.getElementById(`grid`).classList.add(`dark`)
			grid=false
			break
	}
	localStorage.setItem(`grid`,grid)
	drawHUD()
}
function zoomIn(){
	canvasContext.scale(3*scale,3*scale)
	HUDContext.scale(3*scale,3*scale)
	if(scale==2.5){
		scale=1.5
	}else if(scale==1.5){
		scale=1
	}
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	HUDContext.scale((1/3)/scale,(1/3)/scale)
	drawMap()
}
function zoomOut(){
	canvasContext.scale(3*scale,3*scale)
	HUDContext.scale(3*scale,3*scale)
	if(scale==1){
		scale=1.5
	}else if(scale==1.5){
		scale=2.5
	}
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	HUDContext.scale((1/3)/scale,(1/3)/scale)
	drawMap()
}
Math.dist=function(x1,y1,x2,y2){ 
	if(!x2){
		x2=0
	}
	if(!y2){
		y2=0
	}
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
}
