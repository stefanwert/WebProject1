function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
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
        <div class="d-flex flex-row flex-wrap p-2">
	        <div v-for="host in hosts" class="p-2">
	            <div class="card border-light mb-3" style="max-width: 20rem;">
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
	            <div class="card border-light mb-3" style="max-width: 20rem;">
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
        
    },
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
            <div class="d-flex flex-row flex-wrap p-2">
    	        <div v-for="apartment in apartments" class="p-2">
    	            <div class="card border-light mb-3" style="max-width: 15rem;" v-on:click.prevent="show(apartment)">
    	                <div class="card-header"><h4>Domaćin: {{apartment.host}}</h4></div>
    		                <div class="card-body">
    		                	<h5 class="card-title">Status: {{apartment.status}}</h5>
    		                    <h5 class="card-title">Tip: {{apartment.type}}</h5>
    		                    </div>
								  <img style="height: 150px; width: 100%; display: block;" :src=getPictureAddres(apartment) alt="Card image">
								  <div class="card-body">
								 </div>
    		                    <ul class="list-group list-group-flush">
    								<li class="list-group-item">Broj gostiju: {{apartment.numOfGuests}}</li>
    								<li class="list-group-item">Broj soba: {{apartment.numOfRooms}}</li>
    								<li class="list-group-item">Cena po noćenju: {{apartment.pricePerNight}}</li>
    								<li class="list-group-item">Adresa: {{apartment.location.address.address}}</li>
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
        },
        getPictureAddres: function(i){
			return 'slike/'+i.pictures[0];
		},
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
        }); 
        
        axios
        .get('/Comments?id='+id)
		.then(response => {
				this.comments = response.data;
		});
    },
    template: 
