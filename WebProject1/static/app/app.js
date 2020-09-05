const Host = { template: '<host></host>' }
const HostAdd = { template: '<hostAdd></hostAdd>' }
const GestAdd={template: '<gestAdd></gestAdd>'}
const Gest={template: '<gest></gest>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/host', component: Host},
	    { path: '/hostAdd', component: HostAdd },
	    { path: '/gestAdd',component: GestAdd},
	    { path: '/gest',component:Gest}
	  ]
});

var app = new Vue({
	router,
	el: '#host'
});

