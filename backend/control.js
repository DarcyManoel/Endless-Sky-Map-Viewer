var xCoordinate
var yCoordinate
var oldTarget=0
var target=0
var distance
var systemSelected;
function onMouseMove(event){
	xCoordinate=Math.round((event.offsetX*3-2150)*scale)
	yCoordinate=Math.round((event.offsetY*3-1350)*scale)
	distance=100000
	for(i1=0;i1<elements[0].length;i1++){
		if(Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)<distance){
			target=i1
			distance=Math.dist(elements[0][i1][1][0]-galaxyPosition[0],elements[0][i1][1][1]-galaxyPosition[1],xCoordinate,yCoordinate)
		}
	}
	if(oldTarget!==target&&distance<=100){
		for(i1=0;i1<elements[1].length;i1++){
			if(elements[0][target][2]==elements[1][i1][0]){
				drawHUD()
			}
		}
	}else if(distance>100){
		oldTarget=0
		drawHUD()
	}
}
function onMouseDown(){
	if(systemSelected!==target&&distance<=100){
		systemSelected=target
		drawHUD()
	}
}
