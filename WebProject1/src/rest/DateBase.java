package rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import beans.Administrator;
import beans.Amenities;
import beans.Guest;
import beans.Host;
import beans.Reservation;
import beans.Apartment;
import beans.Location;

public class DateBase {
	private static DateBase singletonDateBase=null;
	
	private int apartmentNextId=0;
	private HashMap<String, Host> hosts = new HashMap<String, Host>();
	private HashMap<String, Guest> guests = new HashMap<String, Guest>();
	private HashMap<String, Administrator> administrators = new HashMap<String, Administrator>();
	private HashMap<Integer,Apartment> apartments=new HashMap<Integer,Apartment>();
	private HashMap<String, Amenities> amenities=new HashMap<String, Amenities>();
	//private List<Amenities> amenities=new ArrayList<Amenities>();
	private List<Location> locations=new ArrayList<Location>();

	
	
	public List<Location> getLocations() {
		return locations;
	}

	public void setLocations(List<Location> locations) {
		this.locations = locations;
	}

	//public List<Amenities> getAmenities() {
		//return amenities;
	//}

	//public void setAmenities(List<Amenities> amenities) {
		//this.amenities = amenities;
	//}

	public int getApartmentNextId() {
		return apartmentNextId;
	}

	public void setApartmentNextId(int apartmentNextId) {
		this.apartmentNextId = apartmentNextId;
	}

	public HashMap<Integer, Apartment> getApartments() {
		return apartments;
	}

	public void setApartments(HashMap<Integer, Apartment> apartments) {
		this.apartments = apartments;
	}

	public DateBase() {
		
	}

	public static DateBase getSingletonDateBase() {
		return singletonDateBase;
	}

	public static void setSingletonDateBase(DateBase singletonDateBase) {
		DateBase.singletonDateBase = singletonDateBase;
	}

	public HashMap<String, Host> getHosts() {
		return hosts;
	}

	public void setHosts(HashMap<String, Host> hosts) {
		this.hosts = hosts;
	}

	public HashMap<String, Guest> getGuests() {
		return guests;
	}

	public void setGuests(HashMap<String, Guest> gests) {
		this.guests = gests;
	}

	public HashMap<String, Administrator> getAdministrators() {
		return administrators;
	}

	public void setAdministrators(HashMap<String, Administrator> administrators) {
		this.administrators = administrators;
	}
	
	public HashMap<String, Amenities> getAmenities() {
		return amenities;
	}

	public void setAmenities(HashMap<String, Amenities> amenities) {
		this.amenities = amenities;
	}

}
