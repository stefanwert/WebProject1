package crud;

import static spark.Spark.after;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import beans.DeletedStatus;
import beans.Guest;
import beans.Host;
import rest.AppMain;
import rest.DateBase;

public class CrudGuest implements CrudInterface{
	public CrudGuest() {}

	@Override
	public void activeCrud(DateBase s, Gson g) {
		
		
		get("/AllGest",(req,res)->{
			res.type("application/json");
			List<Guest> gests = new ArrayList<Guest>();
			for (Guest gest : s.getGuests().values()) {
				if(gest.getDeletedStatus()==DeletedStatus.ACTIVE) {
					gests.add(gest);
				}
			}
			
			return g.toJson(gests);
		});
		
		get("/Gest",(req,res)->{
			res.type("application/json");
			String userName = req.queryParams("userName");
			String password = req.queryParams("password");
			
			Guest gest=s.getGuests().get(userName);
			if(gest==null || (!gest.getPassword().equals(password))) {
				res.status(404);
				return null;
			}
			return g.toJson(gest);
		});
		
		post("/Gest",(req,res)->{
			res.type("application/json");
			Guest g1 = g.fromJson(req.body(), Guest.class);
			if(AppMain.isUserNameUnique(g1.getUserName())) {
				res.status(400);
				return g.toJson(null);
			}
			s.getGuests().put(g1.getUserName(), g1);
			//PrintWriter printWriter=new PrintWriter(AppMain.fileName);
			return g.toJson(g1);
		});
		put("/Gest", (req, res) ->{
			res.type("application/json");
			Guest h1 = g.fromJson(req.body(), Guest.class);
			if(s.getGuests().containsKey(h1.getUserName())) {
				s.getGuests().get(h1.getUserName()).setGender(h1.getGender());
				s.getGuests().get(h1.getUserName()).setName(h1.getName());
				s.getGuests().get(h1.getUserName()).setPassword(h1.getPassword());
				s.getGuests().get(h1.getUserName()).setSurname(h1.getSurname());
				s.getGuests().get(h1.getUserName()).setUserName(h1.getUserName());
				
				return g.toJson(s.getGuests().get(h1.getUserName()));
			}
			res.status(404);
			return g.toJson(null);
		});
		delete("/Gest",(req,res)->{
			Guest g1 = g.fromJson(req.body(), Guest.class);
			if(g1!=null) {
				s.getGuests().get(g1.getUserName()).setDeletedStatus(DeletedStatus.DELETED);
				return g.toJson(s.getGuests().get(g1.getName()));
			}
			res.status(404);
			return g.toJson(null);
		});
	}
	
	
}
