package crud;

import static spark.Spark.get;
import static spark.Spark.post;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;

import javax.servlet.MultipartConfigElement;
import javax.servlet.http.Part;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;


import beans.Host;
import rest.DateBase;

public class CrudPicture implements CrudInterface{

	@Override
	public void activeCrud(DateBase s, Gson g) {
		post("/upload", (request,response)->{
			response.type("text");
			String location = "slike";          // the directory location where files will be stored
			long maxFileSize = 100000000;       // the maximum size allowed for uploaded files
			long maxRequestSize = 100000000;    // the maximum size allowed for multipart/form-data requests
			int fileSizeThreshold = 1024;       // the size threshold after which files will be written to disk

			MultipartConfigElement multipartConfigElement = new MultipartConfigElement(
			     location, maxFileSize, maxRequestSize, fileSizeThreshold);
			 request.raw().setAttribute("org.eclipse.jetty.multipartConfig",
			     multipartConfigElement);

			Collection<Part> parts = request.raw().getParts();
			

			String fName = request.raw().getPart("file").getSubmittedFileName();
			int tacka;
			try {			
				tacka = fName.indexOf('.');
				
			}catch (Exception e) {
				response.status(400);
				return "{\"poruka\": \"Pogresna vrsta fajla\"}";
			}
			String extension = fName.substring(tacka,fName.length());
			if(!(extension.equalsIgnoreCase(".png") || extension.equals(".jpg") || extension.equals(".jpeg"))) {
				response.status(400);
				return "{\"poruka\": \"Pogresna vrsta fajla\"}";
			}
			Part uploadedFile = request.raw().getPart("file");
			Path out = Paths.get("./static/slike/" + fName);
			File file = new File(out.toString());
			int brojac = 0;
			//proveri da li postoji fajl ukoliko posotoji dodaj mu redni broj 
			while(file.exists()) {
				fName =  fName.substring(0,tacka) + brojac + extension;
				out = Paths.get("./static/slike/" + fName);
				file = new File(out.toString());
				brojac++;
			}
			try (final InputStream in = uploadedFile.getInputStream()) {
			   Files.copy(in, out);
			   uploadedFile.delete();
			}
			// cleanup
			multipartConfigElement = null;
			parts = null;
			uploadedFile = null;

			return "slike/" + fName;
		});
		
	}

}
