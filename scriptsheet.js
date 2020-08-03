var canvas=document.getElementById(`canvas`);
var context=canvas.getContext(`2d`);
var governmentsUnique=[];
var governmentsColours=[];
var governmentsFinal;
var links;
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
	var factionIndex=governmentsUnique.indexOf(factionHolding);
	context.beginPath();
	context.arc(1750+ +xPos,1250+ +yPos,9,0,2*Math.PI);
	context.lineWidth=3;
	context.strokeStyle=governmentsColours[factionIndex];
	context.stroke();
//	console.log(system,factionHolding,factionIndex,xPos,yPos);
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
		links=output.split(`\nsystem`);
		links.shift();
		for(i=0;i<links.length;i++){
			links[i]=links[i].split(`\n`).filter(/./.test,/^	link /).join(`|`).replace(/	link /g,``).split(`|`).filter(Boolean);
			for(j=0;j<links[i].length;j++){
				var pos=systems.indexOf(links[i][j]);
				context.beginPath();
				context.moveTo(1750+ +positions[i][0],1250+ +positions[i][1]);
				context.lineTo(1750+ +positions[pos][0],1250+ +positions[pos][1]);
				context.strokeStyle=`rgb(102,102,102)`;
				context.stroke();
//				console.log(systems[i]+` -> `+systems[pos]);
			};
		};
		governmentsFinal=lines.join(`|`).split(`sys`).filter(/./.test,/^tem/).join(`|`).replace(/tem /g,``).split(`|`).filter(/./.test,/^	government/).join(`|`).replace(/	government /g,``).split(`|`);
		var governmentsDifference=(governmentsFinal.length-systems.length);
		if(systems.length<governmentsFinal.length){
			governmentsFinal.splice(governmentsFinal.length-governmentsDifference,governmentsDifference);
		};
		for(i=0;i<systems.length;i++){
			drawSystem(systems[i],governmentsFinal[i],positions[i][0],positions[i][1]);
		};
		console.log(`Systems: `+systems.length);
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
		governmentsUniqueHolding=governmentsSeperated.filter(/./.test,/^ment/).join(`|`).replace(/ment /g,``).replace(/"/g,``).split(`|`);
		for(i=0;i<governmentsUniqueHolding.length;i++){
			if(governmentsUniqueHolding[i].indexOf(` `)>=0){
				governmentsUniqueHolding[i]=`"`+governmentsUniqueHolding[i]+`"`;
			};
		};
		governmentsUnique.push(...governmentsUniqueHolding);
		var coloursSpread=governmentsSeperated.filter(/./.test,/^	color/).join(`|`).replace(/	color /g,``).split(`|`).join(` `).split(` `);
		coloursSpread.unshift(``);
		for(i=0;i<coloursSpread.length;i++){
			coloursSpread[i]=Math.round(coloursSpread[i]*255);
		};
		var governmentsColoursHolding=[];
		for(i=0;i<((coloursSpread.length-1)/3);i++){
			governmentsColoursHolding[i]=`rgb(`+coloursSpread[(i+1)*3-2]+`,`+coloursSpread[(i+1)*3-1]+`,`+coloursSpread[(i+1)*3]+`)`;
		};
		governmentsColours.push(...governmentsColoursHolding);
		console.log(`Governments: `+governmentsUnique.length);
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