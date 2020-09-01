package rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import beans.Administrator;
import beans.Gest;
import beans.Host;

public class SingletonDateBase {
	private static SingletonDateBase singletonDateBase=null;
	
	private HashMap<String, Host> hosts = new HashMap<String, Host>();
	private HashMap<String, Gest> gests = new HashMap<String, Gest>();
	private HashMap<String, Administrator> administrators = new HashMap<String, Administrator>();
	
	
	public SingletonDateBase() {
		
	}

	public static SingletonDateBase getSingletonDateBase() {
		return singletonDateBase;
	}

	public static void setSingletonDateBase(SingletonDateBase singletonDateBase) {
		SingletonDateBase.singletonDateBase = singletonDateBase;
	}

	public HashMap<String, Host> getHosts() {
		return hosts;
	}

	public void setHosts(HashMap<String, Host> hosts) {
		this.hosts = hosts;
	}

	public HashMap<String, Gest> getGests() {
		return gests;
	}

	public void setGests(HashMap<String, Gest> gests) {
		this.gests = gests;
	}

	public HashMap<String, Administrator> getAdministrators() {
		return administrators;
	}

	public void setAdministrators(HashMap<String, Administrator> administrators) {
		this.administrators = administrators;
	}
		
	
	

}
