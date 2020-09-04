package crud;

import static spark.Spark.after;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;

import beans.Amenities;
import beans.Apartment;
import beans.CommentForAppartmant;
import beans.DeletedStatus;
import beans.Gest;
import beans.Host;
import beans.Location;
import beans.Reservation;
import rest.AppMain;
import rest.DateBase;

public class CrudApartment implements CrudInterface{

	public CrudApartment(){
		// TODO Auto-generated constructor stub
	}

	@Override
	public void activeCrud(DateBase s, Gson g) {
		
		after("/Appartements", (req, res) -> {
			AppMain.writeToFile();
		});
		
		get("/Appartements",(req,res)->{
			res.type("application/json");
			String id = req.queryParams("id");
			
			Apartment appartement=s.getAppartements().get(id);
			if(appartement==null || (!appartement.getId().equals(id))) {
				res.status(404);
				return null;
			}
			return g.toJson(appartement);
		});
		
		post("/Appartements",(req,res)->{
			res.type("application/json");
			Apartment appartement = g.fromJson(req.body(), Apartment.class);
			if(s.getAppartements().containsKey(appartement.getId())) {
				res.status(403);
				return g.toJson(null); 
			}
			s.getAppartements().put(appartement.getId(), appartement);
			s.getHosts().get(appartement.getHost()).getAppartements().put(appartement.getId(), appartement);	//treba i ovo (dodavanje unutar host-a)
			return g.toJson(appartement);
		});
		
		put("/Appartements", (req, res) ->{
			res.type("application/json");
			Apartment appartement = g.fromJson(req.body(), Apartment.class);
			if(s.getGests().containsKey(appartement.getId())) {
				s.getAppartements().get(appartement.getId()).setId(appartement.getId());
				s.getAppartements().get(appartement.getId()).setType(appartement.getType());
				s.getAppartements().get(appartement.getId()).setNumOfRooms(appartement.getNumOfRooms());
				s.getAppartements().get(appartement.getId()).setNumOfGuests(appartement.getNumOfGuests());
				s.getAppartements().get(appartement.getId()).setLocation(appartement.getLocation());
				s.getAppartements().get(appartement.getId()).setRentingDays(appartement.getRentingDays());
				s.getAppartements().get(appartement.getId()).setAvailableDates(appartement.getAvailableDates());
				s.getAppartements().get(appartement.getId()).setHost(appartement.getHost());
				s.getAppartements().get(appartement.getId()).setComments(appartement.getComments());
				s.getAppartements().get(appartement.getId()).setPricePerNight(appartement.getPricePerNight());
				s.getAppartements().get(appartement.getId()).setCheckInTime(appartement.getCheckInTime());
				s.getAppartements().get(appartement.getId()).setCheckOutTime(appartement.getCheckOutTime());
				s.getAppartements().get(appartement.getId()).setStatus(appartement.getStatus());
				s.getAppartements().get(appartement.getId()).setAmenities(appartement.getAmenities());
				s.getAppartements().get(appartement.getId()).setReservations(appartement.getReservations());
				
				s.getHosts().get(appartement.getHost()).getAppartements().remove(appartement.getId());
				s.getHosts().get(appartement.getHost()).getAppartements().put(appartement.getId(),appartement);	//ove dve linije edituju i unutar hosta taj apartman(tako sto ga obrisem pa upisem)
				
				return g.toJson(s.getAppartements().get(appartement.getId()));
			}
			res.status(404);
			return g.toJson(null);
		});
		
		delete("/Appartements",(req,res)->{
			String id = req.queryParams("id");
			Apartment appartmant=s.getAppartements().get(id);
			if(appartmant!=null) {
				s.getAppartements().get(id).setDeletedStatus(DeletedStatus.DELETED);
				s.getHosts().get(appartmant.getHost()).getAppartements().get(appartmant.getId()).setDeletedStatus(DeletedStatus.DELETED);	//setujem da je obrisano i unutar host-a
				return g.toJson(appartmant);
			}
			res.status(404);
			return g.toJson(null);
		});
	}
	
}
