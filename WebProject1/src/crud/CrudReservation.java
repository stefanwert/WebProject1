package crud;

import static spark.Spark.after;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.Date;
import java.util.List;

import com.google.gson.Gson;

import beans.Apartment;
import beans.DeletedStatus;
import beans.Gest;
import beans.Host;
import beans.Reservation;
import beans.User;
//import beans.ReservationStatus;
import rest.AppMain;
import rest.DateBase;
import spark.Session;

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
			
			Session session=req.session();
			User user = session.attribute("LogedUser");
			List<Reservation> reservations=s.getGests().get(user.getUserName()).getReservations();
			
			for (Reservation reservation : reservations) {
				if(reservation.getId().equals(id)) {
					return g.toJson(reservations);
				}
			}
			res.status(404);
			return null;
			
		});
		
		post("/Reservation",(req,res)->{
			res.type("application/json");
			
			Session session=req.session();
			User user = session.attribute("LogedUser");
			Reservation reservation = g.fromJson(req.body(), Reservation.class);
			List<Reservation> reservations=s.getGests().get(user.getUserName()).getReservations();
			
			for (Reservation reserv : reservations) {
				if(reserv.getId().equals(reservation.getId())) {
					res.status(403);
					return g.toJson(null);
				}
			}
			s.getGests().get(user.getUserName()).getReservations().add(reservation);
			return g.toJson(reservation);
		});
		
		put("/Reservation", (req, res) ->{
			res.type("application/json");
			
			Session session=req.session();
			User user = session.attribute("LogedUser");
			Reservation r = g.fromJson(req.body(), Reservation.class);
			List<Reservation> reservations=s.getGests().get(user.getUserName()).getReservations();

			for (Reservation reservation : reservations) {
				if(reservation.getId().equals(r.getId())) {
					
					reservation.setId(r.getId());
					reservation.setAppartement(r.getAppartement());
					reservation.setStartDate(r.getStartDate());
					reservation.setNumOfNights(r.getNumOfNights());
					reservation.setTotalPrice(r.getTotalPrice());
					reservation.setStartDate(r.getStartDate());
					reservation.setMessage(r.getMessage());
					reservation.setHost(r.getHost());
					reservation.setReservStatus(r.getReservStatus());
					
					return g.toJson(reservation);
				}
			}
			
			res.status(404);
			return g.toJson(null);
		});
		delete("/Reservation",(req,res)->{
			String id = req.queryParams("id");
			
			Session session=req.session();
			User user = session.attribute("LogedUser");
			List<Reservation> reservations=s.getGests().get(user.getUserName()).getReservations();
			
			for (Reservation reservation : reservations) {
				if(reservation.getId().equals(id)) {
					
					reservation.setDeletedStatus(DeletedStatus.DELETED);
					return g.toJson(reservations);
				}
			}
			res.status(404);
			return g.toJson(null);
		});
	}

}
