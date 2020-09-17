function checkDate(date1,date2){
	
	date2 = new Date(date2);
	return  date1.getDate() == date2.getDate() && 
			date1.getMonth() == date2.getMonth() &&
			date1.getYear() == date2.getYear();
}

Vue.component("apartment-detail", {
	data: function () {
		    return {
		      sc: null,
		      id:null,
		      apartment: {},
		      pictures:[],
		      apartmentId:-1,
		      selectedDate:new Date(),
		      numOfDates:1,
		      disabledDates:{
		    	  customPredictor:(date)=> {
		    		  var a=0;
		    	      for(var date2 of this.apartment.availableDates){
		    	    	  
		    	    	  if(checkDate(date,date2)){
		    	    		 return false;
		    	    	  }
		    	      }
		    	      return true;
		    	  }
		      }
		    }
	},
	template: ` 
<div class="d-flex justify-content-center align-items-center">
		<div class="d-flex flex-column ">
    		<h3>Pregled apartmana apartmana</h3>
				<div class="d-flex flex-row row-sm-2">
					<div class="d-flex flex-column p-2">
					
    					<p class="card-text">Broj gostiju: {{apartment.numOfGuests}}</p>	
            			<p class="card-text">Broj soba: {{apartment.numOfRooms}}</p>
            			<p class="card-text">Cena po noćenju: {{apartment.pricePerNight}}</p>
            			<p class="card-text">Adresa: {{apartment.location.address.address}}</p>	
    				</div>
				</div>
				<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
					  <link href="">
					  <div class="carousel-inner">
					  		<div  class="carousel-item active">
						      <img id="pic" class="d-block w-75" :src=address(apartment.pictures[0]) alt="First slide">
						    </div>
						    <div  v-for="picture in apartment.pictures.slice(1,apartment.pictures.length)" class="carousel-item " >
						      <img id="pic" class="d-block w-75" :src=address(picture) >
						    </div>
					  </div>
					  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
					    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
					    <span class="sr-only">Previous</span>
					  </a>
					  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
					    <span class="carousel-control-next-icon" aria-hidden="true"></span>
					    <span class="sr-only">Next</span>
					  </a>
		        </div>
              <table class="table table-hover">
					<tr>
						<td>Slobodni dani:</td>
						<td id="nista" style="color:black;">
							  <vuejs-datepicker :disabled-dates=disabledDates v-model="selectedDate"></vuejs-datepicker>
						</td>
					</tr>
					<tr>
						<td>Broj dana:</td>
						<td>
							<input type="number" v-model="numOfDates" min="1" >
						</td>
					</tr>
					<tr>
					</tr>
			  </table><br />
			 	<button type="submit" id="register" v-on:click="reserve()" class="btn btn-success">Rezerviši</button>
			 <br /><br /><br /><br /><br /><br /><br /><br /><br />
     </div>  
</div>                    	  
`
	, 
	methods : {
		address: function (pic){
			return "slike/"+pic;
		},
		changeSelected: function(){
			console.log("radii");
		},
		reserve: function(){
			var date=new Date(this.selectedDate).getTime().toString();
			var selectedKategorija={"selectedDate":date,"numOfDates":this.numOfDates.toString(),"id":this.id}
			axios
	        .post("/Reservation",JSON.stringify(selectedKategorija))
			.then(response => {
				this.apartment = response.data;
				for(i=0;i<this.apartment.pictures.length;i++){
					this.pictures[i]=this.apartment.pictures[i];
				}
				this.pictures.shift(); 
				console.log(this.apartment);
			});
		}
	},
	mounted () {
        this.id=router.currentRoute.params.apId;
        axios
        .get("/Apartments?id="+this.id)
		.then(response => {
			this.apartment = response.data;
			for(i=0;i<this.apartment.pictures.length;i++){
				this.pictures[i]=this.apartment.pictures[i];
			}
			this.pictures.shift(); 
			console.log(this.apartment);
		});
	    	  
    },
    components: {
      	vuejsDatepicker
      }
});