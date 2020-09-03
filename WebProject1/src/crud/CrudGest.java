package crud;

import static spark.Spark.after;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.io.PrintWriter;

import com.google.gson.Gson;

import beans.DeletedStatus;
import beans.Gest;
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
		
		get("/Gest",(req,res)->{
			res.type("application/json");
			String userName = req.queryParams("userName");
			String password = req.queryParams("password");
			
			Gest gest=s.getGests().get(userName);
			if(gest==null || (!gest.getPassword().equals(password))) {
				res.status(404);
				return null;
			}
			return g.toJson(gest);
		});
		
		post("/Gest",(req,res)->{
			res.type("application/json");
			Gest g1 = g.fromJson(req.body(), Gest.class);
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
			Gest h1 = g.fromJson(req.body(), Gest.class);
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
			String userName = req.queryParams("userName");
			Gest ret=s.getGests().get(userName);
			if(ret!=null) {
				s.getGests().get(userName).setDeletedStatus(DeletedStatus.DELETED);
				return g.toJson(ret);
			}
			res.status(404);
			return g.toJson(null);
		});
	}
	
	
}
