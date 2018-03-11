package fr.feasil.svgtomap;

import java.util.ArrayList;
import java.util.List;

public class InkscapeMapElement {
	private String shape;
	private String id;
	private List<InkscapeMapCoord> coordonnees;
	
	private String title;
	private String style;
	private String description;
	
	public InkscapeMapElement(String shape, String id) 
	{
		this.shape = shape;
		this.id = id;
		
		coordonnees = new ArrayList<>();
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
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDescription() {
		return description;
	}
	
	
	
	public String toHtml() 
	{
		StringBuilder sb = new StringBuilder();
		//<area class="area" shape="poly" alt="15" coords="458,414, 446,427, 428,406, 443,393" 
		//onClick="bootbox.alert({message: 'Le plus grand et le plus r&#233;cent ... titre personnel.', backdrop: true, size: 'large'})" 
		//title="Cool huh?" data-followcursor="true" data-duration="0" data-theme="light" data-size="small" style="cursor: pointer;" 
		///>
		sb.append("<area class=\"area\" shape=\"poly\" alt=\"");
		sb.append(getTitle());
		sb.append("\" coords=\"");
		for ( int i = 0 ; i < getCoordonnees().size() ; i++ )
			sb.append((i==0?"":", ") + getCoordonnees().get(i).getX() + "," + getCoordonnees().get(i).getY());
		sb.append("\" \nonClick=\"bootbox.alert({message: '");
		sb.append(Utils.escape(getDescription()));
		sb.append("', backdrop: true, size: 'large'})\" \ntitle=\"");
		sb.append(Utils.escape(getTitle()));
		sb.append("\" data-followcursor=\"true\" data-duration=\"0\" data-theme=\"light\" data-size=\"small\"  data-arrow=\"true\" data-position=\"bottom\"");
		sb.append(" style=\"cursor: pointer;\" \n/>");
		
		return sb.toString();
	}
}
