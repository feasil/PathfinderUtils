//Variables globales
var dataAventure = null;
var dataDeBase = null;
var dataRencontre = null;
//------------------

// Si on redimentionne la fenêtre (ou zoom), on change le rendu de la liste d'éléments ==> elle garde toujours le même rendu
$(window).resize(function(e) {
	//hideListes();
	$('div#blockList').css({'font-size': getPxIgnoreZoom(11) + 'px'});
	$('.mapButtonV2').css({'padding': getPxIgnoreZoom(2) + 'px ' + getPxIgnoreZoom(4) + 'px','-moz-box-shadow': 'inset 0px ' + getPxIgnoreZoom(1) + 'px 0px 0px #a6827e', '-webkit-box-shadow': 'inset 0px ' + getPxIgnoreZoom(1) + 'px 0px 0px #a6827e', 'box-shadow': 'inset 0px ' + getPxIgnoreZoom(1) + 'px 0px 0px #a6827e', '-moz-border-radius': getPxIgnoreZoom(3) + 'px', '-webkit-border-radius': getPxIgnoreZoom(3) + 'px', 'border-radius': getPxIgnoreZoom(3) + 'px', 'border': getPxIgnoreZoom(1) + 'px solid #54381e', 'text-shadow': '0px ' + getPxIgnoreZoom(1) + 'px 0px #4d3534'});
	
	//Ferme la liste des aventures si elle est ouverte
	if ( $('span#aventure-button').length > 0 )
		$('#aventure').selectmenu('close');
});
//On force le resize pour initialiser (notamment les boutons)
$(window).resize();
//----------------------------------


//Initialisation des higlight
$(function() {
	$.fn.maphilight.defaults = {
		fill: true,
		fillColor: '000000',
		fillOpacity: 0.8, //0.2,
		stroke: true,
		strokeColor: '000000', //'ff0000', 
		strokeOpacity: 1,
		strokeWidth: 1,
		fade: false,
		alwaysOn: false,
		neverOn: false,
		groupBy: false,
		wrapClass: true,
		shadow: true,
		shadowX: 1,
		shadowY: 1,
		shadowRadius: 6,
		shadowColor: '000000',
		shadowOpacity: 0.8,
		shadowPosition: 'outside',
		shadowFrom: false
	};
});
//------ fin des higlight --------

//Pour les boutons
$(function() {
	$('#buttonChangeMap').click(function() {
		switchImageMap();
	});
	$('#hideShowListes').click(function() {
		if ( $('#listes').is(':visible') )
			hideListes();
		else
			showListes();
	});
	$('#blockList').draggable({
		cursor: 'move',
		handle: '#moveListes',
		containment : 'window', 
		start: function( event, ui){ 
			$(document).bind('scroll',function () { 
				window.scrollTo(0,0); 
			});
		}, 
		stop: function( event, ui){ 
			$(document).unbind('scroll');
			
			if ( $(this).css('top').replace(/[^-\d\.]/g, '') < 0 )
				$(this).css('top', '0px');
			if ( $(this).css('left').replace(/[^-\d\.]/g, '') < 0 )
				$(this).css('left', '0px');
		}
	});
	
});
//-------- fin des boutons ----------

//Jquery ui
$( function() {
	$("#aventure").selectmenu({
		icons: { button: "ui-icon-blank" }, 
		change: function( event, ui ) {
			aventureChanged();
			
			$("#tabs").tabs("option", "active", 0);
		}
	});
	
	$("#tabs").tabs({
		//collapsible: true
		activate: function(event, ui) {
			if ( ui.newPanel.attr('id') === 'tabDeBase' )
				goToMapDeBase();
			else if ( ui.newPanel.attr('id') === 'tabRencontre' )
				goToRencontre();
		}
		, active:2 //TODO a retirer apres tests
	});
	
	$('#slider-range').slider({
		orientation: 'horizontal', //'vertical',
		range: true,
		min: 1, 
		max: 10,
		values: [ 1, 10 ],
		create: function() {
			$('#slide-handle-min').html( '<b>' + $( this ).slider('option', 'values')[0] + '</b>');
			$('#slide-handle-max').html( '<b>' + $( this ).slider('option', 'values')[1] + '</b>');
		},
		slide: function( event, ui ) {
			$('#slide-handle-min').html( '<b>' + ui.values[0] + '</b>' );
			$('#slide-handle-max').html( '<b>' + ui.values[1] + '</b>');
			goToRencontre(ui.values, true);
		},
		change: function( event, ui ) {
			$('#slide-handle-min').html( '<b>' + ui.values[0] + '</b>' );
			$('#slide-handle-max').html( '<b>' + ui.values[1] + '</b>');
			
			goToRencontre(ui.values);
		}
	});
	
} );
//--------------------


