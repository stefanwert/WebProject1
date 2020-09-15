package beans;

public class Amenities {

	private int id;
	private String name;
	private DeletedStatus deletedStatus=DeletedStatus.ACTIVE;
	
	@Override
	public String toString() {
		return "Amenities [id=" + id + ", name=" + name + "]";
	}

	public Amenities() {}

	public Amenities(int id, String name, DeletedStatus deletedStatus) {
		super();
		this.id = id;
		this.name = name;
		this.deletedStatus = deletedStatus;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public DeletedStatus getDeletedStatus() {
		return deletedStatus;
	}

	public void setDeletedStatus(DeletedStatus deletedStatus) {
		this.deletedStatus = deletedStatus;
	}
	
}
