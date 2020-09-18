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
import com.sun.security.auth.NTDomainPrincipal;

import beans.Apartment;
import beans.DeletedStatus;
import beans.Guest;
import beans.Host;
import beans.Reservation;
import beans.User;
import beans.Reservation;
import beans.ReservationStatus;
import rest.AppMain;
import rest.DateBase;
import spark.Session;

public class CrudReservation implements CrudInterface{
	
	public CrudReservation() {
		// TODO Auto-generated constructor stub
	}
	
	public  static boolean isDateSame(Date d,Date d2) {
		return d.getDay()==d2.getDay() &&
				d.getMonth()==d2.getMonth()&& 
				d.getYear()==d2.getYear();
	}
	
	@Override
	public void activeCrud(DateBase s, Gson g) {
		
		
		get("/Reservation",(req,res)->{
			res.type("application/json");
			String id = req.queryParams("id");
			
			Session session=req.session();
			User user = session.attribute("user");
			List<Reservation> reservations=s.getGuests().get(user.getUserName()).getReservations();
			
			for (Reservation reservation : reservations) {
				if(reservation.getId().equals(id)) {
					return g.toJson(reservations);
				}
			}
			res.status(404);
			return null;
			
		});
		
		get("/ReservationGuest",(req,res)->{
			res.type("application/json");
			
			Session session=req.session();
			User user = session.attribute("user");
			Guest gust=s.getGuests().get(user.getUserName());
			if(gust==null) {
				res.status(400);
				return null;
			}
			
			return g.toJson(gust.getReservations());
			
			
		});
		
		get("/ReservationHost",(req,res)->{
			res.type("application/json");
			
			Session session=req.session();
			User user = session.attribute("user");
			Host host=s.getHosts().get(user.getUserName());
			if(host==null) {
				res.status(400);
				return null;
			}
			
			List<Reservation> reservations=new ArrayList<Reservation>();
			for (Apartment a : host.getApartments().values()) {
				reservations.addAll(a.getReservations());
			}
			return g.toJson(reservations);
			
			
		});
		
		get("/ReservationAdmin",(req,res)->{
			res.type("application/json");
			
			List<Reservation> reservations=new ArrayList<Reservation>();
			for (Apartment a : s.getApartments().values()) {
				reservations.addAll(a.getReservations());
			}
			return g.toJson(reservations);
	
		});
		
		post("/Reservation",(req,res)->{
			res.type("application/json");
			
			HashMap<String, String> mapa = new HashMap<String, String>();
			mapa = g.fromJson(req.body(), mapa.getClass());
			String num=mapa.get("numOfDates");
			String dateString=mapa.get("selectedDate");
			String idString=mapa.get("id");
			int numOfNights;
			long dateLong;
			Date startDate;
			int id;
			try {
				numOfNights=Integer.parseInt(num);
				dateLong=Long.parseLong(dateString);
				startDate=new Date(dateLong);
				id=Integer.parseInt(idString);
			} catch (Exception e) {
				res.status(400);
				return g.toJson(null);
			}
			
			//System.out.println(date);
			
			Session session=req.session();
			User user = session.attribute("user");
			Apartment apartment= s.getApartments().get(id);
			
			int br=0;
			for(int i=0;i<numOfNights;i++) {
				Date d2=new Date(startDate.getTime()+i*86400000);
				System.out.println(d2);
				for (Date d :apartment.getAvailableDates()) {
					if(isDateSame(d, d2)) {
						br++;
						break;
					}
				}
			}
			if(br!=numOfNights) {
				res.status(400);
				return g.toJson(null);
			}else {
				//sve super rezervisi
				//new beans.Reservation(id, apartment, startDate, numOfNights, totalPrice, message, host, reservStatus, deletedStatus)
				Host host=s.getHosts().get(apartment.getHost());
				int idInt=s.getReservationNextId();
				s.setReservationNextId(idInt+1);
				String idReservation=Integer.toString(idInt);
				beans.Reservation reservation=new beans.Reservation(idReservation, apartment.getId(), startDate,numOfNights , apartment.getPricePerNight(), "", host.getUserName(), ReservationStatus.CREATED, DeletedStatus.ACTIVE,user.getUserName());
				s.getGuests().get(user.getUserName()).getReservations().add(reservation);
				s.getHosts().get(apartment.getHost()).getApartments().get(apartment.getId()).getReservations().add(reservation);
				//izbrisi termine iz liste slobodnih
				for(int i=0;i<numOfNights;i++) {
					Date d2=new Date(startDate.getTime()+i*86400000);
					for (Date d :apartment.getAvailableDates()) {
						if(isDateSame(d, d2)) {
							apartment.getAvailableDates().remove(d);
							break;
						}
					}
				}
				
				return g.toJson(reservation);
			}
			
		});
		
		put("/ReservationGuest", (req, res) ->{
			res.type("application/json");
			
			Session session=req.session();
			User user = session.attribute("user");
			Reservation r = g.fromJson(req.body(), Reservation.class);
			List<Reservation> reservations=s.getGuests().get(user.getUserName()).getReservations();

			for (Reservation reservation : reservations) {
				if(reservation.getId().equals(r.getId())) {
					
					reservation.setId(r.getId());
					reservation.setApartmentId(r.getApartmentId());
					reservation.setStartDate(r.getStartDate());
					reservation.setNumOfNights(r.getNumOfNights());
					reservation.setTotalPrice(r.getTotalPrice());
					reservation.setStartDate(r.getStartDate());
					reservation.setMessage(r.getMessage());
					reservation.setHostUserName(r.getHostUserName());
					reservation.setReservStatus(r.getReservStatus());
					
					return g.toJson(reservation);
				}
			}
			
			res.status(404);
			return g.toJson(null);
		});
		
		
		put("/ReservationHost", (req, res) ->{
			res.type("application/json");
			
			Session session=req.session();
			User user = session.attribute("user");
			Reservation r = g.fromJson(req.body(), Reservation.class);
			List<Apartment> apartments=new ArrayList<Apartment>(s.getHosts().get(user.getUserName()).getApartments().values());
			if(s.getHosts().get(user.getUserName())==null) {
				res.status(400);
				return g.toJson(null);
			}
			for(Apartment a : apartments) {
				for (Reservation reservation : a.getReservations()) {
					if(reservation.getId().equals(r.getId())) {
						//izmena kod host-a
						reservation.setId(r.getId());
						reservation.setApartmentId(r.getApartmentId());
						reservation.setStartDate(r.getStartDate());
						reservation.setNumOfNights(r.getNumOfNights());
						reservation.setTotalPrice(r.getTotalPrice());
						reservation.setStartDate(r.getStartDate());
						reservation.setMessage(r.getMessage());
						reservation.setHostUserName(r.getHostUserName());
						reservation.setReservStatus(r.getReservStatus());
						//izmena kod guest-a
						Guest guest=s.getGuests().get(reservation.getGuestUserNameString());
						if(guest==null) {
							res.status(400);
							return g.toJson(null);
						}
						for (Reservation rG : guest.getReservations()) {
							if(rG.getId().equals(r.getId())) {
								rG.setId(r.getId());
								rG.setApartmentId(r.getApartmentId());
								rG.setStartDate(r.getStartDate());
								rG.setNumOfNights(r.getNumOfNights());
								rG.setTotalPrice(r.getTotalPrice());
								rG.setStartDate(r.getStartDate());
								rG.setMessage(r.getMessage());
								rG.setHostUserName(r.getHostUserName());
								rG.setReservStatus(r.getReservStatus());
							}
							
						}
						
						return g.toJson(reservation);
					}
				}
			}
			
			
			res.status(400);
			return g.toJson(null);
		});
		
		delete("/Reservation",(req,res)->{
			String id = req.queryParams("id");
			
			Session session=req.session();
			User user = session.attribute("user");
			List<Reservation> reservations=s.getGuests().get(user.getUserName()).getReservations();
			
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
