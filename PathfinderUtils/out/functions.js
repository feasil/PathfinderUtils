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
		if ( $('.listes').is(':visible') )
			hideListes();
		else
			showListes();
	});
	$('.blockList').draggable({
		cursor: 'move',
		handle: '#moveListes',
		containment : 'window', 
		start:  function( event, ui){ 
			$(document).bind('scroll',function () { 
				window.scrollTo(0,0); 
			});
		}, 
		stop:  function( event, ui){ 
			$(document).unbind('scroll');
		}
	});
	
});
//-------- fin des boutons ----------


//Pour les onMouseOver sur les elements de liste
$(function() {
	//si on sélectionne un lien, ça sélectionne l'area correspondante
	$('.hilightlink').mouseover(function(e) {
		$('#'.concat($(this).data('areaid'))).mouseover();
	}).mouseout(function(e) {
		$('#'.concat($(this).data('areaid'))).mouseout();
	}).click(function(e) { 
		e.preventDefault();
		$('#'.concat($(this).data('areaid'))).click();
	});
	//----------
	//si on sélectionne une catégorie, ça sélectionne les areas correspondantes
	$('.hilightMult').mouseover(function(e) {
		$('.area[data-categorie='.concat($(this).data('categorie')).concat(']')).mouseover();
	}).mouseout(function(e) {
		$('.area[data-categorie='.concat($(this).data('categorie')).concat(']')).mouseout();
	}).click(function(e) { 
		//e.preventDefault();
	
	});
	//----------
});
//------- fin des elements de liste --------



// Si on redimentionne la fenêtre (ou zoom), on change le rendu de la liste d'éléments ==> elle garde toujours le même rendu
$(window).resize(function(e) {
	hideListes();
	$('div.blockList').css({'font-size': getPxIgnoreZoom(12) + 'px'});
	$('div.boutons').css({'margin-top': getPxIgnoreZoom(5) + 'px', 'margin-bottom': getPxIgnoreZoom(5) + 'px', 'margin-left': getPxIgnoreZoom(5) + 'px', 'margin-right': getPxIgnoreZoom(5) + 'px'});
	$('div.listes').css({'padding': getPxIgnoreZoom(5) + 'px ' + getPxIgnoreZoom(5) + 'px ' + getPxIgnoreZoom(5) + 'px ' + getPxIgnoreZoom(5) + 'px'});
	$('div.liste1').css({'padding-right': getPxIgnoreZoom(5) + 'px'});
	
	$('.hilightMult').css({'width': getPxIgnoreZoom(20) + 'px'});
	$('.mapButtonV2').css({'padding': getPxIgnoreZoom(2) + 'px ' + getPxIgnoreZoom(4) + 'px','-moz-box-shadow': 'inset 0px ' + getPxIgnoreZoom(1) + 'px 0px 0 px #a6827e', '-webkit-box-shadow': 'inset 0px ' + getPxIgnoreZoom(1) + 'px 0px 0px #a6827e', 'box-shadow': 'inset 0px ' + getPxIgnoreZoom(1) + 'px 0px 0px #a6827e', '-moz-border-radius': getPxIgnoreZoom(3) + 'px', '-webkit-border-radius': getPxIgnoreZoom(3) + 'px', 'border-radius': getPxIgnoreZoom(3) + 'px', 'border': getPxIgnoreZoom(1) + 'px solid #54381e', 'text-shadow': '0px ' + getPxIgnoreZoom(1) + 'px 0px #4d3534'});
	$('.switchMapButton').css({'width': getPxIgnoreZoom(100) + 'px'});
	$('.hideShowButton').css({'width': getPxIgnoreZoom(24) + 'px'});
	$('.moveButton').css({'width': getPxIgnoreZoom(24) + 'px'});
});
//On force le resize pour initialiser
$(window).resize();
//----------------------------------






// Fonctions js
function switchImageMap() {
	var areabisactive = ($('#mapPathfinder').attr('data-areabisactive') === "true");
	
	areabisactive = !areabisactive;
	
	$('#mapPathfinder').attr('data-areabisactive', areabisactive);
	
	initMapHilights();
}

function initMapHilights() {
	var areabisactive = ($('#mapPathfinder').attr('data-areabisactive') === "true");
	
	$('area').each(function() {
		var regex = /areabis/i;
		var isBis = regex.test($(this).attr('class'));
		var couleur = "000000";
		var couleurStroke = hexc($('.categ'.concat($(this).data('categorie'))).css('borderLeftColor'));;
		if ( isBis || !areabisactive )
			couleur = hexc($('.categ'.concat($(this).data('categorie'))).css('backgroundColor'));
		
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
	
	
	$('.area').click(function(e) {
		var varNumero = $(this).data('numero');
		var varTitre = $(this).data('titre');
		var varMessage = $(this).data('message');
		bootbox.alert({message: '<center>' + varNumero + ' - <b>' + varTitre + '</b></center><hr/>' + varMessage, backdrop: true, size: 'large'})
	});
	//si on sélectionne une area ça surligne le lien
	$('.area').mouseover(function(e) {
		$('[data-areaid='.concat($(this).attr('id')).concat(']')).addClass('categ'.concat($(this).data('categorie')));
	}).mouseout(function(e) {
		$('[data-areaid='.concat($(this).attr('id')).concat(']')).removeClass('categ'.concat($(this).data('categorie')));
	});
	//---------------------
	
}





function hideListes() {
	$('.listes').hide();
	$('#hideShowListes').html("&#9660;");
}
function showListes() {
	$('.listes').show();
	$('#hideShowListes').html("&#9651;");
	
	var left = parseFloat($('.blockList').css('left').substr(0, $('.blockList').css('left').length-2));
	var difLeft = getPxIgnoreZoom(536);
	var difTop = getPxIgnoreZoom(548);
	if ( left > ($(window).width() - difLeft) )
		$('.blockList').css('left', Math.max(0, ($(window).width() - difLeft)) + 'px' );
	
	var top = parseFloat($('.blockList').css('top').substr(0, $('.blockList').css('top').length-2));
	if ( top > ($(window).height() - difTop) )
		$('.blockList').css('top', Math.max(0, ($(window).height() - difTop)) + 'px' );
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