// Chargement des json et initialisation de la combobox des aventures
$( function() {
	//Aventures
	$.getJSON('./json/aventures.json', function(content) {
		dataAventure = content.aventures;
		dataAventure.sort(trierAventure); 
		
		var selectedValue = null;
		$('#aventure').empty(); // remove old options
		$.each(dataAventure, function(key, val) {
			$('#aventure').append($("<option></option>")
							.attr("value", val.aventure)
							.text(val.aventure + ' - ' + val.titre)
							.data('aventure', val.aventure)
							.data('titre', val.titre)
							.data('prefixrencontre', val.prefixrencontre)
							.data('prefixzone', val.prefixzone)
							.data('map', val.map)
							);
			if ( selectedValue === null || selectedValue < val.aventure )
				selectedValue = val.aventure;
		});
		$('#aventure').val(selectedValue);
		$("#aventure").selectmenu("refresh");
		
		aventureChanged();
		
	}, 'text');
	
} );
function aventureChanged() {
	var el = $('#aventure option:checked');
	var aventure = el.data('aventure');
	var titre = el.data('titre');
	var prefixrencontre = el.data('prefixrencontre');
	var prefixzone = el.data('prefixzone');
	var map = el.data('map');
	
	if ( map.startsWith('http://') || map.startsWith('https://') )
		$('#mapPathfinder').attr('src', map)
	else
		$('#mapPathfinder').attr('src', './map/' + map)
	
	dataDeBase = null;
	//De base
	if ( prefixzone !== null ) 
	{
		$.getJSON('./json/' + prefixzone + '_zones.json', function(content) {
			dataDeBase = content.zones;
			dataDeBase.sort(trierZone); 
			
			$.each(dataDeBase, function(key, zone) {
				//Ajout de la span de référence pour la couleur
				if ( $('#categories>span.categ' + zone.categorie).length === 0 )
					$('#categories').append('<span class="categ' + zone.categorie + '" hidden></span>');
				
				//On init l'areaid
				zone.areaid = 'path_' + zone.numero.toString().replace('.', '-');
			});
			
		}, 'text')
		.always(function() {
			aventureChangedEnd(aventure, titre, prefixrencontre, map);
		});
	}
	else 
		aventureChangedEnd(aventure, titre, prefixrencontre, map);
}
function aventureChangedEnd(aventure, titre, prefixrencontre, map) {
	dataRencontre = null;
	//Pour les rencontres
	if ( prefixrencontre !== null ) 
	{
		var maxNumero = 0;
		$.getJSON('./json/' + prefixrencontre + '_rencontres.json', function(content) {
			dataRencontre = content.rencontres;
			dataRencontre.sort(trierRencontre); 
			
			$.each(dataRencontre, function(key, zone) {
				//Ajout de la span de référence pour la couleur
				if ( $('#categories>span.categ' + zone.categorie).length === 0 )
					$('#categories').append('<span class="categ' + zone.categorie + '" hidden></span>');
				
				//On init l'areaid
				zone.areaid = 'rc_' + zone.numero.toString().replace('.', '-');
			});
			
			$.each(dataRencontre, function(key,value) {
				if ( maxNumero < value.numero )
					maxNumero = value.numero;
			});
			
		}, 'text')
		.always(function() {
			if ( maxNumero === 0 )
				maxNumero = 10;
			$('#slider-range').slider("option", "max", maxNumero);
			$('#slider-range').slider("option", "values", [1, maxNumero]);
		});
	}
	else{
		$('#slider-range').slider("option", "max", 10);
		$('#slider-range').slider("option", "values", [1, 10]);
	}
}
//-----------------

