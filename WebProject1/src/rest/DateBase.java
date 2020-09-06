package rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import beans.Administrator;
import beans.Guest;
import beans.Host;
import beans.Reservation;
import beans.Apartment;

public class DateBase {
	private static DateBase singletonDateBase=null;
	
	private HashMap<String, Host> hosts = new HashMap<String, Host>();
	private HashMap<String, Guest> gests = new HashMap<String, Guest>();
	private HashMap<String, Administrator> administrators = new HashMap<String, Administrator>();
	private HashMap<String,Apartment> appartements=new HashMap<String,Apartment>();

	public HashMap<String, Apartment> getApartments() {
		return appartements;
	}

	public void setApartments(HashMap<String, Apartment> appartements) {
		this.appartements = appartements;
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

	public HashMap<String, Guest> getGests() {
		return gests;
	}

	public void setGests(HashMap<String, Guest> gests) {
		this.gests = gests;
	}

	public HashMap<String, Administrator> getAdministrators() {
		return administrators;
	}

	public void setAdministrators(HashMap<String, Administrator> administrators) {
		this.administrators = administrators;
	}

}
