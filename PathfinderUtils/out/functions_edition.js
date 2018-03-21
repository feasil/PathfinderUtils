//Fonctions pour l'édition
$( function() {
	//Ajout de l'onglet Edition
	$('#tabs>ul').append('<li><a href="#tabEdition" class="noSelect tab">Edition</a></li>');
	$('#tabs').append(`<div id="tabEdition">
		<div id="accordionEdition" class="form-group ">
			<h3 class="noSelect">Aventure</h3>
			<div>
				<form action="/" method="post" id="av-form">
					<input class="form-control" id="av-aventure" name="av-aventure" placeholder="Numéro *" type="number" min="0" step=".1" />
					<input class="form-control" id="av-titre" name="av-titre" placeholder="Titre *" type="text" />
					<input class="form-control" id="av-prefixrencontre" name="av-prefixrencontre" placeholder="Prefixe json Rencontres" type="text" />
					<input class="form-control" id="av-prefixzone" name="av-prefixzone" placeholder="Prefixe json Environnement" type="text" />
					<input class="form-control" id="av-map" name="av-map" placeholder="Carte *" type="text" />
					<button class="btn btn-primary" id="av-button" name="av-button" type="submit" form="av-form">Nouvelle aventure</button>
				</form>
			</div>
			<h3 class="noSelect">Zone d'environnement</h3>
			<div><span id='zo-warning' style="color:#FF0000; font-weight: bold; display: none;">/!\\ pas de prefix zone pour cette aventure</span>
				<form action="/" method="post"  id="zo-form">
					<input class="form-control" id="zo-areaid" name="zo-areaid" placeholder="id de zone *" disabled />
					<input class="form-control" id="zo-numero" name="zo-numero" placeholder="Numéro de zone *"  type="number" min="0" step="1" />
					<select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="zo-shape" name="zo-shape" style="width:50%;"><option hidden disabled value="">Forme *</option>
						<optgroup label="Simple"><option value="at:duck">Canard</option><option value="at:fight">Combat</option><option value="at:skull">Cr&acirc;ne</option><option value="at:star">Etoile</option><option value="at:meet">Rencontre</option></optgroup>
						<optgroup label="Ligne"><option value="fromto:arrow">Fl&egrave;che</option><option value="fromto:star">Etoile</option></optgroup>
						<optgroup label="Personnalis&eacute;"><option value="poly">Polygone</option></optgroup>
					</select><button class="btn btn-primary" id="zo-drawcoords" name="zo-drawcoords" type="button" disabled>Dessiner la forme *</button><input id="zo-coords" name="zo-coords" type="hidden" /><br/>
					<select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="zo-categorie" name="zo-categorie"><option hidden disabled value="">Cat&eacute;gorie *</option>
						<option value="none" class="categnone">Blanc</option><option value="divers" class="categdivers">Bleu clair (Divers)</option><option value="industrie" class="categindustrie">Bleu fonc&eacute; (Industrie)</option><option value="spirituel" class="categspirituel">Jaune (Spirituel)</option><option value="bataille" class="categbataille">Orange (Bataille)</option><option value="commerce" class="categcommerce">Rose (Commerce)</option><option value="taverne" class="categtaverne">Rouge (Taverne)</option><option value="administration" class="categadministration">Vert (Administration)</option><option value="special" class="categspecial">Violet (Sp&eacute;cial)</option>
					</select>
					<input class="form-control" id="zo-titre" name="zo-titre" placeholder="Titre *" type="text" />
					<textarea class="form-control" id="zo-description" name="zo-description" rows="2"  placeholder="Description" ></textarea><input id="zo-prefixzone" name="zo-prefixzone" type="hidden" />
					<button class="btn btn-primary" id="zo-button" name="zo-button" type="submit" form="zo-form">Nouvelle zone d'environnement</button>
				</form>
			</div>
			<h3 class="noSelect">Rencontre</h3>
			<div><span id='re-warning' style="color:#FF0000; font-weight: bold; display: none;">/!\\ pas de prefix rencontre pour cette aventure</span>
				<form action="/" method="post"  id="re-form">
					<input class="form-control" id="re-aventureshown" name="re-aventureshown" placeholder="Aventure *" disabled /><input id="re-aventure" name="re-aventure" type="hidden" />
					<input class="form-control" id="re-numero" name="re-numero" placeholder="Numéro de rencontre *"  type="number" min="0" step=".1" />
					<select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="re-arearef" name="re-arearef"><option hidden disabled value="">Zone environnement associ&eacute;e</option></select><br/>
					<select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="re-shape" name="re-shape" style="width:50%;"><option hidden disabled value="">Forme *</option>
						<optgroup label="Simple"><option value="at:duck">Canard</option><option value="at:fight">Combat</option><option value="at:skull">Cr&acirc;ne</option><option value="at:star">Etoile</option><option value="at:meet">Rencontre</option></optgroup>
						<optgroup label="Ligne"><option value="fromto:arrow">Fl&egrave;che</option><option value="fromto:star">Etoile</option></optgroup>
						<optgroup label="Personnalis&eacute;"><option value="poly">Polygone</option></optgroup>
					</select><button class="btn btn-primary" id="re-drawcoords" name="re-drawcoords" type="button" disabled>Dessiner la forme *</button><input id="re-coords" name="re-coords" type="hidden" /><br/>
					<select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="re-categorie" name="re-categorie"><option hidden disabled value="">Cat&eacute;gorie *</option>
						<option value="none" class="categnone">Blanc</option><option value="divers" class="categdivers">Bleu clair (Divers)</option><option value="industrie" class="categindustrie">Bleu fonc&eacute; (Industrie)</option><option value="spirituel" class="categspirituel">Jaune (Spirituel)</option><option value="bataille" class="categbataille">Orange (Bataille)</option><option value="commerce" class="categcommerce">Rose (Commerce)</option><option value="taverne" class="categtaverne">Rouge (Taverne)</option><option value="administration" class="categadministration">Vert (Administration)</option><option value="special" class="categspecial">Violet (Sp&eacute;cial)</option>
					</select>
					<input class="form-control" id="re-titre" name="re-titre" placeholder="Titre *" type="text" />
					<textarea class="form-control" id="re-description" name="re-description" rows="1.5"  placeholder="Description" ></textarea><input id="re-prefixrencontre" name="re-prefixrencontre" type="hidden" />
					<button class="btn btn-primary" id="re-button" name="re-button" type="submit" form="re-form">Nouvelle rencontre</button>
				<form>
			</div>
		</div>
	</div>`);
});








