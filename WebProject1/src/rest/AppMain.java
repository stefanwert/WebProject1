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
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Amenities;
import beans.Guest;
import beans.Host;
import beans.Location;
import beans.Address;
import beans.Administrator;
import crud.CrudAdministrator;
import crud.CrudAmenities;
import crud.CrudApartment;
import crud.CrudComments;
import crud.CrudGuest;
import crud.CrudHost;
import crud.CrudPicture;
import crud.CrudReservation;
import crud.CrudUsers;
import rest.DateBase;

public class AppMain {

	private static Gson g = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS").create();
	
	public static DateBase s=new DateBase();
	
	public static String fileName="date.json";
	
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
	
	public static boolean isUserNameUnique(String userName) {
		if(s.getHosts().containsKey(userName) || 
				s.getAdministrators().containsKey(userName) || 
				s.getGuests().containsKey(userName)) {
			return true;
		}
		else {
			return false;
		}
	}
	
	public static boolean isIdUnique(int id) {
		if(s.getAmenities().containsKey(id)) {
			return false;
		}
		else {
			return true;
		}
	}
	
	public static void main(String[] args) throws IOException {
		
		
		readFromFile();
//		s.getAmenities().add(new Amenities("Pegla","Pegla"));
//		s.getAmenities().add(new Amenities("Ves masina","Ves masina"));
//		s.getAmenities().add(new Amenities("Klima","Klima"));
//		s.getLocations().add(new Location(10, 10, new Address("Pavla Pape",20,"Novi Sad",21000)));
//		s.getLocations().add(new Location(10, 10, new Address("Backa",24,"Novi Sad",21000)));
//		s.getLocations().add(new Location(10, 10, new Address("Brace Ribnikar",21,"Novi Sad",21000)));
//		s.getLocations().add(new Location(10, 10, new Address("Narodnog fronta",10,"Novi Sad",21000)));
//		s.getLocations().add(new Location(10, 10, new Address("Dr Zorana Djindjica",22,"Novi Sad",21000)));
//		s.getLocations().add(new Location(10, 10, new Address("Trifkovicev trg",6,"Novi Sad",21000)));
//		s.getLocations().add(new Location(10, 10, new Address("Berislava Berica",4,"Novi Sad",21000)));
//		Administrator administrator=new Administrator("marko", "marko", "marko", "marko", "musko");
//		s.getAdministrators().put(administrator.getUserName(), administrator);
//		writeToFile();
		
		
//		Guest guest=new Guest("petrovic","petrovic","Stefan","Petrovic","musko");
//		s.getGuests().put(guest.getUserName(), guest);
		port(8080);
		
		
		
		//System.out.println(new File("./static").getCanonicalPath());
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		(new CrudHost()).activeCrud(s, g);
		(new CrudGuest()).activeCrud(s, g);
		(new CrudAdministrator()).activeCrud(s, g);
		(new CrudApartment()).activeCrud(s, g);
		(new CrudReservation()).activeCrud(s, g);
		(new CrudPicture()).activeCrud(s, g);
		(new CrudUsers()).activeCrud(s, g);
		(new CrudAmenities()).activeCrud(s, g);
		(new CrudComments()).activeCrud(s, g);
	}

}
