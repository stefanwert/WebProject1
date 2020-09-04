package crud;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.delete;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import beans.DeletedStatus;
import beans.Host;
import rest.AppMain;
import rest.DateBase;

import static spark.Spark.after;

public class CrudHost implements CrudInterface{
	public CrudHost() {
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public void activeCrud(DateBase s,Gson g) {
		
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
			return g.toJson(host);
		});
		
		get("/AllHost",(req,res)->{
			res.type("application/json");
			List<Host> hosts = new ArrayList<Host>();
			for (String hostUsername : s.getHosts().keySet()) {
				if(s.getHosts().get(hostUsername).getDeletedStatus()==DeletedStatus.ACTIVE) {
					hosts.add(s.getHosts().get(hostUsername));
				}
			}
			
			return g.toJson(hosts);
		});
		
		post("/Host",(req,res)->{
			res.type("application/json");
			Host h1 = g.fromJson(req.body(), Host.class);
			if(s.getHosts().containsKey(h1.getUserName())) {
				res.status(403);
				return g.toJson(null);
			}
			System.out.println(h1);
			s.getHosts().put(h1.getUserName(), h1);
			//PrintWriter printWriter=new PrintWriter(AppMain.fileName);
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
		delete("/Host",(req,res)->{
			res.type("application/json");
			Host h1 = g.fromJson(req.body(), Host.class);
			if(h1!=null) {
				s.getHosts().get(h1.getUserName()).setDeletedStatus(DeletedStatus.DELETED);	//provera da li je user name u bazi
				return g.toJson(s.getHosts().get(h1.getUserName()));
			}
			res.status(404);
			return g.toJson(null);
		});
	}
}
