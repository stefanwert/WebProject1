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
		      apartment: {},
		      pictures:[],
		      apartmentId:-1,
		      selectedDate:[],
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
<div>
<div class="d-flex justify-content-center">
	<div class="d-flex flex-column col-sm-3">
		<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
			  <link href="">
			  <div class="carousel-inner">
			  		<div  class="carousel-item active">
				      <img id="pic" class="d-block w-100" :src=address(apartment.pictures[0]) alt="First slide">
				    </div>
				    <div  v-for="picture in apartment.pictures.slice(1,apartment.pictures.length)" class="carousel-item " >
				      <img id="pic" class="d-block w-100" :src=address(picture) >
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
		<table>
			<tr>
				<td>Slobodni dani:</td>
				<td id="nista" style="color:black;">
					  <vuejs-datepicker :disabled-dates=disabledDates></vuejs-datepicker>
					
					<div class="d-flex flex-row">
						<select v-model="selectedLocation">
							<option v-for="d in apartment.availableDates"   v-bind:value="d">{{d}}</option>
						</select>
					</div>
				</td>
			</tr>
			<tr>
				<td>Broj dana:</td>
				<td>
					<input type="number"  min="1" >
				</td>
			</tr>
		</table>
</div>
</div>
</div>		  
`
	, 
	methods : {
		address: function (pic){
			return "slike/"+pic;
		},
		disabledDates:function(date){
			for(i=0;i<this.apartment.availableDates;i++){
				if(date.getDate()==this.apartment.availableDates[i]){
					return true;
				}
			}
			return false;
		}
	},
	mounted () {
        var id=router.currentRoute.params.apId;
        axios
        .get("/Apartments?id="+id)
		.then(response => {
			this.apartment = response.data;
			for(i=0;i<this.apartment.pictures.length;i++){
				this.pictures[i]=this.apartment.pictures[i];
			}
			this.pictures.shift(); 
			console.log(this.apartment);
		});
        this.disabledDates.customPredictor=function(date) {
	    	      // disables the date if it is a multiple of 5
	    	      
	    	    	  
	    	    }
	    	  
    },
    methods : {
		address: function (pic){
			return "slike/"+pic;
		}
	},
	mounted () {
        var id=router.currentRoute.params.apId;
        axios
        .get("/Apartments?id="+id)
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