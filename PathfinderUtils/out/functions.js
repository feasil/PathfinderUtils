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
		/*drag: function( event, ui){ 
			var dragXLeft = 0;
			var dragXRight = $('.blockList').css('width').substr(0, $('.blockList').css('width').length-2);
			var dragYTop = 0;
			//var dragYBottom = parseFloat($('.blockList').css('width').substr(0, $('.blockList').css('height').length-2)) + 50;
			
			ui.position.left = Math.max(ui.position.left, ui.helper.prev().offset().left + getPxIgnoreZoom(dragXLeft));
			ui.position.left = Math.min(ui.position.left,  ui.helper.next().offset().left + ui.helper.next().width() - dragXRight);
			
			ui.position.top = Math.max(ui.position.top, ui.helper.prev().offset().top + getPxIgnoreZoom(dragYTop));
			//ui.position.top = Math.min(ui.position.top,  ui.helper.next().offset().top + ui.helper.next().height() - dragYBottom); 
			
		}, */
		start:  function( event, ui){ 
			$(document).bind('scroll',function () { 
				window.scrollTo(0,0); 
			});
		}, 
		stop:  function( event, ui){ 
			$(document).unbind('scroll');
		}
	});
	
	$('.area').click(function(e) {
		var varNumero = $(this).data('numero');
		var varTitre = $(this).data('titre');
		var varMessage = $(this).data('message');
		bootbox.alert({message: '<center>' + varNumero + ' - <b>' + varTitre + '</b></center><hr/>' + varMessage, backdrop: true, size: 'large'})
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

	//Ajout de l'id sur les liens (pour référence area -> lien)
	$('.hilightlink').each(function() {
		$(this).attr('id', 'lien'.concat($(this).data('areaid')));
	});
	//Références area -> lien
	$('.area').mouseover(function(e) {
		$('#lien'.concat($(this).attr('id'))).addClass('categ'.concat($(this).data('categorie')));
	}).mouseout(function(e) {
		$('#lien'.concat($(this).attr('id'))).removeClass('categ'.concat($(this).data('categorie')));
	});
	//---------------------
});
//------- fin des elements de liste --------




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
$(window).resize();







// Fonctions js
function switchImageMap() {
	var areabisactive = ($('#mapPathfinder').attr('data-areabisactive') === "true");
	
	areabisactive = !areabisactive;
	
	$('#mapPathfinder').attr('data-areabisactive', areabisactive);
	
	$('.area').each(function() {
		var couleur = "000000";
		if ( !areabisactive )
		{
			//var regExp = /area area([^ ]+)/;
			//var matches = regExp.exec($(this).attr('class'));
			//couleur = hexc($('.categ'.concat(matches[1])).css('backgroundColor'));
			couleur = hexc($('.categ'.concat($(this).data('categorie'))).css('backgroundColor'));
		}
		$(this).data('maphilight').fillColor=couleur;
		$(this).data('maphilight').shadowColor=couleur;
		//$(this).data('maphilight').strokeColor=couleur;
	});
	$('.areabis').each(function() {
		$(this).data('maphilight').alwaysOn=areabisactive;
		$(this).data('maphilight').neverOn=!areabisactive;
	});
	
	$('.map').maphilight();
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

