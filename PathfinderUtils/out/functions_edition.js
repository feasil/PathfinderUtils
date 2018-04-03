//Variables globales
var editionAventure = null;
var editionDeBase = null;
var editionRencontre = null;
var drawForme = false;
//------------------

//Fonctions pour l'édition
$( function() {
	//Ajout de l'onglet Edition
	$('#tabs>ul').append('<li><a href="#tabEdition" class="noSelect tab">Edition</a></li>');
	$('#tabs').append(`<div id="tabEdition">
		<div id="accordionEdition" class="form-group ">
			<h3 class="noSelect" id='av-title'>Aventure</h3>
			<div>
				<form action="/" method="post" id="av-form">
					Si num&eacute;ro existant : modifie l'&eacute;l&eacute;ment
					<input class="form-control" id="av-aventure" name="av-aventure" placeholder="Numéro *" type="number" min="0" step=".1" />
					<input class="form-control" id="av-titre" name="av-titre" placeholder="Titre *" type="text" />
					<input class="form-control" id="av-prefixrencontre" name="av-prefixrencontre" placeholder="Prefixe json Rencontres" type="text" />
					<input class="form-control" id="av-prefixzone" name="av-prefixzone" placeholder="Prefixe json Environnement" type="text" />
					<input class="form-control" id="av-map" name="av-map" placeholder="Carte *" type="text" />
					<button class="btn btn-primary" id="av-buttonadd" name="av-buttonadd" type="submit" form="av-form">Ajouter/Modifier</button>&nbsp;<button class="btn btn-primary" id="av-buttongenerer" name="av-buttongenerer" type="button" form="av-form">G&eacute;n&eacute;rer</button>
					<ul id="av-preview"></ul>
				</form>
			</div>
			<h3 class="noSelect" id="zo-title">Zone d'environnement</h3>
			<div><span id="zo-warning" style="color:#FF0000; font-weight: bold; display: none;">/!\\ pas de prefix zone pour cette aventure</span>
				<form action="/" method="post" id="zo-form">
					Si num&eacute;ro existant : modifie l'&eacute;l&eacute;ment
					<input class="form-control" id="zo-numero" name="zo-numero" placeholder="Numéro de zone *"  type="number" min="0" step="1" />
					<select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="zo-shape" name="zo-shape" style="width:50%;"><option hidden disabled value="">Forme *</option>
						<optgroup label="Simple"><option value="at:beer">Bi&egrave;re</option><option value="at:duck">Canard</option><option value="at:fight">Combat</option><option value="at:skull">Cr&acirc;ne</option><option value="at:star">Etoile</option><option value="at:meet">Rencontre</option></optgroup>
						<optgroup label="Ligne"><option value="fromto:arrow">Fl&egrave;che</option><option value="fromto:star">Etoile</option></optgroup>
						<optgroup label="Personnalis&eacute;"><option value="poly">Polygone</option></optgroup>
					</select><button class="btn btn-primary" id="zo-drawcoords" name="zo-drawcoords" data-from="#zo-shape" data-for="#zo-coords" type="button" disabled>Dessiner la forme *</button><input id="zo-coords" name="zo-coords" type="hidden" /><br/>
					<select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="zo-categorie" name="zo-categorie"><option hidden disabled value="">Cat&eacute;gorie *</option>
						<option value="none" class="categnone">Blanc</option><option value="divers" class="categdivers">Bleu clair (Divers)</option><option value="industrie" class="categindustrie">Bleu fonc&eacute; (Industrie)</option><option value="spirituel" class="categspirituel">Jaune (Spirituel)</option><option value="bataille" class="categbataille">Orange (Bataille)</option><option value="commerce" class="categcommerce">Rose (Commerce)</option><option value="taverne" class="categtaverne">Rouge (Taverne)</option><option value="administration" class="categadministration">Vert (Administration)</option><option value="special" class="categspecial">Violet (Sp&eacute;cial)</option><option value="dark" class="categdark">Gris (Dark)</option>
					</select>
					<input class="form-control" id="zo-titre" name="zo-titre" placeholder="Titre *" type="text" />
					<textarea class="form-control" id="zo-description" name="zo-description" rows="2"  placeholder="Description" ></textarea><input id="zo-prefixzone" name="zo-prefixzone" type="hidden" />
					<button class="btn btn-primary" id="zo-buttonadd" name="zo-buttonadd" type="submit" form="zo-form">Ajouter/Modifier</button>&nbsp;<button class="btn btn-primary" id="zo-buttongenerer" name="zo-buttongenerer" type="button" form="zo-form">G&eacute;n&eacute;rer</button>
					<ul id="zo-preview"></ul>
				</form>
			</div>
			<h3 class="noSelect" id="re-title">Rencontre</h3>
			<div><span id="re-warning" style="color:#FF0000; font-weight: bold; display: none;">/!\\ pas de prefix rencontre pour cette aventure</span>
				<form action="/" method="post" id="re-form">
					Si num&eacute;ro existant : modifie l'&eacute;l&eacute;ment
					<input class="form-control" id="re-numero" name="re-numero" placeholder="Numéro de rencontre *"  type="number" min="0" step=".1" />
					<select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="re-arearef" name="re-arearef"><option hidden disabled value="">Zone environnement associ&eacute;e</option></select><br/>
					<select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="re-shape" name="re-shape" style="width:50%;"><option hidden disabled value="">Forme *</option>
						<optgroup label="Simple"><option value="at:beer">Bi&egrave;re</option><option value="at:duck">Canard</option><option value="at:fight">Combat</option><option value="at:skull">Cr&acirc;ne</option><option value="at:star">Etoile</option><option value="at:meet">Rencontre</option></optgroup>
						<optgroup label="Ligne"><option value="fromto:arrow">Fl&egrave;che</option><option value="fromto:star">Etoile</option></optgroup>
						<optgroup label="Personnalis&eacute;"><option value="poly">Polygone</option></optgroup>
					</select><button class="btn btn-primary" id="re-drawcoords" name="re-drawcoords" data-from="#re-shape" data-for="#re-coords" type="button" disabled>Dessiner la forme *</button><input id="re-coords" name="re-coords" type="hidden" /><br/>
					<select class="custom-select mb-2 mr-sm-2 mb-sm-0" id="re-categorie" name="re-categorie"><option hidden disabled value="">Cat&eacute;gorie *</option>
						<option value="none" class="categnone">Blanc</option><option value="divers" class="categdivers">Bleu clair (Divers)</option><option value="industrie" class="categindustrie">Bleu fonc&eacute; (Industrie)</option><option value="spirituel" class="categspirituel">Jaune (Spirituel)</option><option value="bataille" class="categbataille">Orange (Bataille)</option><option value="commerce" class="categcommerce">Rose (Commerce)</option><option value="taverne" class="categtaverne">Rouge (Taverne)</option><option value="administration" class="categadministration">Vert (Administration)</option><option value="special" class="categspecial">Violet (Sp&eacute;cial)</option><option value="dark" class="categdark">Gris (Dark)</option>
					</select>
					<input class="form-control" id="re-titre" name="re-titre" placeholder="Titre *" type="text" />
					<textarea class="form-control" id="re-description" name="re-description" rows="2"  placeholder="Description" ></textarea><input id="re-prefixrencontre" name="re-prefixrencontre" type="hidden" />
					<button class="btn btn-primary" id="re-buttonadd" name="re-buttonadd" type="submit" form="re-form">Ajouter/Modifier</button>&nbsp;<button class="btn btn-primary" id="re-buttongenerer" name="re-buttongenerer" type="button" form="re-form">G&eacute;n&eacute;rer</button>
					<ul id="re-preview"></ul>
				<form>
			</div>
		</div>
	</div>`);
	
	//Ajout des actions pour l'édition sur le changement d'onglet
	$( "#tabs" ).on("tabsactivate", function(event, ui) {
		$('#accordionEdition').accordion('option', 'active', false);
		drawForme = false;
		if ( ui.newPanel.attr('id') === 'tabEdition' ) {
			$('#accordionEdition').accordion('refresh');
			
			initEditionAventure();
			initEditionZone();
			initEditionRencontre();
		}
		else { 
			editionAventure = []; editionDeBase = []; editionRencontre = []; 
			$('#av-preview').empty(); $('#zo-preview').empty(); $('#re-preview').empty();
		}
	});
	$('#accordionEdition').accordion({
		beforeActivate: function(event, ui) {
			if ( ui.newHeader.attr('id') === 'av-title' ) {
				initChampsAventure();
				updateEditionAventurePreview();
			}
			else if ( ui.newHeader.attr('id') === 'zo-title' ) {
				initChampsZone();
				updateEditionZonePreview();
			}
			else if ( ui.newHeader.attr('id') === 're-title' ) {
				initChampsRencontre();
				updateEditionRencontrePreview();
			}
			drawForme = false;
		},
		collapsible: true, 
		active: false //false ou index
	});
	
	//------AVENTURES-------
	$('#av-form').submit(function(){ submitEditionAventure(); return false; }); //Ajout/modif aventure
	$('#av-buttongenerer').click(function(e){ genererEditionAventure(); e.preventDefault(); });//Bouton de génération des aventures
	//----------------------
	
	//------ZONES------
	$('#zo-form').submit(function(){ submitEditionZone(); return false; }); //Ajout/modif zone
	$('#zo-buttongenerer').click(function(e){ genererEditionZone(); e.preventDefault(); });//Bouton de génération des zones
	$('#zo-shape').change(function() { //Sélection de forme des zones
		var shape = ($('#zo-shape').val()===""?null:$('#zo-shape').val());
		$('#zo-drawcoords').attr('disabled', (shape === null));
		
		drawForme = false;
		$('#zo-coords').val('');
		
		$('#zo-drawcoords').click();
	});
	$('#zo-drawcoords').click(function() {
		utilDrawing($(this));
	});
	$('#zo-coords').change(function(){
		var nouvelleZone = {
			"numero": null,
			"shape": ($('#zo-shape').val()===""?null:$('#zo-shape').val()),
			"coords": ($('#zo-coords').val()===""?null:$('#zo-coords').val()),
			"categorie": "light",
			"titre": null,
			"description": null, 
			"temporaire": true
		};
		var tmp = editionDeBase.slice(0);
		tmp.push(nouvelleZone);
		loadDataIntoMap(null, tmp);
	});
	//-----------------------
	
	//------RENCONTRES------
	$('#re-form').submit(function(){ submitEditionRencontre(); return false; }); //Ajout/modif rencontre
	$('#re-buttongenerer').click(function(e){ genererEditionRencontre(); e.preventDefault(); });//Bouton de génération des rencontres
	$('#re-shape').change(function() { //Sélection de forme des rencontres
		var shape = ($('#re-shape').val()===""?null:$('#re-shape').val());
		$('#re-drawcoords').attr('disabled', (shape === null));
		
		drawForme = false;
		$('#re-coords').val('');
		
		$('#re-drawcoords').click();
	});
	$('#re-drawcoords').click(function() {
		utilDrawing($(this));
	});
	$('#re-coords').change(function(){
		var nouvelleRencontre = {
			"numero": null,
			"arearef": null,
			"shape": ($('#re-shape').val()===""?null:$('#re-shape').val()),
			"coords": ($('#re-coords').val()===""?null:$('#re-coords').val()),
			"categorie": "light",
			"titre": null,
			"description": null, 
			"temporaire": true
		};
		var tmp = editionRencontre.slice(0);
		tmp.push(nouvelleRencontre);
		loadDataIntoMap(null, tmp);
	});
	//-----------------------
	
	
	
	$('#blockMap').click(function(e) {
		if ( drawForme )//pour les dessins de zone et de rencontre
		{
			var prefix = null;
			if ( $('#accordionEdition>.ui-state-active').attr('id') === 'zo-title' )
				prefix = 'zo-';
			else if ( $('#accordionEdition>.ui-state-active').attr('id') === 're-title' )
				prefix = 're-';
			
			if ( prefix !== null )
			{
				var shape = ($('#' + prefix + 'shape').val()===""?null:$('#' + prefix + 'shape').val());
				var coords = ($('#' + prefix + 'coords').val()===""?null:$('#' + prefix + 'coords').val());
				coords = (coords===null?'':coords + ', ') + e.pageX + ',' + e.pageY;
				
				$('#' + prefix + 'coords').val(coords).trigger('change');
				var nbCoords = coords.split(",").length / 2;
				if ( shape === 'poly' ) {
					$('#' + prefix + 'drawcoords').text('Forme en cours [' + nbCoords + ']');
				}
				else if ( shape.startsWith('at:') ) {
					$('#' + prefix + 'drawcoords').text('Forme OK [' + nbCoords + ']');
					$('#' + prefix + 'drawcoords').css('color', '#22FF22;');
					drawForme = false;
				}
				else if ( shape.startsWith('fromto:') ) {
					if ( nbCoords === 2 )
					{
						$('#' + prefix + 'drawcoords').text('Forme OK [' + nbCoords + ']');
						$('#' + prefix + 'drawcoords').css('color', '#22FF22;');
						drawForme = false;
					}
					else
						$('#' + prefix + 'drawcoords').text('Forme en cours [' + nbCoords + ']');
				}
			}
		}
	});
});
//---------- FIN GENERAL --------------





