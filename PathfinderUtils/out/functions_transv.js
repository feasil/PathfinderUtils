//Fonctions transverses

/**
Gestion des filtres de zone
filtres : aventure =, numero [min, max]
*/
function isZoneValide(zone, filtres) {
	return ( 
			(filtres.aventure === undefined || filtres.aventure === zone.aventure )
				&&
			(filtres.numero === undefined || filtres.numero[0] <= Math.trunc(zone.numero) && Math.trunc(zone.numero) <= filtres.numero[1])
			);
}

/**
retour : [[map1, map2], liste]
*/
function newArea(zone, light=false)
{
	var coords;
	if ( zone.shape === 'poly' )
		coords = zone.coords;
	else if ( zone.shape.startsWith('at:') )
		coords = giveMeADrawAt(parseInt(zone.coords.split(',')[0]), 
								parseInt(zone.coords.split(',')[1]), 
								zone.shape.substring(3));
	else if ( zone.shape.startsWith('fromto:') )
		coords = giveMeADrawFromTo(parseInt(zone.coords.split(',')[0]), 
									parseInt(zone.coords.split(',')[1]), 
									parseInt(zone.coords.split(',')[2]), 
									parseInt(zone.coords.split(',')[3]), 
									zone.shape.substring(7));
	
	//"areaid","shape","coords","categorie","numero","titre","description"
	//console.log(zone.categorie + '   ' + zone.numero);
	var map1 = '<area id="' + zone.areaid + '" ';
	map1 += 'class="area" shape="poly" ';
	map1 += 'coords="' + coords + '" ';
	map1 += 'data-categorie="' + zone.categorie + '" ';
	
	map1 += 'data-numero="' + zone.numero + '" ';
	map1 += 'data-titre="' + zone.titre + '" ';
	map1 += 'data-message="' + zone.description + '" ';
	
	map1 += 'title="' + zone.numero + ' - <b>' + zone.titre + '</b>" ';
	map1 += '/>';
	
	
	var map2 = '<area id="' + zone.areaid + 'bis" ';
	map2 += 'class="areabis" shape="poly" ';
	map2 += 'coords="' + coords + '" ';
	map2 += 'data-categorie="' + zone.categorie + '" ';
	map2 += '/>';
	
	var liste = '<div><span class="' + (light?'light ':'') + 'hilightMult noSelect categ' + zone.categorie + '" ';
	liste += 'data-categorie="' + zone.categorie + '">' + zone.categorie.substr(0, 1).toUpperCase() + '</span>&nbsp;';
	liste += '<span class="' + (light?'light ':'') + 'hilightlink" data-areaid="' + zone.areaid + '" ';
	liste += 'data-categorie="' + zone.categorie + '" href="#">';
	if ( zone.aventure === undefined )
		liste += zone.titre + ' (' + zone.numero + ')</span></div>';
	else
		liste += zone.numero + ' - ' + zone.titre + '</span></div>';
	//
	
	return [[map1, map2], liste];
}



