package beans;

import java.util.ArrayList;
import java.util.List;

import beans.Appartement;
import beans.Reservation;
import beans.User;

public class Gest extends User{
	
	private List<Appartement> rentedApartments =new ArrayList<>();
	private List<Reservation> reservations=new ArrayList<Reservation>();
	
	public Gest() {}
	
	public Gest(String userName, String password, String name, String surname, String gender) {
		super(userName, password, name, surname, gender);
	}
	
	public List<Appartement> getRentedApartments() {
		return rentedApartments;
	}
	public void setRentedApartments(List<Appartement> rentedApartments) {
		this.rentedApartments = rentedApartments;
	}
	public List<Reservation> getReservations() {
		return reservations;
	}
	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}

}
