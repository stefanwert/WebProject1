var adminPage = new Vue({
    el: '#menuAdmin',
    data: {
        loggedin: false,
        user: null    
    },

    mounted() {
        axios
	        .get('users/loggedin')
	        .then(response => {
	            this.user = response.data;
	            
	            if (this.user.username != null){
	            	this.loggedin = true
	            }else{
	            	this.loggedin = false;
	            }
	        })
	        .catch(error => {
	            alert("Error getting logged user.");
	        })
    },
    
    methods: {
        logout: function() {
            axios
	            .post('users/logout')
	            .then(function(response) {
	                window.location.href = "index.html#/login";
	            })
	            .catch(function(error) {
	                alert(error.response.data);
	            })
        }
    },
});


const Home = { template: '<home></home>' }
const Registration = { template: '<registration-form></registration-form>'}

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Home },
        { path: '/registration', component: Registration}
    ]
});

var app = new Vue({
    router,
    el: '#routerAdmin'
});