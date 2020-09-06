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
		<input type="text" v-model="type" /> <br />
		
		
		<label>Broj soba:</label>
		<input type="number" v-model="numOfRooms"  /> <br />
		
		<label>Broj gostiju:</label>
		<input type="number" v-model="numOfGuests"  /> <br />
		
		<label>Cena po noćenju:</label>
		<input type="number" v-model="pricePerNight"  /> <br />
		
		<label>Status:</label>
		<input type="text" v-model="status"  /> <br />
		
		<input type="time">	<br />
		
		<label>Slike:</label>
		<input type="file" ref="img" name="img" accept="image/*" multiple> <br />
		
	
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
			.post('/Appartements',ret);
		}
	}
	
});