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

const Users = { template: '<users></users>' }
const ViewUser = { template: '<viewUser></viewUser>' }
const EditUser = { template: '<editUser></editUser>' }
const SearchUser = { template: '<searchUser></searchUser>' }
const HostAdd = { template: '<addHost></addHost>' }
const Host = { template: '<host></host>' }
const Guest={template: '<guest></guest>'}


const router = new VueRouter({
    mode: 'hash',
    routes: [
        //{ path: '/', component: HostAdd },
    	{ path: '/', component: Users },
    	{ path: '/profile/:username', component: ViewUser },
        { path: '/edit/:username', component: EditUser },
        { path: '/search', component: SearchUser },
        { path: '/users', component: Users },
	    { path: '/addHost', component: HostAdd },
	    { path: '/host', component: Host},
	    { path: '/guest',component:Guest},


    ]
});

var app = new Vue({
    router,
    el: '#routerAdmin'
});