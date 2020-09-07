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
	el: '#host'
});

