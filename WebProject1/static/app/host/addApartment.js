Vue.component("add-apartment", {
	data: function () {
		    return {
		    	files: [],
		    	type:'ROOM',
		    	numOfRooms:1,
		    	numOfGuest:1,
		    	pricePerNight:1,
		    	status:'INACTIVE',
		    	checkInTime:"14:00",
		    	checkOutTime:"10:00",
		    	amenities:[],
		    	selectedAmenities:[],
		    	locations:{},
		    	selectedLocation:{},
		    	pictures:[],
		    	dates: []
		    }
	},
	template: ` 
<div class="d-flex justify-content-center">
	<div class="d-flex flex-column ">
				<legend>Dodavanje apartmana</legend>
				<div class="d-flex flex-row row-sm-2">
					<div class="d-flex flex-column p-2">
						<label>Tip:	</label>
						<select v-model="type" required>
						<option value="APARTMAN">APARTMAN</option>
						<option value="ROOM" selected>ROOM</option>
						</select>
					</div>
					<div class="d-flex flex-column p-2">
						<label>Status:</label>
						<select v-model="status" required>
						<option value="ACTIVE">ACTIVE</option>
						<option value="INACTIVE">INACTIVE</option>
						</select>
					</div>
				</div>
				<div class="d-flex flex-row">
					<div class="d-flex flex-column p-2">
						<label>Broj soba: </label>
						<input type="number" step="1" min="1" max="10" value="1" v-model="numOfRooms" required />
					</div>
					<div class="d-flex flex-column p-2">
						<label>Broj gostiju: </label>
						<input type="number" step="1" min="1" max="10" value="1" v-model="numOfGuest" required /> 
					</div>
				</div>
				<div class="d-flex flex-row p-2">
					<label>Cena po noćenju: </label>
					<input type="number" step="any" min="1" max="100000" value="1" v-model="pricePerNight" required />
				</div>
				<div class="d-flex flex-row p-2">
					<label>Vreme za prijavu: </label>
					<input type="time" v-model="checkInTime" value="14:00" required>
				</div>
				<div class="d-flex flex-row p-2">
					<label>Vreme za odjavu: </label>
					<input type="time" v-model="checkOutTime" value="10:00" required><br />
				</div>
				<div class="d-flex flex-row p-2">
				<label>Datumi za izdavanje: </label>
				<v-date-picker
				  mode='multiple'
				  v-model='dates'
				  required
				  /></div>
				<div class="d-flex flex-row p-2">
					<label>Slike: </label>
					<input multiple type ="file" ref='file' v-on:change='promeniPutanju()' name='slika' accept="image/x-png,image/jpeg" />
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
									<td><input :value='a' type='checkbox' v-model="selectedAmenities"/></td>
									<td>{{a.name}}</td>
								</tr>
							</table>
						</li>
					</ul>
				</div></br>
				<div class="d-flex flex-row">
					<select v-model="selectedLocation" required>
						<option v-for="l in locations"   v-bind:value="l">{{l.address.address}}</option>
					</select>
				</div></br>
				<button type="button" class="btn btn-success" v-on:click="add()">Dodaj apartman</button>
				
			</fieldset>
		</form>	 
	</div>	
</div>	
	  
`
	, 
	methods : {
		addAmenities:function(i){
			this.selectedAmenities.push(i);
		},
		add:function(){
			ret={}
			this.submitFile();
			ret.type=this.type;
			ret.numOfRooms=this.numOfRooms;
			ret.numOfGuests=this.numOfGuests;
			ret.pricePerNight=this.pricePerNight;
			ret.checkInTime=this.checkInTime.toString();
			ret.checkOutTime=this.checkOutTime.toString();
			ret.status=this.status;
			ret.pictures=this.pictures;
			//ret.amenities=this.selectedAmenities;//problem
			ret.amenities=new Map();
			var br=0;
			for(am of this.selectedAmenities){
				ret.amenities[br]=am;
				br=br+1;
			}
			ret.location=this.selectedLocation;
			var newList=[];
			for(i=0;i<this.dates.length;i++){
				newList.push(((new Date(this.dates[i])).getTime()).toString());
			}
			ret.rentingIntegers=newList;
			console.log(this.dates);
			console.log(newList);
			console.log(
			JSON.stringify(ret));
			axios
			.post('/Apartments',ret);
		},
		getValue:function(i){
			return i.name;
		},
	promeniPutanju: function () {
		this.files = this.$refs.file.files;
		
	},
	submitFile: function(){
        /*
                Initialize the form data
            */
			for(let file of this.files){
				let formData = new FormData();

	            /*
	                Add the form data we need to submit
	            */
	            formData.append('file', file);

	            this.pictures.push(file.name);
	        /*
	          Make the request to the POST /single-file URL
	        */
	            axios.post( '/upload',
	                formData,
	                {
	                headers: {
	                    'Content-Type': 'multipart/form-data'
	                }
	              }
	            ).then(response => {
	          	this.filePath = response.data;
	          	//Uzmi okaci sad sliku
	          	this.putanja = this.filePath;
	        }).catch(error =>{
				console.log(error);
			});
			}
			

      }
	
	},
	
	mounted () {
        axios
          .get('/Amenities')
          .then(response => {
        		  	this.amenities = response.data;
          });
        axios
        .get('/Locatios')
        .then(response => {
      		  	this.locations = response.data;
        });
    }
	
});