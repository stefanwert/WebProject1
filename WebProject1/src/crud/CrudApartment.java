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
import beans.CommentForApartment;
import beans.DeletedStatus;
import beans.Guest;
import beans.Host;
import beans.Location;
import beans.Reservation;
import beans.User;
import rest.AppMain;
import rest.DateBase;
import spark.Session;

public class CrudApartment implements CrudInterface{

	public CrudApartment(){
		// TODO Auto-generated constructor stub
	}

	@Override
	public void activeCrud(DateBase s, Gson g) {
		
		after("/*", (req, res) -> {
			AppMain.writeToFile();
		});
		
		get("/Apartments",(req,res)->{
			res.type("application/json");
			String idS = req.queryParams("id");
			int id= Integer.parseInt(idS);
			
			Apartment appartement=s.getApartments().get(id);
			if(appartement==null || (appartement.getId()!=id)) {
				res.status(404);
				return null;
			}
			return g.toJson(appartement);
		});
		
		/*
		get("/Amenities",(req,res)->{
			res.type("application/json");

			return g.toJson(s.getAmenities());
		});*/
		
		get("/Locatios",(req,res)->{
			res.type("application/json");
			
			
			return g.toJson(s.getLocations());
		});
		
		get("/ApartmentDetails", (req,res)->{
			res.type("application/json");
			String idS = req.queryParams("id");
			int id= Integer.parseInt(idS);
			
			Apartment appartement=s.getApartments().get(id);
			if(appartement==null || (appartement.getId()!=id)) {
				res.status(404);
				return null;
			}
			return g.toJson(appartement);
		});
		
		get("/AllApartmentsForHost",(req,res)->{
			res.type("application/json");
			
			Session session=req.session();
			User user = session.attribute("user");
			
			List<Apartment> apartments = new ArrayList<Apartment>();
			List<Apartment> allApartments=new ArrayList<Apartment>(s.getHosts().get(user.getUserName()).getApartments().values());
			for (int i=0; i<allApartments.size();i++) {
				if(allApartments.get(i).getDeletedStatus()==DeletedStatus.ACTIVE) {
					apartments.add(allApartments.get(i));
				}
			}
			
			return g.toJson(apartments);
		});
		
		get("/AllApartments",(req,res)->{
			res.type("application/json");
			List<Apartment> apartments = new ArrayList<Apartment>();
			for (Integer apartmentId : s.getApartments().keySet()) {
				if(s.getApartments().get(apartmentId).getDeletedStatus()==DeletedStatus.ACTIVE && s.getApartments().get(apartmentId).getStatus()==beans.Status.ACTIVE) {
					apartments.add(s.getApartments().get(apartmentId));
				}
			}
			
			return g.toJson(apartments);
		});
		
//		post("/A", (req,res)->{
//			List<Date> listaDates= 
//			
//			return g.toJson(null);
//		});
		
		post("/Apartments",(req,res)->{
			res.type("application/json");
			Apartment appartement = g.fromJson(req.body(), Apartment.class);
			appartement.createRentingDays();
			
			Session session=req.session();
			User user = session.attribute("user");
			appartement.setHost(user.getUserName());
			//appartement.setHost("stefan");
			
			appartement.setId(s.getApartmentNextId());
			s.setApartmentNextId(1+s.getApartmentNextId());
			if(s.getApartments().containsKey(appartement.getId())) {
				res.status(403);
				return g.toJson(null); 
			}
			s.getApartments().put(appartement.getId(), appartement);//dodavanje u listu unutar baze
			s.getHosts().get(appartement.getHost()).getApartments().put(appartement.getId(), appartement);	//treba i ovo (dodavanje unutar host-a)
			
			
			return g.toJson(appartement);
		});
		
		put("/Apartments", (req, res) ->{
			res.type("application/json");
			Apartment appartement = g.fromJson(req.body(), Apartment.class);
			if(s.getGuests().containsKey(appartement.getId())) {
				s.getApartments().get(appartement.getId()).setId(appartement.getId());
				s.getApartments().get(appartement.getId()).setType(appartement.getType());
				s.getApartments().get(appartement.getId()).setNumOfRooms(appartement.getNumOfRooms());
				s.getApartments().get(appartement.getId()).setNumOfGuests(appartement.getNumOfGuests());
				s.getApartments().get(appartement.getId()).setLocation(appartement.getLocation());
				s.getApartments().get(appartement.getId()).setRentingDays(appartement.getRentingDays());
				s.getApartments().get(appartement.getId()).setAvailableDates(appartement.getAvailableDates());
				s.getApartments().get(appartement.getId()).setHost(appartement.getHost());
				s.getApartments().get(appartement.getId()).setComments(appartement.getComments());
				s.getApartments().get(appartement.getId()).setPricePerNight(appartement.getPricePerNight());
				s.getApartments().get(appartement.getId()).setCheckInTime(appartement.getCheckInTime());
				s.getApartments().get(appartement.getId()).setCheckOutTime(appartement.getCheckOutTime());
				s.getApartments().get(appartement.getId()).setStatus(appartement.getStatus());
				s.getApartments().get(appartement.getId()).setAmenities(appartement.getAmenities());
				s.getApartments().get(appartement.getId()).setReservations(appartement.getReservations());
				
				s.getHosts().get(appartement.getHost()).getApartments().remove(appartement.getId());
				s.getHosts().get(appartement.getHost()).getApartments().put(appartement.getId(),appartement);	//ove dve linije edituju i unutar hosta taj apartman(tako sto ga obrisem pa upisem)
				
				return g.toJson(s.getApartments().get(appartement.getId()));
			}
			res.status(404);
			return g.toJson(null);
		});
		
		delete("/Apartment",(req,res)->{
			Apartment app = g.fromJson(req.body(), Apartment.class);
			
			int id=app.getId();
			
			Apartment appartmant=s.getApartments().get(id);
			if(appartmant!=null) {
				for (Reservation r : appartmant.getReservations()) {
					//obrisi sve rezervacije
				}
				
				s.getApartments().get(id).setDeletedStatus(DeletedStatus.DELETED);
				s.getHosts().get(appartmant.getHost()).getApartments().get(appartmant.getId()).setDeletedStatus(DeletedStatus.DELETED);	//setujem da je obrisano i unutar host-a
				return g.toJson(appartmant);
			}
			res.status(404);
			return g.toJson(null);
		});
	}
	
}
