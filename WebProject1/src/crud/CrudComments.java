package crud;

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
import beans.CommentStatus;
import beans.DeletedStatus;
import beans.Guest;
import beans.Host;
import beans.Reservation;
import beans.ReservationStatus;
import beans.User;
import rest.DateBase;
import spark.Session;

public class CrudComments implements CrudInterface{
	public CrudComments() {
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public void activeCrud(DateBase s, Gson g) {
		
		get("/Comments",(req,res)->{
			res.type("application/json");
			
			String id = req.queryParams("id");
			
			List<Comments> comments=s.getApartments().get(id).getComments();
			return g.toJson(comments);
			
			
		});
		
		get("/CommentsGuest",(req,res)->{
			res.type("application/json");
			
			String id = req.queryParams("id");
					
			List<Comments> comments=s.getApartments().get(id).getComments();
			
			for (Comments coment : comments) {
				if(coment.getStatus().equals("VISIBLE")) {
					return g.toJson(comments);
				}
			}
			res.status(404);
			return null;
		});
		
		get("/CommentsHost",(req,res)->{
			res.type("application/json");
			
			Session session=req.session();
			User user = session.attribute("user");
			Host host=s.getHosts().get(user.getUserName());
			if(host==null) {
				res.status(400);
				return null;
			}
			
			List<Comments> comments=new ArrayList<Comments>();
			for (Apartment a : host.getApartments().values()) {
				comments.addAll(a.getComments());
			}
			return g.toJson(comments);
		});
		
		post("/Comments",(req,res)->{
			res.type("application/json");
			Comments comment = g.fromJson(req.body(), Comments.class);
			String stringId = req.queryParams("id");
			int id = Integer.parseInt(stringId); 
			Session session=req.session();
			User user = session.attribute("user");
			Guest guest=s.getGuests().get(user.getUserName());
			if(guest==null) {
				res.status(400);
				return null;
			}
			
			comment.setGest(guest);
			List<Reservation> reservations=s.getGuests().get(user.getUserName()).getReservations();
			for (Reservation reservation : reservations) {
				if(reservation.getApartmentId()==id) {
					s.getApartments().get(id).getComments().add(comment);
				}
			}
			
			return g.toJson(comment);
			
		});
		
		delete("/Comments",(req,res)->{
			String stringId = req.queryParams("id");
			int id = Integer.parseInt(stringId); 
			
			Session session=req.session();
			User user = session.attribute("user");
			List<Comments> comments=s.getApartments().get(id).getComments();
			
			for (Comments comment : comments) {
				if(comment.getApartment().getHost().equals(user.getUserName())) {
					
					comment.setStatus(CommentStatus.HIDDEN);
					return g.toJson(comments);
				}
			}
			res.status(404);
			return g.toJson(null);
		});
	}
}
