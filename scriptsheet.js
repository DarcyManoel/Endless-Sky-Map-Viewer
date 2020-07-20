var canvas=document.getElementById(`canvas`);
var context=canvas.getContext(`2d`);
var governmentNames=[];
var governmentColours=[];
var governmentsFinal;
var positions;
var systems;
var zoom=2.5;
canvas.height=screen.height;
canvas.width=screen.width;
function colourSystem(system,faction,xPos,yPos){
	var factionHolding=faction.replace(/"/g,``);
	if(factionHolding.indexOf(` `)>=0){
		factionHolding=`"`+factionHolding+`"`;
	};
	var factionIndex=governmentNames.indexOf(factionHolding);
	context.beginPath();
	context.arc(1750+ +xPos,1250+ +yPos,9,0,2*Math.PI);
	context.lineWidth=3;
	context.strokeStyle=governmentColours[factionIndex];
	context.stroke();
	console.log(system,factionHolding,factionIndex,xPos,yPos);
}
function drawSystem(system,faction,xPos,yPos){
	context.beginPath();
	context.arc(1750+ +xPos,1250+ +yPos,9,0,2*Math.PI);
	context.lineWidth=3;
	context.strokeStyle=`rgb(102,102,102)`;
	context.stroke();
}
function drawSystems(that){
	var systemsReader=new FileReader();
	systemsReader.onload=function(e){
		var output=e.target.result;
		var lines=output.split(`\n`);
		systems=lines.filter(/./.test,/^system/).join(`|`).replace(/system /g,``).split(`|`);
		positions=lines.join(`|`).split(`sys`).filter(/./.test,/^tem/).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	pos/).join(`|`).replace(/	pos /g,``).split(`|`);
		for(i=0;i<positions.length;i++){
			positions[i]=positions[i].split(` `);
		};
		governmentsFinal=lines.join(`|`).split(`sys`).filter(/./.test,/^tem/).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	government/).join(`|`).replace(/	government /g,``).split(`|`);
		var governmentsDifference=(governmentsFinal.length-systems.length);
		if(systems.length<governmentsFinal.length){
			governmentsFinal.splice(governmentsFinal.length-governmentsDifference,governmentsDifference);
		};
		for(i=0;i<systems.length;i++){
			drawSystem(systems[i],governmentsFinal[i],positions[i][0],positions[i][1]);
		};
		console.log(systems);
	};
	systemsReader.readAsText(that.files[0]);
}
function initialize(){
	img=document.getElementById(`galaxy`);
	context.scale(1/zoom,1/zoom);
	context.drawImage(img,0,0);
}
function loadGovernments(that){
	var governmentsReader=new FileReader();
	governmentsReader.onload=function(e){
		var governmentsSeperated=e.target.result.split(/govern/).filter((government)=>government.includes(`color`)).join(``).split(/\n/);
		governmentNamesHolding=governmentsSeperated.filter(/./.test,/^ment/).join(`|`).replace(/ment /g,``).replace(/"/g,``).split(`|`);
		for(i=0;i<governmentNamesHolding.length;i++){
			if(governmentNamesHolding[i].indexOf(` `)>=0){
				governmentNamesHolding[i]=`"`+governmentNamesHolding[i]+`"`;
			};
		};
		governmentNames.push(...governmentNamesHolding);
		var coloursSpread=governmentsSeperated.filter(/./.test,/^	color/).join(`|`).replace(/	color /g,``).split(`|`).join(` `).split(` `);
		coloursSpread.unshift(``);
		for(i=0;i<coloursSpread.length;i++){
			coloursSpread[i]=Math.round(coloursSpread[i]*255);
		};
		var governmentColoursHolding=[];
		for(i=0;i<((coloursSpread.length-1)/3);i++){
			governmentColoursHolding[i]=`rgb(`+coloursSpread[(i+1)*3-2]+`,`+coloursSpread[(i+1)*3-1]+`,`+coloursSpread[(i+1)*3]+`)`;
		};
		governmentColours.push(...governmentColoursHolding);
		console.log(`Governments: `+governmentNames.length);
		console.log(governmentNames);
		console.log(governmentColours);
		for(i=0;i<systems.length;i++){
			colourSystem(systems[i],governmentsFinal[i],positions[i][0],positions[i][1]);
		};
	};
	governmentsReader.readAsText(that.files[0]);
}
function slideLeft(){
	document.getElementById(`left`).classList.toggle(`side`);
	document.getElementById(`left`).classList.toggle(`slide`);
}
function slideRight(){
	document.getElementById(`right`).classList.toggle(`side`);
	document.getElementById(`right`).classList.toggle(`slide`);
}
function toggleGovernmentDialog(){
	document.getElementById(`dialogGovernmentScreen`).classList.toggle(`hidden`);
}
function toggleMapDialog(){
	document.getElementById(`dialogMapScreen`).classList.toggle(`hidden`);
}