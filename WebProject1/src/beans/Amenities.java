package beans;

public class Amenities {

	private String id;
	private String name;
	
	@Override
	public String toString() {
		return "Amenities [id=" + id + ", name=" + name + "]";
	}

	public Amenities() {}
	
	public Amenities(String id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
