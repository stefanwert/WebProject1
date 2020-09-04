package rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import beans.Administrator;
import beans.Gest;
import beans.Host;
import beans.Reservation;
import beans.Appartement;

public class DateBase {
	private static DateBase singletonDateBase=null;
	
	private HashMap<String, Host> hosts = new HashMap<String, Host>();
	private HashMap<String, Gest> gests = new HashMap<String, Gest>();
	private HashMap<String, Administrator> administrators = new HashMap<String, Administrator>();
	private HashMap<String,Appartement> appartements=new HashMap<String,Appartement>();

	public HashMap<String, Appartement> getAppartements() {
		return appartements;
	}

	public void setAppartements(HashMap<String, Appartement> appartements) {
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

	public HashMap<String, Gest> getGests() {
		return gests;
	}

	public void setGests(HashMap<String, Gest> gests) {
		this.gests = gests;
	}

	public HashMap<String, Administrator> getAdministrators() {
		return administrators;
	}

	public void setAdministrators(HashMap<String, Administrator> administrators) {
		this.administrators = administrators;
	}

}
