var adminPage = new Vue({
    el: '#menuGuest',
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



const router = new VueRouter({
    mode: 'hash',
    routes: [
        
    ]
});

var app = new Vue({
    router,
    el: '#routerGuest'
});