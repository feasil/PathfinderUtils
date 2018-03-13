package fr.feasil.svgtomap;

public enum Categorie {
	INCONNUE("???", "?", 6, "ffffff"), 
	SPIRITUEL("spirituel", "S", 0, "dcff1f"),
	COMMERCE("commerce", "C", 1, "ff72ff"),
	ADMINISTRATION("administration", "A", 2, "00fa27"),
	
	TAVERNE("taverne", "T", 3, "ff0000"),
	INDUSTRIE("industrie", "I", 4, "001efb"),
	DIVERS("divers", "D", 5, "2fffff");
	
	
	private final String libelle;
	private final String symbole;
	private final int ordre;
	private final String color;
	
	private Categorie(String libelle, String symbole, int ordre, String color) 
	{
		this.libelle = libelle;
		this.symbole = symbole;
		this.ordre = ordre;
		this.color = color;
	}
	
	public String getLibelle() {
		return libelle;
	}
	public String getSymbole() {
		return symbole;
	}
	public int getOrdre() {
		return ordre;
	}
	public String getColor() {
		return color;
	}
	
	
	public static Categorie getCategorie(String color) {
		if ( color == null )
			return INCONNUE;
		else if ( color.toLowerCase().equals(SPIRITUEL.color) )
			return SPIRITUEL;
		else if ( color.toLowerCase().equals(COMMERCE.color) )
			return COMMERCE;
		else if ( color.toLowerCase().equals(ADMINISTRATION.color) )
			return ADMINISTRATION;
		else if ( color.toLowerCase().equals(TAVERNE.color) )
			return TAVERNE;
		else if ( color.toLowerCase().equals(INDUSTRIE.color) )
			return INDUSTRIE;
		else if ( color.toLowerCase().equals(DIVERS.color) )
			return DIVERS;
		
		return INCONNUE;
	}
	
}
