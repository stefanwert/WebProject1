Vue.component("add-apartment", {
	data: function () {
		    return {
		    	files: [],
		    	type:'',
		    	numOfRooms:0,
		    	numOfGuest:0,
		    	pricePerNight:0,
		    	status:'',
		    	pictures:[]
		    }
	},
	template: ` 
<div>
		Dodavanje apartmana
		<br>
		
		<label>Tip:</label>
		<select v-model="type">
		<option value="APARTMAN">APARTMAN</option>
		<option value="ROOM">ROOM</option>
		</select> <br />
		
		
		<label>Broj soba:</label>
		<input type="number" v-model="numOfRooms"  /> <br />
		
		<label>Broj gostiju:</label>
		<input type="number" v-model="numOfGuests"  /> <br />
		
		<label>Cena po noćenju:</label>
		<input type="number" v-model="pricePerNight"  /> <br />
		
		<label>Status:</label>
		<select v-model="status">
		<option value="ACTIVE">ACTIVE</option>
		<option value="INACTIVE">INACTIVE</option>
		</select> <br />
		<label>Vreme za prijavu:</label>
		<input type="time" v-model="checkInTime">	<br />
		<label>Vreme za odjavu:</label>
		<input type="time" v-model="checkOutTime">	<br />
		
		<label>Slike:</label>
		<input multiple type ="file" ref='file' v-on:change='promeniPutanju()' name='slika' accept="image/x-png,image/jpeg" />
		<button class="dugme" v-on:click="submitFile()">Posalji sliku</button></br>
		
	
		<button v-on:click="add()">Dodaj apartman</button>
</div>		  
`
	, 
	methods : {
		add:function(){
			ret={}
			ret.type=this.type;
			ret.numOfRooms=this.numOfRooms;
			ret.numOfGuests=this.numOfGuests;
			ret.pricePerNight=this.pricePerNight;
			ret.status=this.status;
			ret.pictures=this.pictures;
			axios
			.post('/Apartments',ret);
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
	
	}
	
});