package fr.feasil.svgtomap;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SvgToMapTest {
	//-371 en y
	private final static int DELTA_Y = -371;
	
	public static void main(String[] args) 
	{
		
		
		List<InkscapeMapElement> listeElements = readCoords();
		readDesc(listeElements);
		
		
		
		System.out.println("<div class=\"blockMap\">\n<img id=\"mapPathfinder\" class=\"map\" src=\"\" data-imageid=\"0\" width=\"853\" height=\"1113\" usemap=\"#world\">\n<map name=\"world\">");
		for ( InkscapeMapElement e : listeElements )
			System.out.println(e.toHtml());
		System.out.println("</map>\n</div>");
		
		
		System.out.println();
		System.out.println();
		
		System.out.println("<div class=\"blockList\">\n<div class=\"bouton\">\n<span id=\"buttonChangeMap\" class=\"mapButton\">switch map</span>&nbsp;<span id=\"hideShowListes\" class=\"mapButton hideShowButton\">hide</span>\n</div>");
		
		System.out.println();
		System.out.println();
		
		Collections.sort(listeElements);
		System.out.println("<div class=\"listes\">\n<div class=\"liste1\">");
		boolean beforeTavern = true;
		for ( InkscapeMapElement e : listeElements )
		{
			if ( beforeTavern && e.getCategorie() == Categorie.TAVERNE )
			{
				System.out.println("</div><div class=\"liste2\">");
				beforeTavern = false;
			}
			System.out.println(e.toHtmlLight());
		}
		System.out.println("</div>\n</div>\n</div>");
		
	}
	
	
	
	
	
	
	
	private static void readDesc(List<InkscapeMapElement> listeElements) {
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader("in/inkscape/descs.txt"));
			
			String line;
			String id, style, color;
			StringBuilder sbDesc = null;
			String title;
			InkscapeMapElement element = null;
			
			while ((line = br.readLine()) != null) {
				if ( line.length() > 0 )
				{
					if ( line.startsWith("<path") )
					{//getId & style
//<path id="path4561" style="fill:#dcff1f;fill-opacity:0.57142861;stroke:#000000;stroke-width:0.75px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1">
						id = line.substring(10, 18);
						style = line.substring(27, line.length()-2);
						color = style.substring(style.indexOf("fill:#")+6, style.indexOf("fill:#")+12);
						
						element = getElement(listeElements, id);
						
						element.setStyle(style);
						element.setColor(color);
					}
					else if ( line.startsWith("<desc") )
					{//début de desc
//<desc id="desc4867">Le
						sbDesc = new StringBuilder();
						sbDesc.append(line.substring(line.indexOf('>') + 1));
						sbDesc.append(" ");
					}
					else if ( line.endsWith("</desc>") )
					{//fin de desc
						sbDesc.append(line.substring(0, line.length()-7));
						element.setDescription(sbDesc.toString());
						sbDesc = null;
					}
					else if ( line.startsWith("<title") )
					{//title
//<title id="title4849">Caba
						title = line.substring(line.indexOf('>') + 1, line.length()-8);
						element.setTitle(title);
					}
					else if ( line.startsWith("</path>") )
					{//fin de path
						element = null;
					}
					else
					{
						sbDesc.append(line);
						sbDesc.append(" ");
					}
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null) br.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
	}
	
	
	private static InkscapeMapElement getElement(List<InkscapeMapElement> listeElements, String id) 
	{
		for ( InkscapeMapElement e : listeElements )
			if ( e.getId().equals(id) )
				return e;
		return null;
	}
	
	
	
	
	
	
	private static List<InkscapeMapElement> readCoords() {
		List<InkscapeMapElement> listeElements = new ArrayList<InkscapeMapElement>();
		
		BufferedReader br = null;
		try {
			br = new BufferedReader(new FileReader("in/inkscape/test_inkscapeMap_coord"));
			
			String line;
			String[] tab, tab2;
			InkscapeMapElement element;
			
			while ((line = br.readLine()) != null) {
				if ( line.length() > 0 && !line.startsWith("//") )
				{//polygon;path4563;557,485,553,529,542,530,534,520,517,516,522,483;
					tab = line.split(";");
					element = new InkscapeMapElement(tab[0], tab[1]);
					listeElements.add(element);
					tab2 = tab[2].split(",");
					int x = -1;
					for ( int i = 0 ; i < tab2.length ; i++ )
					{
						if ( i%2 == 0 )
							x = Integer.parseInt(tab2[i]);
						else
							element.getCoordonnees().add(new InkscapeMapCoord(x, Integer.parseInt(tab2[i]) + DELTA_Y));
					}
				}
			}

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null) br.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}
		
		return listeElements;
	}
}
