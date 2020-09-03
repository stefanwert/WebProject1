package beans;

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
	
	private String id;		//neka ima apartman id 
	private Type type; 
	private int numOfRooms;
	private int numOfGuests;
	private Location location;
	private DeletedStatus deletedStatus=DeletedStatus.ACTIVE;
	
	private Host host;	//neka ima i ciji je stan radi brze pretrage
	private List<CommentForAppartmant> comments =new ArrayList<>();
	private double pricePerNight;
	
	private Status status;
	private List<Amenities> amenities =new ArrayList<>();
	private List<Reservation> reservations =new ArrayList<>();
	
	
	 

}
