Vue.component("users", {
    data: function() {
        return {
            hosts: {},
            guests: {}
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
//**************************************************APARTMENTS*****************************************************

Vue.component("apartments", {
    data: function() {
        return {
            apartments: {},
            picture:''
        }
    },
    mounted() {
    	axios
        .get('/AllApartments')
        .then(response => {
      		  	this.apartments = response.data;
        			console.log(this.apartments);
        });
    },
    template: 
`
<div id="users" class="d-flex p-2 justify-content-center">
    <div class="d-flex flex-column p-2">
        <h3 class="p-2">Apartments</h3>
            <div class="p-2">  
                <button type="button" class="btn btn-primary" v-on:click.prevent="search">Pretraži</button>
            </div>
            <div class="d-flex flex-row flex-wrap p-2">
    	        <div v-for="apartment in apartments" class="p-2">
    	            <div class="card border-light mb-3" style="max-width: 20rem;" v-on:click.prevent="show(apartment)">
    	                <div class="card-header"><h4>Domaćin: {{apartment.host}}</h4></div>
    		                <div class="card-body">
    		                	<h5 class="card-title">Status: {{apartment.status}}</h5>
    		                    <h5 class="card-title">Tip: {{apartment.type}}</h5>
    		                    </div>
								  <img style="height: 200px; width: 100%; display: block;" src="getPictureAddres(apartment)" alt="Card image">
								  <div class="card-body">
								 </div>
    		                    <ul class="list-group list-group-flush">
    								<li class="list-group-item">Broj gostiju: {{apartment.numOfGuests}}</li>
    								<li class="list-group-item">Broj soba: {{apartment.numOfRooms}}</li>
    								<li class="list-group-item">Cena po noćenju: {{apartment.pricePerNight}}</li>
    								<li class="list-group-item">Adresa: {{apartment.location}}</li>
  								</ul>
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
        show: function(a) {
            window.location.href = "admin.html#/apartment/" + a.id;
        }
    }
});

Vue.component("viewApartment", {
    data: function() {
        return {
            apartment: {},
            picture:''
        }
    },
    mounted: function() {
        let id = this.$route.params.id
        axios
        .get('/Apartments?id='+id)
        .then(response => {
            this.apartment = response.data;
        })
        .catch(error => {
            alert(error.response.data);
        })
    },
    template: 
`
<div id="viewApartment" class="d-flex p-2 justify-content-center">
    <div class="d-flex flex-column p-2">
        <div class="d-flex flex-column p-2">
            <h4>Domaćin: {{apartment.host}}</h4>
            <h5 class="card-title">Status: {{apartment.status}}</h5>
    		<h5 class="card-title">Tip: {{apartment.type}}</h5>
            </div>
    			<img style="height: 200px; width: 100%; display: block;" src="getPictureAddres(apartment)" alt="Card image">
    		</div>
            <p class="card-text">Broj gostiju: {{apartment.numOfGuests}}</p>
            <p class="card-text">Broj soba: {{apartment.numOfRooms}}</p>
            <p class="card-text">Cena po noćenju: {{apartment.pricePerNight}}</p>
            <p class="card-text">Adresa: {{apartment.location.address.address}}</p>
            <div class="d-flex flex-row p-2">
                <a  href="#" v-on:click.prevent="editApartment" class="btn btn-primary m-2">Izmjeni</a> 
            </div>
        </div>                     
</div>
`,
    methods: {
       
        editApartment: function() {
            window.location.href = "admin.html#/apartment/edit/" + this.$route.params.id
        },
        
        getPictureAddres: function(i){
			return 'slike/'+i.pictures[0];
		},
		
		
        
    }
});

Vue.component("editApartment", {
    data: function() {
    	return{
        apartment: {},
        dates:[],
        locations:[],
        amenities:[],
    	}
    },
    mounted() {
    	let id = this.$route.params.id
        axios
        .get('/Apartments?id='+id)
        .then(response => {
      		  	this.apartment = response.data;
      		  	
        			console.log(this.apartment);
        })
        .catch(error => {
            alert("Greska prilikom dobavljanja apartmana.")
        });
    	
        axios
        .get('/Amenities')
        .then(response => {
      		  	this.amenities = response.data;
        }).catch(error => {
            alert("Greska prilikom dobavljanja sadrzaja	.")
        });
        
        axios
        .get('/Locatios')
        .then(response => {
    		  	this.locations = response.data;
        }).catch(error => {
            alert("Greska prilikom dobavljanja lokacija.")
        });
    },
    template: 
`
<div class="d-flex justify-content-center">
	<div class="d-flex flex-column ">
				<legend>Izmena apartmana apartmana</legend>
				<div class="d-flex flex-row row-sm-2">
					<div class="d-flex flex-column p-2">
						<label>Tip:	</label>
						<select v-model="apartment.type" >
						<option value="APARTMAN">APARTMAN</option>
						<option value="ROOM" selected>ROOM</option>
						</select>
					</div>
					<div class="d-flex flex-column p-2">
						<label>Status:</label>
						<select v-model="apartment.status" >
						<option value="ACTIVE">ACTIVE</option>
						<option value="INACTIVE">INACTIVE</option>
						</select>
					</div>
				</div>
				<div class="d-flex flex-row">
					<div class="d-flex flex-column p-2">
						<label>Broj soba: </label>
						<input type="number" step="1" min="1" max="10" value="1" v-model="apartment.numOfRooms" required />
					</div>
					<div class="d-flex flex-column p-2">
						<label>Broj gostiju: </label>
						<input type="number" step="1" min="1" max="10" value="1" v-model="apartment.numOfGuests" required /> 
					</div>
				</div>
				<div class="d-flex flex-row p-2">
					<label>Cena po noćenju: </label>
					<input type="number" step="any" min="1" max="100000" value="1" v-model="apartment.pricePerNight" required />
				</div>
				<div class="d-flex flex-row p-2">
					<label>Vreme za prijavu: </label>
					<input type="time" v-model="apartment.checkInTime" value="14:00" required>
				</div>
				<div class="d-flex flex-row p-2">
					<label>Vreme za odjavu: </label>
					<input type="time" v-model="apartment.checkOutTime" value="10:00" required><br />
				</div>
				<div class="d-flex flex-row p-2">
				<label>Datumi za izdavanje: </label>
				<v-date-picker
				  mode='multiple'
				  v-model='dates'
				  
				  /></div>
				<div class="d-flex flex-row p-2">
					<label>Slike: </label>
					<input multiple type ="file" ref='file' v-model="apartment.pictures" v-on:change='promeniPutanju()' name='slika' accept="image/x-png,image/jpeg" />
				</div>
				<!--<div class="d-flex flex-row">
					<button type="button" class="btn btn-primary w-50" v-on:click="submitFile()">Pošalji sliku</button>
				</div></br>-->
				<div class="d-flex flex-row p-2">
					<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
					Sadržaj apartmana<span class="caret"></span></button>
					<ul class="dropdown-menu">
						<li v-for = "a in amenities">
							<table>
								<tr>
									<td><input :value='a' type='checkbox' v-model="apartment.selectedAmenities"/></td>
									<td>{{a.name}}</td>
								</tr>
							</table>
						</li>
					</ul>
				</div></br>
				<div class="d-flex flex-row">
					<select v-model="apartment.selectedLocation" >
						<option v-for="l in locations" v-bind:value="l">{{l.address.address}}</option>
					</select>
				</div></br>
				<button type="button" class="btn btn-success" v-on:click="editApartment()">Izmeni apartman</button>
				
			</fieldset>
		</form>	 
	</div>	
</div>
`,
    methods: {
        editApartment: function() {
            axios
            .put('/Apartment',this.apartment)
            .then(response => {
                //this.apartment = response.data.apartment;
            })
            .catch(error => {
                alert(error.response.data);
            });
            
        },
    }
});

Vue.component("searchApartment", {
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
//**************************************************AMENITIES******************************************************
Vue.component("amenities", {
    data: function() {
        return {
            amenities:{},
            addName:''
        }
    },
    mounted() {
    	axios
        .get('/Amenities')
        .then(response => {
      		  	this.amenities = response.data;
        			console.log(this.amenities);
        });
    },
    template: 
`
 <div class="d-flex justify-content-center">
	<div class="d-flex flex-column ">
		<legend>Tabela sadržaja apartmana</legend>
		<table  class="table table-hover" border="3">
		<tr class="table-info" bgcolor="lightgrey">
			<th>ID</th><th>Naziv</th><th>Status</th></tr>
			<tr v-for="i in amenities" v-on:click="selectAmenity(i)">
				<td> {{i.id}}</td>
				<td> {{i.name}}</td>
				<td> {{i.deletedStatus}}</td>
			</tr>
		</table><br />
    	<button type="button" class="btn btn-danger" v-on:click="deleteAmenity" >Obriši sadržaj</button><br /> <br /> 
		<div class="d-flex flex-row row-sm-2 p-2">
				<label>Sadržaj apartmana: </label>
				<input type="text" v-model="addName">		
		</div>
		<button type="button" class="btn btn-info" v-on:click="addAmenity" >Dodaj sadržaj</button><br /> <br /> 
	</div>
</div>	
`,  
methods: {
		init : function() {
			this.amenities = {};
		}, 
		selectAmenity: function(amenity) {
			this.selectedAmenity = amenity;
			console.log(this.selectedAmenity);
			
		},
		deleteAmenity : function () {
			if (confirm('Da li ste sigurni?') == true) {
				axios
		          .delete('/Amenities',{'data':this.selectedAmenity})
		          .then(
		        	response=>{
		        		this.amenities = this.amenities.filter((item) => {
		        			return item.id !=this.selectedAmenity.id; });
		        		this.selectedAmenity= {};
		        	}
		          )
			}
		},
		addAmenity: function(){
			ret={};
			ret.name=this.addName;
			axios
			.post('/Amenities',ret)
			.then(response => {
				if(response.data!=null)
				{
					$("#addAmenity").after("<p style=\"color:white\">USPESNO STE SE LOGOVALI !!!<p>");
					this.name='';
				}
			});
		}
    }
});

