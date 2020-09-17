package beans;

import beans.Apartment;
import beans.Guest;

public class Comments {
	private Guest gest;
	private Apartment apartment;
	private String commentText;
	private int rating;
	private CommentStatus status = CommentStatus.VISIBLE;
	
	public Comments() {
	}

	@Override
	public String toString() {
		return "CommentsForApartment [gest=" + gest + ", appartmant=" + apartment + ", commentText=" + commentText
				+ ", rating=" + rating + ", status=" + status + "]";
	}

	public Comments(Guest gest, Apartment appartmant, String commentText, int rating,
			CommentStatus status) {
		super();
		this.gest = gest;
		this.apartment = appartmant;
		this.commentText = commentText;
		this.rating = rating;
		this.status = status;
	}

	public Guest getGest() {
		return gest;
	}

	public void setGest(Guest gest) {
		this.gest = gest;
	}

	public Apartment getApartment() {
		return apartment;
	}

	public void setApartment(Apartment appartmant) {
		this.apartment = appartmant;
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