//Pour les inputs d'edition
function initEditionAventure() {//Cette fonction n'est appelée qu'une fois au chargement de la page
	//Initialisation des inputs d'édition : Aventure
	$('#av-aventure').val(null); $('#av-titre').val(null); $('#av-prefixrencontre').val(null); $('#av-prefixzone').val(null); $('#av-map').val(null);
	if ( dataAventure !== null ) 
	{
		var av = 0, availablePrefixRencontre = [], availablePrefixZone = [], availableMap = [];
		$.each(dataAventure, function(key, val) {
			//Merci javascript pour ta précision dans les additions (4.1 + .1 = 4.199999999999999), le Math.round est là pour contourner ça...
			if ( av === 0 ) $('#av-aventure').val(Math.round((val.aventure + 0.1) * 1e12) / 1e12);
			
			if ( val.prefixrencontre !== null && !availablePrefixRencontre.includes(val.prefixrencontre) )
				availablePrefixRencontre.push(val.prefixrencontre);
			if ( val.prefixzone !== null && !availablePrefixZone.includes(val.prefixzone) )
				availablePrefixZone.push(val.prefixzone);
			if ( val.map !== null && !availableMap.includes(val.map) )
				availableMap.push(val.map);
			av++;
		});
		availablePrefixRencontre.sort(); availablePrefixZone.sort(); availableMap.sort();
		$('#av-prefixrencontre').autocomplete({source: availablePrefixRencontre, minLength: 0})
								.focus(function(){$(this).autocomplete("search", $(this).val());});
		$('#av-prefixzone').autocomplete({source: availablePrefixZone, minLength: 0})
							.focus(function(){$(this).autocomplete("search", $(this).val());});
		$('#av-map').autocomplete({source: availableMap, minLength: 0})
							.focus(function(){$(this).autocomplete("search", $(this).val());});
	}
	//-----------------------------------
}

