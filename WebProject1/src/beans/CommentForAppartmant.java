package beans;

import beans.Appartement;
import beans.Gest;

public class CommentForAppartmant {
	private Gest gest;
	private Appartement appartmant;
	private String commentText;
	private int rating;
	
	public CommentForAppartmant() {
	}
	
	public CommentForAppartmant(Gest gest, Appartement appartmant, String commentText, int rating) {
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
	public Appartement getAppartmant() {
		return appartmant;
	}
	public void setAppartmant(Appartement appartmant) {
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
