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
var zoom=2.5;
canvas.height=screen.height;
canvas.width=screen.width;
function drawSystem(faction,xPos,yPos){
    context.beginPath();
    context.arc(xPos+1750,yPos+1090,9,0,2*Math.PI);
    context.lineWidth=3;
    context.strokeStyle=government[faction];
    context.stroke();
}
function initialize(){
    img=document.getElementById("galaxy");
    context.setTransform(1,0,0,1,0,0);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.scale(1/zoom,1/zoom);
    context.translate((pan.offset.x)*zoom,(pan.offset.y)*zoom);
    context.drawImage(img,0,-160);
    //1 Axis
    drawSystem("coalition",-1274.63,267.214);
    //10 Pole
    drawSystem("coalition",-1356.63,19.2137);
    //11 Autumn Above
    drawSystem("coalition",-1278.63,148.214);
    //11 Spring Below
    drawSystem("coalition",-1272.63,380.214);
    //12 Autumn Above
    drawSystem("coalition",-1276.63,-19.7863);
    //14 Pole
    drawSystem("coalition",-1343.63,-119.786);
    //14 Summer Above
    drawSystem("coalition",-1436.63,182.214);
    //14 Winter Below
    drawSystem("coalition",-1143.63,341.214);
    //16 Autumn Rising
    drawSystem("coalition",-1305.63,74.2137);
    //3 Axis
    drawSystem("coalition",-1235.63,299.214);
    //3 Pole
    drawSystem("coalition",-1344.63,162.214);
    //3 Spring Rising
    drawSystem("coalition",-1414.63,356.214);
    //4 Axis
    drawSystem("coalition",-1169.63,365.214);
    //4 Spring Rising
    drawSystem("coalition",-1309.63,321.214);
    //4 Summer Rising
    drawSystem("coalition",-1377.63,207.214);
    //4 Winter Rising
    drawSystem("coalition",-1259.63,248.214);
    //5 Axis
    drawSystem("coalition",-1142.63,394.214);
    //5 Spring Below
    drawSystem("coalition",-1213.63,415.214);
    //5 Summer Above
    drawSystem("coalition",-1387.63,118.214);
    //5 Winter Above
    drawSystem("coalition",-1216.63,208.214);
    //7 Autumn Rising
    drawSystem("coalition",-1235.63,177.214);
    //8 Winter Below
    drawSystem("coalition",-1179.63,284.214);
    //9 Spring Above
    drawSystem("coalition",-1377.63,281.214);
    //Ablodab
    drawSystem("coalition",-854.587,592.051);
    //Ablub
    drawSystem("coalition",-581.587,637.051);
    //Acrux
    drawSystem("republic",-808,192);
    //Acamar
    drawSystem("syndicate",-284,-3);
    //Achernar
    drawSystem("syndicate",-93,154);
    //Adhara
    drawSystem("republic",-669,-200);
    //Aescolanus
    drawSystem("uninhabited",-15,340);
    //Al Dhanab
    drawSystem("syndicate",-177,207);
    //Albaldah
    drawSystem("republic",-350,484);
    //Albireo
    drawSystem("republic",-270,503);
    //Alcyone
    drawSystem("pirate",-80,-144);
    //Aldebaran
    drawSystem("republic",-356,-26);
    //Alderamin
    drawSystem("syndicate",-272,258);
    //Aldhibain
    drawSystem("republic",-659,451);
    //Algenib
    drawSystem("pirate",-118,341);
    //Algieba
    drawSystem("republic",-691,-52);
    //Algol
    drawSystem("syndicate",-210,17);
    //Algorel
    drawSystem("republic",-631,145);
    //Alheka
    drawSystem("republic",-350,-271);
    //Alhena
    drawSystem("republic",-430,-80);
    //Alioth
    drawSystem("republic",-620,315);
    //Alkaid
    drawSystem("republic",-825,318);
    //Almaaz
    drawSystem("pirate",-349,-538);
    //Almach
    drawSystem("pirate",-7,232);
    //Alnair
    drawSystem("syndicate",-272,314);
    //Alnasl
    drawSystem("republic",-553,380);
    //Alnilam
    drawSystem("pirate",-487,-513);
    //Alnitak
    drawSystem("republic",-331,-412);
    //Alniyat
    drawSystem("republic",-691,501);
    //Alpha Arae
    drawSystem("republic",-481,394);
    //Alpha Centauri
    drawSystem("republic",-429,125);
    //Alpha Hydri
    drawSystem("syndicate",-97,98);
    //Alphard
    drawSystem("republic",-588,-47);
    //Alphecca
    drawSystem("republic",-546,308);
    //Alpheratz
    drawSystem("syndicate",-176,125);
    //Altair
    drawSystem("republic",-357,161);
    //Aludra
    drawSystem("republic",-606,-374);
    //Ancient Hope
    drawSystem("coalition",-1159.59,702.051);
    //Ankaa
    drawSystem("syndicate",-230,100);
    //Answer
    drawSystem("coalition",-1086.59,631.051);
    //Antares
    drawSystem("pirate",-711,541);
    //Antevorta
    drawSystem("uninhabited",-36.1297,446.242);
    //Ap'arak
    drawSystem("wanderer",-164.62,-781.858);
    //Arcturus
    drawSystem("republic",-589,226);
    //Arculus
    drawSystem("remnant",308.87,393.242);
    //Arneb
    drawSystem("pirate",-523,-580);
    //Ascella
    drawSystem("republic",-376,328);
    //Asikafarnut
    drawSystem("sestor",253.431,-584.812);
    //Aspidiske
    drawSystem("republic",-690,-282);
    //Atria
    drawSystem("republic",-551,532);
    //Avior
    drawSystem("republic",-658,-317);
    //Aya'k'k
    drawSystem("wanderer",-434.245,-616.57);
    //Beginning
    drawSystem("coalition",-912.587,694.051);
    //Bellatrix
    drawSystem("syndicate",-225,-82);
    //Belonging
    drawSystem("coalition",-1007.59,658.051);
    //Belug
    drawSystem("coalition",-1024.59,388.051);
    //Belugt
    drawSystem("coalition",-838.587,668.051);
    //Beta Lupi
    drawSystem("republic",-851,417);
    //Betelgeuse
    drawSystem("republic",-384,-322);
    //Bloptab
    drawSystem("coalition",-813.587,727.051);
    //Blubipad
    drawSystem("coalition",-650.587,594.051);
    //Blugtad
    drawSystem("coalition",-771.587,680.051);
    //Boral
    drawSystem("republic",-502,331);
    //Bore Fah
    drawSystem("hai",71.7761,-592.536);
    //Bote Asu
    drawSystem("hai",8.87418,-572.768);
    //Bright Void
    drawSystem("coalition",-1059.59,605.051);
    //Broken Bowl
    drawSystem("coalition",-956.587,566.051);
    //Caeculus
    drawSystem("uninhabited",162.87,343.242);
    //Canopus
    drawSystem("republic",-421,-225);
    //Capella
    drawSystem("republic",-378,-13);
    //Caph
    drawSystem("syndicate",-295,77);
    //Cardax
    drawSystem("republic",-211,-215);
    //Cardea
    drawSystem("uninhabited",-89.1297,417.242);
    //Castor
    drawSystem("republic",-452,-17);
    //Cebalrai
    drawSystem("republic",-461,282);
    //Celeborim
    drawSystem("sestor",181.431,-633.812);
    //Chikatip
    drawSystem("uninhabited",-77.5695,-307.812);
    //Chimitarp
    drawSystem("mereti",150.431,-287.812);
    //Chirr'ay'akai
    drawSystem("wanderer",-102.761,-749.614);
    //Chornifath
    drawSystem("uninhabited",40.4305,-214.812);
    //Chy'chra
    drawSystem("wanderer",85.5308,-829.667);
    //Cinxia
    drawSystem("remnant",265.87,415.242);
    //Coluber
    drawSystem("uninhabited",149.504,197.389);
    //Companion
    drawSystem("coalition",-1032.59,709.051);
    //Convector
    drawSystem("uninhabited",-14.1297,379.242);
    //Cor Caroli
    drawSystem("republic",-682,201);
    //Da Ent
    drawSystem("hai",-6.22391,-462.536);
    //Da Lest
    drawSystem("hai",-23.2239,-413.536);
    //Dabih
    drawSystem("republic",-253,427);
    //Danoa
    drawSystem("republic",-239,-321);
    //Dark Hills
    drawSystem("coalition",-926.587,619.051);
    //Debrugt
    drawSystem("coalition",-869.587,513.051);
    //Delta Capricorni
    drawSystem("syndicate",-285,202);
    //Delta Sagittarii
    drawSystem("republic",-414,416);
    //Delta Velorum
    drawSystem("republic",-740,90);
    //Deneb
    drawSystem("pug",-348,225);
    //Denebola
    drawSystem("republic",-478,70);
    //Diphda
    drawSystem("syndicate",-262,61);
    //Dokdobaru
    drawSystem("quarg",-21.5695,-241.812);
    //Dschubba
    drawSystem("republic",-598,501);
    //Dubhe
    drawSystem("republic",-577,-103);
    //Due Yoot
    drawSystem("hai",-167.547,-426.683);
    //Durax
    drawSystem("pirate",-59,-90);
    //Eber
    drawSystem("republic",-532,406);
    //Eblumab
    drawSystem("coalition",-767.587,703.051);
    //Edusa
    drawSystem("uninhabited",273.87,347.242);
    //Ehma Ti
    drawSystem("unfettered",39.1085,-749.244);
    //Ek'kek'ru
    drawSystem("wanderer",-287.517,-727.738);
    //Ekuarik
    drawSystem("heliarch",-1029.63,426.214);
    //Elnath
    drawSystem("republic",-288,-77);
    //Eltanin
    drawSystem("republic",-328,433);
    //Eneremprukt
    drawSystem("sestor",311.431,-448.812);
    //Enif
    drawSystem("quarg",-177,498);
    //Epsilon Leonis
    drawSystem("republic",-619,-229);
    //Es'sprak'ai
    drawSystem("wanderer",-469.044,-733.375);
    //Eshkoshtar
    drawSystem("mereti",156.431,-381.812);
    //Eteron
    drawSystem("republic",-330,33);
    //Fah Root
    drawSystem("hai",-264.065,-400.135);
    //Fah Soom
    drawSystem("hai",-179.891,-335.011);
    //Fala
    drawSystem("republic",-690,64);
    //Fallen Leaf
    drawSystem("coalition",-903.587,717.051);
    //Far Horizon
    drawSystem("coalition",-1108.59,726.051);
    //Farbutero
    drawSystem("uninhabited",93.4305,-251.812);
    //Farinus
    drawSystem("uninhabited",202.87,440.242);
    //Faronektu
    drawSystem("mereti",292.431,-309.812);
    //Fasitopfar
    drawSystem("uninhabited",92.4305,-105.812);
    //Fell Omen
    drawSystem("coalition",-1156.59,475.051);
    //Feroteri
    drawSystem("uninhabited",149.431,-205.812);
    //Ferukistek
    drawSystem("sestor",307.431,-515.812);
    //Fingol
    drawSystem("republic",-482,113);
    //Flugbu
    drawSystem("coalition",-903.587,534.051);
    //Fomalhaut
    drawSystem("syndicate",-314,124);
    //Fornarep
    drawSystem("uninhabited",79.4305,-309.812);
    //Four Pillars
    drawSystem("coalition",-1210.59,772.051);
    //Furmeliki
    drawSystem("uninhabited",-35.5695,-281.812);
    //Gacrux
    drawSystem("republic",-713,184);
    //Gamma Cassiopeiae
    drawSystem("syndicate",-116,293);
    //Gamma Corvi
    drawSystem("republic",-906,64);
    //Gienah
    drawSystem("pirate",-176,354);
    //Girtab
    drawSystem("republic",-430,481);
    //Glubatub
    drawSystem("coalition",-650.587,693.051);
    //Gomeisa
    drawSystem("republic",-600,-161);
    //Good Omen
    drawSystem("coalition",-941.587,746.051);
    //Gorvi
    drawSystem("republic",-250,-483);
    //Graffias
    drawSystem("republic",-784,517);
    //Gupta
    drawSystem("coalition",-808.587,625.051);
    //Hadar
    drawSystem("republic",-788,283);
    //Hamal
    drawSystem("syndicate",-129,24);
    //Han
    drawSystem("republic",-610,561);
    //Hassaleh
    drawSystem("republic",-291,-287);
    //Hatysa
    drawSystem("pirate",-474,-542);
    //Heia Due
    drawSystem("hai",-146.177,-481.694);
    //Hesselpost
    drawSystem("uninhabited",-30.5695,-187.812);
    //Hevru Hai
    drawSystem("quarg",-189,-310);
    //Hi Yahr
    drawSystem("unfettered",82.3672,-641.6);
    //Hintar
    drawSystem("republic",-422,311);
    //Holeb
    drawSystem("republic",-590,287);
    //Homeward
    drawSystem("coalition",-1045.59,477.051);
    //Host
    drawSystem("uninhabited",384.431,-543.812);
    //Hunter
    drawSystem("coalition",-968.587,590.051);
    //Ik'kara'ka
    drawSystem("wanderer",56.2159,-888.296);
    //Ildaria
    drawSystem("republic",-702,317);
    //Imo Dep
    drawSystem("hai",-56.2764,-600.1);
    //Insitor
    drawSystem("uninhabited",-28.1296,400.242);
    //Io Lowe
    drawSystem("hai",-94.7566,-527.728);
    //Io Mann
    drawSystem("hai",-192.955,-447.669);
    //Ipsing
    drawSystem("republic",-549,160);
    //Iyech'yek
    drawSystem("wanderer",-277.37,-693.913);
    //Izar
    drawSystem("republic",-784,231);
    //Ka'ch'chrai
    drawSystem("wanderer",-240.163,-822.448);
    //Ka'pru
    drawSystem("wanderer",-76.6756,-994.955);
    //Kaliptari
    drawSystem("uninhabited",85.4305,-402.812);
    //Kappa Centauri
    drawSystem("republic",-867,480);
    //Kashikt
    drawSystem("efret",-73.5695,-219.812);
    //Kasikfar
    drawSystem("uninhabited",10.4305,-127.812);
    //Kaus Australis
    drawSystem("republic",-284,395);
    //Kaus Borealis
    drawSystem("republic",-456,350);
    //Ki War Ek
    drawSystem("heliarch",-1106.63,368.214);
    //Kiro'ku
    drawSystem("wanderer",-131.923,-884.46);
    //Kiru'kichi
    drawSystem("wanderer",-195.063,-662.343);
    //Kochab
    drawSystem("republic",-731,279);
    //Kor Ak'Mari
    drawSystem("korath",43,42);
    //Kor En'lakfar
    drawSystem("korath",-31,-33);
    //Kor Fel'tar
    drawSystem("korath",29,-66);
    //Kor Men
    drawSystem("korath",6,-5);
    //Kor Nor'peli
    drawSystem("korath",52,160);
    //Kor Tar'bei
    drawSystem("korath",57,106);
    //Kor Zena'i
    drawSystem("korath",-2,83);
    //Kornephoros
    drawSystem("republic",-612,424);
    //Korsmanath
    drawSystem("uninhabited",97.4305,-185.812);
    //Kraz
    drawSystem("republic",-876,204);
    //Kugel
    drawSystem("syndicate",-230,-26);
    //Kursa
    drawSystem("republic",-366,-105);
    //Last Word
    drawSystem("coalition",-1145.59,495.051);
    //Lesath
    drawSystem("republic",-516,485);
    //Levana
    drawSystem("uninhabited",203.504,247.389);
    //Limen
    drawSystem("republic",-791.99,-12.2491);
    //Lolami
    drawSystem("republic",-628,-10);
    //Lom Tahr
    drawSystem("hai",-94.0437,-446.586);
    //Lone Cloud
    drawSystem("coalition",-1239.59,747.051);
    //Lucina
    drawSystem("uninhabited",175.504,176.389);
    //Lurata
    drawSystem("republic",-279,463);
    //Makferuti
    drawSystem("sestor",288.431,-628.812);
    //Markab
    drawSystem("syndicate",-241,168);
    //Markeb
    drawSystem("republic",-602,-305);
    //Matar
    drawSystem("syndicate",-218,272);
    //Mebla
    drawSystem("coalition",-814.587,555.051);
    //Mebsuta
    drawSystem("republic",-482,-394);
    //Meftarkata
    drawSystem("uninhabited",52.4305,-276.812);
    //Mei Yohn
    drawSystem("hai",-106.757,-581.698);
    //Mekislepti
    drawSystem("mereti",137.431,-335.812);
    //Membulem
    drawSystem("coalition",-722.587,616.051);
    //Men
    drawSystem("pirate",-888,361);
    //Menkalinan
    drawSystem("republic",-400,-61);
    //Menkar
    drawSystem("syndicate",-183,-52);
    //Menkent
    drawSystem("republic",-495,218);
    //Merak
    drawSystem("republic",-553,60);
    //Mesuket
    drawSystem("uninhabited",220.431,-409.812);
    //Miaplacidus
    drawSystem("republic",-524,-69);
    //Miblulub
    drawSystem("coalition",-630.587,670.051);
    //Mimosa
    drawSystem("republic",-895,168);
    //Minkar
    drawSystem("republic",-823,138);
    //Mintaka
    drawSystem("republic",-304,-462);
    //Mirach
    drawSystem("syndicate",-166,250);
    //Mirfak
    drawSystem("syndicate",-187,-128);
    //Mirzam
    drawSystem("republic",-498,-301);
    //Mizar
    drawSystem("republic",-579,184);
    //Moktar
    drawSystem("syndicate",-169,-170);
    //Mora
    drawSystem("republic",-755,23);
    //Muhlifain
    drawSystem("republic",-702,242);
    //Muphrid
    drawSystem("republic",-495,152);
    //Naos
    drawSystem("republic",-653,-396);
    //Naper
    drawSystem("republic",-416,369);
    //Nenia
    drawSystem("uninhabited",-39.1297,467.242);
    //Nihal
    drawSystem("republic",-262,-121);
    //Nocte
    drawSystem("republic",-467,172);
    //Nunki
    drawSystem("pirate",-393,537);
    //Oblate
    drawSystem("pirate",-124,-119);
    //Orbona
    drawSystem("republic",-735.99,-97.2491);
    //Orvala
    drawSystem("republic",-334,303);
    //Ossipago
    drawSystem("uninhabited",6.87033,429.242);
    //Pantica
    drawSystem("remnant",303.87,445.242);
    //Parca
    drawSystem("uninhabited",150.504,151.389);
    //Peacock
    drawSystem("republic",-307,350);
    //Pelubta
    drawSystem("coalition",-757.587,575.051);
    //Peragenor
    drawSystem("uninhabited",86.8703,356.242);
    //Peresedersi
    drawSystem("uninhabited",81.4305,-154.812);
    //Perfica
    drawSystem("uninhabited",185.87,419.242);
    //Persian
    drawSystem("syndicate",-203,331);
    //Persitar
    drawSystem("uninhabited",297.431,-395.812);
    //Phact
    drawSystem("republic",-375,-191);
    //Phecda
    drawSystem("republic",-607,88);
    //Pherkad
    drawSystem("republic",-798,451);
    //Phurad
    drawSystem("republic",-494,-153);
    //Pik'ro'iyak
    drawSystem("wanderer",-378.845,-677.001);
    //Plort
    drawSystem("coalition",-708.587,723.051);
    //Polaris
    drawSystem("syndicate",-35,126);
    //Pollux
    drawSystem("republic",-465,4);
    //Porrima
    drawSystem("republic",-556,123);
    //Prakacha'a
    drawSystem("wanderer",-35.1114,-802.607);
    //Procyon
    drawSystem("republic",-411,23);
    //Pug Iyik
    drawSystem("pug",-361.149,-883.233);
    //Quaru
    drawSystem("heliarch",-1080.63,448.214);
    //Rajak
    drawSystem("republic",-270,-236);
    //Rasalhague
    drawSystem("republic",-413,246);
    //Rastaban
    drawSystem("republic",-463,446);
    //Rati Cal
    drawSystem("hai",-116.765,-391.123);
    //Regor
    drawSystem("republic",-702,-335);
    //Regulus
    drawSystem("republic",-544,25);
    //Remembrance
    drawSystem("coalition",-884.587,641.051);
    //Rigel
    drawSystem("republic",-324,-363);
    //Ruchbah
    drawSystem("syndicate",-174,69);
    //Rutilicus
    drawSystem("republic",-535,273);
    //Sabik
    drawSystem("republic",-675,379);
    //Sabriset
    drawSystem("uninhabited",151.724,-426.518);
    //Sadalmelik
    drawSystem("quarg",-145,472);
    //Sadalsuud
    drawSystem("quarg",-134,508);
    //Sadr
    drawSystem("republic",-287,543);
    //Sagittarius A*
    drawSystem("uninhabited",112,22);
    //Saiph
    drawSystem("republic",-375,-390);
    //Salipastart
    drawSystem("mereti",250.431,-370.812);
    //Sargas
    drawSystem("republic",-542,445);
    //Sarin
    drawSystem("republic",-670,293);
    //Scheat
    drawSystem("syndicate",-205,233);
    //Schedar
    drawSystem("syndicate",-93,229);
    //Segesta
    drawSystem("uninhabited",111.87,294.242);
    //Seginus
    drawSystem("republic",-557,356);
    //Seketra
    drawSystem("uninhabited",-24.5695,-356.812);
    //Sepetrosk
    drawSystem("mereti",192.431,-243.812);
    //Sepriaptu
    drawSystem("uninhabited",139.431,-448.812);
    //Sevrelect
    drawSystem("efret",-114.569,-239.812);
    //Shaula
    drawSystem("pirate",-460,527);
    //Sheratan
    drawSystem("syndicate",-40,45);
    //Si'yak'ku
    drawSystem("wanderer",-329.235,-760.435);
    //Sich'ka'ara
    drawSystem("wanderer",-97.1237,-831.921);
    //Silikatakfar
    drawSystem("sestor",248.431,-481.812);
    //Silver Bell
    drawSystem("coalition",-1045.59,541.051);
    //Silver String
    drawSystem("coalition",-1022.59,517.051);
    //Similisti
    drawSystem("mereti",210.431,-313.812);
    //Sirius
    drawSystem("republic",-378,44);
    //Skeruto
    drawSystem("uninhabited",28.4305,-339.812);
    //Sko'karak
    drawSystem("wanderer",-304.43,-930.688);
    //Sobarati
    drawSystem("sestor",277.431,-557.812);
    //Sol
    drawSystem("republic",-400,100);
    //Sol Arach
    drawSystem("coalition",-711.587,649.051);
    //Sol Kimek
    drawSystem("coalition",-1310.63,227.214);
    //Sol Saryd
    drawSystem("coalition",-1037.59,675.051);
    //Solifar
    drawSystem("uninhabited",47.4305,-435.812);
    //Sospi
    drawSystem("republic",-317,-161);
    //Speloog
    drawSystem("coalition",-967.587,445.051);
    //Spica
    drawSystem("republic",-906,120);
    //Steep Roof
    drawSystem("coalition",-1113.59,570.051);
    //Stercutus
    drawSystem("uninhabited",140.87,320.242);
    //Suhail
    drawSystem("republic",-774,-338);
    //Sumar
    drawSystem("republic",-236,-273);
    //Sumprast
    drawSystem("efret",-101.569,-262.812);
    //Tais
    drawSystem("republic",-346,381);
    //Talita
    drawSystem("republic",-519,-26);
    //Tania Australis
    drawSystem("republic",-671,7);
    //Tarazed
    drawSystem("republic",-194,448);
    //Tebuteb
    drawSystem("coalition",-615.587,710.051);
    //Tejat
    drawSystem("republic",-489,-107);
    //Terminus
    drawSystem("republic",-727.99,-23.2491);
    //Torbab
    drawSystem("coalition",-949.587,490.051);
    //Tortor
    drawSystem("republic",-255,-424);
    //Turais
    drawSystem("republic",-691,134);
    //Ula Mon
    drawSystem("hai",-64.1218,-559.868);
    //Ultima Thule
    drawSystem("republic",-336,-211);
    //Umbral
    drawSystem("republic",-164,406);
    //Unagi
    drawSystem("pirate",-306,-578);
    //Unukalhai
    drawSystem("republic",-710,405);
    //Uwa Fahn
    drawSystem("hai",35.1585,-491.67);
    //Vega
    drawSystem("republic",-402,182);
    //Vindemiatrix
    drawSystem("republic",-635,257);
    //Volax
    drawSystem("republic",-256,-179);
    //Wah Ki
    drawSystem("hai",14.9925,-612.792);
    //Wah Oh
    drawSystem("hai",-205.344,-381.381);
    //Wah Yoot
    drawSystem("unfettered",40.9382,-685.994);
    //Waypoint
    drawSystem("hai",-184,-515);
    //Wazn
    drawSystem("republic",-385,-131);
    //Wei
    drawSystem("republic",-598,369);
    //Wezen
    drawSystem("republic",-664,-433);
    //Ya Hai
    drawSystem("hai",-24.9453,-505.571);
    //Yed Prior
    drawSystem("republic",-810,374);
    //Zaurak
    drawSystem("syndicate",-109,-34);
    //Zeta Aquilae
    drawSystem("republic",-369,276);
    //Zeta Centauri
    drawSystem("republic",-835,257);
    //Zosma
    drawSystem("republic",-640,-123);
    //Zuba Zub
    drawSystem("hai",-48.2661,-647.926);
    //Zubenelgenubi
    drawSystem("republic",-710,353);
    //Zubeneschamali
    drawSystem("republic",-759,338);
}
canvas.addEventListener("mousedown",startPan);
canvas.addEventListener("mouseleave",endPan);
canvas.addEventListener("mouseup",endPan);
function startPan(e){
    canvas.addEventListener("mousemove",trackMouse);
    canvas.addEventListener("mousemove",initialize);
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