package crud;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;

import java.io.PrintWriter;

import com.google.gson.Gson;

import beans.Host;
import rest.AppMain;
import rest.SingletonDateBase;

import static spark.Spark.after;

public class CrudHost {
	public CrudHost() {
		// TODO Auto-generated constructor stub
	}
	
	public static void activeCrud(SingletonDateBase s,Gson g) {
		
		after("/Host", (req, res) -> {
			AppMain.writeToFile();
		});
		
		get("/Host",(req,res)->{
			res.type("application/json");
			String userName = req.queryParams("userName");
			String password = req.queryParams("password");
			
			Host host=s.getHosts().get(userName);
			if(host==null || (!host.getPassword().equals(password))) {
				res.status(404);
				return null;
			}
			res.status(200);
			return g.toJson(host);
		});
		
		post("/Host",(req,res)->{
			res.type("application/json");
			Host h1 = g.fromJson(req.body(), Host.class);
			if(s.getHosts().containsKey(h1.getUserName())) {
				res.status(403);
				return g.toJson(null);
			}
//			Host host=new Host(userName, password, name, surname, gender);
//			System.out.println(host);
			System.out.println(h1);
			s.getHosts().put(h1.getUserName(), h1);
			PrintWriter printWriter=new PrintWriter(AppMain.fileName);
			AppMain.writeToFile();
			return g.toJson(h1);
		});
		put("/Host", (req, res) ->{
			res.type("application/json");
			Host h1 = g.fromJson(req.body(), Host.class);
			if(s.getHosts().containsKey(h1.getUserName())) {
				s.getHosts().get(h1.getUserName()).setGender(h1.getGender());
				s.getHosts().get(h1.getUserName()).setName(h1.getName());
				s.getHosts().get(h1.getUserName()).setPassword(h1.getPassword());
				s.getHosts().get(h1.getUserName()).setSurname(h1.getSurname());
				s.getHosts().get(h1.getUserName()).setUserName(h1.getUserName());
				
				return g.toJson(s.getHosts().get(h1.getUserName()));
			}
			res.status(404);
			return g.toJson(null);
		});
	}
}