`
<div class="d-flex justify-content-center align-items-center">
<div class="d-flex flex-column ">
    		<h3>Pregled apartmana apartmana</h3>
				<div class="d-flex flex-row row-sm-2">
					<div class="d-flex flex-column p-2">
					    
						<p class="card-text">Domaćin: {{apartment.host}}</p>
            			<p class="card-text">Status: {{apartment.status}}</p>
    					<p class="card-text">Tip: {{apartment.type}}</p>
					</div>
				</div>
				<div class="d-flex flex-row row-2">
					<div class="d-flex flex-column">
    					<img style="margin-left: auto; margin-right: auto; display: block; width:400px;height:200px;" :src=getPictureAddres(apartment) alt="Card image">
					</div>
				</div>
    			<div class="d-flex flex-row row-sm-2">
					<div class="d-flex flex-column p-2">
    					<p class="card-text">Broj gostiju: {{apartment.numOfGuests}}</p>	
            			<p class="card-text">Broj soba: {{apartment.numOfRooms}}</p>
            			<p class="card-text">Cena po noćenju: {{apartment.pricePerNight}}</p>
            			<p class="card-text">Adresa: {{apartment.location.address.address}}</p>	
    				</div>
				</div>
              <a  href="#" v-on:click.prevent="editApartment" class="btn btn-success m-2">Izmeni</a> 
           <br /><br /><br />
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
        locations:null,
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
    		  	console.log(this.locations);
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
						<select v-model="apartment.type" required>
						<option value="APARTMAN">APARTMAN</option>
						<option value="ROOM">ROOM</option>
						</select>
					</div>
					<div class="d-flex flex-column p-2">
						<label>Status:</label>
						<select v-model="apartment.status" required>
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
					<input multiple type ="file" ref='file' v-on:change='promeniPutanju()' name='slika' accept="image/x-png,image/jpeg" />
				</div>
				<!--<div class="d-flex flex-row">
					<button type="button" class="btn btn-primary w-50" v-on:click="submitFile()">Pošalji sliku</button>
				</div></br>-->
				<!--<div class="d-flex flex-row p-2">
					<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
					Sadržaj apartmana<span class="caret"></span></button>
					<ul class="dropdown-menu">
						<li v-for = "a in amenities">
							<table>
								<tr>
									<td><input :value='a' type='checkbox' <div v-if="checkAmeneti(a)">checked</div /></td>
									<td>{{a.name}}</td>
								</tr>
							</table>
						</li>
					</ul>
				</div></br>-->
				<div class="d-flex flex-row">
					<select v-model="apartment.location" >
						<option v-for="l in locations" v-bind:value="apartment.location" >{{l.address.address}}</option>
					</select>
				</div></br>
				<button type="button" id="editApartment" class="btn btn-info" v-on:click="editApartment()">Potvrdi izmenu</button>
			  <br /><br /><br /><br /><br /><br /><br /><br />
			</fieldset>
		</form>	 
	</div>	
</div>
`,
    methods: {
        editApartment: function() {
        	console.log(this.dates);
        	ret={}
			//this.submitFile();
			ret.type=this.apartment.type;
			ret.numOfRooms=this.apartment.numOfRooms;
			ret.numOfGuests=this.apartment.numOfGuests;
			ret.pricePerNight=this.apartment.pricePerNight;
			ret.checkInTime=this.apartment.checkInTime.toString();
			ret.checkOutTime=this.apartment.checkOutTime.toString();
			ret.status=this.apartment.status;
			//ret.pictures=this.apartment.pictures;
			/*ret.amenities=new Map();
			var br=0;
			for(am of this.selectedAmenities){
				ret.amenities[br]=am;
				br=br+1;
			}*/
			ret.location=this.apartment.location;
			var newList=[];
			for(i=0;i<this.dates.length;i++){
				newList.push(((new Date(this.dates[i])).getTime()).toString());
			}
			ret.rentingIntegers=newList;
        	ret.id=this.apartment.id;
        	//
            axios
            .put('/Apartments',ret)
            .then(response => {
                //this.apartment = response.data.apartment;
            	if(response.data!=null)
				{
					$("#editApartment").after("<p style=\"color:white\">Uspešno ste izmenili apartman!<p>");
				}
            })
            .catch(error => {
                alert(error.response.data);
            });
            
        },
        checkAmeneti: function(ameneti){
        	for(a of amenities){
        		if(a==amenities){
        			return true;
        		}
        	}
        	return false;
        },
        checkLocation: function(location){
        	if(location.address.address==this.apartment.location.address.address){
        		return true;
        	}
        	return false;
        }
    }
});
Vue.component("deleteApartment", {
	data: function () {
		    return {
		    	ap: null,
		      	selectedApartment: {},
		      	picture:''
		    	
		    }
	},
	template: ` 
<div class="d-flex justify-content-center">
	<div class="d-flex flex-column ">
		<legend>Tabela apartmana</legend>
		<table  class="table table-hover" border="3">
		<tr class="table-info" bgcolor="lightgrey">
			<th>Tip</th><th>Broj soba</th><th>Broj gostiju</th><th>Domaćin</th><th>Cena po noći</th><th>Vreme za prijavu</th><th>Vreme za odjavu</th><th>Status</th><th>Id</th><th>Slika</th></tr>
			<tr v-for="i in ap" v-on:click="selectApartment(i)">
				<td> {{i.type}}</td>
				<td> {{i.numOfRooms}}</td>
				<td> {{i.numOfGuests}}</td>
				<td> {{i.host}} </td>
				<td> {{i.pricePerNight}} </td>
				<td> {{i.checkInTime}} </td>
				<td> {{i.checkOutTime}} </td>
				<td> {{i.status}} </td>
				<td> {{i.id}} </td>
				<td><img :src=getPictureAddres(i) width="100" height="100"></img></td>
			</tr>
		</table><br />
		<button type="button" class="btn btn-danger" v-on:click="deleteApartment" >Obriši apartman</button><br /> <br /> 
	</div>
</div>		  
`
	, 
	methods : {
		init : function() {
			this.ap = {};
		}, 
		selectApartment: function(apartment) {
			this.selectedApartment = apartment;
			
    	},
		deleteApartment : function () {
			if (confirm('Da li ste sigurni?') == true) {
				axios
		          .delete('/Apartment',{'data':this.selectedApartment})
		          .then(
		        	response=>{
		        		this.ap = this.ap.filter((item) => {
		        			return item.id !=this.selectedApartment.id; });
		        		this.selectedApartment= {};
		        	}
		          )
			}
		},
		getPictureAddres: function(i){
			return 'slike/'+i.pictures[0];
		}
	},
	
	mounted () {
        axios
          .get('/AllApartments')
          .then(response => {
        		  	this.ap = response.data;
          			console.log(this.ap);
          });
    }
});
//**************************************************AMENITIES******************************************************
Vue.component("amenities", {
    data: function() {
        return {
            amenities:[],
            addName:'',
            selectedAmenity:{},
            selectedBefore:{},
            	
        }
    },
    mounted() {
    	axios
        .get('/Amenities')
        .then(response => {
        	//ovo je mapa !!!
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
		<button type="submit" class="btn btn-info" v-on:click="addAmenity" >Dodaj sadržaj</button><br /> <br /> 
		<div class="d-flex flex-row row-sm-2 p-2">
				<label>Sadržaj apartmana: </label>
				<input type="text" v-model="selectedAmenity.name">
		</div>
		<button type="submit" class="btn btn-success" v-on:click="editAmenity">Izmeni sadržaj</button><br /> <br /> 
	</div>
</div>	
`,  
methods: {
		init : function() {
			this.amenities = [];
		}, 
		selectAmenity: function(amenity) {
			//this.selectedBefore=this.selectedAmenity;
			if(this.selectedAmenity.name==null){
				this.selectedAmenity = amenity;
			}
			var name=this.selectedAmenity.name;
			this.selectedBefore=name.slice();
			this.selectedAmenity = amenity;
			
			
			
		},
		editAmenity: function(){
			console.log(this.selectedBefore);
			console.log(this.selectedAmenity);
			axios
	          .put('/Amenities',{"old":this.selectedBefore,"new":this.selectedAmenity.name})
	          .then(response=>{
	        	  location.reload();
	          });
			
		}
		,
		addAmenity: function(){
			ret={};
			ret.name=this.addName;
			
			axios
			.post('/Amenities',ret)
			.then(response => {
				if(response.data!=null)
				{
					//$("#addAmenity").after("<p style=\"color:white\">Uspeštno ste dodali sadržaj!<p>");
					this.name='';
					location.reload();
				}
			})
			.catch(error => {
				$("#addAmenity").after("<p style=\"color:white\">Sadržaj već postoji!<p>");
            });
		},

		deleteAmenity : function () {
			if (confirm('Da li ste sigurni?') == true) {
				axios
		          .delete('/Amenities',{'data':this.selectedAmenity})
		          .then(
		        	response=>{
		        		/*this.amenities = this.amenities.filter((item) => {
		        			return item.id !=this.selectedAmenity.id; });*/
		        		this.selectedAmenity= {};
		        		location.reload();
		        	}
		          )
			}
			
		},
    }
});

