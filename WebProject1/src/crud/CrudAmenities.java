package crud;

import static spark.Spark.after;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.google.gson.Gson;

import beans.Amenities;
import beans.Apartment;
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
		after("/Amenities", (req, res) -> {
			AppMain.writeToFile();
		});
		
		get("/Amenities",(req,res)->{
			res.type("application/json");

			return g.toJson(s.getAmenities());
		});
		
		post("/Amenities",(req,res)->{
			res.type("application/json");
			Amenities a1 = g.fromJson(req.body(), Amenities.class);
			if(AppMain.isIdUnique(a1.getId())) {
				res.status(403);
				return g.toJson(null);
			}
			s.getAmenities().put(a1.getId(), a1);
			return g.toJson(a1);	
		});
		put("/Amenities", (req, res) ->{
			res.type("application/json");
			Amenities a1 = g.fromJson(req.body(), Amenities.class);
			if(s.getAmenities().containsKey(a1.getId())) {
				s.getAmenities().get(a1.getId()).setId(a1.getId());
				s.getAmenities().get(a1.getId()).setName(a1.getName());
				
				return g.toJson(s.getAmenities().get(a1.getId()));
			}
			res.status(404);
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
