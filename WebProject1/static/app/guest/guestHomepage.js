const ViewProfile = { template: '<viewProfile></viewProfile>' }
const AppartmentGuest={template: '<apartment-guest></apartment-guest>'}
const ApartmentDetails={template:'<apartment-detail></apartment-detail>'}

const router = new VueRouter({
    mode: 'hash',
    routes: [
    	{ path: '/viewProfile', component: ViewProfile },
    	{ path: '/AppartmentGuest',component:AppartmentGuest  },
    	{ path: '/apartment-detail/:apId',component:ApartmentDetails  },
    	{ path: '/',component:AppartmentGuest  },
    	{ path: '*', beforeEnter: nepostojecaRuta}
    ]
});

var app = new Vue({
    router,
    el: '#routerGuest'
});


function zabranjenaRuta(next){
	let err = new Error(403);
	err.message = "403 FORBIDDEN"
	next(err);
}
function nepostojecaRuta(to, from, next){
	let err = new Error(404);
	err.message = "404 Not found";
	next(err);
}

function promeniRutu(ruta){
	router.push("/"+ ruta);
}
