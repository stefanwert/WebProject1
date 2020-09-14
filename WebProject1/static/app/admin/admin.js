Vue.component("users", {
    data: function() {
        return {
            hosts: null,
            guests: null
        }
    },
    mounted() {
    	axios
        .get('/AllHost')
        .then(response => {
      		  	this.hosts = response.data;
        			console.log(this.hosts);
        });
    	axios
        .get('/AllGest')
        .then(response => {
      		  	this.guests = response.data;
        			console.log(this.guests);
        });
    },
    template: 
`
<div id="users" class="d-flex p-2 justify-content-center">
<div class="d-flex flex-column p-2">
    <h3 class="p-2">Registered users</h3>
        <div class="p-2">  
            <button type="button" class="btn btn-primary" v-on:click.prevent="search">Pretraži</button>
        </div>
        <div class="d-flex flex-row flex-wrap p-2">
	        <div v-for="host in hosts" class="p-2">
	            <div class="card border-light mb-3" style="max-width: 20rem;" v-on:click.prevent="show(host.userName)">
	                <div class="card-header">{{host.userName}}</div>
		                <div class="card-body">
		                    <h4 class="card-title">{{host.name}}</h4>
		                    <p class="card-text">{{host.surname}}</p>
		                </div>
	            </div>
        	</div>
         </div>
         <div class="d-flex flex-row flex-wrap p-2">
	        <div v-for="guest in guests" class="p-2">
	            <div class="card border-light mb-3" style="max-width: 20rem;" v-on:click.prevent="show(guest.userName)">
	                <div class="card-header">{{guest.userName}}</div>
		                <div class="card-body">
		                    <h4 class="card-title">{{guest.name}}</h4>
		                    <p class="card-text">{{guest.surname}}</p>
		                </div>
	            </div>
        	</div>
         </div>
	</div>
</div>
`,  
methods: {
        search: function() {
            window.location.href = "admin.html#/search";
        },
        show: function(username) {
            window.location.href = "admin.html#/profile/" + username;
        }
    }
});
/*
 <div class="d-flex justify-content-center">
	<div class="d-flex flex-column ">
		<legend>Tabela gostiju</legend>
		<table  class="table table-hover" border="3">
		<tr class="table-info" bgcolor="lightgrey">
			<th>Korisničko ime</th><th>Ime</th><th>Prezime</th></tr>
			<tr v-for="i in guests">
				<td> {{i.userName}}</td>
				<td> {{i.name}}</td>
				<td> {{i.surname}}</td>
			</tr>
		</table><br />
		<button type="button" class="btn btn-danger" v-on:click="deleteApartment" >Obriši</button><br /> <br /> 
	</div>
</div>	
*/ 
Vue.component("viewUser", {
    data: function() {
        return {
            user: {username: '', name: '', surename: ''},
        }
    },
    mounted: function() {
        axios
        .get('users/loggedin')
        .then(response => {
            this.loggedin = response.data;
        })
        .catch(error => {
            alert(error);
        })

        axios
        .get('users/' + this.$route.params.username)
        .then(response => {
            this.user = response.data.user;
        })
        .catch(error => {
            alert(error.response.data);
        })
    },
    template: 
`
<div id="profilePreview" class="d-flex p-2 justify-content-center">
    <div class="d-flex flex-column p-2">
        <div class="d-flex flex-column p-2">
            <h4>{{user.username}}</h4>
            <h2 v-if="reports > 3">*markiran zbog sumnjivih aktivnosti*</h2>
            <div class="d-flex flex-row p-2">
                <a  href="#" v-on:click.prevent="editUser" class="btn btn-primary m-2">Izmjeni</a> 
            </div>
            <p>Ime: {{user.name}}</p>
            <p>Prezime: {{user.surename}}</p>
        </div>                     
</div>
`,
    methods: {
       
        editUser: function() {
            window.location.href = "admin.html#/edit/" + this.$route.params.username;
        },
        reload() {
            axios
            .get('users/' + this.$route.params.username)
            .then(response => {
                this.user = response.data.user;
            })
            .catch(error => {
                alert(error.response.data);
            })
        },
    }
});
Vue.component("editUser", {
    data: function() {
        return {
            user: undefined,
            name: undefined,
            surename: undefined
        }
    },
    mounted() {
        axios
        .get('users/' + this.$route.params.username)
        .then(response => {
            this.user = response.data.user;
            this.name = this.user.name;
            this.surename = this.user.surename;
        })
        .catch(error => {
            alert("Greska prilikom dobavljanja korisnika.")
        })
    },
    template: 
`
<div id="editingUser" class="d-flex p-2 justify-content-center">
    <div class="d-flex flex-column p-2 col-sm-4">
        <form id="login" accept-charset="UTF-8" class="d-flex flex-column p-2">
            <h1 class="p-2">Promjeni korisnika</h1>
            
            <label class="p-2 col-form-label">Ime: {{name}}</label>
            
            <label class="p-2 col-form-label">Prezime: {{surename}}</label>
            
            <button class="btn btn-primary m-5" v-on:click.prevent="editUser">Potvrdi</button>
        </form>
    </div>
</div>
`,
    methods: {
        editUser: function() {
            if (this.oldRole != this.role) {
                var editedUser = {
                    'password' : this.user.password,
                    'name' : this.user.name,
                    'surename' : this.user.surename,
                };

                axios
                .post('users/edit', editedUser)
                .then(response => {
                    window.location.href = "admin.html#/";
                })
                .catch(error => {
                    alert(error.response.data)
                })
            }
        }
    }
});

Vue.component("searchUser", {
    data: function() {
        return {
            name: undefined,
            users: []
        }
    },
    template: 
`
<div id="searchingUsers" class="d-flex p-2 justify-content-center">
    <div class="d-flex flex-column p-2 col-sm-4">
        <h3 class="p-2">Pretraga korisnika:</h3>
        <form accept-charset="UTF-8" class="d-flex flex-column p-2">
            <label class="p-2 col-form-label" for="userName">Ime</label>
            <input type="text" class="p-2 form-control" id="userName" v-model="name">
            <button class="btn btn-primary m-5" v-on:click.prevent="searchUsers">Potvrdi</button>
        </form> 
        <div class="d-flex flex-row flex-wrap p-2">
            <h3 class="p-2" v-if="show">Nema ni jedan korisnik za zadate kriterijume"</h3>
        <div id="results" v-for="user in users" class="d-flex flex-row p-2">
            <div class="card border-light mb-3 p-2" style="max-width: 20rem;" v-on:click.prevent="show(user.username)">
                <div class="card-header">{{user.username}}</div>
                <div class="card-body">
                <h4 class="card-title">{{user.name}}</h4>
                <p class="card-text">{{user.surname}}</p>
                </div>
            </div>
        </div>
        </div>
    </div>
</div>
`,
    methods: {
        searchUsers() {
            var searchParams = {
                name: this.name
            }
            
            axios
            .post('users/parameters', searchParams)
            .then(response => {
                this.users = response.data;
            })
            .catch(error => {
                alert("Greska prilikom dobavljanja rezultata pretrage.");
            })

            if (this.users === [] || this.users === undefined || this.users === null)
                this.show = true;
        },
        show: function(username) {
            window.location.href = "admin.html#/profile/" + username;
        }

    }
});