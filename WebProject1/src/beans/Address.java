package beans;

public class Address {
	private String address="";
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	Address(){}
	
	Address(String street,int num,String placeName,int postalCode){
		address=street+" "+num+","+placeName+postalCode;
	}
}
