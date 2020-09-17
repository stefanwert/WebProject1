package crud;

import static spark.Spark.after;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;

import beans.Amenities;
import beans.Apartment;
import beans.Comments;
import beans.DeletedStatus;
import beans.Guest;
import beans.Host;
import beans.Reservation;
import beans.User;
//import beans.ReservationStatus;
import rest.AppMain;
import rest.DateBase;
import spark.Session;

public class CrudAmenities implements CrudInterface {
	public CrudAmenities() {
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public void activeCrud(DateBase s, Gson g) {
		
		
		get("/Amenities",(req,res)->{
			res.type("application/json");

			return g.toJson(s.getAmenities());
		});
		
		post("/Amenities",(req,res)->{
			res.type("application/json");
			Amenities a1 = g.fromJson(req.body(), Amenities.class);
			
			a1.setId(s.getAmenitiesNextId());
			s.setAmenitiesNextId(1+s.getAmenitiesNextId());
			
			List<Amenities> amenities=new ArrayList<Amenities>(s.getAmenities().values());
			//if(AppMain.isIdUnique(a1.getId())) {
				for(Amenities amenity : amenities) {
					if((amenity.getName().equals(a1.getName()))) {
						res.status(400);
						return g.toJson(null);
					}
				}
			s.getAmenities().put(a1.getId(), a1);
			return g.toJson(a1);
			//}
			
		});
		put("/Amenities", (req, res) ->{
			res.type("application/json");
			
			HashMap<String,String> mapa=g.fromJson(req.body(), HashMap.class);
			String oldString=mapa.get("old");
			String newString=mapa.get("new");
			for (Amenities a : s.getAmenities().values()) {
				if(a.getName().equals(oldString)) {
					a.setName(newString);
				}
			}
			for (Apartment a : s.getApartments().values()) {
				for (Amenities am : a.getAmenities().values()) {
					if(am.getName().equals(oldString)) {
						am.setName(newString);
					}
				}
			}
			return g.toJson(null);
		});
		delete("/Amenities",(req,res)->{
			res.type("application/json");
			Amenities a1 = g.fromJson(req.body(), Amenities.class);
			if(a1!=null) {
				s.getAmenities().get(a1.getId()).setDeletedStatus(DeletedStatus.DELETED);
				return g.toJson(s.getAmenities().get(a1.getId()));
			}
			res.status(404);
			return g.toJson(null);
		});
	}

}
