Vue.component("add-apartment", {
	data: function () {
		    return {
		    	type:'',
		    	numOfRooms:0,
		    	numOfGuest:0,
		    	pricePerNight:0,
		    	status:''
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
		<input type="file" ref="img" name="img" accept="image/*" multiple> <br /> <br />
		
	
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
			axios
			.post('/Apartments',ret);
		}
	}
	
});