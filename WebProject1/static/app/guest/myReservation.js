Vue.component("my-reservation", {
	data: function () {
		    return {
		    	reservation: null,
		    	
		    }
	},
	template: ` 
<div class="d-flex justify-content-center">
	<table  class="table table-hover" border="3">
		<tr class="table-info" bgcolor="lightgrey">
			<th>Id</th><th>Broj nocenja</th><th>Od</th><th>Cena po noci</th><th>Host</th><th>Status</th></tr>
			<tr v-for="r in reservation">
				<td> {{r.apartmentId}}</td>
				<td> {{r.numOfNights}}</td>
				<td> {{r.startDate}}</td>
				<td> {{r.totalPrice}}</td>
				<td> {{r.hostUserName}}</td>
				<td> {{r.reservStatus}}</td>
				
			</tr>
	</table><br />
</div>		  
`
	, 
	methods : {
		
	},
	
	mounted () {
        axios
          .get('/ReservationGuest')
          .then(response => {
        		  	this.reservation = response.data;
          			console.log(this.ap);
          });
    }
});
