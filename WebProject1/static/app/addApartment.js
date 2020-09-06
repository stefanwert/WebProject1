Vue.component("addApartment", {
	data: function () {
		    return {
		    	type:'',
		    	numOfRooms:'',
		    	numOfGuests:'',
		    	host:{
		    		userName:''
		    		},
		    	pricePerNight:'',
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
		<input type="text" v-model="numOfRooms"  /> <br />
		
		<label>Broj gostiju:</label>
		<input type="text" v-model="numOfGuests"  /> <br />
		
		<label>Domaćin:</label>
		<input type="text" v-model="host.userName"  /> <br />
		
		<label>Cena po noćenju:</label>
		<input type="text" v-model="pricePerNight"  /> <br />
		
		<label>Status:</label>
		<input type="text" v-model="status"  /> <br />
	
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
			ret.host.userName=this.host.userName;
			ret.pricePerNight=this.pricePerNight;
			ret.status=this.status;
			axios
			.post('/Apartment',ret);
		}
	}
	
});