var block=0
var canvas=document.getElementById(`canvas`)
	canvas.height=screen.height
	canvas.width=screen.width
var canvasContext=canvas.getContext(`2d`)
var createSystem=0
var distance
var elements=[[],[],[],[]]
//	Systems
//	Governments
//	Galaxies
//	Translated Systems
var galaxy=document.getElementById(`galaxy`)
var galaxyPosition=[0,0]
var galaxySelected=0
var grid=0
var headsUp=document.getElementById(`headsUp`)
	headsUp.height=screen.height
	headsUp.width=screen.width
var HUDContext=headsUp.getContext(`2d`)
var mapStyle=`original`
var newSystems=0
var oldTarget=0
var override=0
var scale=1
var systemOwnership=`inhabited`
var systemsSelected=[]
var target=0
var translateBlock=1
var translateCoordinates=[[],[]]
var translatePoints=[[[],[]],[[],[]]]
var translateSystem=0
var xCoordinate
var yCoordinate
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
	canvasContext.scale((1/3)/scale,(1/3)/scale)
	HUDContext.scale((1/3)/scale,(1/3)/scale)
	canvasContext.drawImage(galaxy,400,100)
}
//	User Input
function actionUpload(that){
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
function actionStyle(id){
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
function actionOwnership(id){
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
function actionCreate(bool){
	if(bool){
		actionTranslate(0)
		createSystem=1
		document.getElementById(`create`).classList.remove(`dark`)
		grid=1
	}else{
		createSystem=0
		document.getElementById(`create`).classList.add(`dark`)
		grid=0
	}
	drawHUD()
}
function actionTranslate(bool){
	if(bool){
		actionCreate(0)
		document.getElementById(`translate`).classList.remove(`dark`)
		grid=1
		translateSystem=1
	}else{
		document.getElementById(`translate`).classList.add(`dark`)
		grid=0
		translateSystem=0
	}
	drawHUD()
}
function actionGalaxy(){
	galaxySelected++
	if(galaxySelected==elements[2].length){
		galaxySelected=0
	}
	galaxyPosition=elements[2][galaxySelected][1]
	drawMap()
	console.log(galaxyPosition)
}
function actionZoomIn(){
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
function actionZoomOut(){
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
function actionCopy(){
	navigator.clipboard.writeText(
		document.getElementById(`output`).innerHTML
	)
}
function mouseDown(){
	if(createSystem){
		actionCreate(0)
		newSystems++
		elements[0].push([`placeholder`+newSystems,[xCoordinate+parseInt(galaxyPosition[0]),yCoordinate+parseInt(galaxyPosition[1])],[`Uninhabited`],[],[]])
		for(i1=0;i1<systemsSelected.length;i1++){
			elements[0][elements[0].length-1][3].push(elements[0][systemsSelected[i1]][0])
			elements[0][systemsSelected[i1]][3].push(`placeholder`+newSystems)
		}
		drawMap()
		printOutput()
	}else if(translateSystem){
		translatePoints[0]=[xCoordinate,yCoordinate]
		translateBlock=0
	}else{
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
	if(translateSystem&&!translateBlock){
		translatePoints[1]=[xCoordinate,yCoordinate]
		drawFakeLink(translatePoints[0][0],translatePoints[0][1],translatePoints[1][0],translatePoints[1][1])
	}
}
function mouseUp(){
	if(translateSystem){
		translateCoordinates=[Math.round(translatePoints[0][0]-translatePoints[1][0]),Math.round(translatePoints[0][1]-translatePoints[1][1])]
		for(i1=0;i1<systemsSelected.length;i1++){
			elements[0][systemsSelected[i1]][1]=[elements[0][systemsSelected[i1]][1][0]-translateCoordinates[0],elements[0][systemsSelected[i1]][1][1]-translateCoordinates[1]]
			override=0
			for(i2=0;i2<elements[3].length;i2++){
				if(elements[0][systemsSelected[i1]][0]==elements[3][i2][0]){
					elements[3][i2][1]=elements[0][systemsSelected[i1]][1]
					override=1
				}
			}
			if(!override){
				elements[3].push([elements[0][systemsSelected[i1]][0],elements[0][systemsSelected[i1]][1]])
			}
		}
	}
	translatePoints=[[],[]]
	drawMap()
	printOutput()
}
function keyDown(event){
	if(!block){
		if(event.keyCode==27){
			actionCreate(0)
			actionTranslate(0)
		}
		if(event.keyCode==67){
			actionCreate(1)
		}
		if(event.keyCode==84){
			actionTranslate(1)
		}
	}
	if(event.keyCode){
		block=1
	}
	drawHUD()
}
function keyUp(event){
	if(event.keyCode){
		block=0
	}
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
		}
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
	headsUp.addEventListener(`mousedown`,mouseDown)
	headsUp.addEventListener(`mousemove`,mouseMove)
	headsUp.addEventListener(`mouseup`,mouseUp)
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
function drawWormhole(startX,startY,endX,endY){
	canvasContext.beginPath()
	canvasContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	canvasContext.lineTo(2150*scale+ +endX-galaxyPosition[0],1350*scale+ +endY-galaxyPosition[1])
	canvasContext.setLineDash([0,15,10000])
	canvasContext.lineWidth=2
	canvasContext.strokeStyle=`rgb(128,51,230)`
	canvasContext.stroke()
}
//	Display Extras
function drawHUD(){
	HUDContext.clearRect(0,0,100000,100000)
	for(i1=0;i1<systemsSelected.length;i1++){
		drawSelect(elements[0][systemsSelected[i1]][1][0],elements[0][systemsSelected[i1]][1][1])
	}
	if(createSystem){
		drawRestricted(xCoordinate,yCoordinate)
		for(i1=0;i1<systemsSelected.length;i1++){
			drawFakeLink(elements[0][systemsSelected[i1]][1][0],elements[0][systemsSelected[i1]][1][1],xCoordinate,yCoordinate)
		}
	}else{
		if(oldTarget!==target&&distance<=100&&!translateSystem){
			drawRange(elements[0][target][1][0],elements[0][target][1][1])
		}
	}
	if(grid){
		drawGrid()
	}
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
function drawFakeLink(startX,startY,endX,endY){
	HUDContext.beginPath()
	HUDContext.moveTo(2150*scale+ +startX-galaxyPosition[0],1350*scale+ +startY-galaxyPosition[1])
	HUDContext.lineTo(2150*scale+ +endX,1350*scale+ +endY)
	HUDContext.setLineDash([0,15,0])
	HUDContext.lineWidth=2
	HUDContext.strokeStyle=`rgb(102,102,102)`
	HUDContext.stroke()
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
	HUDContext.beginPath()
	HUDContext.arc(2150*scale+ +x,1350*scale+ +y,100,0,2*Math.PI)
	HUDContext.setLineDash([])
	HUDContext.lineWidth=2
	if(distance<=100){
		HUDContext.strokeStyle=`rgb(102,255,102)`
	}else{
		HUDContext.strokeStyle=`rgb(255,102,102)`
	}
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
//	Misc
function printOutput(){
	document.getElementById(`output`).innerHTML=``
	for(i1=0;i1<elements[0].length;i1++){
		if(elements[0][i1][0].startsWith(`placeholder`)){
			document.getElementById(`output`).innerHTML+=`\nsystem "`+elements[0][i1][0]+`"\n\tpos `+elements[0][i1][1][0]+` `+elements[0][i1][1][1]+`\n\tgovernment "`+elements[0][i1][2]+`"`
			if(elements[0][i1][3].length){
				document.getElementById(`output`).innerHTML+=`\n\tlink "`+elements[0][i1][3].join(`"\n\tlink "`)+`"`
			}
		}
	}
	for(i1=0;i1<elements[3].length;i1++){
		document.getElementById(`output`).innerHTML+=`\nsystem "`+elements[3][i1][0]+`"\n\tpos `+elements[3][i1][1][0]+` `+elements[3][i1][1][1]
	}
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
