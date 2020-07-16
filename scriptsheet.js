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
	var reader1=new FileReader();
	reader1.onload=function(e){
		var output=e.target.result;
		var lines=output.split(`\n`).join(`,`);
		var systems1=output.split(`\n`).filter(/./.test,/^system/).join(`,`).replace(/system /g,``);
		systemsFinal=systems1.split(`,`);
		var positions1=lines.split(`sys`).filter(/./.test,/^tem/).join(`,`).replace(/tem /g,``);
		var positions2=positions1.split(`,`).filter(/./.test,/^	pos/).join(`,`).replace(/pos /g,``);
		var positions3=positions2.split(` `).join(`,`);
		positionsFinal=positions3.split(`,`);
		positionsFinal.unshift(``);
		var positionsDifference=((positionsFinal.length/2)-systemsFinal.length);
		if(systemsFinal.length<positionsFinal.length)
			{positionsFinal.splice(positionsFinal.length-positionsDifference,positionsDifference)};
		var governments1=lines.split(`sys`).filter(/./.test,/^tem/).join(`,`).replace(/tem /g,``);
		var governments2=governments1.split(`,`).filter(/./.test,/^	government/).join(`,`).replace(/	government /g,``);
		governmentsFinal=governments2.split(`,`);
		var governmentsDifference=(governmentsFinal.length-systemsFinal.length);
		if(systemsFinal.length<governmentsFinal.length)
			{governmentsFinal.splice(governmentsFinal.length-governmentsDifference,governmentsDifference)};
		for(i=0;i<systemsFinal.length;i++)
			{drawSystem(systemsFinal[i],governmentsFinal[i],positionsFinal[((i+1)*2)-1],positionsFinal[(i+1)*2])};
		console.log(`Systems: `+systemsFinal.length);
	};
	reader1.readAsText(that.files[0]);
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
	var reader2=new FileReader();
	reader2.onload=function(e){
		var output=e.target.result;
		var lines=output.split(`\n`).join(`<br>`);
		var governments1=output.split(/\ngovern/);
		var governments2=governments1.filter((government)=>government.includes(`color`));
		var governments3=governments2.join(``).split(/\n/);
		governmentNames=governments3.filter(/./.test,/^ment/).join(`,`).replace(/ment /g,``).split(`,`);
		var colours1=governments3.filter(/./.test,/^	color/).join(`,`).replace(/	color /g,``).split(`,`).join(` `).split(` `);
		colours1.unshift(``);
		for(i=0;i<colours1.length;i++)
			{colours1[i]=Math.round(colours1[i]*255)};
		for(i=0;i<((colours1.length-1)/3);i++)
			{governmentColours[i]=`rgb(`+colours1[(i+1)*3-2]+`,`+colours1[(i+1)*3-1]+`,`+colours1[(i+1)*3]+`)`};
		console.log(`Governments: `+governmentNames.length);
		for(i=0;i<systemsFinal.length;i++)
			{colourSystem(systemsFinal[i],governmentsFinal[i],positionsFinal[((i+1)*2)-1],positionsFinal[(i+1)*2])};
	};
	reader2.readAsText(that.files[0]);
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