//----------- AVENTURES ---------
/**
Initialise les champs pour l'édition d'aventure
*/
function initEditionAventure() {
	if ( dataAventure !== null )
		editionAventure = dataAventure.slice(0);
	else
		editionAventure = [];
	
	editionAventure.sort(trierAventure);
	
	initChampsAventure();
}
function initChampsAventure() {
	$('#av-aventure').val(null); $('#av-titre').val(null); $('#av-prefixrencontre').val(null); $('#av-prefixzone').val(null); $('#av-map').val(null);
	
	$('#av-aventure').attr('required', false);
	$('#av-titre').attr('required', false);
	$('#av-map').attr('required', false);
	
	var av = 0, availablePrefixRencontre = [], availablePrefixZone = [], availableMap = [];
	$.each(editionAventure, function(key, val) {
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
/**
Mise à jour de la liste des éléments d'aventure pour le preview de l'édition
*/
function updateEditionAventurePreview() {
	$('#av-preview').empty();
	$.each(editionAventure, function(key,value) {
		var json = JSON.stringify(value, null, '\t');
		$('#av-preview').append('<li title="'
							+ json.replace(/"/g, '&quot;') + '"><a href="#" name="delete_av" data-av-aventure="' + value.aventure + '" style="color:#FF0000;">sup.</a> ' 
							+ '<a href="#" name="modify_av" data-av-aventure="' + value.aventure + '" style="color:#FF6600;">mod.</a> ' 
							+ value.aventure + ' - ' + value.titre 
							+ '</li>');
	});
	loadDataIntoMap(null, []);
	
	//Pour supprimer une aventure de la liste
	$('a[name=delete_av]').click(function(e){
		var num = parseFloat($(this).data('av-aventure'));
		var indexASupprimer = null;
		$.each(editionAventure, function(key,value) {
			if ( value.aventure === num ) {
				indexASupprimer = key;
				return;
			}
		});
		if ( indexASupprimer !== null )
			editionAventure.splice(indexASupprimer, 1);
		updateEditionAventurePreview();
		e.preventDefault();
	});
	//Pour modifier une aventure de la liste
	$('a[name=modify_av]').click(function(e){
		var num = parseFloat($(this).data('av-aventure'));
		$.each(editionAventure, function(key,value) {
			if ( value.aventure === num ) {
				$('#av-aventure').val(value.aventure);
				$('#av-titre').val(value.titre);
				$('#av-prefixrencontre').val(value.prefixrencontre);
				$('#av-prefixzone').val(value.prefixzone);
				$('#av-map').val(value.map);
				return;
			}
		});
		e.preventDefault();
	});
}


/**
Ajout / Modification d'aventure dans la liste
*/
function submitEditionAventure() {
	//Pour ajouter ou modifier une aventure à la liste
	var nouvelleAventure = {
		"aventure": parseFloat($('#av-aventure').val()),
		"titre": ($('#av-titre').val()===""?null:$('#av-titre').val()),
		"prefixrencontre": ($('#av-prefixrencontre').val()===""?null:$('#av-prefixrencontre').val()),
		"prefixzone": ($('#av-prefixzone').val()===""?null:$('#av-prefixzone').val()),
		"map": ($('#av-map').val()===""?null:$('#av-map').val()),
	};
	
	if ( nouvelleAventure.aventure === null 
			|| nouvelleAventure.titre === null 
			|| nouvelleAventure.map === null )
	{
		$('#av-aventure').attr('required', true);
		$('#av-titre').attr('required', true);
		$('#av-map').attr('required', true);
		return false;
	}
	
	if ( editionAventure === null )
		editionAventure = [nouvelleAventure];
	else {//Pour modifier : on remplace l'existant par le nouveau
		var indexAModifier = null;
		$.each(editionAventure, function(key,value) {
			if ( value.aventure === nouvelleAventure.aventure ) {
				indexAModifier = key;
				return;
			}
		});
		if ( indexAModifier !== null )
			editionAventure.splice(indexAModifier, 1, nouvelleAventure);
		else
		{
			editionAventure.push(nouvelleAventure);
			editionAventure.sort(trierAventure);
		}
	}
	
	updateEditionAventurePreview();
	
	//Réinitialise les champs
	initChampsAventure();
	//-----------------------
	
	return false;
}
function genererEditionAventure() {
	var fileName = 'aventures.json';
	var jsonAventures = {"aventures": editionAventure};
	downloadFile(JSON.stringify(jsonAventures, null, '\t') , fileName);
}
//----------- FIN DES AVENTURES ---------

//----------- ZONES ---------
/**
Initialise les champs pour l'édition de zone
*/
function initEditionZone() {
	//Zone
	if ( dataDeBase !== null )
		editionDeBase = dataDeBase.slice(0);
	else
		editionDeBase = [];
	
	editionDeBase.sort(trierZoneParNumero);
	
	initChampsZone();
}
function initChampsZone() {
	var el = $('#aventure option:checked');
	var prefixzone = el.data('prefixzone');
	
	$('#zo-shape').val($('#zo-shape option:first').val()); $('#zo-drawcoords').attr('disabled', true); $('#zo-coords').val(null); 
	$('#zo-categorie').val($('#zo-categorie option:first').val()); $('#zo-titre').val(null); $('#zo-description').val(null); 
	
	$('#zo-numero').attr('required', false);
	$('#zo-categorie').attr('required', false);
	$('#zo-titre').attr('required', false);
	$('#zo-drawcoords').text('Dessiner la forme *');
	$('#zo-drawcoords').css('color', '#FFFFFF;');
	
	if ( prefixzone === null ) {
		$('#zo-warning').show();
		$('#zo-prefixzone').val(null);
	}
	else
	{
		$('#zo-warning').hide();
		$('#zo-prefixzone').val(prefixzone);
	}
	
	var max = 0;
	$.each(editionDeBase, function(key, val) {
		if ( val.numero > max )
			max = val.numero;
	});
	$('#zo-numero').val(Math.trunc(max) + 1);
}
/**
Mise à jour de la liste des éléments de rencontre pour le preview de l'édition
*/
function updateEditionZonePreview() {
	$('#zo-preview').empty();
	$.each(editionDeBase, function(key,value) {
		var json = JSON.stringify(value, function remplaçant(key, value) { if ( key === "areaid") return undefined; else return value; }, '\t');
		$('#zo-preview').append('<li title="'
							+ json.replace(/"/g, '&quot;') + '"><a href="#" name="delete_zo" data-zo-numero="' + value.numero + '" style="color:#FF0000;">sup.</a> ' 
							+ '<a href="#" name="modify_zo" data-zo-numero="' + value.numero + '" style="color:#FF6600;">mod.</a> ' 
							+ value.numero + ' - ' + value.titre 
							+ '</li>');
	});
	loadDataIntoMap(null, editionDeBase);
	
	//Pour supprimer une rencontre de la liste
	$('a[name=delete_zo]').click(function(e){
		var num = parseFloat($(this).data('zo-numero'));
		var indexASupprimer = null;
		$.each(editionDeBase, function(key,value) {
			if ( value.numero === num ) {
				indexASupprimer = key;
				return;
			}
		});
		if ( indexASupprimer !== null )
			editionDeBase.splice(indexASupprimer, 1);
		updateEditionRencontrePreview();
		e.preventDefault();
	});
	//Pour modifier une rencontre de la liste
	$('a[name=modify_zo]').click(function(e){
		var num = parseFloat($(this).data('zo-numero'));
		$.each(editionDeBase, function(key,value) {
			if ( value.numero === num ) {
				$('#zo-numero').val(value.numero);
				$('#zo-shape').val(value.shape);
				$('#zo-coords').val(value.coords);
				$('#zo-categorie').val(value.categorie);
				$('#zo-titre').val(value.titre);
				$('#zo-description').val(value.description);
				
				$('#zo-drawcoords').attr('disabled', false);
				var nbCoords = $('#zo-coords').val().split(",").length / 2;
				$('#zo-drawcoords').text('Forme OK [' + nbCoords + ']');
				$('#zo-drawcoords').css('color', '#22FF22;');
				return;
			}
		});
		e.preventDefault();
	});
}

/**
Ajout / Modification de zone dans la liste
*/
function submitEditionZone() {
	//Pour ajouter ou modifier une zone à la liste
	var nouvelleZone = {
		"numero": parseFloat($('#zo-numero').val()),
		"shape": ($('#zo-shape').val()===""?null:$('#zo-shape').val()),
		"coords": ($('#zo-coords').val()===""?null:$('#zo-coords').val()),
		"categorie": ($('#zo-categorie').val()===""?null:$('#zo-categorie').val()),
		"titre": ($('#zo-titre').val()===""?null:$('#zo-titre').val()),
		"description": ($('#zo-description').val()===""?null:$('#zo-description').val())
	};
	var prefixzone = ($('#zo-prefixzone').val()===""?null:$('#zo-prefixzone').val());
	
	if ( prefixzone === null 
		|| nouvelleZone.numero === null 
		|| nouvelleZone.shape === null 
		|| nouvelleZone.coords === null 
		|| nouvelleZone.categorie === null 
		|| nouvelleZone.titre === null )
	{
		$('#zo-numero').attr('required', true);
		$('#zo-shape').attr('required', true);
		$('#zo-categorie').attr('required', true);
		$('#zo-titre').attr('required', true);
		if ( nouvelleZone.coords === null )
			$('#zo-drawcoords').css('color', '#FF2222;');
		return false;
	}
	
	if ( editionDeBase === null )
		editionDeBase = [nouvelleZone];
	else {//Pour modifier : on remplace l'existant par le nouveau
		var indexAModifier = null;
		$.each(editionDeBase, function(key,value) {
			if ( value.numero === nouvelleZone.numero ) {
				indexAModifier = key;
				return;
			}
		});
		if ( indexAModifier !== null )
			editionDeBase.splice(indexAModifier, 1, nouvelleZone);
		else
		{
			editionDeBase.push(nouvelleZone);
			editionDeBase.sort(trierZoneParNumero);
		}
	}
	
	updateEditionZonePreview();
	
	//Réinitialise les champs
	initChampsZone();
	//-----------------------
	
	return false;
}
function genererEditionZone() {
	var fileName = ($('#zo-prefixzone').val()===""?null:$('#zo-prefixzone').val() + '_zones.json');
	if ( fileName === null )
		return false;
	var jsonZones = {"zones": editionDeBase};
	downloadFile(JSON.stringify(jsonZones, function(key, value) { if ( key === "areaid") return undefined; else return value; }, '\t') , fileName);
}
//----------- FIN DES ZONES ---------


//----------- RENCONTRES ---------
/**
Initialise les champs pour l'édition de rencontre
*/
function initEditionRencontre() {
	//Rencontre
	if ( dataRencontre !== null )
		editionRencontre = dataRencontre.slice(0);
	else
		editionRencontre = [];
	
	editionRencontre.sort(trierRencontre);
	
	initChampsRencontre();
}
function initChampsRencontre() {
	var el = $('#aventure option:checked');
	var prefixrencontre = el.data('prefixrencontre');
	
	$('#re-shape').val($('#re-shape option:first').val()); $('#re-drawcoords').attr('disabled', true); $('#re-coords').val(null); 
	$('#re-categorie').val($('#re-categorie option:first').val()); $('#re-titre').val(null); $('#re-description').val(null); 
	
	$('#re-arearef>option').not(':first').remove();
	$('#re-arearef').val($('#re-arearef option:first').val()); 
	if ( dataDeBase !== null ) {
		var zones = [];
		$.each(dataDeBase, function(key, val) { zones.push([val.numero, val.titre]); });
		zones.sort(function(a,b) { 
				if ( a[0] > b[0] ) return 1;
				if ( b[0] > a[0] ) return -1;
				return 0;
			});
		if ( zones.length > 0 )
			$('#re-arearef').append('<option value="">Aucune</option>');
	 	$.each(zones, function(key, val) { $('#re-arearef').append('<option value="' + val[0] + '">' + val[0] + ' - ' + val[1] + '</option>'); });
	}
	
	$('#re-numero').attr('required', false);
	$('#re-categorie').attr('required', false);
	$('#re-titre').attr('required', false);
	$('#re-drawcoords').text('Dessiner la forme *');
	$('#re-drawcoords').css('color', '#FFFFFF;');
	
	if ( prefixrencontre === null ) {
		$('#re-warning').show();
		$('#re-prefixrencontre').val(null);
	}
	else
	{
		$('#re-warning').hide();
		$('#re-prefixrencontre').val(prefixrencontre);
	}
	
	var max = 0;
	$.each(editionRencontre, function(key, val) {
		if ( val.numero > max )
			max = val.numero;
	});
	$('#re-numero').val(Math.trunc(max) + 1);
}
/**
Mise à jour de la liste des éléments de rencontre pour le preview de l'édition
*/
function updateEditionRencontrePreview() {
	$('#re-preview').empty();
	$.each(editionRencontre, function(key,value) {
		var json = JSON.stringify(value, function remplaçant(key, value) { if ( key === "areaid") return undefined; else return value; }, '\t');
		$('#re-preview').append('<li title="'
							+ json.replace(/"/g, '&quot;') + '"><a href="#" name="delete_re" data-re-numero="' + value.numero + '" style="color:#FF0000;">sup.</a> ' 
							+ '<a href="#" name="modify_re" data-re-numero="' + value.numero + '" style="color:#FF6600;">mod.</a> ' 
							+ value.numero + ' - ' + value.titre 
							+ '</li>');
	});
	loadDataIntoMap(null, editionRencontre);
	
	//Pour supprimer une rencontre de la liste
	$('a[name=delete_re]').click(function(e){
		var num = parseFloat($(this).data('re-numero'));
		var indexASupprimer = null;
		$.each(editionRencontre, function(key,value) {
			if ( value.numero === num ) {
				indexASupprimer = key;
				return;
			}
		});
		if ( indexASupprimer !== null )
			editionRencontre.splice(indexASupprimer, 1);
		updateEditionRencontrePreview();
		e.preventDefault();
	});
	//Pour modifier une rencontre de la liste
	$('a[name=modify_re]').click(function(e){
		var num = parseFloat($(this).data('re-numero'));
		$.each(editionRencontre, function(key,value) {
			if ( value.numero === num ) {
				$('#re-numero').val(value.numero);
				$('#re-arearef').val(value.arearef);
				$('#re-shape').val(value.shape);
				$('#re-coords').val(value.coords);
				$('#re-categorie').val(value.categorie);
				$('#re-titre').val(value.titre);
				$('#re-description').val(value.description);
				
				$('#re-drawcoords').attr('disabled', false);
				var nbCoords = $('#re-coords').val().split(",").length / 2;
				$('#re-drawcoords').text('Forme OK [' + nbCoords + ']');
				$('#re-drawcoords').css('color', '#22FF22;');
				return;
			}
		});
		e.preventDefault();
	});
}

/**
Ajout / Modification de rencontre dans la liste
*/
function submitEditionRencontre() {
	//Pour ajouter ou modifier une rencontre à la liste
	var nouvelleRencontre = {
		"numero": parseFloat($('#re-numero').val()),
		"arearef": ($('#re-arearef').val()===""?null:$('#re-arearef').val()),
		"shape": ($('#re-shape').val()===""?null:$('#re-shape').val()),
		"coords": ($('#re-coords').val()===""?null:$('#re-coords').val()),
		"categorie": ($('#re-categorie').val()===""?null:$('#re-categorie').val()),
		"titre": ($('#re-titre').val()===""?null:$('#re-titre').val()),
		"description": ($('#re-description').val()===""?null:$('#re-description').val())
	};
	var prefixrencontre = ($('#re-prefixrencontre').val()===""?null:$('#re-prefixrencontre').val());
	
	if ( prefixrencontre === null 
		|| nouvelleRencontre.numero === null 
		|| nouvelleRencontre.shape === null 
		|| nouvelleRencontre.coords === null 
		|| nouvelleRencontre.categorie === null 
		|| nouvelleRencontre.titre === null )
	{
		$('#re-numero').attr('required', true);
		$('#re-shape').attr('required', true);
		$('#re-categorie').attr('required', true);
		$('#re-titre').attr('required', true);
		if ( nouvelleRencontre.coords === null )
			$('#re-drawcoords').css('color', '#FF2222;');
		return false;
	}
	
	if ( editionRencontre === null )
		editionRencontre = [nouvelleRencontre];
	else {//Pour modifier : on remplace l'existant par le nouveau
		var indexAModifier = null;
		$.each(editionRencontre, function(key,value) {
			if ( value.numero === nouvelleRencontre.numero ) {
				indexAModifier = key;
				return;
			}
		});
		if ( indexAModifier !== null )
			editionRencontre.splice(indexAModifier, 1, nouvelleRencontre);
		else
		{
			editionRencontre.push(nouvelleRencontre);
			editionRencontre.sort(trierRencontre);
		}
	}
	
	updateEditionRencontrePreview();
	
	//Réinitialise les champs
	initChampsRencontre();
	//-----------------------
	
	return false;
}
function genererEditionRencontre() {
	var fileName = ($('#re-prefixrencontre').val()===""?null:$('#re-prefixrencontre').val() + '_rencontres.json');
	if ( fileName === null )
		return false;
	var jsonRencontres = {"rencontres": editionRencontre};
	downloadFile(JSON.stringify(jsonRencontres, function(key, value) { if ( key === "areaid") return undefined; else return value; }, '\t') , fileName);
}
//----------FIN RENCONTRES -------------



//--- TRANSVERSES ----
function utilDrawing(element) {
	//data-from : shape / data-for : coords
	element.css('color', '#FFFFFF;');
	var shape = ($(element.data('from')).val()===""?null:$(element.data('from')).val());
	if ( shape !== null )
	{
		if ( !drawForme ) {
			$(element.data('for')).val('');
			element.text('Forme en cours [0]');
			drawForme = true;
		}
		else if ( shape === 'poly' )
		{
			var nbCoords = $(element.data('for')).val().split(",").length / 2;
			if ( nbCoords >= 3 )
			{
				element.text('Forme OK [' + nbCoords + ']');
				element.css('color', '#22FF22;');
				drawForme = false;
			}
		}
	}
}


//-------------------------