/**
Prépare la map et la liste pour afficher les zones
*/
function goToMapDeBase() {
	loadDataIntoMap('listeDeBase', dataDeBase);
}

/**
Prépare la map et la liste pour afficher les rencontres
*/
function goToRencontre(forceValues=null, keepRatio=false) {
	var numeroValues;
	if ( forceValues === null )
		numeroValues = $('#slider-range').slider("option", "values");
	else
		numeroValues = forceValues;
	
	loadDataIntoMap('listeRencontre', dataRencontre, {numero:numeroValues}, keepRatio);
}




//------
/**
Ajout des balises sur la page selon le contexte
*/
function loadDataIntoMap(listeToLoad, data, filtres={}, keepRatio=false) 
{
	var uneLigne = ( keepRatio && $('#' + listeToLoad + '-2>div').length === 0 );
	var deuxLignes = ( keepRatio && $('#' + listeToLoad + '-2>div').length > 0 );
	
	//On vide les balises
	$('#map1').empty(); $('#map2').empty();
	if ( listeToLoad !== null )
		$('#' + listeToLoad + '-1').empty(); $('#' + listeToLoad + '-2').empty();
	//-------------------
	var tabMapsDeBase = [], tabMaps = [], tabListes = [], nouvRef, nouv;
	$.each(data, function(key, zone) {
		nouvRef = null;
		if ( isZoneValide(zone, filtres) ) { //Controle du filtre 
			if ( zone.arearef !== undefined && zone.arearef !== null ) {
				$.each(dataDeBase, function(key, ref) {
					if ( ref.areaid === 'path_' + zone.arearef ) {
						nouvRef = newArea(ref, true);
						return; 
					}
				});
			}
			nouv = newArea(zone);
			tabMaps.push(nouv[0]); tabListes.push(nouv[1]);
			if ( nouvRef !== null ) { tabMapsDeBase.push(nouvRef[0]); tabListes.push(nouvRef[1]); }
		}
	});
	
	//tabMapsDeBase, tabMaps, tabListes
	$.each(tabMapsDeBase, function(key, map) { $('#map2').append(map[1]); });
	$.each(tabMaps, function(key, map) { $('#map2').append(map[1]); $('#map1').append(map[0]); });
	$.each(tabMapsDeBase, function(key, map) { $('#map1').append(map[0]); });
	
	if ( listeToLoad !== null )
	{
		var total = tabListes.length;
		var row = 0;
		$.each(tabListes, function(key, lien) {
			if ( uneLigne || (total <= 20 && !deuxLignes) || row < total/2 )
				$('#' + listeToLoad + '-1').append(lien);
			else
				$('#' + listeToLoad + '-2').append(lien);
			row++;
		});
	}
	
	initMap();
}



//---








// Fonctions js
function switchImageMap() {
	var areabisactive = ($('#mapPathfinder').attr('data-areabisactive') === "true");
	
	areabisactive = !areabisactive;
	
	$('#mapPathfinder').attr('data-areabisactive', areabisactive);
	
	initMap();
}

