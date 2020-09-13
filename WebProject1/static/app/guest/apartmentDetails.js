Vue.component("apartment-detail", {
	data: function () {
		    return {
		      sc: null,
		      apartment: {},
		      pictures:[],
		      apartmentId:-1,
		      br:0
		    }
	},
	template: ` 
<div>
		<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
			  
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
</div>		  
`
	, 
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
    }
});