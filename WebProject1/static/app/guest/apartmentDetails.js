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
		      comments: {},
		      rating:0,
		      text: '',
		      pictures:[],
		      apartmentId:-1,
		      selectedDate:null,
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
			 <br />
			 <div class="form-group">
				<label for="exampleTextarea">Ostavi komentar:</label>
				<textarea class="form-control" v-model="text" id="exampleTextarea" rows="3" style="margin-top: 0px; margin-bottom: 0px; height: 80px;"></textarea>
			 </div>
			 <div class="form-group">
				<label for="exampleSelect1">Ocena:</label>
				<select class="form-control" v-model="rating" id="exampleSelect1">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>
			</div>
			 <div class="d-flex flex-column align-items-start p-1">
	     		<button type="submit" v-on:click="dodajKomentar()" id="comment" class="btn btn-primary">Objavi komentar</button>
			 </div><br /><br />
			 <label>Komentari:</label>
			 <div class="list-group">
				  <a href="#" v-for="comment in comments" class="list-group-item list-group-item-action flex-column align-items-start active">
				    <div class="d-flex w-100 justify-content-between" >
				      <h4 class="mb-1">{{comment.gestUserName}}</h4>
				      <small>3 days ago</small>
				    </div>
				    <p class="mb-1" >{{comment.commentText}}</p>
				    <small>Rating:{{comment.rating}}</small>
				  </a>
			</div>
		<br />
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
				if(response.data!=null)
				{
					$("#reserve").after("<p style=\"color:white\">Uspešno ste rezervisali apartman!<p>");
				}
				this.apartment = response.data;
				for(i=0;i<this.apartment.pictures.length;i++){
					this.pictures[i]=this.apartment.pictures[i];
				}
				this.pictures.shift(); 
				console.log(this.apartment);
			})
			.catch(error =>{
				$("#reserve").after("<p style=\"color:white\">Došlo je do greške prilikom rezervacije, pokušajte ponovo!<p>");
			});
		},
		dodajKomentar: function(){
			this.id=router.currentRoute.params.apId;
	        axios
	        .get("/Apartments?id="+this.id)
			.then(response => {
				if(response.data!=null)
				{
					this.apartment = response.data;
				}
			})
			.catch(error =>{
				//alert("Greška pri dobavljanu apartmana");
			});
	        ret={}
			ret.apartment=this.apartment;
			ret.commentText=this.text;
			ret.rating=this.rating;
			axios
			.post('/Comments',{"commentText":ret.commentText+"","rating":ret.rating+"","id":this.id+""})
			.then(response => {
				if(response.data!=null)
				{
					rating=0;
					text='';
					location.reload();
				}
			})
			.catch(error =>{
				$("#dodajKomentar").after("<p style=\"color:white\">Komentar možete ostaviti samo na apartmanima na kojima imate rezervaciju!<p>");
			});
		},
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
        axios
        .get("/CommentsGuest?id="+this.id)
		.then(response => {
				this.comments = response.data;
		});
        selectedDate=this.apartment.availableDates[0];
	    	  
    },
    components: {
      	vuejsDatepicker
      }
});