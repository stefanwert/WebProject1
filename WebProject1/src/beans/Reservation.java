package beans;

import java.util.Date;

enum ReservationStatus {
    CREATED,
    DENIED,
    CANCELED,
    ACCEPTED,
    COMPLITED
  }

public class Reservation {

	private String id;
	private Apartment appartement;
	private Date startDate;
	private int numOfNights=1;
	private double totalPrice;
	private String message;
	private Host host;
	private ReservationStatus reservStatus;
	private DeletedStatus deletedStatus=DeletedStatus.ACTIVE;
	
	@Override
	public String toString() {
		return "Reservation [id=" + id + ", appartement=" + appartement + ", startDate=" + startDate + ", numOfNights="
				+ numOfNights + ", totalPrice=" + totalPrice + ", message=" + message + ", host=" + host
				+ ", reservStatus=" + reservStatus + "]";
	}
	
	public Reservation() {}
	
	public Reservation(String id, Apartment appartement, Date startDate, int numOfNights, double totalPrice,
			String message, Host host, ReservationStatus reservStatus) {
		super();
		this.id = id;
		this.appartement = appartement;
		this.startDate = startDate;
		this.numOfNights = numOfNights;
		this.totalPrice = totalPrice;
		this.message = message;
		this.host = host;
		this.reservStatus = reservStatus;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Apartment getAppartement() {
		return appartement;
	}

	public void setAppartement(Apartment appartement) {
		this.appartement = appartement;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public int getNumOfNights() {
		return numOfNights;
	}

	public void setNumOfNights(int numOfNights) {
		this.numOfNights = numOfNights;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Host getHost() {
		return host;
	}

	public void setHost(Host host) {
		this.host = host;
	}

	public ReservationStatus getReservStatus() {
		return reservStatus;
	}

	public void setReservStatus(ReservationStatus reservStatus) {
		this.reservStatus = reservStatus;
	}

	public DeletedStatus getDeletedStatus() {
		return deletedStatus;
	}

	public void setDeletedStatus(DeletedStatus deletedStatus) {
		this.deletedStatus = deletedStatus;
	}	

	
}
