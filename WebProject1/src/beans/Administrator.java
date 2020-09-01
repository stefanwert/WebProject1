package beans;

import beans.User;

public class Administrator extends User {
	
	public Administrator() {}
	
	public Administrator(String userName, String password, String name, String surname, String gender) {
		super(userName, password, name, surname, gender);
	}
}
