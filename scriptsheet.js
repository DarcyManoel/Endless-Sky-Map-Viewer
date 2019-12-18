var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
var government={
	coalition:"rgb(255,153,179)",
	efret:"rgb(125,84,176)",
	hai:"rgb(214,107,207)",
	heliarch:"rgb(255,204,128)",
	korath:"rgb(204,128,26)",
	mereti:"rgb(82,92,166)",
	pirate:"rgb(199,0,0)",
	pug:"rgb(252,227,179)",
	quarg:"rgb(224,196,0)",
	remnant:"rgb(227,97,158)",
	republic:"rgb(232,107,23)",
	sestor:"rgb(191,69,94)",
	syndicate:"rgb(0,105,181)",
	unfettered:"rgb(176,84,209)",
	uninhabited:"rgb(102,102,102)",
	wanderer:"rgb(179,232,31)",
};
var zoom=2.5;
canvas.height=screen.height;
canvas.width=screen.width;
function drawSystem(system,faction,xPos,yPos){
	context.beginPath();
	context.arc(1750+ +xPos,1250+ +yPos,9,0,2*Math.PI);
	context.lineWidth=3;
	context.strokeStyle="#ffffff";
	context.stroke();
	console.log(system,faction,xPos,yPos);
}
function drawSystems(that){
	var reader=new FileReader();
	reader.onload=function (e){
		var output=e.target.result;
		var lines=output.split("\n").join("<br>");
		var systems1=output.split("\n").filter(/./.test,/^system/).join("<br>").replace(/system /g,"");
		var systems2=systems1.split("<br>");
		var positions1=lines.split("sys").filter(/./.test,/^tem/).join("<br>").replace(/tem /g,"");
		var positions2=positions1.split("<br>").filter(/./.test,/^	pos/).join("<br>").replace(/pos /g,"");
		var positions3=positions2.split(" ").join("<br>");
		var positions4=positions3.split("<br>");
		positions4.unshift("");
		var positionsDifference=((positions4.length/2)-systems2.length);
		if(systems2.length<positions4.length){
			positions4.splice(positions4.length-positionsDifference,positionsDifference);
		}
		var governments1=lines.split("sys").filter(/./.test,/^tem/).join("<br>").replace(/tem /g,"");
		var governments2=governments1.split("<br>").filter(/./.test,/^	government/).join("<br>").replace(/government /g,"");
		var governments3=governments2.split("<br>");
		var governmentsDifference=(governments3.length-systems2.length);
		if(systems2.length<governments3.length){
			governments3.splice(governments3.length-governmentsDifference,governmentsDifference);
		}
		var i;
		for (i=0;i<systems2.length;i++){
			drawSystem(systems2[i],governments3[i],positions4[((i+1)*2)-1],positions4[(i+1)*2]);
		}
		document.getElementById("output").innerHTML=systems2.join("<br>");
		console.log("Systems: "+systems2.length);
		console.log("Positions: "+((positions4.length-1)/2));
		console.log("Governments: "+governments3.length);
	};
	reader.readAsText(that.files[0]);
}
function initialize(){
	img=document.getElementById("galaxy");
	context.scale(1/zoom,1/zoom);
	context.drawImage(img,0,0);
}
function slideLeft(){
	document.getElementById("left").classList.toggle("side");
	document.getElementById("left").classList.toggle("slide");
}
function slideRight(){
	document.getElementById("right").classList.toggle("side");
	document.getElementById("right").classList.toggle("slide");
}
function toggleDialog(){
	document.getElementById("dialogScreen").classList.toggle("hidden");
}