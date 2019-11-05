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
    republic:"rgb(232,107,23)",
    uninhabited:"rgb(102,102,102)",
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
    //Acrux
    //-808 192
    context.beginPath();
    context.arc(942,1282,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Aldebaran
    //-356 -26
    context.beginPath();
    context.arc(1394,1064,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Aldhibain
    //-659 451
    context.beginPath();
    context.arc(1091,1541,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Algieba
    //-691 -52
    context.beginPath();
    context.arc(1059,1038,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Alnasl
    //-553 380
    context.beginPath();
    context.arc(1197,1470,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Antevorta
    //-36.1297 446.242
    context.beginPath();
    context.arc(1713.8703,1536.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Arcturus
    //-589 226
    context.beginPath();
    context.arc(1161,1316,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Ascella
    //-376 328
    context.beginPath();
    context.arc(1374,1418,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Boral
    //-502 331
    context.beginPath();
    context.arc(1248,1421,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Chikatip
    //-77.5695 -307.812
    context.beginPath();
    context.arc(1672.4305,782.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Chornifath
    //40.4305 -214.812
    context.beginPath();
    context.arc(1790.4305,875.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Coluber
    //149.504 197.389
    context.beginPath();
    context.arc(1899.504,1287.389,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
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
    //Denebola
    //-478 70
    context.beginPath();
    context.arc(1272,1160,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Eber
    //-532 406
    context.beginPath();
    context.arc(1218,1496,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Edusa
    //273.87 347.242
    context.beginPath();
    context.arc(2023.87,1437.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
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
    //Epsilon Leonis
    //-619 -229
    context.beginPath();
    context.arc(1131,861,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Eteron
    //-330 33
    context.beginPath();
    context.arc(1420,1123,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Fala
    //-690 64
    context.beginPath();
    context.arc(1060,1154,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Feroteri
    //149.431 -205.812
    context.beginPath();
    context.arc(1899.431,884.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Fingol
    //-482 113
    context.beginPath();
    context.arc(1268,1203,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Fornarep
    //79.4305 -309.812
    context.beginPath();
    context.arc(1829.4305,780.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
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
    //Gamma Corvi
    //-906 64
    context.beginPath();
    context.arc(844,1154,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Girtab
    //-430 481
    context.beginPath();
    context.arc(1320,1571,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Gomeisa
    //-600 -161
    context.beginPath();
    context.arc(1150,929,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Hadar
    //-788 283
    context.beginPath();
    context.arc(962,1373,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Hesselpost
    //-30.5695 -187.812
    context.beginPath();
    context.arc(1719.4305,902.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
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
    //Host
    //384.431 -543.812
    context.beginPath();
    context.arc(2134.431,546.188,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Ildaria
    //-702 317
    context.beginPath();
    context.arc(1048,1407,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Insitor
    //-28.1296 400.242
    context.beginPath();
    context.arc(1721.8704,1490.242,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["uninhabited"];
    context.stroke();
    //Ipsing
    //-549 160
    context.beginPath();
    context.arc(1201,1250,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
    context.stroke();
    //Izar
    //-784 231
    context.beginPath();
    context.arc(966,1321,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Kochab
    //-731 279
    context.beginPath();
    context.arc(1019,1369,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Kursa
    //-366 -105
    context.beginPath();
    context.arc(1384,985,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Markeb
    //-602 -305
    context.beginPath();
    context.arc(1148,785,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Menkalinan
    //-400 -61
    context.beginPath();
    context.arc(1350,1029,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Procyon
    //-411 23
    context.beginPath();
    context.arc(1339,1113,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Rigel
    //-324 -363
    context.beginPath();
    context.arc(1426,727,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Sol
    //-400 100
    context.beginPath();
    context.arc(1350,1190,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Spica
    //-906 120
    context.beginPath();
    context.arc(844,1210,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Unukalhai
    //-710 405
    context.beginPath();
    context.arc(1040,1495,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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
    //Yed Prior
    //-810 374
    context.beginPath();
    context.arc(940,1464,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government["republic"];
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