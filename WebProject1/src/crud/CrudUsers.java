package crud;

import static spark.Spark.after;
import static spark.Spark.redirect;
import static spark.Spark.before;
import static spark.Spark.get;
import static spark.Spark.halt;
import static spark.Spark.post;
import static spark.Spark.put;

import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;

import beans.Administrator;
import beans.Guest;
import beans.Host;
import beans.Reservation;
import beans.User;
import rest.AppMain;
import rest.DateBase;
import spark.Request;
import spark.Response;
import spark.Session;

public class CrudUsers implements CrudInterface{

	@Override
	public void activeCrud(DateBase s, Gson g) {
		
		
			
		post("/Login",(req,res)->{
			res.type("application/json");
			
			User user=g.fromJson(req.body(), User.class);
			HashMap<String, String> mapa = new HashMap<String, String>();
			
			//ako je admin
			if(s.getAdministrators().containsKey(user.getUserName())) {
				if(s.getAdministrators().get(user.getUserName()).getPassword().equals(user.getPassword())) {
					res.cookie("userID", user.getUserName());
					mapa.put("path","/admin.html");
					mapa.put("uslov", "TRUE");
					req.session().attribute("user", s.getAdministrators().get(user.getUserName()));
					return g.toJson(mapa);
				}
			}
			//ako je guest
			if(s.getGuests().containsKey(user.getUserName())) {
				if(s.getGuests().get(user.getUserName()).getPassword().equals(user.getPassword())) {
					res.cookie("userID", user.getUserName());
					mapa.put("path","/guest.html");
					mapa.put("uslov", "TRUE");
					req.session().attribute("user", s.getGuests().get(user.getUserName()));
					return g.toJson(mapa);
				}
			}
			//ako je host
			if(s.getHosts().containsKey(user.getUserName())) {
				if(s.getHosts().get(user.getUserName()).getPassword().equals(user.getPassword())) {
					res.cookie("userID", user.getUserName());
					mapa.put("path","/host.html");
					mapa.put("uslov", "TRUE");
					req.session().attribute("user", s.getHosts().get(user.getUserName()));
					return g.toJson(mapa);
				}
			}
			
			mapa.clear();
			mapa.put("uslov", "FALSE");
			return g.toJson(mapa);
		});
		
		get("/logoff",(req, res) -> {
			req.session(true).invalidate();
			res.removeCookie("userID");
			res.redirect("/index.html");
			return "OK";
		});	
		get("/loggedUser",(req, res) -> {
			User user = req.session().attribute("user");
			return g.toJson(user);
		});
		
	}
	
	private static void loggedIn(Request req,Response res,DateBase s) {
		req.session();
		String[] params = req.splat();
		String path;
		if(params.length == 0)
			path = "";
		else
			path = params[0];
		System.out.println(path);
		
		if(req.cookie("userID") == null) {
			res.redirect("index.html");
		}else {
			if(req.session().attribute("user")==null) {
				//admin
				if(s.getAdministrators().containsKey(req.cookie("userID"))) {
					Administrator administrator=s.getAdministrators().get(req.cookie("userID"));
					req.session().attribute("user",administrator);
					res.redirect("/admin.html");
					halt(301);
				}
				//host
				else if(s.getHosts().containsKey(req.cookie("userID"))) {
					Host host=s.getHosts().get(req.cookie("userID"));
					req.session().attribute("user",host);
					redirect.post("/index.html", "/host.html");
					
				}
				//guest
				else if(s.getGuests().containsKey(req.cookie("userID"))) {
					Guest guest=s.getGuests().get(req.cookie("userID"));
					req.session().attribute("user",guest);
					res.redirect("/guest.html");
					halt(301);
				}
			}
		}
	}
	
	

}
