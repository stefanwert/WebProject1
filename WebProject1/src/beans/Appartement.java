package beans;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

enum Type {
    APPARTEMENT,
    ROOM
  }
enum Status {
    ACTIVE,
    INACTIVE
  }

public class Appartement {
	
	private String id;	
	private Type type; 
	private int numOfRooms;
	private int numOfGuests;
	private Location location;
	private List<Date> rentingDays =new ArrayList<>();
	private List<Date> availableDates =new ArrayList<>();
	private Host host;
	private List<CommentForAppartmant> comments =new ArrayList<>();
	private double pricePerNight;
	private Time checkInTime;
	private Time checkOutTime;
	private Status status;
	private List<Amenities> amenities =new ArrayList<>();
	private List<Reservation> reservations =new ArrayList<>();
	private DeletedStatus deletedStatus=DeletedStatus.ACTIVE;
	@Override
	public String toString() {
		return "Appartement [id=" + id + ", type=" + type + ", numOfRooms=" + numOfRooms + ", numOfGuests="
				+ numOfGuests + ", location=" + location + ", rentingDays=" + rentingDays + ", availableDates="
				+ availableDates + ", host=" + host + ", comments=" + comments + ", pricePerNight=" + pricePerNight
				+ ", checkInTime=" + checkInTime + ", checkOutTime=" + checkOutTime + ", status=" + status
				+ ", amenities=" + amenities + ", reservations=" + reservations + ", deletedStatus=" + deletedStatus
				+ "]";
	}
	
	public Appartement() {}
	
	public Appartement(String id, Type type, int numOfRooms, int numOfGuests, Location location, List<Date> rentingDays,
			List<Date> availableDates, Host host, List<CommentForAppartmant> comments, double pricePerNight,
			Time checkInTime, Time checkOutTime, Status status, List<Amenities> amenities,
			List<Reservation> reservations, DeletedStatus deletedStatus) {
		super();
		this.id = id;
		this.type = type;
		this.numOfRooms = numOfRooms;
		this.numOfGuests = numOfGuests;
		this.location = location;
		this.rentingDays = rentingDays;
		this.availableDates = availableDates;
		this.host = host;
		this.comments = comments;
		this.pricePerNight = pricePerNight;
		this.checkInTime = checkInTime;
		this.checkOutTime = checkOutTime;
		this.status = status;
		this.amenities = amenities;
		this.reservations = reservations;
		this.deletedStatus = deletedStatus;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public int getNumOfRooms() {
		return numOfRooms;
	}

	public void setNumOfRooms(int numOfRooms) {
		this.numOfRooms = numOfRooms;
	}

	public int getNumOfGuests() {
		return numOfGuests;
	}

	public void setNumOfGuests(int numOfGuests) {
		this.numOfGuests = numOfGuests;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public List<Date> getRentingDays() {
		return rentingDays;
	}

	public void setRentingDays(List<Date> rentingDays) {
		this.rentingDays = rentingDays;
	}

	public List<Date> getAvailableDates() {
		return availableDates;
	}

	public void setAvailableDates(List<Date> availableDates) {
		this.availableDates = availableDates;
	}

	public Host getHost() {
		return host;
	}

	public void setHost(Host host) {
		this.host = host;
	}

	public List<CommentForAppartmant> getComments() {
		return comments;
	}

	public void setComments(List<CommentForAppartmant> comments) {
		this.comments = comments;
	}

	public double getPricePerNight() {
		return pricePerNight;
	}

	public void setPricePerNight(double pricePerNight) {
		this.pricePerNight = pricePerNight;
	}

	public Time getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(Time checkInTime) {
		this.checkInTime = checkInTime;
	}

	public Time getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(Time checkOutTime) {
		this.checkOutTime = checkOutTime;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public List<Amenities> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<Amenities> amenities) {
		this.amenities = amenities;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}

	public DeletedStatus getDeletedStatus() {
		return deletedStatus;
	}

	public void setDeletedStatus(DeletedStatus deletedStatus) {
		this.deletedStatus = deletedStatus;
	}

}
