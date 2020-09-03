const Host = { template: '<host></host>' }
const ShoppingCart = { template: '<shopping-cart></shopping-cart>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/host', component: Host},
	    { path: '/sc', component: ShoppingCart }
	  ]
});

var app = new Vue({
	router,
	el: '#webShop'
});