function initEditionZone() {
	var el = $('#aventure option:checked');
	var aventure = el.data('aventure');
	var titre = el.data('titre');
	var prefixzone = el.data('prefixzone');
	
	$('#zo-shape').val($('#zo-shape option:first').val()); $('#zo-drawcoords').attr('disabled', true); $('#zo-coords').val(null); 
	$('#zo-categorie').val($('#zo-categorie option:first').val()); $('#zo-titre').val(null); $('#zo-description').val(null); 
	
	if ( prefixzone === null )
	{
		$('#zo-warning').show();
		$('#zo-prefixzone').val(null);
	}
	else
	{
		$('#zo-warning').hide();
		$('#zo-prefixzone').val(prefixzone);
	}
	
	if ( dataDeBase !== null) 
	{
		var maxNumero = 0, maxareaid = 0;
		$.each(dataDeBase, function(key, val) {
			if ( val.numero > maxNumero )
				maxNumero = val.numero;
			var id = parseInt(val.areaid.substring(5,val.areaid.length))
			if ( id > maxareaid )
				maxareaid = id;
		});
		$('#zo-numero').val(Math.trunc(maxNumero) + 1);
		$('#zo-areaid').val('path-' + (maxareaid + 1));
	}
	else 
	{
		$('#zo-numero').val(1);
		$('#zo-areaid').val('path-' + 1);
	}
}

function initEditionRencontre() {
	var el = $('#aventure option:checked');
	var aventure = el.data('aventure');
	var titre = el.data('titre');
	var prefixrencontre = el.data('prefixrencontre');
	
	$('#re-aventureshown').val(aventure + ' - ' + titre); $('#re-aventure').val(aventure);
	$('#re-shape').val($('#re-shape option:first').val()); $('#re-drawcoords').attr('disabled', true); $('#re-coords').val(null); 
	$('#re-categorie').val($('#re-categorie option:first').val()); $('#re-titre').val(null); $('#re-description').val(null); 
	
	$('#re-arearef>option').not(':first').remove();
	$('#re-arearef').val($('#re-arearef option:first').val()); 
	
	if ( prefixrencontre === null )
	{
		$('#re-warning').show();
		$('#re-prefixrencontre').val(null);
	}
	else
	{
		$('#re-warning').hide();
		$('#re-prefixrencontre').val(prefixrencontre);
	}
	
	if ( dataRencontre !== null) 
	{
		var max = 0;
		$.each(dataRencontre, function(key, val) {
			if ( val.aventure === aventure && val.numero > max )
				max = val.numero;
		});
		$('#re-numero').val(Math.trunc(max) + 1);
	}
	else $('#re-numero').val(1);
	if ( dataDeBase !== null )
	{
		var zones = [];
		$.each(dataDeBase, function(key, val) { zones.push([val.numero, val.titre, val.areaid]); });
		zones.sort(function(a,b) { 
				if ( a[0] > b[0] ) return 1;
				if ( b[0] > a[0] ) return -1;
				return 0;
			});
	 	$.each(zones, function(key, val) { $('#re-arearef').append('<option value="' + val[2] + '">' + val[0] + ' - ' + val[1] + '</option>'); });
	}
}
//-------------------------



