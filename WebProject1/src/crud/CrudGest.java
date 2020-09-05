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

public class CrudGest implements CrudInterface{
	public CrudGest() {}

	@Override
	public void activeCrud(DateBase s, Gson g) {
		after("/Gest", (req, res) -> {
			AppMain.writeToFile();
		});
		
		get("/AllGest",(req,res)->{
			res.type("application/json");
			List<Guest> gests = new ArrayList<Guest>();
			for (Guest gest : s.getGests().values()) {
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
			
			Guest gest=s.getGests().get(userName);
			if(gest==null || (!gest.getPassword().equals(password))) {
				res.status(404);
				return null;
			}
			return g.toJson(gest);
		});
		
		post("/Gest",(req,res)->{
			res.type("application/json");
			Guest g1 = g.fromJson(req.body(), Guest.class);
			if(s.getGests().containsKey(g1.getUserName())) {
				res.status(403);
				return g.toJson(null);
			}
			s.getGests().put(g1.getUserName(), g1);
			//PrintWriter printWriter=new PrintWriter(AppMain.fileName);
			return g.toJson(g1);
		});
		put("/Gest", (req, res) ->{
			res.type("application/json");
			Guest h1 = g.fromJson(req.body(), Guest.class);
			if(s.getGests().containsKey(h1.getUserName())) {
				s.getGests().get(h1.getUserName()).setGender(h1.getGender());
				s.getGests().get(h1.getUserName()).setName(h1.getName());
				s.getGests().get(h1.getUserName()).setPassword(h1.getPassword());
				s.getGests().get(h1.getUserName()).setSurname(h1.getSurname());
				s.getGests().get(h1.getUserName()).setUserName(h1.getUserName());
				
				return g.toJson(s.getGests().get(h1.getUserName()));
			}
			res.status(404);
			return g.toJson(null);
		});
		delete("/Gest",(req,res)->{
			Guest g1 = g.fromJson(req.body(), Guest.class);
			if(g1!=null) {
				s.getGests().get(g1.getUserName()).setDeletedStatus(DeletedStatus.DELETED);
				return g.toJson(s.getGests().get(g1.getName()));
			}
			res.status(404);
			return g.toJson(null);
		});
	}
	
	
}