/**
Chargement de la map et des listes à partir des balises présentes
*/
function initMap() {
	//Initialisation de MAPHILIGHT :: positinne les datas sur les area
	var areabisactive = ($('#mapPathfinder').attr('data-areabisactive') === "true");
	$('area').each(function() {
		var regex = /areabis/i;
		var isBis = regex.test($(this).attr('class'));
		var couleur = "000000";
		var couleurStroke = hexc($('.categ' + $(this).data('categorie')).css('borderLeftColor'));
		if ( isBis || !areabisactive )
			couleur = hexc($('.categ' + $(this).data('categorie')).css('backgroundColor'));
		
		$(this).data('maphilight', {fillColor:couleur, shadowColor:couleur, strokeColor:couleurStroke, alwaysOn: false, neverOn: false, shadow: false});
		if ( isBis )
		{
			$(this).data('maphilight').alwaysOn=areabisactive;
			$(this).data('maphilight').neverOn=!areabisactive;
		}
	});
	$('.map').maphilight();
	//--------------------
	
	//Initialisation de TIPPY sur les area
	tippy('.area', {
		placement: 'right',
		theme: 'light',
		duration: 0,
		followCursor: true,
		size: 'small',
		arrow: true, 
		livePlacement: true
	});
	//--------------------------------
	
	//Initialisation de bootbox et du surlignement :: pour le mouseOver et le click des area sur la map
	$('.area').unbind('click').unbind('mouseover').unbind('mouseout');
	$('.area').click(function(e) {
		if ( $(this).data('message') !== undefined )
		{
			var varNumero = $(this).data('numero');
			var varTitre = $(this).data('titre');
			var varMessage = $(this).data('message');
			if ( varTitre === null ) varTitre = "";
			if ( varMessage === null ) varMessage = "";
			
			bootbox.alert({message: '<center>' + varNumero + ' - <b>' + varTitre + '</b></center><hr/>' + varMessage, backdrop: true, size: 'large'})
		}
	}).mouseover(function(e) {//si on sélectionne une area ça surligne le lien
		if ( $('span[data-areaid=' + $(this).attr('id') + ']').length > 0 )
			$('span[data-areaid=' + $(this).attr('id') + ']').addClass('categ' + $(this).data('categorie'));
		else
			$('span[data-categorie=' + $(this).data('categorie') + '][class*=hilightlink]').addClass('categ' + $(this).data('categorie'));
	}).mouseout(function(e) {
		if ( $('span[data-areaid=' + $(this).attr('id') + ']').length > 0 )
			$('span[data-areaid=' + $(this).attr('id') + ']').removeClass('categ' + $(this).data('categorie'));
		else
			$('span[data-categorie=' + $(this).data('categorie') + '][class*=hilightlink]').removeClass('categ' + $(this).data('categorie'));
	});
	//--------------------------
	
	
	//Initialise les liens des listes de zones/rencontres
	//si on sélectionne un lien, ça sélectionne l'area correspondante
	$('.hilightlink').unbind('click').unbind('mouseover').unbind('mouseout');
	$('.hilightlink').mouseover(function(e) {
		if ( typeof $(this).data('areaid') !== "undefined")
			$('#' + $(this).data('areaid')).mouseover();
		else
			$('.area[data-categorie=' + $(this).data('categorie') + ']').mouseover();
	}).mouseout(function(e) {
		if ( typeof $(this).data('areaid') !== "undefined")
			$('#' + $(this).data('areaid')).mouseout();
		else
			$('.area[data-categorie=' + $(this).data('categorie') + ']').mouseout();
	}).click(function(e) { 
		e.preventDefault();
		if ( typeof $(this).data('areaid') !== "undefined")
			$('#' + $(this).data('areaid')).click();
	});
	//----------
	//si on sélectionne une catégorie, ça sélectionne les areas correspondantes
	$('.hilightMult').unbind('click').unbind('mouseover').unbind('mouseout');
	$('.hilightMult').mouseover(function(e) {
		$('.area[data-categorie=' + $(this).data('categorie') + ']').mouseover();
	}).mouseout(function(e) {
		$('.area[data-categorie=' + $(this).data('categorie') + ']').mouseout();
	}).click(function(e) { 
		//e.preventDefault();
	});
	//-------------
	//-------------
}


/**
 Cache la liste de zones/rencontres
*/
function hideListes() {
	$('#listes').hide();
	$('#hideShowListes').html("&#9660;");
}
/**
 Affiche la liste de zones/rencontres
*/
function showListes() {
	$('#listes').show();
	$('#hideShowListes').html("&#9651;");
	
	var left = parseFloat($('#blockList').css('left').substr(0, $('#blockList').css('left').length-2));
	var difLeft = $('#blockList').width();
	var difTop = $('#blockList').height();
	if ( left > ($(window).width() - difLeft) )
		$('#blockList').css('left', Math.max(0, ($(window).width() - difLeft)) + 'px' );
	
	var top = parseFloat($('#blockList').css('top').substr(0, $('#blockList').css('top').length-2));
	if ( top > ($(window).height() - difTop) )
		$('#blockList').css('top', Math.max(0, ($(window).height() - difTop)) + 'px' );
	
}
//------- fin des elements de liste --------




//---------- fin des fonctions js ---------