function giveMeADrawAt(centerX, centerY, dessin, rotation=0, horiz=false, vert=false)
{//dessin : 'star', 'duck', 'fight', 'meet', 'skull'
	//int[] etoileV0 = {20, 0, 24, 16, 40, 20, 24, 24, 20, 40, 16, 24, 0, 20, 16, 16};  int[] etoileV1 = {5, 0, 6, 4, 10, 5, 6, 6, 5, 10, 4, 6, 0, 5, 4, 4};
	//int[] etoileV2 = {5,0, 6, 3, 8, 2, 7, 4, 10, 5, 7, 6, 8, 8, 6, 7,           5, 10, 4, 7, 2, 8, 3, 6, 0, 5, 3, 4, 2, 2, 4, 3};
	//var fullDuck = [523,403,479,386,380,406,362,406,349,407,343,399,371,381,412,365,448,337,471,295,491,276,529,267,561,271,594,283,610,301,628,335,643,373,645,388,644,397,642,405,645,412,681,406,713,413,783,441,805,460,870,514,924,564,914,574,979,634,958,628,1008,665,1009,680,991,692,962,681,924,693,914,706,867,721,854,735,799,741,762,732,769,771,747,754,732,799,722,804,716,795,703,803,686,764,672,810,662,815,634,820,604,821,578,821,564,820,548,810,531,796,555,789,580,785,600,773,621,771,643,782,673,732,634,733,584,718,547,700,504,671,445,628,418,567,419,521,433,473,451,446];
	var etoile = [0, -5, 1, -2, 3, -3, 2, -1, 5, 0, 2, 1, 3, 3, 1, 2, 0, 5, -1, 2, -3, 3, -2, 1, -5, 0, -2, -1, -3, -3, -1, -2];
	//var smallDuck = [-8, -9, -10, -10, -16, -9, -17, -9, -18, -9, -18, -9, -17, -10, -14, -11, -12, -13, -11, -15, -10, -16, -7, -17, -5, -17, -3, -16, -2, -15, -1, -13, 0, -11, 0, -10, 0, -9, 0, -9, 0, -8, 2, -9, 4, -8, 8, -7, 9, -5, 13, -2, 16, 1, 16, 1, 20, 5, 18, 5, 21, 7, 22, 8, 20, 9, 19, 8, 16, 9, 16, 9, 13, 10, 12, 11, 9, 11, 7, 11, 7, 13, 6, 12, 5, 15, 4, 15, 4, 15, 3, 15, 2, 13, 1, 16, 1, 16, -1, 16, -3, 16, -4, 16, -5, 16, -6, 16, -7, 15, -6, 14, -4, 14, -3, 13, -2, 13, 0, 14, 1, 11, -1, 11, -4, 10, -6, 9, -9, 7, -12, 5, -14, 1, -14, -2, -13, -5, -12, -6];
	var duck = [-103, -134, -147, -151, -246, -131, -264, -131, -277, -130, -283, -138, -255, -156, -214, -172, -178, -200, -155, -242, -135, -261, -97, -270, -65, -266, -32, -254, -16, -236, 2, -202, 17, -164, 19, -149, 18, -140, 16, -132, 19, -125, 55, -131, 87, -124, 157, -96, 179, -77, 244, -23, 298, 27, 288, 37, 353, 97, 332, 91, 382, 128, 383, 143, 365, 155, 336, 144, 298, 156, 288, 169, 241, 184, 228, 198, 173, 204, 136, 195, 143, 234, 121, 217, 106, 262, 96, 267, 90, 258, 77, 266, 60, 227, 46, 273, 36, 278, 8, 283, -22, 284, -48, 284, -62, 283, -78, 273, -95, 259, -71, 252, -46, 248, -26, 236, -5, 234, 17, 245, 47, 195, 8, 196, -42, 181, -79, 163, -122, 134, -181, 91, -208, 30, -207, -16, -193, -64, -175, -91];
	var fight = [78, 31, 82, 11, 84, -18, 82, -52, 64, -62, 77, -72, 91, -63, 104, -75, 89, -90, 115, -121, 121, -122, 127, -127, 128, -139, 121, -145, 108, -145, 102, -136, 72, -109, 57, -124, 46, -112, 55, -96, 31, -73, 0, -84, -32, -74, -55, -95, -45, -112, -56, -123, -72, -110, -101, -135, -104, -142, -112, -146, -122, -145, -127, -140, -127, -128, -121, -122, -115, -121, -90, -91, -105, -76, -92, -63, -75, -74, -64, -61, -83, -53, -84, -17, -83, 10, -78, 31, -118, 67, -127, 108, -87, 98, -61, 72, -48, 86, -33, 98, -2, 109, 28, 100, 47, 87, 62, 71, 88, 98, 128, 109, 117, 67];
	var meet = [-78, 72, -27, 72, -27, 38, -12, 49, -5, 49, 0, 44, 8, 44, 14, 48, 21, 48, 36, 39, 37, 72, 87, 72, 87, -4, 82, -16, 74, -23, 68, -25, 62, -31, 72, -37, 78, -49, 77, -57, 73, -65, 64, -70, 55, -72, 45, -70, 40, -62, 37, -52, 40, -41, 46, -35, 52, -33, 56, -28, 50, -25, 43, -17, 39, -10, 36, -1, 30, 9, 24, 20, 16, 27, 11, 32, 7, 37, 2, 38, -1, 31, -6, 26, -16, 17, -25, 4, -30, -9, -35, -19, -44, -26, -50, -27, -47, -33, -37, -34, -29, -43, -28, -57, -33, -67, -44, -73, -55, -72, -64, -68, -69, -59, -67, -44, -59, -35, -53, -32, -56, -26, -64, -24, -71, -19, -78, -4];
	var skull = [-45, 78, -48, 72, -46, 54, -62, 50, -70, 40, -72, 26, -70, 15, -77, -12, -75, -37, -62, -62, -48, -72, -25, -83, 2, -85, 24, -84, 44, -77, 60, -65, 70, -48, 77, -29, 78, -11, 75, 1, 70, 14, 73, 25, 72, 34, 69, 42, 63, 49, 54, 53, 47, 53, 48, 69, 46, 76, 38, 80, 32, 82, 26, 86, 19, 84, 13, 88, 2, 87, -8, 89, -18, 84, -28, 86, -36, 79, -45, 78, -12, 49, -4, 48, 4, 47, 11, 50, 15, 45, 13, 37, 3, 16, 13, 8, 17, 12, 23, 16, 33, 17, 45, 13, 51, 2, 50, -12, 43, -22, 33, -25, 23, -24, 16, -19, 11, -7, 10, 1, 13, 8, 3, 16, -3, 17, -3, 17, -13, 8, -10, -1, -12, -12, -17, -20, -26, -24, -39, -23, -46, -18, -51, -9, -50, 1, -47, 9, -41, 14, -35, 16, -25, 17, -18, 13, -13, 8, -3, 17, -13, 39, -12, 49];
	var tabDessins = {	"star" : [etoile,	3], 
						"duck" : [duck,		.05], 
						"fight": [fight,	.10], 
						"meet":  [meet,		.18],
						"skull": [skull,	.18]
					 };
	
	var coords = '';
	//for ( var i in tabDessins[dessin][0] )
	//	coords += (i>0?", ":"") + (tabDessins[dessin][0][i]*tabDessins[dessin][1] + (i%2==0?centerX:centerY));
	
	var i = 0; var ptx,pty, pt;
	while ( i < tabDessins[dessin][0].length-1 )
	{
		ptx = (tabDessins[dessin][0][i]*tabDessins[dessin][1]) + centerX;
		pty = (tabDessins[dessin][0][i+1]*tabDessins[dessin][1]) + centerY;
		
		pt = rotate({x:centerX, y:centerY}, {x:ptx, y:pty}, rotation);
		pt = flip({x:centerX, y:centerY}, pt, horiz, vert);
		
		coords += (i>0?', ':'') + Math.round(pt.x) + ', ' + Math.round(pt.y);
		
		i += 2;
	}
	
	return coords;
	
	
	
	/* 
	
	var test = [5,0, 6, 3, 8, 2, 7, 4, 10, 5, 7, 6, 8, 8, 6, 7,           5, 10, 4, 7, 2, 8, 3, 6, 0, 5, 3, 4, 2, 2, 4, 3];
			
	var coords = '';
	var largeur = 1;
	
	var difX = -5;
	var difY = -5;
	
	for ( var i in test )
		coords += (i>0?", ":"") + Math.round(((test[i])*largeur + (i%2==0?x + difX*largeur:y + difY*largeur)));
	console.log(coords);
	return coords;
	*/
}


