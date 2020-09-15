package beans;

import java.util.Date;



public class Reservation {

	private String id;
	private int apartmentId;
	private Date startDate;
	private int numOfNights=1;
	private double totalPrice;
	private String message;
	private String hostUserName;
	private ReservationStatus reservStatus;
	private DeletedStatus deletedStatus=DeletedStatus.ACTIVE;
	
	public Reservation() {}


	

	public Reservation(String id, int apartmentId, Date startDate, int numOfNights, double totalPrice, String message,
			String hostUserName, ReservationStatus reservStatus, DeletedStatus deletedStatus) {
		super();
		this.id = id;
		this.apartmentId = apartmentId;
		this.startDate = startDate;
		this.numOfNights = numOfNights;
		this.totalPrice = totalPrice;
		this.message = message;
		this.hostUserName = hostUserName;
		this.reservStatus = reservStatus;
		this.deletedStatus = deletedStatus;
	}




	public String getHostUserName() {
		return hostUserName;
	}




	public void setHostUserName(String hostUserName) {
		this.hostUserName = hostUserName;
	}




	public int getApartmentId() {
		return apartmentId;
	}
	
	public void setApartmentId(int apartmentId) {
		this.apartmentId = apartmentId;
	}



	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
