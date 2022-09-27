var xCoordinate
var yCoordinate
var oldTarget=0
var target=0
var distance
var systemsSelected=[]
var createSystem=false
var newSystems=0
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
