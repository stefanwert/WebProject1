var adminPage = new Vue({
    el: '#menuHost',
    data: {
          
    },

    mounted() {
        
    },
    
    methods: {
    	logout(){
    		alert("LOGOUT");
    	}
    },
});

const AddApartment = { template: '<add-apartment></add-apartment>' }
const Apartment = { template: '<apartment></apartment>' }


const router = new VueRouter({
    mode: 'hash',
    routes: [
		{ path: '/addApartment', component: AddApartment},
		{ path: '/apartment', component: Apartment},

    ]
});


var app = new Vue({
    router,
    el: '#routerHost'
});