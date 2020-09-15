package beans;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;



public class Apartment {
	
	private int id;	
	private Type type; 
	private int numOfRooms;
	private int numOfGuests;
	private Location location;
	private List<String> rentingIntegers= new ArrayList<String>();

	private List<Date> rentingDays =new ArrayList<>();
	private List<Date> availableDates =new ArrayList<>();
	private String host;
	private List<CommentForApartment> comments =new ArrayList<>();
	private double pricePerNight;
	//private LocalTime checkInTime;
	//private LocalTime checkOutTime;
	private String checkInTime;
	private String checkOutTime;
	private Status status;
	//private List<Amenities> amenities =new ArrayList<>();
	private List<Reservation> reservations =new ArrayList<>();
	private DeletedStatus deletedStatus=DeletedStatus.ACTIVE;
	private List<String> pictures=new ArrayList<String>();
	
	private HashMap<Integer,Amenities> amenities=new HashMap<Integer,Amenities>();

	public HashMap<Integer, Amenities> getAmenities() {
		return amenities;
	}

	public void setAmenities(HashMap<Integer, Amenities> amenities) {
		this.amenities = amenities;
	}
	
	
	public List<String> getRentingIntegers() {
		return rentingIntegers;
	}

	public void setRentingIntegers(List<String> rentingIntegers) {
		this.rentingIntegers = rentingIntegers;
	}
	public List<String> getPictures() {
		return pictures;
	}

	public void setPictures(List<String> pictures) {
		this.pictures = pictures;
	}
	/*
	@Override
	public String toString() {
		return "Apartment [id=" + id + ", type=" + type + ", numOfRooms=" + numOfRooms + ", numOfGuests=" + numOfGuests
				+ ", location=" + location + ", rentingDays=" + rentingDays + ", availableDates=" + availableDates
				+ ", host=" + host + ", comments=" + comments + ", pricePerNight=" + pricePerNight + ", checkInTime="
				+ checkInTime + ", checkOutTime=" + checkOutTime + ", status=" + status + ", amenities=" + amenities
				+ ", reservations=" + reservations + ", deletedStatus=" + deletedStatus + "]";
	}

	public Apartment() {}
	
	public Apartment(int id, Type type, int numOfRooms, int numOfGuests, Location location, List<Date> rentingDays,
			List<Date> availableDates, String host, List<CommentForApartment> comments, double pricePerNight,
			LocalTime checkInTime, LocalTime checkOutTime, Status status, List<Amenities> amenities,
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
	*/

	public void createRentingDays() {
		for (String broj : rentingIntegers) {
			long br=Long.parseLong(broj);
			Date date=new Date(br);
			rentingDays.add(date);
			
			availableDates.add(date);
		}
	}
	/*
	@Override
	public String toString() {
		return "Apartment [id=" + id + ", type=" + type + ", numOfRooms=" + numOfRooms + ", numOfGuests=" + numOfGuests
				+ ", location=" + location + ", rentingDays=" + rentingDays + ", availableDates=" + availableDates
				+ ", host=" + host + ", comments=" + comments + ", pricePerNight=" + pricePerNight + ", checkInTime="
				+ checkInTime + ", checkOutTime=" + checkOutTime + ", status=" + status + ", amenities=" + amenities
				+ ", reservations=" + reservations + ", deletedStatus=" + deletedStatus + ", pictures=" + pictures
				+ "]";
	}
	public Apartment() {}
	
	public Apartment(int id, Type type, int numOfRooms, int numOfGuests, Location location, List<Date> rentingDays,
			List<Date> availableDates, String host, List<CommentForApartment> comments, double pricePerNight,
			String checkInTime, String checkOutTime, Status status, List<Amenities> amenities,
			List<Reservation> reservations, DeletedStatus deletedStatus, List<String> pictures,List<String>rentingIntegers) {
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
		this.pictures = pictures;
		this.rentingIntegers = rentingIntegers;
	} 
*/
	
	@Override
	public String toString() {
		return "Apartment [id=" + id + ", type=" + type + ", numOfRooms=" + numOfRooms + ", numOfGuests=" + numOfGuests
				+ ", location=" + location + ", rentingIntegers=" + rentingIntegers + ", rentingDays=" + rentingDays
				+ ", availableDates=" + availableDates + ", host=" + host + ", comments=" + comments
				+ ", pricePerNight=" + pricePerNight + ", checkInTime=" + checkInTime + ", checkOutTime=" + checkOutTime
				+ ", status=" + status + ", reservations=" + reservations + ", deletedStatus=" + deletedStatus
				+ ", pictures=" + pictures + ", amenities=" + amenities + "]";
	}

	public Apartment() {}
	
	public Apartment(int id, Type type, int numOfRooms, int numOfGuests, Location location,
			List<String> rentingIntegers, List<Date> rentingDays, List<Date> availableDates, String host,
			List<CommentForApartment> comments, double pricePerNight, String checkInTime, String checkOutTime,
			Status status, List<Reservation> reservations, DeletedStatus deletedStatus, List<String> pictures,
			HashMap<Integer, Amenities> amenities) {
		super();
		this.id = id;
		this.type = type;
		this.numOfRooms = numOfRooms;
		this.numOfGuests = numOfGuests;
		this.location = location;
		this.rentingIntegers = rentingIntegers;
		this.rentingDays = rentingDays;
		this.availableDates = availableDates;
		this.host = host;
		this.comments = comments;
		this.pricePerNight = pricePerNight;
		this.checkInTime = checkInTime;
		this.checkOutTime = checkOutTime;
		this.status = status;
		this.reservations = reservations;
		this.deletedStatus = deletedStatus;
		this.pictures = pictures;
		this.amenities = amenities;
	}

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
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

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public List<CommentForApartment> getComments() {
		return comments;
	}

	public void setComments(List<CommentForApartment> comments) {
		this.comments = comments;
	}

	public double getPricePerNight() {
		return pricePerNight;
	}

	public void setPricePerNight(double pricePerNight) {
		this.pricePerNight = pricePerNight;
	}
	/*
	public LocalTime getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(LocalTime checkInTime) {
		this.checkInTime = checkInTime;
	}

	public LocalTime getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(LocalTime checkOutTime) {
		this.checkOutTime = checkOutTime;
	}*/
	
	public String getCheckInTime() {
		return checkInTime;
	}

	public void setCheckInTime(String checkInTime) {
		this.checkInTime = checkInTime;
	}

	public String getCheckOutTime() {
		return checkOutTime;
	}

	public void setCheckOutTime(String checkOutTime) {
		this.checkOutTime = checkOutTime;
	}
	
	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	/*public List<Amenities> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<Amenities> amenities) {
		this.amenities = amenities;
	}
	*/
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
