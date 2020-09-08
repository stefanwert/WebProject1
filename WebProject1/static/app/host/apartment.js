Vue.component("apartment", {
	data: function () {
		    return {
		      ap: null,
		      selectedApartment: {}
		    }
	},
	template: ` 
<div>
		Tabela apartmana
		<table border="1">
		<tr bgcolor="lightgrey">
			<th>Tip</th><th>Broj soba</th><th>Broj gostiju</th><th>Domaćin</th><th>Cena po noći</th><th>Vreme za prijavu</th><th>Vreme za odjavu</th><th>Status</th></tr>
			<tr v-for="i in ap" v-on:click="selectHost(i)">
			<td> {{i.type}}</td>
			<td> {{i.numOfRooms}}</td>
			<td> {{i.numOfGuests}}</td>
			<td> {{i.host}} </td>
			<td> {{i.pricePerNight}} </td>
			<td> {{i.checkInTime}} </td>
			<td> {{i.checkOutTime}} </td>
			<td> {{i.status}} </td>
			</tr>
		</table>
		<br /> 
		<button v-on:click="deleteApartment" >Obriši apartman</button>
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
