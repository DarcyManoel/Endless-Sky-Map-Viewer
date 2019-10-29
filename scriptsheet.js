var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
canvas.height=screen.height;
canvas.width=screen.width;
var global={
    scale:1,
    offset:{
        x:0,
        y:0,
    },
};
var pan={
    start:{
        x:null,
        y:null,
    },
    offset:{
        x:0,
        y:0,
    },
};
draw();
function draw(){
    context.setTransform(1,0,0,1,0,0);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.translate(pan.offset.x,pan.offset.y);
    img=document.getElementById("galaxy");
    context.drawImage(img,10,10,1400,1000);
}
canvas.addEventListener("mousedown",startPan);
canvas.addEventListener("mouseleave",endPan);
canvas.addEventListener("mouseup",endPan);
function startPan(e){
    canvas.addEventListener("mousemove",trackMouse);
    canvas.addEventListener("mousemove",draw);
    pan.start.x=e.clientX;
    pan.start.y=e.clientY;
}
function endPan(e){
    canvas.removeEventListener("mousemove",trackMouse);
    pan.start.x=null;
    pan.start.y=null;
    global.offset.x=pan.offset.x;
    global.offset.y=pan.offset.y;
}
function trackMouse(e){
    var offsetX=e.clientX-pan.start.x;
    var offsetY=e.clientY-pan.start.y;
    pan.offset.x=global.offset.x+offsetX;
    pan.offset.y=global.offset.y+offsetY;
}