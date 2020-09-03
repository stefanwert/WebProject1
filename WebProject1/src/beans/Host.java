package beans;

import java.util.ArrayList;
import java.util.List;

import beans.Appartement;

public class Host extends User{
	private List<Appartement> appartmants = new ArrayList<>();
	
	
	public List<Appartement> getAppartmants() {
		return appartmants;
	}

	public void setAppartmants(List<Appartement> appartmants) {
		this.appartmants = appartmants;
	}

	public Host() {}
	
	public Host(String userName, String password, String name, String surname, String gender) {
		super(userName, password, name, surname, gender);
	}
	
}
