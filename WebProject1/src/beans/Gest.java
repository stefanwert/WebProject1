package beans;

import java.util.ArrayList;
import java.util.List;

public class Gest extends User{
	
	private List<Appartmant> rentedApartments =new ArrayList<>();
	private List<Reservation> reservations=new ArrayList<Reservation>();
	
	public Gest() {}
	
	public Gest(String userName, String password, String name, String surname, String gender) {
		super(userName, password, name, surname, gender);
	}
	
	public List<Appartmant> getRentedApartments() {
		return rentedApartments;
	}
	public void setRentedApartments(List<Appartmant> rentedApartments) {
		this.rentedApartments = rentedApartments;
	}
	public List<Reservation> getReservations() {
		return reservations;
	}
	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}

}
