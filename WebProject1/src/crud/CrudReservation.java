package crud;

import static spark.Spark.after;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.Date;

import com.google.gson.Gson;

import beans.Appartement;
import beans.Gest;
import beans.Host;
import beans.Reservation;
//import beans.ReservationStatus;
import rest.AppMain;
import rest.DateBase;

public class CrudReservation implements CrudInterface{
	
	public CrudReservation() {
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public void activeCrud(DateBase s, Gson g) {
		after("/Reservation", (req, res) -> {
			AppMain.writeToFile();
		});
		
		get("/Reservation",(req,res)->{
			res.type("application/json");
			String id = req.queryParams("id");
			
			Reservation reservation=s.getReservations().get(id);
			if(reservation==null || (!reservation.getId().equals(id))) {
				res.status(404);
				return null;
			}
			return g.toJson(reservation);
		});
		
		post("/Reservation",(req,res)->{
			res.type("application/json");
			Reservation reserv = g.fromJson(req.body(), Reservation.class);
			if(s.getReservations().containsKey(reserv.getId())) {
				res.status(403);
				return g.toJson(null);
			}
			s.getReservations().put(reserv.getId(), reserv);
			return g.toJson(reserv);
		});
		put("/Reservation", (req, res) ->{
			res.type("application/json");
			Reservation r = g.fromJson(req.body(), Reservation.class);
			
			if(s.getReservations().containsKey(r.getId())) {
				s.getReservations().get(r.getId()).setId(r.getId());
				s.getReservations().get(r.getId()).setAppartement(r.getAppartement());
				s.getReservations().get(r.getId()).setStartDate(r.getStartDate());
				s.getReservations().get(r.getId()).setNumOfNights(r.getNumOfNights());
				s.getReservations().get(r.getId()).setTotalPrice(r.getTotalPrice());
				s.getReservations().get(r.getId()).setStartDate(r.getStartDate());
				s.getReservations().get(r.getId()).setMessage(r.getMessage());
				s.getReservations().get(r.getId()).setHost(r.getHost());
				s.getReservations().get(r.getId()).setReservStatus(r.getReservStatus());
				
				return g.toJson(s.getReservations().get(r.getId()));
			}
	
			res.status(404);
			return g.toJson(null);
		});
		delete("/Reservation",(req,res)->{
			String id = req.queryParams("id");
			Reservation ret=s.getReservations().get(id);
			if(ret!=null) {
				s.getReservations().remove(id);
				return g.toJson(ret);
			}
			res.status(404);
			return g.toJson(null);
		});
	}

}
