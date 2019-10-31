var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
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
canvas.height=screen.height;
canvas.width=screen.width;
draw();
function draw(){
    //1750,1090
    img=document.getElementById("galaxy");
    context.setTransform(1,0,0,1,0,0);
    context.scale(.4,.4);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.translate((pan.offset.x)*2.5,(pan.offset.y)*2.5);
    context.drawImage(img,0,-160);
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