package beans;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import beans.Apartment;

public class Host extends User{
	
	private HashMap<String,Apartment> appartements=new HashMap<String,Apartment>();

	public HashMap<String, Apartment> getAppartements() {
		return appartements;
	}

	public void setAppartements(HashMap<String, Apartment> appartements) {
		this.appartements = appartements;
	}

	public Host() {}
	
	public Host(String userName, String password, String name, String surname, String gender) {
		super(userName, password, name, surname, gender);
	}
	
}
