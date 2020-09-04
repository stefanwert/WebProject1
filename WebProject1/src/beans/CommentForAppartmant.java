package beans;

import beans.Apartment;
import beans.Gest;

public class CommentForAppartmant {
	private Gest gest;
	private Apartment appartmant;
	private String commentText;
	private int rating;
	
	public CommentForAppartmant() {
	}
	
	public CommentForAppartmant(Gest gest, Apartment appartmant, String commentText, int rating) {
		super();
		this.gest = gest;
		this.appartmant = appartmant;
		this.commentText = commentText;
		this.rating = rating;
	}
	public Gest getGest() {
		return gest;
	}
	public void setGest(Gest gest) {
		this.gest = gest;
	}
	public Apartment getAppartmant() {
		return appartmant;
	}
	public void setAppartmant(Apartment appartmant) {
		this.appartmant = appartmant;
	}
	public String getCommentText() {
		return commentText;
	}
	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}
	public int getMark() {
		return rating;
	}
	public void setMark(int rating) {
		this.rating = rating;
	}
	
	
}
