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
    context.clearRect(0,0,canvas.width,canvas.height);
    context.scale(.4,.4);
    context.translate((pan.offset.x)*2.5,(pan.offset.y)*2.5);
    context.drawImage(img,0,-160);
    //1 Axis
    //-1274.63 267.214
    context.beginPath();
    context.arc(475.37,1357.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //10 Pole
    //-1356.63 19.2137
    context.beginPath();
    context.arc(393.37,1109.2137,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //11 Autumn Above
    //-1278.63 148.214
    context.beginPath();
    context.arc(471.37,1238.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //11 Spring Below
    //-1272.63 380.214
    context.beginPath();
    context.arc(477.37,1470.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //12 Autumn Above
    //-1276.63 -19.7863
    context.beginPath();
    context.arc(473.37,1070.2137,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //14 Pole
    //-1343.63 -119.786
    context.beginPath();
    context.arc(406.37,970.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //14 Summer Above
    //-1436.63 182.214
    context.beginPath();
    context.arc(313.37,1272.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //14 Winter Below
    //-1143.63 341.214
    context.beginPath();
    context.arc(606.37,1431.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //16 Autumn Rising
    //-1305.63 74.2137
    context.beginPath();
    context.arc(444.37,1164.2137,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //3 Axis
    //-1235.63 299.214
    context.beginPath();
    context.arc(514.37,1389.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //3 Pole
    //-1344.63 162.214
    context.beginPath();
    context.arc(405.37,1252.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //3 Spring Rising
    //-1414.63 356.214
    context.beginPath();
    context.arc(335.37,1446.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //4 Axis
    //-1169.63 365.214
    context.beginPath();
    context.arc(580.37,1455.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //4 Spring Rising
    //-1309.63 321.214
    context.beginPath();
    context.arc(440.37,1411.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //4 Summer Rising
    //-1377.63 207.214
    context.beginPath();
    context.arc(372.37,1297.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //4 Winter Rising
    //-1259.63 248.214
    context.beginPath();
    context.arc(490.37,1338.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //5 Axis
    //-1142.63 394.214
    context.beginPath();
    context.arc(607.37,1484.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //5 Spring Below
    //-1213.63 415.214
    context.beginPath();
    context.arc(536.37,1505.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //5 Summer Above
    //-1387.63 118.214
    context.beginPath();
    context.arc(362.37,1208.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //5 Winter Above
    //-1216.63 208.214
    context.beginPath();
    context.arc(533.37,1298.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //7 Autumn Rising
    //-1235.63 177.214
    context.beginPath();
    context.arc(514.37,1267.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //8 Winter Below
    //-1179.63 284.214
    context.beginPath();
    context.arc(570.37,1374.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //9 Spring Above
    //-1377.63 281.214
    context.beginPath();
    context.arc(372.37,1371.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Ablodab
    //-854.587 592.051
    context.beginPath();
    context.arc(895.413,1682.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Ablub
    //-581.587 637.051
    context.beginPath();
    context.arc(1168.413,1727.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Acrux
    //-808 192
    context.beginPath();
    context.arc(942,1282,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Acamar
    //-284 -3
    context.beginPath();
    context.arc(1466,1087,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Achernar
    //-93 154
    context.beginPath();
    context.arc(1657,1244,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Adhara
    //-669 -200
    context.beginPath();
    context.arc(1081,890,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Aescolanus
    //-15 340
    context.beginPath();
    context.arc(1735,1430,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Al Dhanab
    //-177 207
    context.beginPath();
    context.arc(1573,1297,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Albaldah
    //-350 484
    context.beginPath();
    context.arc(1400,1574,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Albireo
    //-270 503
    context.beginPath();
    context.arc(1480,1593,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alcyone
    //-80 -144
    context.beginPath();
    context.arc(1670,946,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Aldebaran
    //-356 -26
    context.beginPath();
    context.arc(1394,1064,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alderamin
    //-272 258
    context.beginPath();
    context.arc(1478,1348,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Aldhibain
    //-659 451
    context.beginPath();
    context.arc(1091,1541,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Algenib
    //-118 341
    context.beginPath();
    context.arc(1632,1431,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Algieba
    //-691 -52
    context.beginPath();
    context.arc(1059,1038,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Algol
    //-210 17
    context.beginPath();
    context.arc(1540,1107,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Algorel
    //-631 145
    context.beginPath();
    context.arc(1119,1235,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alheka
    //-350 -271
    context.beginPath();
    context.arc(1400,819,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alhena
    //-430 -80
    context.beginPath();
    context.arc(1320,1010,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alioth
    //-620 315
    context.beginPath();
    context.arc(1130,1405,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alkaid
    //-825 318
    context.beginPath();
    context.arc(925,1408,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Almaaz
    //-349 -538
    context.beginPath();
    context.arc(1401,552,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Almach
    //-7 232
    context.beginPath();
    context.arc(1743,1322,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Alnair
    //-272 314
    context.beginPath();
    context.arc(1478,1404,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Alnasl
    //-553 380
    context.beginPath();
    context.arc(1197,1470,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alnilam
    //-487 -513
    context.beginPath();
    context.arc(1263,577,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Alnitak
    //-331 -412
    context.beginPath();
    context.arc(1419,778,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alniyat
    //-691 501
    context.beginPath();
    context.arc(1059,1591,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alpha Arae
    //-481 394
    context.beginPath();
    context.arc(1269,1484,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alpha Centauri
    //-429 125
    context.beginPath();
    context.arc(1321,1215,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alpha Hydri
    //-97 98
    context.beginPath();
    context.arc(1653,1188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Alphard
    //-588 -47
    context.beginPath();
    context.arc(1162,1043,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alphecca
    //-546 308
    context.beginPath();
    context.arc(1204,1398,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Alpheratz
    //-176 125
    context.beginPath();
    context.arc(1574,1215,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Altair
    //-357 161
    context.beginPath();
    context.arc(1393,1251,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Aludra
    //-606 -374
    context.beginPath();
    context.arc(1144,716,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Ancient Hope
    //-1159.59 702.051
    context.beginPath();
    context.arc(590.41,1792.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Ankaa
    //-230 100
    context.beginPath();
    context.arc(1520,1190,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Answer
    //-1086.59 631.051
    context.beginPath();
    context.arc(663.41,1721.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Antares
    //-711 541
    context.beginPath();
    context.arc(1039,1631,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Antevorta
    //-36.1297 446.242
    context.beginPath();
    context.arc(1713.8703,1536.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Ap'arak
    //-164.62 -781.858
    context.beginPath();
    context.arc(1585.38,308.142,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Arcturus
    //-589 226
    context.beginPath();
    context.arc(1161,1316,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Arculus
    //308.87 393.242
    context.beginPath();
    context.arc(2058.87,1483.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["remnant"];
    context.stroke();
    //Arneb
    //-523 -580
    context.beginPath();
    context.arc(1227,510,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Ascella
    //-376 328
    context.beginPath();
    context.arc(1374,1418,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Asikafarnut
    //253.431 -584.812
    context.beginPath();
    context.arc(2003.431,505.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["sestor"];
    context.stroke();
    //Aspidiske
    //-690 -282
    context.beginPath();
    context.arc(1060,808,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Atria
    //-551 532
    context.beginPath();
    context.arc(1199,1622,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Avior
    //-658 -317
    context.beginPath();
    context.arc(1092,773,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Aya'k'k
    //-434.245 -616.57
    context.beginPath();
    context.arc(1315.755,473.43,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Beginning
    //-912.587 694.051
    context.beginPath();
    context.arc(837.413,1784.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Bellatrix
    //-225 -82
    context.beginPath();
    context.arc(1525,1008,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Belonging
    //-1007.59 658.051
    context.beginPath();
    context.arc(742.41,1748.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Belug
    //-1024.59 388.051
    context.beginPath();
    context.arc(725.41,1478.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Belugt
    //-838.587 668.051
    context.beginPath();
    context.arc(911.413,1758.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Beta Lupi
    //-851 417
    context.beginPath();
    context.arc(899,1507,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Betelgeuse
    //-384 -322
    context.beginPath();
    context.arc(1366,768,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Bloptab
    //-813.587 727.051
    context.beginPath();
    context.arc(936.413,1817.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Blubipad
    //-650.587 594.051
    context.beginPath();
    context.arc(1099.413,1684.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Blugtad
    //-771.587 680.051
    context.beginPath();
    context.arc(978.413,1770.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Boral
    //-502 331
    context.beginPath();
    context.arc(1248,1421,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Bore Fah
    //71.7761 -592.536
    context.beginPath();
    context.arc(1821.7761,497.464,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Bote Asu
    //8.87418 -572.768
    context.beginPath();
    context.arc(1758.87418,517.232,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Bright Void
    //-1059.59 605.051
    context.beginPath();
    context.arc(690.41,1695.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Broken Bowl
    //-956.587 566.051
    context.beginPath();
    context.arc(793.413,1656.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Caeculus
    //162.87 343.242
    context.beginPath();
    context.arc(1912.87,1433.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Canopus
    //-421 -225
    context.beginPath();
    context.arc(1329,865,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Capella
    //-378 -13
    context.beginPath();
    context.arc(1372,1077,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Caph
    //-295 77
    context.beginPath();
    context.arc(1455,1167,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Cardax
    //-211 -215
    context.beginPath();
    context.arc(1539,875,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Cardea
    //-89.1297 417.242
    context.beginPath();
    context.arc(1660.8703,1507.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Castor
    //-452 -17
    context.beginPath();
    context.arc(1298,1073,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Cebalrai
    //-461 282
    context.beginPath();
    context.arc(1289,1372,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Celeborim
    //181.431 -633.812
    context.beginPath();
    context.arc(1931.431,456.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["sestor"];
    context.stroke();
    //Chikatip
    //-77.5695 -307.812
    context.beginPath();
    context.arc(1672.4305,782.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Chirr'ay'akai
    //-102.761 -749.614
    context.beginPath();
    context.arc(1647.239,340.386,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Chornifath
    //40.4305 -214.812
    context.beginPath();
    context.arc(1790.4305,875.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Chy'chra
    //85.5308 -829.667
    context.beginPath();
    context.arc(1835.5308,260.333,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Cinxia
    //265.87 415.242
    context.beginPath();
    context.arc(2015.87,1505.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["remnant"];
    context.stroke();
    //Coluber
    //149.504 197.389
    context.beginPath();
    context.arc(1899.504,1287.389,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Companion
    //-1032.59 709.051
    context.beginPath();
    context.arc(717.41,1799.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Convector
    //-14.1297 379.242
    context.beginPath();
    context.arc(1735.8703,1469.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Cor Caroli
    //-682 201
    context.beginPath();
    context.arc(1068,1291,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Da Ent
    //-6.22391 -462.536
    context.beginPath();
    context.arc(1743.77609,627.464,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Da Lest
    //-23.2239 -413.536
    context.beginPath();
    context.arc(1726.7761,676.464,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Dabih
    //-253 427
    context.beginPath();
    context.arc(1497,1517,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Danoa
    //-239 -321
    context.beginPath();
    context.arc(1511,769,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Dark Hills
    //-926.587 619.051
    context.beginPath();
    context.arc(823.413,1709.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Debrugt
    //-869.587 513.051
    context.beginPath();
    context.arc(880.413,1603.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Delta Capricorni
    //-285 202
    context.beginPath();
    context.arc(1465,1292,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Delta Sagittarii
    //-414 416
    context.beginPath();
    context.arc(1336,1506,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Delta Velorum
    //-740 90
    context.beginPath();
    context.arc(1010,1180,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Deneb
    //-348 225
    context.beginPath();
    context.arc(1402,1315,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pug"];
    context.stroke();
    //Denebola
    //-478 70
    context.beginPath();
    context.arc(1272,1160,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Diphda
    //-262 61
    context.beginPath();
    context.arc(1488,1151,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Dokdobaru
    //-21.5695 -241.812
    context.beginPath();
    context.arc(1728.4305,848.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["quarg"];
    context.stroke();
    //Dschubba
    //-598 501
    context.beginPath();
    context.arc(1152,1591,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Dubhe
    //-577 -103
    context.beginPath();
    context.arc(1173,987,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Due Yoot
    //-167.547 -426.683
    context.beginPath();
    context.arc(1582.453,663.317,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Durax
    //-59 -90
    context.beginPath();
    context.arc(1691,1000,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Eber
    //-532 406
    context.beginPath();
    context.arc(1218,1496,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Eblumab
    //-767.587 703.051
    context.beginPath();
    context.arc(982.413,1793.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Edusa
    //273.87 347.242
    context.beginPath();
    context.arc(2023.87,1437.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Ehma Ti
    //39.1085 -749.244
    context.beginPath();
    context.arc(1789.1085,340.756,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["unfettered"];
    context.stroke();
    //Ek'kek'ru
    //-287.517 -727.738
    context.beginPath();
    context.arc(1462.483,362.262,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Ekuarik
    //-1029.63 426.214
    context.beginPath();
    context.arc(720.37,1516.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["heliarch"];
    context.stroke();
    //Elnath
    //-288 -77
    context.beginPath();
    context.arc(1462,1013,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Eltanin
    //-328 433
    context.beginPath();
    context.arc(1422,1523,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Eneremprukt
    //311.431 -448.812
    context.beginPath();
    context.arc(2061.431,641.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["sestor"];
    context.stroke();
    //Enif
    //-177 498
    context.beginPath();
    context.arc(1573,1588,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["quarg"];
    context.stroke();
    //Epsilon Leonis
    //-619 -229
    context.beginPath();
    context.arc(1131,861,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Es'sprak'ai
    //-469.044 -733.375
    context.beginPath();
    context.arc(1280.956,356.625,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Eteron
    //-330 33
    context.beginPath();
    context.arc(1420,1123,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Fah Root
    //-264.065 -400.135
    context.beginPath();
    context.arc(1485.935,689.865,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Fah Soom
    //-179.891 -335.011
    context.beginPath();
    context.arc(1570.109,754.989,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Fala
    //-690 64
    context.beginPath();
    context.arc(1060,1154,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Fallen Leaf
    //-903.587 717.051
    context.beginPath();
    context.arc(846.413,1807.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Far Horizon
    //-1108.59 726.051
    context.beginPath();
    context.arc(641.41,1816.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Farbutero
    //93.4305 -251.812
    context.beginPath();
    context.arc(1843.4305,838.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Farinus
    //202.87 440.242
    context.beginPath();
    context.arc(1952.87,1530.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Fasitopfar
    //92.4305 -105.812
    context.beginPath();
    context.arc(1842.4305,984.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Fell Omen
    //-1156.59 475.051
    context.beginPath();
    context.arc(593.41,1565.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Feroteri
    //149.431 -205.812
    context.beginPath();
    context.arc(1899.431,884.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Ferukistek
    //307.431 -515.812
    context.beginPath();
    context.arc(2057.431,574.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["sestor"];
    context.stroke();
    //Fingol
    //-482 113
    context.beginPath();
    context.arc(1268,1203,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Flugbu
    //-903.587 534.051
    context.beginPath();
    context.arc(846.413,1624.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Fomalhaut
    //-314 124
    context.beginPath();
    context.arc(1436,1214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Fornarep
    //79.4305 -309.812
    context.beginPath();
    context.arc(1829.4305,780.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Four Pillars
    //-1210.59 772.051
    context.beginPath();
    context.arc(539.41,1862.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Furmeliki
    //-35.5695 -281.812
    context.beginPath();
    context.arc(1714.4305,808.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Gacrux
    //-713 184
    context.beginPath();
    context.arc(1037,1274,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Gamma Cassiopeiae
    //-116 293
    context.beginPath();
    context.arc(1634,1383,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Gamma Corvi
    //-906 64
    context.beginPath();
    context.arc(844,1154,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Gienah
    //-176 354
    context.beginPath();
    context.arc(1574,1444,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Girtab
    //-430 481
    context.beginPath();
    context.arc(1320,1571,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Glubatub
    //-650.587 693.051
    context.beginPath();
    context.arc(1099.413,1783.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Gomeisa
    //-600 -161
    context.beginPath();
    context.arc(1150,929,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Good Omen
    //-941.587 746.051
    context.beginPath();
    context.arc(808.413,1836.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Gorvi
    //-250 -483
    context.beginPath();
    context.arc(1500,607,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Graffias
    //-784 517
    context.beginPath();
    context.arc(966,1607,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Gupta
    //-808.587 625.051
    context.beginPath();
    context.arc(941.413,1715.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Hadar
    //-788 283
    context.beginPath();
    context.arc(962,1373,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Hamal
    //-129 24
    context.beginPath();
    context.arc(1621,1114,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Han
    //-610 561
    context.beginPath();
    context.arc(1140,1651,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Hassaleh
    //-291 -287
    context.beginPath();
    context.arc(1459,803,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Hatysa
    //-474 -542
    context.beginPath();
    context.arc(1276,548,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Heia Due
    //-146.177 -481.694
    context.beginPath();
    context.arc(1603.823,608.306,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Hesselpost
    //-30.5695 -187.812
    context.beginPath();
    context.arc(1719.4305,902.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Hevru Hai
    //-189 -310
    context.beginPath();
    context.arc(1561,780,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["quarg"];
    context.stroke();
    //Hi Yahr
    //82.3672 -641.6
    context.beginPath();
    context.arc(1832.3672,448.4,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["unfettered"];
    context.stroke();
    //Hintar
    //-422 311
    context.beginPath();
    context.arc(1328,1401,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Holeb
    //-590 287
    context.beginPath();
    context.arc(1160,1377,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Homeward
    //-1045.59 477.051
    context.beginPath();
    context.arc(704.41,1567.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Host
    //384.431 -543.812
    context.beginPath();
    context.arc(2134.431,546.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Hunter
    //-968.587 590.051
    context.beginPath();
    context.arc(781.413,1680.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Ik'kara'ka
    //56.2159 -888.296
    context.beginPath();
    context.arc(1806.2159,201.704,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Ildaria
    //-702 317
    context.beginPath();
    context.arc(1048,1407,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Imo Dep
    //-56.2764 -600.1
    context.beginPath();
    context.arc(1693.7236,489.9,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Insitor
    //-28.1296 400.242
    context.beginPath();
    context.arc(1721.8704,1490.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Io Lowe
    //-94.7566 -527.728
    context.beginPath();
    context.arc(1655.2434,562.272,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Io Mann
    //-192.955 -447.669
    context.beginPath();
    context.arc(1557.045,642.331,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Ipsing
    //-549 160
    context.beginPath();
    context.arc(1201,1250,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Iyech'yek
    //-277.37 -693.913
    context.beginPath();
    context.arc(1472.63,396.087,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Izar
    //-784 231
    context.beginPath();
    context.arc(966,1321,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Ka'ch'chrai
    //-240.163 -822.448
    context.beginPath();
    context.arc(1509.837,267.552,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Ka'pru
    //-76.6756 -994.955
    context.beginPath();
    context.arc(1673.3244,95.045,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Kaliptari
    //85.4305 -402.812
    context.beginPath();
    context.arc(1835.4305,687.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Kappa Centauri
    //-867 480
    context.beginPath();
    context.arc(883,1570,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Kashikt
    //-73.5695 -219.812
    context.beginPath();
    context.arc(1676.4305,870.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["efret"];
    context.stroke();
    //Kasikfar
    //10.4305 -127.812
    context.beginPath();
    context.arc(1760.4305,962.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Kaus Australis
    //-284 395
    context.beginPath();
    context.arc(1466,1485,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Kaus Borealis
    //-456 350
    context.beginPath();
    context.arc(1294,1440,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Ki War Ek
    //-1106.63 368.214
    context.beginPath();
    context.arc(643.37,1458.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["heliarch"];
    context.stroke();
    //Kiro'ku
    //-131.923 -884.46
    context.beginPath();
    context.arc(1618.077,205.54,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Kiru'kichi
    //-195.063 -662.343
    context.beginPath();
    context.arc(1554.937,427.657,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Kochab
    //-731 279
    context.beginPath();
    context.arc(1019,1369,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Kor Ak'Mari
    //43 42
    context.beginPath();
    context.arc(1793,1132,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["korath"];
    context.stroke();
    //Kor En'lakfar
    //-31 -33
    context.beginPath();
    context.arc(1719,1057,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["korath"];
    context.stroke();
    //Kor Fel'tar
    //29 -66
    context.beginPath();
    context.arc(1779,1024,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["korath"];
    context.stroke();
    //Kor Men
    //6 -5
    context.beginPath();
    context.arc(1756,1085,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["korath"];
    context.stroke();
    //Kor Nor'peli
    //52 160
    context.beginPath();
    context.arc(1802,1250,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["korath"];
    context.stroke();
    //Kor Tar'bei
    //57 106
    context.beginPath();
    context.arc(1807,1196,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["korath"];
    context.stroke();
    //Kor Zena'i
    //-2 83
    context.beginPath();
    context.arc(1748,1173,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["korath"];
    context.stroke();
    //Kornephoros
    //-612 424
    context.beginPath();
    context.arc(1138,1514,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Korsmanath
    //97.4305 -185.812
    context.beginPath();
    context.arc(1847.4305,904.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Kraz
    //-876 204
    context.beginPath();
    context.arc(874,1294,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Kugel
    //-230 -26
    context.beginPath();
    context.arc(1520,1064,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Kursa
    //-366 -105
    context.beginPath();
    context.arc(1384,985,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Last Word
    //-1145.59 495.051
    context.beginPath();
    context.arc(604.41,1585.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Lesath
    //-516 485
    context.beginPath();
    context.arc(1234,1575,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Levana
    //203.504 247.389
    context.beginPath();
    context.arc(1953.504,1337.389,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Limen
    //-791.99 -12.2491
    context.beginPath();
    context.arc(958.01,1077.7509,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Lolami
    //-628 -10
    context.beginPath();
    context.arc(1122,1080,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Lom Tahr
    //-94.0437 -446.586
    context.beginPath();
    context.arc(1655.9563,643.414,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Lone Cloud
    //-1239.59 747.051
    context.beginPath();
    context.arc(510.41,1837.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Lucina
    //175.504 176.389
    context.beginPath();
    context.arc(1925.504,1266.389,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Lurata
    //-279 463
    context.beginPath();
    context.arc(1471,1553,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Makferuti
    //288.431 -628.812
    context.beginPath();
    context.arc(2038.431,461.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["sestor"];
    context.stroke();
    //Markab
    //-241 168
    context.beginPath();
    context.arc(1509,1258,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Markeb
    //-602 -305
    context.beginPath();
    context.arc(1148,785,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Matar
    //-218 272
    context.beginPath();
    context.arc(1532,1362,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Mebla
    //-814.587 555.051
    context.beginPath();
    context.arc(935.413,1645.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Mebsuta
    //-482 -394
    context.beginPath();
    context.arc(1268,696,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Meftarkata
    //52.4305 -276.812
    context.beginPath();
    context.arc(1802.4305,813.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Mei Yohn
    //-106.757 -581.698
    context.beginPath();
    context.arc(1643.243,508.302,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Membulem
    //-722.587 616.051
    context.beginPath();
    context.arc(1027.413,1706.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Men
    //-888 361
    context.beginPath();
    context.arc(862,1451,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Menkalinan
    //-400 -61
    context.beginPath();
    context.arc(1350,1029,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Menkar
    //-183 -52
    context.beginPath();
    context.arc(1567,1038,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Menkent
    //-495 218
    context.beginPath();
    context.arc(1255,1308,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Merak
    //-553 60
    context.beginPath();
    context.arc(1197,1150,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Mesuket
    //220.431 -409.812
    context.beginPath();
    context.arc(1970.431,680.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Miaplacidus
    //-524 -69
    context.beginPath();
    context.arc(1226,1021,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Miblulub
    //-630.587 670.051
    context.beginPath();
    context.arc(1119.413,1760.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Mimosa
    //-895 168
    context.beginPath();
    context.arc(855,1258,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Minkar
    //-823 138
    context.beginPath();
    context.arc(927,1228,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Mintaka
    //-304 -462
    context.beginPath();
    context.arc(1446,628,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Mirach
    //-166 250
    context.beginPath();
    context.arc(1584,1340,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Mirfak
    //-187 -128
    context.beginPath();
    context.arc(1563,962,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Mirzam
    //-498 -301
    context.beginPath();
    context.arc(1252,789,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Mizar
    //-579 184
    context.beginPath();
    context.arc(1171,1274,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Moktar
    //-169 -170
    context.beginPath();
    context.arc(1581,920,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Mora
    //-755 23
    context.beginPath();
    context.arc(995,1113,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Muhlifain
    //-702 242
    context.beginPath();
    context.arc(1048,1332,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Muphrid
    //-495 152
    context.beginPath();
    context.arc(1255,1242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Naos
    //-653 -396
    context.beginPath();
    context.arc(1097,694,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Naper
    //-416 369
    context.beginPath();
    context.arc(1334,1459,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Nenia
    //-39.1297 467.242
    context.beginPath();
    context.arc(1710.8703,1557.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Nihal
    //-262 -121
    context.beginPath();
    context.arc(1488,969,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Nocte
    //-467 172
    context.beginPath();
    context.arc(1283,1262,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Nunki
    //-393 537
    context.beginPath();
    context.arc(1357,1627,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Oblate
    //-124 -119
    context.beginPath();
    context.arc(1626,971,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Orbona
    //-735.99 -97.2491
    context.beginPath();
    context.arc(1014.01,992.7509,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Orvala
    //-334 303
    context.beginPath();
    context.arc(1416,1393,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Ossipago
    //6.87033 429.242
    context.beginPath();
    context.arc(1756.87033,1519.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Pantica
    //303.87 445.242
    context.beginPath();
    context.arc(2053.87,1535.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["remnant"];
    context.stroke();
    //Parca
    //150.504 151.389
    context.beginPath();
    context.arc(1900.504,1241.389,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Peacock
    //-307 350
    context.beginPath();
    context.arc(1443,1440,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Pelubta
    //-757.587 575.051
    context.beginPath();
    context.arc(992.413,1665.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Peragenor
    //86.8703 356.242
    context.beginPath();
    context.arc(1836.8703,1446.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Peresedersi
    //81.4305 -154.812
    context.beginPath();
    context.arc(1831.4305,935.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Perfica
    //185.87 419.242
    context.beginPath();
    context.arc(1935.87,1509.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Persian
    //-203 331
    context.beginPath();
    context.arc(1547,1421,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Persitar
    //297.431 -395.812
    context.beginPath();
    context.arc(2047.431,694.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Phact
    //-375 -191
    context.beginPath();
    context.arc(1375,899,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Phecda
    //-607 88
    context.beginPath();
    context.arc(1143,1178,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Pherkad
    //-798 451
    context.beginPath();
    context.arc(952,1541,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Phurad
    //-494 -153
    context.beginPath();
    context.arc(1256,937,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Pik'ro'iyak
    //-378.845 -677.001
    context.beginPath();
    context.arc(1371.155,412.999,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Plort
    //-708.587 723.051
    context.beginPath();
    context.arc(1041.413,1813.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Polaris
    //-35 126
    context.beginPath();
    context.arc(1715,1216,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Pollux
    //-465 4
    context.beginPath();
    context.arc(1285,1094,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Porrima
    //-556 123
    context.beginPath();
    context.arc(1194,1213,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Prakacha'a
    //-35.1114 -802.607
    context.beginPath();
    context.arc(1714.8886,287.393,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Procyon
    //-411 23
    context.beginPath();
    context.arc(1339,1113,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Pug Iyik
    //-361.149 -883.233
    context.beginPath();
    context.arc(1388.851,206.767,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pug"];
    context.stroke();
    //Quaru
    //-1080.63 448.214
    context.beginPath();
    context.arc(669.37,1538.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["heliarch"];
    context.stroke();
    //Rajak
    //-270 -236
    context.beginPath();
    context.arc(1480,854,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Rasalhague
    //-413 246
    context.beginPath();
    context.arc(1337,1336,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Rastaban
    //-463 446
    context.beginPath();
    context.arc(1287,1536,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Rati Cal
    //-116.765 -391.123
    context.beginPath();
    context.arc(1633.235,698.877,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Regor
    //-702 -335
    context.beginPath();
    context.arc(1048,755,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Regulus
    //-544 25
    context.beginPath();
    context.arc(1206,1115,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Remembrance
    //-884.587 641.051
    context.beginPath();
    context.arc(865.413,1731.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Rigel
    //-324 -363
    context.beginPath();
    context.arc(1426,727,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Ruchbah
    //-174 69
    context.beginPath();
    context.arc(1576,1159,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Rutilicus
    //-535 273
    context.beginPath();
    context.arc(1215,1363,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Sabik
    //-675 379
    context.beginPath();
    context.arc(1075,1469,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Sabriset
    //151.724 -426.518
    context.beginPath();
    context.arc(1901.724,663.482,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Sabriset
    //151.724 -426.518
    context.beginPath();
    context.arc(1901.724,663.482,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Sadalmelik
    //-145 472
    context.beginPath();
    context.arc(1605,1562,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["quarg"];
    context.stroke();
    //Sadalsuud
    //-134 508
    context.beginPath();
    context.arc(1616,1598,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["quarg"];
    context.stroke();
    //Sadr
    //-287 543
    context.beginPath();
    context.arc(1463,1633,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Sagittarius A*
    //112 22
    context.beginPath();
    context.arc(1862,1112,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Saiph
    //-375 -390
    context.beginPath();
    context.arc(1375,700,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Sargas
    //-542 445
    context.beginPath();
    context.arc(1208,1535,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Sarin
    //-670 293
    context.beginPath();
    context.arc(1080,1383,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Scheat
    //-205 233
    context.beginPath();
    context.arc(1545,1323,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Schedar
    //-93 229
    context.beginPath();
    context.arc(1657,1319,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Segesta
    //111.87 294.242
    context.beginPath();
    context.arc(1861.87,1384.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Seginus
    //-557 356
    context.beginPath();
    context.arc(1193,1446,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Seketra
    //-24.5695 -356.812
    context.beginPath();
    context.arc(1725.4305,733.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Sepriaptu
    //139.431 -448.812
    context.beginPath();
    context.arc(1889.431,641.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Sevrelect
    //-114.569 -239.812
    context.beginPath();
    context.arc(1635.431,850.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["efret"];
    context.stroke();
    //Shaula
    //-460 527
    context.beginPath();
    context.arc(1290,1617,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Sheratan
    //-40 45
    context.beginPath();
    context.arc(1710,1135,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Si'yak'ku
    //-329.235 -760.435
    context.beginPath();
    context.arc(1420.765,329.565,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Sich'ka'ara
    //-97.1237 -831.921
    context.beginPath();
    context.arc(1652.8763,258.079,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Silikatakfar
    //248.431 -481.812
    context.beginPath();
    context.arc(1998.431,608.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["sestor"];
    context.stroke();
    //Silver Bell
    //-1045.59 541.051
    context.beginPath();
    context.arc(704.41,1631.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Silver String
    //-1022.59 517.051
    context.beginPath();
    context.arc(727.41,1607.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Sirius
    //-378 44
    context.beginPath();
    context.arc(1372,1134,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Skeruto
    //28.4305 -339.812
    context.beginPath();
    context.arc(1778.4305,750.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Sko'karak
    //-304.43 -930.688
    context.beginPath();
    context.arc(1445.57,159.312,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["wanderer"];
    context.stroke();
    //Sobarati
    //277.431 -557.812
    context.beginPath();
    context.arc(2027.431,532.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["sestor"];
    context.stroke();
    //Sol
    //-400 100
    context.beginPath();
    context.arc(1350,1190,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Sol Arach
    //-711.587 649.051
    context.beginPath();
    context.arc(1038.413,1739.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Sol Kimek
    //-1310.63 227.214
    context.beginPath();
    context.arc(439.37,1317.214,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Sol Saryd
    //-1037.59 675.051
    context.beginPath();
    context.arc(712.41,1765.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Solifar
    //47.4305 -435.812
    context.beginPath();
    context.arc(1797.4305,654.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Sospi
    //-317 -161
    context.beginPath();
    context.arc(1433,929,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Speloog
    //-967.587 445.051
    context.beginPath();
    context.arc(782.413,1535.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Spica
    //-906 120
    context.beginPath();
    context.arc(844,1210,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Steep Roof
    //-1113.59 570.051
    context.beginPath();
    context.arc(636.41,1660.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Stercutus
    //140.87 320.242
    context.beginPath();
    context.arc(1890.87,1410.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Suhail
    //-774 -338
    context.beginPath();
    context.arc(976,752,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Sumar
    //-236 -273
    context.beginPath();
    context.arc(1514,817,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Sumprast
    //-101.569 -262.812
    context.beginPath();
    context.arc(1648.431,827.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["efret"];
    context.stroke();
    //Tais
    //-346 381
    context.beginPath();
    context.arc(1404,1471,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Talita
    //-519 -26
    context.beginPath();
    context.arc(1231,1064,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Tania Australis
    //-671 7
    context.beginPath();
    context.arc(1079,1097,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Tarazed
    //-194 448
    context.beginPath();
    context.arc(1556,1538,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Tebuteb
    //-615.587 710.051
    context.beginPath();
    context.arc(1134.413,1800.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Tejat
    //-489 -107
    context.beginPath();
    context.arc(1261,983,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Terminus
    //-727.99 -23.2491
    context.beginPath();
    context.arc(1022.01,1066.7509,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Torbab
    //-949.587 490.051
    context.beginPath();
    context.arc(800.413,1580.051,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["coalition"];
    context.stroke();
    //Tortor
    //-255 -424
    context.beginPath();
    context.arc(1495,666,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Turais
    //-691 134
    context.beginPath();
    context.arc(1059,1224,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Ula Mon
    //-64.1218 -559.868
    context.beginPath();
    context.arc(1685.8782,530.132,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Ultima Thule
    //-336 -211
    context.beginPath();
    context.arc(1414,879,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Umbral
    //-164 406
    context.beginPath();
    context.arc(1586,1496,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Unagi
    //-306 -578
    context.beginPath();
    context.arc(1444,512,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["pirate"];
    context.stroke();
    //Unukalhai
    //-710 405
    context.beginPath();
    context.arc(1040,1495,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Uwa Fahn
    //35.1585 -491.67
    context.beginPath();
    context.arc(1785.1585,598.33,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Vega
    //-402 182
    context.beginPath();
    context.arc(1348,1272,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Vindemiatrix
    //-635 257
    context.beginPath();
    context.arc(1115,1347,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Volax
    //-256 -179
    context.beginPath();
    context.arc(1494,911,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Wah Ki
    //14.9925 -612.792
    context.beginPath();
    context.arc(1764.9925,477.208,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Wah Oh
    //-205.344 -381.381
    context.beginPath();
    context.arc(1544.656,708.619,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Wah Yoot
    //40.9382 -685.994
    context.beginPath();
    context.arc(1790.9382,404.006,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["unfettered"];
    context.stroke();
    //Waypoint
    //-184 -515
    context.beginPath();
    context.arc(1566,575,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Wazn
    //-385 -131
    context.beginPath();
    context.arc(1365,959,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Wei
    //-598 369
    context.beginPath();
    context.arc(1152,1459,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Wezen
    //-664 -433
    context.beginPath();
    context.arc(1086,657,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Ya Hai
    //-24.9453 -505.571
    context.beginPath();
    context.arc(1725.0547,584.429,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Yed Prior
    //-810 374
    context.beginPath();
    context.arc(940,1464,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Zaurak
    //-109 -34
    context.beginPath();
    context.arc(1641,1056,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["syndicate"];
    context.stroke();
    //Zeta Aquilae
    //-369 276
    context.beginPath();
    context.arc(1381,1366,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Zeta Centauri
    //-835 257
    context.beginPath();
    context.arc(915,1347,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Zosma
    //-640 -123
    context.beginPath();
    context.arc(1110,967,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Zuba Zub
    //-48.2661 -647.926
    context.beginPath();
    context.arc(1701.7339,442.074,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["hai"];
    context.stroke();
    //Zubenelgenubi
    //-710 353
    context.beginPath();
    context.arc(1040,1443,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Zubeneschamali
    //-759 338
    context.beginPath();
    context.arc(991,1428,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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