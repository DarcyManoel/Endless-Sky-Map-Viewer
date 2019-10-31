var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
var global={
    scale:1,
    offset:{
        x:0,
        y:0,
    },
};
var government={
    uninhabited:"rgba(102,102,102,.6)",
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
    //Aescolanus
    //-15 340
    context.beginPath();
    context.arc(1735,1430,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Antevorta
    //-36.1297 446.242
    context.beginPath();
    context.arc(1713.8703,1536.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Caeculus
    //162.87 343.242
    context.beginPath();
    context.arc(1912.87,1433.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Cardea
    //-89.1297 417.242
    context.beginPath();
    context.arc(1660.8703,1507.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Chikatip
    //-77.5695 -307.812
    context.beginPath();
    context.arc(1672.4305,782.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Chornifath
    //40.4305 -214.812
    context.beginPath();
    context.arc(1790.4305,875.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Coluber
    //149.504 197.389
    context.beginPath();
    context.arc(1899.504,1287.389,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Convector
    //-14.1297 379.242
    context.beginPath();
    context.arc(1735.8703,1469.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Edusa
    //273.87 347.242
    context.beginPath();
    context.arc(2023.87,1437.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Farbutero
    //93.4305 -251.812
    context.beginPath();
    context.arc(1843.4305,838.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Farinus
    //202.87 440.242
    context.beginPath();
    context.arc(1952.87,1530.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Fasitopfar
    //92.4305 -105.812
    context.beginPath();
    context.arc(1842.4305,984.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Feroteri
    //149.431 -205.812
    context.beginPath();
    context.arc(1899.431,884.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Fornarep
    //79.4305 -309.812
    context.beginPath();
    context.arc(1829.4305,780.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Furmeliki
    //-35.5695 -281.812
    context.beginPath();
    context.arc(1714.4305,808.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Hesselpost
    //-30.5695 -187.812
    context.beginPath();
    context.arc(1719.4305,902.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Host
    //384.431 -543.812
    context.beginPath();
    context.arc(2134.431,546.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Insitor
    //-28.1296 400.242
    context.beginPath();
    context.arc(1721.8704,1490.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Kaliptari
    //85.4305 -402.812
    context.beginPath();
    context.arc(1835.4305,687.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Kasikfar
    //10.4305 -127.812
    context.beginPath();
    context.arc(1760.4305,962.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Korsmanath
    //97.4305 -185.812
    context.beginPath();
    context.arc(1847.4305,904.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Levana
    //203.504 247.389
    context.beginPath();
    context.arc(1953.504,1337.389,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Lucina
    //175.504 176.389
    context.beginPath();
    context.arc(1925.504,1266.389,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Meftarkata
    //52.4305 -276.812
    context.beginPath();
    context.arc(1802.4305,813.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Mesuket
    //220.431 -409.812
    context.beginPath();
    context.arc(1970.431,680.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Nenia
    //-39.1297 467.242
    context.beginPath();
    context.arc(1710.8703,1557.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Ossipago
    //6.87033 429.242
    context.beginPath();
    context.arc(1756.87033,1519.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Parca
    //150.504 151.389
    context.beginPath();
    context.arc(1900.504,1241.389,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Peragenor
    //86.8703 356.242
    context.beginPath();
    context.arc(1836.8703,1446.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Peresedersi
    //81.4305 -154.812
    context.beginPath();
    context.arc(1831.4305,935.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Perfica
    //185.87 419.242
    context.beginPath();
    context.arc(1935.87,1509.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Persitar
    //297.431 -395.812
    context.beginPath();
    context.arc(2047.431,694.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Sabriset
    //151.724 -426.518
    context.beginPath();
    context.arc(1901.724,663.482,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Sabriset
    //151.724 -426.518
    context.beginPath();
    context.arc(1901.724,663.482,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Sagittarius A*
    //112 22
    context.beginPath();
    context.arc(1862,1112,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Segesta
    //111.87 294.242
    context.beginPath();
    context.arc(1861.87,1384.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Seketra
    //-24.5695 -356.812
    context.beginPath();
    context.arc(1725.4305,733.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Sepriaptu
    //139.431 -448.812
    context.beginPath();
    context.arc(1889.431,641.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Skeruto
    //28.4305 -339.812
    context.beginPath();
    context.arc(1778.4305,750.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Solifar
    //47.4305 -435.812
    context.beginPath();
    context.arc(1797.4305,654.188,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
    //Stercutus
    //140.87 320.242
    context.beginPath();
    context.arc(1890.87,1410.242,10,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle="#fff";//government["uninhabited"]
    context.stroke();
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