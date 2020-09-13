Vue.component("apartment", {
	data: function () {
		    return {
		    	ap: null,
		      	selectedApartment: {},
		      	picture:''
		    	
		    }
	},
	template: ` 
<div class="d-flex justify-content-center">
	<div class="d-flex flex-column ">
		<legend>Tabela apartmana</legend>
		<table  class="table table-hover" border="3">
		<tr class="table-info" bgcolor="lightgrey">
			<th>Tip</th><th>Broj soba</th><th>Broj gostiju</th><th>Domaćin</th><th>Cena po noći</th><th>Vreme za prijavu</th><th>Vreme za odjavu</th><th>Status</th><th>Slika</th></tr>
			<tr v-for="i in ap" v-on:click="selectApartment(i)">
				<td> {{i.type}}</td>
				<td> {{i.numOfRooms}}</td>
				<td> {{i.numOfGuests}}</td>
				<td> {{i.host}} </td>
				<td> {{i.pricePerNight}} </td>
				<td> {{i.checkInTime}} </td>
				<td> {{i.checkOutTime}} </td>
				<td> {{i.status}} </td>
				<td><img :src=getPictureAddres(i) width="100" height="100"></img></td>
			</tr>
		</table><br />
		<button type="button" class="btn btn-danger" v-on:click="deleteApartment" >Obriši apartman</button><br /> <br /> 
	</div>
</div>		  
`
	, 
	methods : {
		init : function() {
			this.ap = {};
		}, 
		selectApartment: function(apartment) {
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
        		  	this.ap = response.data;
          			console.log(this.ap);
          });
    }
});
