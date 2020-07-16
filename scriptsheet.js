var canvas=document.getElementById(`canvas`);
var context=canvas.getContext(`2d`);
var governmentNames=[];
var governmentColours=[];
var governmentsFinal;
var positionsFinal;
var systemsFinal;
var zoom=2.5;
canvas.height=screen.height;
canvas.width=screen.width;
function colourSystem(system,faction,xPos,yPos){
	faction.replace(/"/g,``);
	if(faction.indexOf(` `)<=0)
		{faction=`"`+faction+`"`;}
	var factionIndex=governmentNames.indexOf(faction);
	context.beginPath();
	context.arc(1750+ +xPos,1250+ +yPos,9,0,2*Math.PI);
	context.lineWidth=3;
	context.strokeStyle=governmentColours[factionIndex];
	context.stroke();
	console.log(system,faction,factionIndex,xPos,yPos);
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
		systemsFinal=lines.filter(/./.test,/^system/).join(`,`).replace(/system /g,``).split(`,`);
		positionsFinal=lines.join(`,`).split(`sys`).filter(/./.test,/^tem/).join(`,`).replace(/tem /g,``).split(`,`).filter(/./.test,/^	pos/).join(`,`).replace(/pos /g,``).split(` `).join(`,`).split(`,`);
		positionsFinal.unshift(``);
		var positionsDifference=((positionsFinal.length/2)-systemsFinal.length);
		if(systemsFinal.length<positionsFinal.length)
			{positionsFinal.splice(positionsFinal.length-positionsDifference,positionsDifference)};
		governmentsFinal=lines.join(`,`).split(`sys`).filter(/./.test,/^tem/).join(`,`).replace(/tem /g,``).split(`,`).filter(/./.test,/^	government/).join(`,`).replace(/	government /g,``).split(`,`);
		var governmentsDifference=(governmentsFinal.length-systemsFinal.length);
		if(systemsFinal.length<governmentsFinal.length)
			{governmentsFinal.splice(governmentsFinal.length-governmentsDifference,governmentsDifference)};
		for(i=0;i<systemsFinal.length;i++)
			{drawSystem(systemsFinal[i],governmentsFinal[i],positionsFinal[((i+1)*2)-1],positionsFinal[(i+1)*2])};
		console.log(`Systems: `+systemsFinal.length);
	};
	systemsReader.readAsText(that.files[0]);
}
function initialize(){
	img=document.getElementById(`galaxy`);
	context.scale(1/zoom,1/zoom);
	context.drawImage(img,0,0);
}
function saveGovernments(system,faction,xPos,yPos){
	console.log(system,faction,factionIndex,xPos,yPos);
}
function loadGovernments(that){
	var governmentsReader=new FileReader();
	governmentsReader.onload=function(e){
		var governmentsSeperated=e.target.result.split(/\ngovern/).filter((government)=>government.includes(`color`)).join(``).split(/\n/);
		governmentNames=governmentsSeperated.filter(/./.test,/^ment/).join(`,`).replace(/ment /g,``).split(`,`);
		var coloursSpread=governmentsSeperated.filter(/./.test,/^	color/).join(`,`).replace(/	color /g,``).split(`,`).join(` `).split(` `);
		coloursSpread.unshift(``);
		for(i=0;i<coloursSpread.length;i++)
			{coloursSpread[i]=Math.round(coloursSpread[i]*255)};
		for(i=0;i<((coloursSpread.length-1)/3);i++)
			{governmentColours[i]=`rgb(`+coloursSpread[(i+1)*3-2]+`,`+coloursSpread[(i+1)*3-1]+`,`+coloursSpread[(i+1)*3]+`)`};
		console.log(`Governments: `+governmentNames.length);
		for(i=0;i<systemsFinal.length;i++)
			{colourSystem(systemsFinal[i],governmentsFinal[i],positionsFinal[((i+1)*2)-1],positionsFinal[(i+1)*2])};
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