package crud;

import static spark.Spark.after;
import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

import java.io.PrintWriter;

import com.google.gson.Gson;

import beans.Administrator;
import beans.DeletedStatus;
import beans.Guest;
import beans.User;
import javassist.expr.Instanceof;
import rest.AppMain;
import rest.DateBase;

public class CrudAdministrator implements CrudInterface {
	
	

	@Override
	public void activeCrud(DateBase s, Gson g) {
		after("/Administrator", (req, res) -> {
			AppMain.writeToFile();
		});
		
		//User user = new User();
		
		//if(user instanceof Administrator) {
			//return "ADMIN";
		//}
		
		get("/Administrator",(req,res)->{
			res.type("application/json");
			String userName = req.queryParams("userName");
			String password = req.queryParams("password");
			
			Administrator admin=s.getAdministrators().get(userName);
			if(admin==null || (!admin.getPassword().equals(password))) {
				res.status(404);
				return null;
			}
			return g.toJson(admin);
		});
		
		post("/Administrator",(req,res)->{
			res.type("application/json");
			Administrator admin = g.fromJson(req.body(), Administrator.class);
			if(s.getAdministrators().containsKey(admin.getUserName())) {
				res.status(403);
				return g.toJson(null);
			}
			s.getAdministrators().put(admin.getUserName(), admin);
			return g.toJson(admin);
		});
		put("/Administrator", (req, res) ->{
			res.type("application/json");
			Administrator admin = g.fromJson(req.body(), Administrator.class);
			if(s.getAdministrators().containsKey(admin.getUserName())) {
				s.getAdministrators().get(admin.getUserName()).setGender(admin.getGender());
				s.getAdministrators().get(admin.getUserName()).setName(admin.getName());
				s.getAdministrators().get(admin.getUserName()).setPassword(admin.getPassword());
				s.getAdministrators().get(admin.getUserName()).setSurname(admin.getSurname());
				s.getAdministrators().get(admin.getUserName()).setUserName(admin.getUserName());
				
				return g.toJson(s.getAdministrators().get(admin.getUserName()));
			}
			res.status(404);
			return g.toJson(null);
		});
		delete("/Administrator",(req,res)->{
			String userName = req.queryParams("userName");
			Administrator admin=s.getAdministrators().get(userName);
			if(admin!=null) {
				s.getAdministrators().get(userName).setDeletedStatus(DeletedStatus.DELETED);
				return g.toJson(admin);
			}
			res.status(404);
			return g.toJson(null);
		});

	}

}
