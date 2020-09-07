var adminPage = new Vue({
    el: '#menuAdmin',
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


const HostAdd = { template: '<hostAdd></hostAdd>' }
const Host = { template: '<host></host>' }
const Guest={template: '<guest></guest>'}



const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: HostAdd },
	    { path: '/hostAdd', component: HostAdd },
	    { path: '/host', component: Host},
	    { path: '/guest',component:Guest},


    ]
});

var app = new Vue({
    router,
    el: '#routerAdmin'
});