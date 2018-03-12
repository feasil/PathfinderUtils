package fr.feasil.svgtomap;

import java.util.ArrayList;
import java.util.List;

public class InkscapeMapElement {
	private String shape;
	private String id;
	private List<InkscapeMapCoord> coordonnees;
	
	private String title;
	private String style;
	private String color;
	private String description;
	private String categorie = null;
	
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
	
	
	public void setTitle(String title) {
		this.title = title;
	}
	public String getTitle() {
		return title;
	}
	public void setStyle(String style) {
		this.style = style;
	}
	public String getStyle() {
		return style;
	}
	public void setColor(String color) {
		this.color = color;
		
		if ( color.equals("dcff1f") )
			categorie = "spirituel";
		else if ( color.equals("ff0000") )
			categorie = "taverne";
		else if ( color.equals("ff72ff") )
			categorie = "commerce";
		else if ( color.equals("2fffff") )
			categorie = "divers";
		else if ( color.equals("00fa27") )
			categorie = "administration";
		else if ( color.equals("001efb") )
			categorie = "industrie";
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
	
	public String getCategorie() {
		if ( categorie == null )
			return "/";
		return categorie;
	}
	
	
	public String toHtml() 
	{
		StringBuilder sb = new StringBuilder();
		//<area class="area" shape="poly" alt="15" coords="458,414, 446,427, 428,406, 443,393" 
		//onClick="bootbox.alert({message: 'Le plus grand et le plus r&#233;cent ... titre personnel.', backdrop: true, size: 'large'})" 
		//title="Cool huh?" data-followcursor="true" data-duration="0" data-theme="light" data-size="small" style="cursor: pointer;" 
		///>
		sb.append("<area id=\"" + getId() + "\" class=\"area area");
		sb.append(getCategorie());
		sb.append("\" shape=\"poly\" alt=\"");
		sb.append(Utils.escape(getTitle()));
		sb.append("\" coords=\"");
		for ( int i = 0 ; i < getCoordonnees().size() ; i++ )
			sb.append((i==0?"":", ") + getCoordonnees().get(i).getX() + "," + getCoordonnees().get(i).getY());
		sb.append("\" \nonClick=\"bootbox.alert({message: '");
		sb.append(Utils.escape(getDescription()));
		sb.append("', backdrop: true, size: 'large'})\" \ntitle=\"");
		sb.append(Utils.escape(getTitle()));
		sb.append("\" ");
		//sb.append("data-followcursor=\"true\" data-duration=\"0\" data-theme=\"light\" data-size=\"small\"  data-arrow=\"true\" data-position=\"bottom\" ");
		//sb.append("style=\"cursor: pointer;\" ");
		//sb.append("\ndata-maphilight='{\"fillColor\":\"" + getColor() + "\", \"shadowColor\":\"" + getColor() + "\"}'");
		sb.append("\n/>");
		
		return sb.toString();
	}
	
	public String toHtmlLight() 
	{
		StringBuilder sb = new StringBuilder();
		//<a class="hilightMult" value=".commerce" style="background-color:#dcff1f" ><b>C</b></a>
		//<a class="hilightlink" value="#aaaa1" style="cursor: pointer;" href="#">cathédrale</a>
		sb.append("<span class=\"hilightMult categ");
		sb.append(getCategorie());
		sb.append("\" data-arearef=\".");
		sb.append(getCategorie());
		//sb.append("\" style=\"background-color:#");
		//sb.append(getColor());
		//sb.append("; width:20px; float:left; text-align:center; font-weight:bold;\">");
		sb.append("\">");
		sb.append(getCategorie().substring(0, 1).toUpperCase());
		sb.append("</span>&nbsp;");
		
		sb.append("<a class=\"hilightlink ");
		sb.append(getCategorie());
		sb.append("\" data-arearef=\"#");
		sb.append(getId());
//		sb.append("\" data-areacolor=\"#");//style="background-color:#ff72ff"
//		sb.append(getColor());
		sb.append("\" href=\"#\">");//style=\"cursor: pointer;\" style=\"clear: right;\" 
		sb.append(Utils.escape(getTitle()));
		sb.append("</a><br/>");
		
		return sb.toString();
	}
}
