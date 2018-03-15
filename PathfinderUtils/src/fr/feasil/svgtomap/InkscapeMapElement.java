package fr.feasil.svgtomap;

import java.util.ArrayList;
import java.util.List;

public class InkscapeMapElement implements Comparable<InkscapeMapElement> 
{
	private String shape;
	private String id;
	private List<InkscapeMapCoord> coordonnees;
	
	private String title;
	private String numero;
	private String style;
	private String color;
	private String description;
	private Categorie categorie = Categorie.INCONNUE;
	
	public InkscapeMapElement(String shape, String id) 
	{
		this.shape = shape;
		this.id = id;
		
		coordonnees = new ArrayList<InkscapeMapCoord>();
	}
	
	public String getShape() {
		return shape;
	}
	public String getId() {
		return id;
	}
	public List<InkscapeMapCoord> getCoordonnees() {
		return coordonnees;
	}
	
	
	public String getPathId() {
		return "path" + numero;
	}
	
	public void setTitle(String title) {
		this.title = title.substring(0, title.indexOf(" ("));
		this.numero = title.substring(title.indexOf(" (") + 2, title.length()-1);
	}
	public String getTitle() {
		return title;
	}
	public String getNumero() {
		return numero;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public String getStyle() {
		return style;
	}
	public void setColor(String color) {
		this.color = color;
		
		categorie = Categorie.getCategorie(color);
	}
	public String getColor() {
		return color;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDescription() {
		return description;
	}
	
	public Categorie getCategorie() {
		return categorie;
	}
	
	
	public String toAreaMap1() 
	{
		StringBuilder sb = new StringBuilder();
		//<area class="area" shape="poly" alt="15" coords="458,414, 446,427, 428,406, 443,393" 
		//onClick="bootbox.alert({message: 'Le plus grand et le plus r&#233;cent ... titre personnel.', backdrop: true, size: 'large'})" 
		//title="Cool huh?" data-followcursor="true" data-duration="0" data-theme="light" data-size="small" style="cursor: pointer;" 
		///>
		sb.append("<area id=\"" + getPathId() + "\" class=\"area");
//		sb.append(getCategorie().getLibelle());
		sb.append("\" shape=\"poly\" alt=\"");
		sb.append(Utils.escape(getTitle()));
		sb.append("\" coords=\"");
		for ( int i = 0 ; i < getCoordonnees().size() ; i++ )
			sb.append((i==0?"":", ") + getCoordonnees().get(i).getX() + "," + getCoordonnees().get(i).getY());
		sb.append("\" data-message=\"");
		sb.append(Utils.escape(getDescription()));
		sb.append("\" data-titre=\"");
		sb.append(Utils.escape(getTitle()));
		sb.append("\" data-numero=\"");
		sb.append(getNumero());
		sb.append("\" title=\"");
		sb.append(getNumero()); sb.append(" - <b>"); sb.append(Utils.escape(getTitle())); 
		sb.append("</b>\" ");
		sb.append("data-categorie=\"");
		sb.append(getCategorie().getLibelle());
		sb.append("\" ");
		//sb.append("data-followcursor=\"true\" data-duration=\"0\" data-theme=\"light\" data-size=\"small\"  data-arrow=\"true\" data-position=\"bottom\" ");
		//sb.append("style=\"cursor: pointer;\" ");
		//sb.append("\ndata-maphilight='{\"fillColor\":\"" + getColor() + "\", \"shadowColor\":\"" + getColor() + "\"}'");
		sb.append("/>");
		/*
		sb.append("<area id=\"" + getId() + "bis\" class=\"areabis area");
		sb.append(getCategorie().getLibelle());
		sb.append("\" shape=\"poly\" coords=\"");
		for ( int i = 0 ; i < getCoordonnees().size() ; i++ )
			sb.append((i==0?"":", ") + getCoordonnees().get(i).getX() + "," + getCoordonnees().get(i).getY());
		sb.append("\" />");
		*/
		//<area id="path4559bis" class="areabis areaspirituel" shape="poly" coords="667,214, 628,254, 621,253, 626,259, 629,264, 632,269, 633,275, 633,281, 632,287, 630,293, 626,300, 621,306, 617,296, 604,296, 600,309, 589,312, 587,325, 595,331, 589,335, 584,338, 578,339, 572,340, 566,340, 560,339, 554,336, 548,332, 542,327, 554,326, 554,313, 541,310, 537,297, 523,296, 520,309, 514,301, 510,294, 508,287, 508,280, 508,274, 510,268, 513,262, 517,256, 521,251, 523,262, 539,262, 538,260, 538,257, 539,255, 539,253, 540,251, 541,250, 543,248, 545,248, 547,247, 554,245, 538,229, 597,177, 603,184, 624,164" />
		
		return sb.toString();
	}
	public String toAreaMapBis() 
	{
		StringBuilder sb = new StringBuilder();
		
		sb.append("<area id=\"" + getPathId() + "bis\" class=\"areabis");
//		sb.append(getCategorie().getLibelle());
		sb.append("\" shape=\"poly\" coords=\"");
		for ( int i = 0 ; i < getCoordonnees().size() ; i++ )
			sb.append((i==0?"":", ") + getCoordonnees().get(i).getX() + "," + getCoordonnees().get(i).getY());
		sb.append("\" data-categorie=\"");
		sb.append(getCategorie().getLibelle());
		sb.append("\" />");
		
		return sb.toString();
	}
	
	public String toHtmlLight() 
	{
		StringBuilder sb = new StringBuilder();
		//<a class="hilightMult" value=".commerce" style="background-color:#dcff1f" ><b>C</b></a>
		//<a class="hilightlink" value="#aaaa1" style="cursor: pointer;" href="#">cathédrale</a>
		sb.append("<span class=\"hilightMult categ");
		sb.append(getCategorie().getLibelle());
		sb.append("\" data-categorie=\"");
		sb.append(getCategorie().getLibelle());
		//sb.append("\" style=\"background-color:#");
		//sb.append(getColor());
		//sb.append("; width:20px; float:left; text-align:center; font-weight:bold;\">");
		sb.append("\">");
		sb.append(getCategorie().getSymbole());
		sb.append("</span>&nbsp;");
		
		sb.append("<a class=\"hilightlink");
//		sb.append(getCategorie().getLibelle());
		sb.append("\" data-areaid=\"");
		sb.append(getPathId());
		sb.append("\" data-categorie=\"");
		sb.append(getCategorie().getLibelle());
		sb.append("\" href=\"#\">");//style=\"cursor: pointer;\" style=\"clear: right;\" 
		sb.append(Utils.escape(getTitle())); sb.append(" ("); sb.append(getNumero()); sb.append(")");
		sb.append("</a><br/>");
		
		return sb.toString();
	}
	
	
	
	
	public String toCsv() {
		//areaid
		//area shape
		//area coords ==> si shape = poly
		
		//categorie libelle		//categorie Symbole ? (juste prendre la première lettre du libelle ?)
		//numero
		//titre
		//description
		//areaid;shape;coords;categorie;numero;titre;description
		final char SEPARATOR = ',';
		final char PROTECTOR = '"';
		
		StringBuilder sb = new StringBuilder();
		sb.append(PROTECTOR); 
		sb.append("path-"); sb.append(getNumero());  
		sb.append(PROTECTOR); sb.append(SEPARATOR);
		
		sb.append(PROTECTOR);
		sb.append("poly"); 
		sb.append(PROTECTOR); sb.append(SEPARATOR);
		
		sb.append(PROTECTOR);
		for ( int i = 0 ; i < getCoordonnees().size() ; i++ )
			sb.append((i==0?"":", ") + getCoordonnees().get(i).getX() + "," + getCoordonnees().get(i).getY());
		sb.append(PROTECTOR); sb.append(SEPARATOR);
		
		sb.append(PROTECTOR); 
		sb.append(getCategorie().getLibelle()); 
		sb.append(PROTECTOR); sb.append(SEPARATOR);
		
		sb.append(PROTECTOR); 
		sb.append(getNumero()); 
		sb.append(PROTECTOR); sb.append(SEPARATOR);
		
		sb.append(PROTECTOR); 
		sb.append(getTitle());
		sb.append(PROTECTOR); sb.append(SEPARATOR);
		
		sb.append(PROTECTOR); 
		sb.append(getDescription().replace("&quot;",  "'")); 
		sb.append(PROTECTOR);
		
		return sb.toString();
	}
	
	

	@Override
	public int compareTo(InkscapeMapElement i2) 
	{
		if ( i2 == null )
			return 1;
		
		if ( getCategorie().getOrdre() == i2.getCategorie().getOrdre() )
			return getTitle().compareTo(i2.getTitle());
		
		return (getCategorie().getOrdre() - i2.getCategorie().getOrdre());
	}
}
