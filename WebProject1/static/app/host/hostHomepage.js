var adminPage = new Vue({
    el: '#menuHost',
    data: {
          
    },

    mounted() {
        
    },
    
    methods: {

    },
});

const AppartmentGuest={template: '<apartment-guest></apartment-guest>'}
const ApartmentDetails={template:'<apartment-detail></apartment-detail>'}
const Apartment = { template: '<apartment></apartment>' }
const AddApartment = { template: '<add-apartment></add-apartment>' }
const HostReservation = { template: '<host-reservation></host-reservation>' }
const ViewProfile = { template: '<viewProfile></viewProfile>' }
const Comments = { template: '<comments></comments>' }

const router = new VueRouter({
    mode: 'hash',
    routes: [
    	{ path: '/',component:AppartmentGuest  },
    	{ path: '/AppartmentGuest',component:AppartmentGuest  },
    	{ path: '/apartment-detail/:apId',component:ApartmentDetails  },
		{ path: '/apartment', component: Apartment},
		{ path: '/addApartment', component: AddApartment},
		{ path: '/hostReservation', component: HostReservation},
		{ path: '/comments', component: Comments },
		{ path: '/viewProfile', component: ViewProfile },
    ]
});


var app = new Vue({
    router,
    el: '#routerHost'
});


function promeniRutu(ruta){
	router.push("/"+ ruta);
}