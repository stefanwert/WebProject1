package rest;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.after;
import static spark.Spark.staticFiles;
import static spark.Spark.webSocket;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;



import com.google.gson.Gson;

import beans.Gest;
import beans.Host;
import crud.CrudAdministrator;
import crud.CrudGest;
import crud.CrudHost;
import rest.DateBase;

public class AppMain {

	private static Gson g = new Gson();
	
	public static DateBase s=new DateBase();
	
	public static String fileName="date.txt";
	
	public static void readFromFile() throws IOException {
		BufferedReader br=new BufferedReader(new FileReader(fileName));    
        StringBuilder stringBuilder=new StringBuilder();
        int i;    
        while((i=br.read())!=-1){  
        	System.out.print((char)i); 
        	stringBuilder.append((char)i);
        }  
        
        s=g.fromJson(stringBuilder.toString(),DateBase.class);
        br.close();  
	}
	
	public static void writeToFile() throws IOException {
		FileWriter fileWriter=new FileWriter(fileName);
		fileWriter.write(g.toJson(s));
		fileWriter.flush();
		fileWriter.close();
	}
	
	public static void main(String[] args) throws IOException {
		
		readFromFile();
        
		port(8080);
		//System.out.println(new File("./static").getCanonicalPath());
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		(new CrudHost()).activeCrud(s, g);
		(new CrudGest()).activeCrud(s, g);
		(new CrudAdministrator()).activeCrud(s, g);
		

	}

}
