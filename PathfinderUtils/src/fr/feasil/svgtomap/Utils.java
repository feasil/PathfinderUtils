package fr.feasil.svgtomap;

public class Utils {
	public static String escape(String s) {
	    StringBuilder builder = new StringBuilder();
	    boolean previousWasASpace = false;
	    for( char c : s.toCharArray() ) {
	        if( c == ' ' ) {
	            if( previousWasASpace ) {
	                builder.append("&nbsp;");
	                previousWasASpace = false;
	                continue;
	            }
	            previousWasASpace = true;
	        } else {
	            previousWasASpace = false;
	        }
	        switch(c) {
	            case '<': builder.append("&lt;"); break;
	            case '>': builder.append("&gt;"); break;
	            case '&': builder.append("&amp;"); break;
	            case '"': builder.append("&quot;"); break;
	            case '\'': builder.append("&#8217;"); break;
	            case '\n': builder.append("<br>"); break;
	            // We need Tab support here, because we print StackTraces as HTML
	            case '\t': builder.append("&nbsp; &nbsp; &nbsp;"); break;  
	            default:
	                if( c < 128 ) {
	                    builder.append(c);
	                } else {
	                    builder.append("&#").append((int)c).append(";");
	                }    
	        }
	    }
	    return builder.toString();
	}
	
	
	
	public static void giveMeAStar(int x, int y) {

		//int[] etoileV1 = {5, 0, 6, 4, 10, 5, 6, 6, 5, 10, 4, 6, 0, 5, 4, 4};
		int[] etoile = {5,0, 6, 3, 8, 2, 7, 4, 10, 5, 7, 6, 8, 8, 6, 7,           5, 10, 4, 7, 2, 8, 3, 6, 0, 5, 3, 4, 2, 2, 4, 3};
		//int[] tab = {20, 0, 24, 16, 40, 20, 24, 24, 20, 40, 16, 24, 0, 20, 16, 16};
		//int x = 462;
		//int y = 654;
		int largeur = 3;
		for ( int i = 0 ; i < etoile.length ; i++ )
		{
			System.out.print((i>0?", ":"") + ((etoile[i] - 5)*largeur + (i%2==0?x:y)));
		}

	}
}
