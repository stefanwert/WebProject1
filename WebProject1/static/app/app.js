const Host = { template: '<host></host>' }
const HostAdd = { template: '<hostAdd></hostAdd>' }
const GuestAdd={template: '<guestAdd></guestAdd>'}
const Guest={template: '<guest></guest>'}
const Location={template: '<location></location>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/host', component: Host},
	    { path: '/hostAdd', component: HostAdd },
	    { path: '/guestAdd',component: GuestAdd},
	    { path: '/guest',component:Guest},
	    { path: '/location',component:Location}
	  ]
});

var app = new Vue({
	router,
	el: '#host'
});