function giveMeADrawFromTo(origineX, origineY, destinationX, destinationY, dessin)
{//dessin : 
	var arrow1 = [0,1, 0,-1]; var arrow2 = [-3,-1, -3,-2, 0,0, -3,2, -3,1];
	var star2 = [-2,-1, -3,-3, -1,-2, 0,-5, 1,-2, 3,-3, 2,-1, 5,0, 2,1, 3,3, 1,2, 0,5, -1,2, -3,3, -2,1];
//						nom		 a etirer    fixe    hauteur   largeurfixe
	var tabDessins = {	"arrow": [arrow1,	arrow2,		3, 		3],
						"star": [arrow1,	star2,		3, 		2],
					 };
	
	var coords = '';

	var hauteur = tabDessins[dessin][2];
	var largeur = (destinationX - origineX) - hauteur*tabDessins[dessin][3];
	var angle = -getAngle({x:origineX, y:origineY}, {x:destinationX, y:destinationY});
	
	var i = 0; var ptx, pty, pt;
	while ( i < tabDessins[dessin][0].length-1 )
	{
		ptx = (tabDessins[dessin][0][i]*largeur) + origineX;
		pty = (tabDessins[dessin][0][i+1]*hauteur) + origineY;
		
		pt = rotate({x:origineX, y:origineY}, {x:ptx, y:pty}, angle);
		
		coords += (i>0?', ':'') + Math.round(pt.x) + ', ' + Math.round(pt.y);
		
		i += 2;
	}
	i = 0;
	while ( i < tabDessins[dessin][1].length-1 )
	{
		ptx = (tabDessins[dessin][1][i]*hauteur) + destinationX;
		pty = (tabDessins[dessin][1][i+1]*hauteur) + destinationY;
		
		pt = rotate({x:destinationX, y:destinationY}, {x:ptx, y:pty}, angle);
	
		coords += ', ' + Math.round(pt.x) + ', ' + Math.round(pt.y);
		i += 2;
	}
	
	return coords;
}




function rotate(center, point, angle) {
	var radians = (Math.PI / 180) * angle,
		cos = Math.cos(radians),
		sin = Math.sin(radians),
		nx = (cos * (point.x - center.x)) + (sin * (point.y - center.y)) + center.x,
		ny = (cos * (point.y - center.y)) - (sin * (point.x - center.x)) + center.y;
	return {x:nx, y:ny};
}
function flip(center, point, horiz=false, vert=false) {
	return {x:(horiz?2*center.x-point.x:point.x), y:(vert?2*center.y-point.y:point.y)};
}

function getAngle(p1, p2)
{
	// angle in radians
	//var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

	// angle in degrees
	var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
	return angleDeg;
}









function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	if ( parts === null )
		return 'ffffff';
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return parts.join('');
}
function getPxIgnoreZoom(targetPx) {
	return targetPx/window.devicePixelRatio;
}


function downloadFile(text, filename)
{
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}