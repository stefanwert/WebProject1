const Login = { template: '<login></login>' }
const Home = { template: '<home></home>' }
const Registration = { template: '<registration></registration>'}
const GuestAdd={template: '<guestAdd></guestAdd>'}
const Location={template: '<location></location>'}
const Picture={template: '<pictureSave></pictureSave>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		{ path: '/', component: Home },
		{ path: '/login', component: Login },
	  	{ path: '/registration', component: Registration}, 
	    { path: '/guestAdd',component: GuestAdd},
	    { path: '/location',component:Location},
	    { path: '/pictureSave',component:Picture}
	  ]
});

var app = new Vue({
	router,
	el: '#index'
});


