var xCoordinate
var yCoordinate
var oldTarget=0
var target=0
var distance
var systemsSelected=[];
function onMouseMove(event){
	xCoordinate=Math.round((event.offsetX*3-2150)*scale)
	yCoordinate=Math.round((event.offsetY*3-1350)*scale)
	distance=100000
	HUDContext.clearRect(0,0,100000,100000)
	for(i1=0;i1<elements[0].length;i1++){
		if(Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)<distance){
			target=i1
			distance=Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)
		}
	}
	if(oldTarget!==target&&distance<=100){
		drawSelect(elements[0][target][1][0],elements[0][target][1][1])
		drawRange(elements[0][target][1][0],elements[0][target][1][1])
	}else if(distance>100){
		oldTarget=0
	}
	drawSelected()
}
function onMouseDown(){
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
		console.log(systemsSelected)
		drawSelected()
	}
}
function drawSelected(){
	for(i1=0;i1<systemsSelected.length;i1++){
		drawSelect(elements[0][systemsSelected[i1]][1][0],elements[0][systemsSelected[i1]][1][1])
	}
}
