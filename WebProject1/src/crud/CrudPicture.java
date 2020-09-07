package crud;

import static spark.Spark.get;
import static spark.Spark.post;

import java.io.IOException;

import javax.ws.rs.core.Response;

import com.google.gson.Gson;


import beans.Host;
import rest.DateBase;

public class CrudPicture implements CrudInterface{

	@Override
	public void activeCrud(DateBase s, Gson g) {
//		post("/Host",(req,res)->{
//			
//			 System.out.println("Called Upload Image");
//		        // check if all form parameters are provided
//		        if (uploadedInputStream == null || fileDetail == null)
//		            return Response.status(400).entity("Invalid form data").build();
//		        // create our destination folder, if it not exists
//		        try {
//		            createFolderIfNotExists(UPLOAD_FOLDER);
//		        } catch (SecurityException se) {
//		            return Response.status(500)
//		                    .entity("Can not create destination folder on server")
//		                    .build();
//		        }
//		        String uploadedFileLocation = UPLOAD_FOLDER + fileDetail.getFileName();
//		        try {
//		            saveToFile(uploadedInputStream, uploadedFileLocation);
//		        } catch (IOException e) {
//		            return Response.status(500).entity("Can not save file").build();
//		        }
//		        return Response.status(200)
//		                .entity("File saved to " + uploadedFileLocation).build();	
//		});
		
	}

}
