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
	private Apartment apartment;
	private Date startDate;
	private int numOfNights=1;
	private double totalPrice;
	private String message;
	private Host host;
	private ReservationStatus reservStatus;
	private DeletedStatus deletedStatus=DeletedStatus.ACTIVE;
	
	@Override
	public String toString() {
		return "Reservation [id=" + id + ", apartment=" + apartment + ", startDate=" + startDate + ", numOfNights="
				+ numOfNights + ", totalPrice=" + totalPrice + ", message=" + message + ", host=" + host
				+ ", reservStatus=" + reservStatus + ", deletedStatus=" + deletedStatus + "]";
	}

	public Reservation() {}
	
	public Reservation(String id, Apartment apartment, Date startDate, int numOfNights, double totalPrice,
			String message, Host host, ReservationStatus reservStatus, DeletedStatus deletedStatus) {
		super();
		this.id = id;
		this.apartment = apartment;
		this.startDate = startDate;
		this.numOfNights = numOfNights;
		this.totalPrice = totalPrice;
		this.message = message;
		this.host = host;
		this.reservStatus = reservStatus;
		this.deletedStatus = deletedStatus;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
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
