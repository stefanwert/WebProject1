const Host = { template: '<host></host>' }
const HostAdd = { template: '<hostAdd></hostAdd>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/host', component: Host},
	    { path: '/hostAdd', component: HostAdd }
	  ]
});

var app = new Vue({
	router,
	el: '#host'
});

