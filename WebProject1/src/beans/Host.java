package beans;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import beans.Apartment;

public class Host extends User{
	
	private HashMap<Integer,Apartment> apartments=new HashMap<Integer,Apartment>();

	public HashMap<Integer, Apartment> getApartments() {
		return apartments;
	}

	public void setApartments(HashMap<Integer, Apartment> appartements) {
		this.apartments = appartements;
	}

	public Host() {}
	
	public Host(String userName, String password, String name, String surname, String gender) {
		super(userName, password, name, surname, gender);
	}
	
}
