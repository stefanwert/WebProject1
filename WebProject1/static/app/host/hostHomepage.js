var adminPage = new Vue({
    el: '#menuHost',
    data: {
          
    },

    mounted() {
        
    },
    
    methods: {

    },
});

const AddApartment = { template: '<add-apartment></add-apartment>' }
const Apartment = { template: '<apartment></apartment>' }
const HostReservation = { template: '<host-reservation></host-reservation>' }


const router = new VueRouter({
    mode: 'hash',
    routes: [
		{ path: '/addApartment', component: AddApartment},
		{ path: '/apartment', component: Apartment},
		{ path: '/HostReservation', component: HostReservation},

    ]
});


var app = new Vue({
    router,
    el: '#routerHost'
});


function promeniRutu(ruta){
	router.push("/"+ ruta);
}