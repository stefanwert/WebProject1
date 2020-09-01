package rest;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;
import static spark.Spark.webSocket;

import java.io.File;
import java.io.IOException;

import com.google.gson.Gson;

import beans.Gest;
import beans.Host;

public class AppMain {

	private static Gson g = new Gson();
	
	public static void main(String[] args) throws IOException {
		//ucitavanje iz fajla u singleton kalsu SingletonDateBase pri pokretanju main-a
		
		port(8080);
		System.out.println(new File("./static").getCanonicalPath());
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		//staticFiles.externalLocation(new File("./static").getCanonicalPath());
		get("/rest/demo/test", (req, res) -> {
			return "Works";
		});
		
		get("/Host",(req,res)->{
			res.type("application/json");
			String userName = req.queryParams("userName");
			String password = req.queryParams("password");
			
			SingletonDateBase s=SingletonDateBase.getInstance();
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
			SingletonDateBase s=SingletonDateBase.getInstance();
			if(s.getHosts().containsKey(h1.getUserName())) {
				res.status(403);
				return g.toJson(null);
			}
			res.status(200);
//			Host host=new Host(userName, password, name, surname, gender);
//			System.out.println(host);
			System.out.println(h1);
			s.getHosts().put(h1.getUserName(), h1);
			return g.toJson(h1);
		});
	}

}
