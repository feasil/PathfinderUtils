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





// Si on redimentionne la fenêtre (ou zoom), on change le rendu de la liste d'éléments ==> elle garde toujours le même rendu
$(window).resize(function(e) {
	//hideListes();
	$('div#blockList').css({'font-size': getPxIgnoreZoom(11) + 'px'});
	
	$('.mapButtonV2').css({'padding': getPxIgnoreZoom(2) + 'px ' + getPxIgnoreZoom(4) + 'px','-moz-box-shadow': 'inset 0px ' + getPxIgnoreZoom(1) + 'px 0px 0 px #a6827e', '-webkit-box-shadow': 'inset 0px ' + getPxIgnoreZoom(1) + 'px 0px 0px #a6827e', 'box-shadow': 'inset 0px ' + getPxIgnoreZoom(1) + 'px 0px 0px #a6827e', '-moz-border-radius': getPxIgnoreZoom(3) + 'px', '-webkit-border-radius': getPxIgnoreZoom(3) + 'px', 'border-radius': getPxIgnoreZoom(3) + 'px', 'border': getPxIgnoreZoom(1) + 'px solid #54381e', 'text-shadow': '0px ' + getPxIgnoreZoom(1) + 'px 0px #4d3534'});
	
	//$('div#listes').css({'padding': getPxIgnoreZoom(5) + 'px ' + getPxIgnoreZoom(5) + 'px ' + getPxIgnoreZoom(5) + 'px ' + getPxIgnoreZoom(5) + 'px'});
	//$('div#liste1').css({'padding-right': getPxIgnoreZoom(5) + 'px'});
	
	//$('div#boutons').css({'margin-top': getPxIgnoreZoom(5) + 'px', 'margin-right': getPxIgnoreZoom(5) + 'px', 'margin-bottom': getPxIgnoreZoom(5) + 'px', 'margin-left': getPxIgnoreZoom(5) + 'px'});
	//$('.hilightMult').css({'width': getPxIgnoreZoom(20) + 'px'});
	//$('.switchMapButton').css({'width': getPxIgnoreZoom(100) + 'px'});
	//$('.littleButton').css({'width': getPxIgnoreZoom(26) + 'px'});
	
});
//On force le resize pour initialiser
$(window).resize();
//----------------------------------






// Fonctions js
function switchImageMap() {
	var areabisactive = ($('#mapPathfinder').attr('data-areabisactive') === "true");
	
	areabisactive = !areabisactive;
	
	$('#mapPathfinder').attr('data-areabisactive', areabisactive);
	
	initMap();
}

function initMap() {
	initMapHilights();
	initAreas();
	initHilights();
}

function initMapHilights() {
	var areabisactive = ($('#mapPathfinder').attr('data-areabisactive') === "true");
	
	$('area').each(function() {
		var regex = /areabis/i;
		var isBis = regex.test($(this).attr('class'));
		var couleur = "000000";
		var couleurStroke = hexc($('.categ' + $(this).data('categorie')).css('borderLeftColor'));;
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
	
	initAreas();
}

function initAreas() {
	tippy('.area', {
		placement: 'right',
		theme: 'light',
		duration: 0,
		followCursor: true,
		size: 'small',
		arrow: true, 
		livePlacement: true
	});
	
	$('.area').unbind('click').unbind('mouseover').unbind('mouseout');
	
	$('.area').click(function(e) {
		if ( $(this).data('categorie') !== 'special' )
		{
			var varNumero = $(this).data('numero');
			var varTitre = $(this).data('titre');
			var varMessage = $(this).data('message');
			bootbox.alert({message: '<center>' + varNumero + ' - <b>' + varTitre + '</b></center><hr/>' + varMessage, backdrop: true, size: 'large'})
		}
	}).mouseover(function(e) {//si on sélectionne une area ça surligne le lien
		if ( $('a[data-areaid=' + $(this).attr('id') + ']').length > 0 )
			$('a[data-areaid=' + $(this).attr('id') + ']').addClass('categ' + $(this).data('categorie'));
		else
			$('a[data-categorie=' + $(this).data('categorie') + ']').addClass('categ' + $(this).data('categorie'));
	}).mouseout(function(e) {
		if ( $('a[data-areaid=' + $(this).attr('id') + ']').length > 0 )
			$('a[data-areaid=' + $(this).attr('id') + ']').removeClass('categ' + $(this).data('categorie'));
		else
			$('a[data-categorie=' + $(this).data('categorie') + ']').removeClass('categ' + $(this).data('categorie'));
	});
	//---------------------
}


//Pour les onMouseOver sur les elements de liste
function initHilights() {
	$('.hilightlink').unbind('click').unbind('mouseover').unbind('mouseout');
	$('.hilightMult').unbind('click').unbind('mouseover').unbind('mouseout');
	
	//si on sélectionne un lien, ça sélectionne l'area correspondante
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
	$('.hilightMult').mouseover(function(e) {
		$('.area[data-categorie=' + $(this).data('categorie') + ']').mouseover();
	}).mouseout(function(e) {
		$('.area[data-categorie=' + $(this).data('categorie') + ']').mouseout();
	}).click(function(e) { 
		//e.preventDefault();
	});
	//----------
}
//------- fin des elements de liste --------





function hideListes() {
	$('#listes').hide();
	$('#hideShowListes').html("&#9660;");
}
function showListes() {
	$('#listes').show();
	$('#hideShowListes').html("&#9651;");
	
	var left = parseFloat($('#blockList').css('left').substr(0, $('#blockList').css('left').length-2));
	var difLeft = $('#blockList').width();//getPxIgnoreZoom(536);
	var difTop = $('#blockList').height();//getPxIgnoreZoom(548);
	if ( left > ($(window).width() - difLeft) )
		$('#blockList').css('left', Math.max(0, ($(window).width() - difLeft)) + 'px' );
	
	var top = parseFloat($('#blockList').css('top').substr(0, $('#blockList').css('top').length-2));
	if ( top > ($(window).height() - difTop) )
		$('#blockList').css('top', Math.max(0, ($(window).height() - difTop)) + 'px' );
	
}





function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
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
//---------- fin des fonctions js ---------

