Vue.component("apartment-guest", {
	data: function () {
		    return {
		    	apartments: null,
		      	selectedApartment: {},
		      	picture:''
		    	
		    }
	},
	template: ` 
<div >
		<div class="row">
			<template v-for="i in apartments" v-on:click="showApartment(i)">
				<div class="column">
					<img style="height: 400px; width: 100%; display: block;" :src=getPictureAddres(i) alt="Card image">
					<div class="card-body">
						<p class="card-text" style="color:green;">Broj soba: {{i.numOfRooms}} </br>Cena po danu je: {{i.pricePerNight}}</p></br>
						
					</div>
				</div>
			</template>
		<div class="row">
</div>		  
`
	, 
	methods : {
		init : function() {
			this.ap = {};
		}, 
		showApartment: function(apartment) {
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
        		  	this.apartments = response.data;
          			console.log(this.ap);
          });
    }
});
