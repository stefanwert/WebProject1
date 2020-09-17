package beans;

import beans.Apartment;
import beans.Guest;

public class Comments {
	private String gestUserName;
	private int idAppartment;
	private String commentText;
	private int rating;
	private CommentStatus status = CommentStatus.VISIBLE;
	
	public Comments() {
	}

	

	
	


	@Override
	public String toString() {
		return "Comments [gestUserName=" + gestUserName + ", idAppartment=" + idAppartment + ", commentText="
				+ commentText + ", rating=" + rating + ", status=" + status + "]";
	}







	public Comments(String gestUserName, int idAppartment, String commentText, int rating, CommentStatus status) {
		super();
		this.gestUserName = gestUserName;
		this.idAppartment = idAppartment;
		this.commentText = commentText;
		this.rating = rating;
		this.status = status;
	}







	public String getGestUserName() {
		return gestUserName;
	}


	public void setGestUserName(String gestUserName) {
		this.gestUserName = gestUserName;
	}



	public int getIdAppartment() {
		return idAppartment;
	}



	public void setIdAppartment(int idAppartment) {
		this.idAppartment = idAppartment;
	}





	

	public String getCommentText() {
		return commentText;
	}

	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public CommentStatus getStatus() {
		return status;
	}

	public void setStatus(CommentStatus status) {
		this.status = status;
	}
	
}
