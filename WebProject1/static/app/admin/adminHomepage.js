var adminPage = new Vue({
    el: '#menuAdmin',
    data: {
          
    },

    mounted() {
        
    },
    
    methods: {
    	
    },
});

const Users = { template: '<users></users>' }
const AddHost = { template: '<addHost></addHost>' }
const Host = { template: '<host></host>' }
const Guest={template: '<guest></guest>'}
const Apartments = { template: '<apartments></apartments>' }
const DeleteApartment = { template: '<deleteApartment></deleteApartment>' }
const ViewApartment = { template: '<viewApartment></viewApartment>' }
const EditApartment = { template: '<editApartment></editApartment>' }
const Amenities = { template: '<amenities></amenities>' }
const ReservationAdmin = { template: '<reservationAdmin></reservationAdmin>' }

const router = new VueRouter({
    mode: 'hash',
    routes: [
    	{ path: '/',component:Apartments  },
        { path: '/users', component: Users },
	    { path: '/addHost', component: AddHost },
	    { path: '/host', component: Host},
	    { path: '/guest',component:Guest},
	    { path: '/deleteApartment',component:DeleteApartment},
	    { path: '/apartment/:id',component:ViewApartment},
	    { path: '/apartment/edit/:id',component:EditApartment},
	    { path: '/amenities',component:Amenities},
	    { path: '/reservationAdmin',component:ReservationAdmin},

    ]
});

var app = new Vue({
    router,
    el: '#routerAdmin'
});