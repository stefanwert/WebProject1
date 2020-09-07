//const Login = { template: '<login-form></login-form>' }
//const Home = { template: '<home></home>' }
//const Registration = { template: '<registration-form></registration-form>'}
//ovdje bi trebalo da budu samo login, registaracija i neka home stranica koju ćemo da napravimo
//a ove ostale treba da rasporedimo po ostalim js fajlovima sa svojim ruterima npr sve funkcije za apartment 
//da idu preko ruterHost koji je u host.js jer domaćini barataju sa dodavanjem apartmana npr
const Apartment = { template: '<apartment></apartment>' }
const AddApartment = { template: '<add-apartment></add-apartment>' }
const Host = { template: '<host></host>' }
const HostAdd = { template: '<hostAdd></hostAdd>' }
const GuestAdd={template: '<guestAdd></guestAdd>'}
const Guest={template: '<guest></guest>'}
const Location={template: '<location></location>'}
const Picture={template: '<pictureSave></pictureSave>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		  
	//	{ path: '/', component: Home },
	  //  { path: '/login', component: Login },
	    //{ path: '/registration', component: Registration}
		  
		{ path: '/apartment', component: Apartment},
		{ path: '/addApartment', component: AddApartment},
	    { path: '/host', component: Host},
	    { path: '/hostAdd', component: HostAdd },
	    { path: '/guestAdd',component: GuestAdd},
	    { path: '/guest',component:Guest},
	    { path: '/location',component:Location},
	    { path: '/pictureSave',component:Picture}
	  ]
});

var app = new Vue({
	router,
	//el: '#index'
	el: '#host'
});


