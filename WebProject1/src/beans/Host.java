package beans;

import java.util.ArrayList;
import java.util.List;

public class Host extends User{
	private List<Appartmant> appartmants = new ArrayList<>();
	
	
	public List<Appartmant> getAppartmants() {
		return appartmants;
	}

	public void setAppartmants(List<Appartmant> appartmants) {
		this.appartmants = appartmants;
	}

	public Host() {}
	
	public Host(String userName, String password, String name, String surname, String gender) {
		super(userName, password, name, surname, gender);
	}
	
}
