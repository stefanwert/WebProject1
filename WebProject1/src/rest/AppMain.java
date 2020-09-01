package rest;
import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.after;
import static spark.Spark.staticFiles;
import static spark.Spark.webSocket;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;



import com.google.gson.Gson;

import beans.Gest;
import beans.Host;
import rest.SingletonDateBase;

public class AppMain {

	private static Gson g = new Gson();
	
	public static SingletonDateBase s=new SingletonDateBase();
	
	public static String fileName="date.txt";
	
	public static void readFromFile() throws IOException {
		BufferedReader br=new BufferedReader(new FileReader(fileName));    
        StringBuilder stringBuilder=new StringBuilder();
        int i;    
        while((i=br.read())!=-1){  
        	System.out.print((char)i); 
        	stringBuilder.append((char)i);
        }  
        
        s=g.fromJson(stringBuilder.toString(),SingletonDateBase.class);
        br.close();  
	}
	
	public static void writeToFile() throws IOException {
		FileWriter fileWriter=new FileWriter(fileName);
		fileWriter.write(g.toJson(s));
		fileWriter.flush();
		fileWriter.close();
	}
	
	public static void main(String[] args) throws IOException {
		
		readFromFile();
        
		port(8080);
		System.out.println(new File("./static").getCanonicalPath());
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		//staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		after("/Host", (req, res) -> {
			writeToFile();
		});
		
		
		get("/rest/demo/test", (req, res) -> {
			return "Works";
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
			res.status(200);
//			Host host=new Host(userName, password, name, surname, gender);
//			System.out.println(host);
			System.out.println(h1);
			s.getHosts().put(h1.getUserName(), h1);
			PrintWriter printWriter=new PrintWriter(fileName);
			
			
			
			return g.toJson(h1);
		});
		put("/Host", (req, res) ->{
		    return 0;
		});
		
	}

}
